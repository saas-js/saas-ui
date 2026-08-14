import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import type { Config } from '../../src/utils/get-config'
import {
  migrateReactToRegistry,
  transformReactToRegistryMdx,
} from '../../src/utils/migrations/react-to-registry'

const config: Pick<Config, 'aliases'> = {
  aliases: {
    components: '@/components',
    hooks: '@/hooks',
    icons: '@/components/icons',
    lib: '@/lib',
    ui: '@/components/ui',
    utils: '@/lib/utils',
  },
}
const fixtures: string[] = []

afterEach(async () => {
  await Promise.all(
    fixtures
      .splice(0)
      .map((fixture) => fs.rm(fixture, { force: true, recursive: true })),
  )
})

function transform(source: string) {
  return transformReactToRegistryMdx({
    config,
    filePath: 'docs/example.mdx',
    source,
  })
}

async function project(source: string) {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'sui-mdx-migrate-'))
  fixtures.push(cwd)
  await fs.mkdir(path.join(cwd, 'docs'), { recursive: true })
  await Promise.all([
    fs.writeFile(
      path.join(cwd, 'package.json'),
      `${JSON.stringify(
        {
          name: 'mdx-migration-fixture',
          private: true,
          dependencies: { '@saas-ui/react': '3.0.0-next.54' },
        },
        null,
        2,
      )}\n`,
    ),
    fs.writeFile(path.join(cwd, 'docs/example.mdx'), source),
  ])
  return cwd
}

describe('react-to-registry MDX migration', () => {
  it('migrates real MDX ESM without rewriting prose', () => {
    const source = `import { Box, Sidebar } from '@saas-ui/react'

# Sidebar

The prose remains exactly as written.
`
    const result = transform(source)

    expect(result.output).toContain(`import { Box } from '@chakra-ui/react'`)
    expect(result.output).toContain(
      `import { Sidebar } from '@/components/ui/sidebar'`,
    )
    expect(result.output).toContain('The prose remains exactly as written.')
    expect(result.report.requestedItems).toEqual(['sidebar'])
    expect(result.report.migratedBindings).toBe(2)
  })

  it('migrates multiline type and aliased imports inside TSX fences', () => {
    const source = `# Example

\`\`\`tsx
import {
  Box as LayoutBox,
  type ButtonProps as ActionProps,
  Sidebar,
} from '@saas-ui/react'

export const Example = () => <Sidebar />
\`\`\`
`
    const result = transform(source)

    expect(result.output.startsWith('# Example\n\n```tsx\n')).toBe(true)
    expect(result.output.endsWith('\n```\n')).toBe(true)
    expect(result.output).toContain('LayoutBox')
    expect(result.output).toContain('ActionProps')
    expect(result.output).toContain(`from '@/components/ui/sidebar'`)
    expect(result.report.requestedItems).toEqual(['sidebar'])
    expect(result.report.migratedBindings).toBe(3)
  })

  it('ignores prose and unsupported-language fence false positives', () => {
    const source = `# Notes

The text import { Box } from '@saas-ui/react' is documentation, not ESM.

\`\`\`text
import { Box } from '@saas-ui/react'
\`\`\`
`
    const result = transform(source)

    expect(result.output).toBe(source)
    expect(result.report.changed).toBe(false)
    expect(result.report.diagnostics).toEqual([])
  })

  it('normalizes known component subpaths through the shared transformer', () => {
    const source =
      `import { Button, type ButtonProps as Props } ` +
      `from '@saas-ui/react/button'\n` +
      `import { Mark } from '@saas-ui/react/mark'\n`
    const result = transform(source)

    expect(result.output).toContain(`from '@chakra-ui/react'`)
    expect(result.output).toContain(`import { Mark } from '@chakra-ui/react'`)
    expect(result.output).not.toContain('@saas-ui/react')
    expect(result.report.requestedItems).toEqual([])
    expect(result.report.migratedBindings).toBe(3)
  })

  it('preserves CRLF documents and is idempotent', () => {
    const source = "import { Box } from '@saas-ui/react'\r\n\r\n# Example\r\n"
    const first = transform(source)
    const second = transform(first.output)

    expect(first.output).not.toMatch(/(?<!\r)\n/)
    expect(second.output).toBe(first.output)
    expect(second.report.changed).toBe(false)
  })

  it('reports malformed static imports without changing them', () => {
    const source = `import { Box from '@saas-ui/react'

# Broken
`
    const result = transform(source)

    expect(result.output).toBe(source)
    expect(result.report.changed).toBe(false)
    expect(result.report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'parse-error', line: 1 }),
      ]),
    )
  })

  it('leaves dynamic, namespace, and unknown subpath imports explicit', () => {
    const source = `\`\`\`tsx
const load = () => import('@saas-ui/react')
import * as SaasUI from '@saas-ui/react'
import { Widget } from '@saas-ui/react/private-widget'
\`\`\`
`
    const result = transform(source)

    expect(result.output).toBe(source)
    expect(result.report.diagnostics.map((entry) => entry.code)).toEqual(
      expect.arrayContaining([
        'unsupported-dynamic-import',
        'unsupported-namespace-import',
        'unsupported-legacy-subpath',
      ]),
    )
  })

  it('includes MDX in project scanning, write, and reporting', async () => {
    const source = `import { Box } from '@saas-ui/react'\n\n# Example\n`
    const cwd = await project(source)
    const report = await migrateReactToRegistry({ config, cwd, write: true })

    expect(report.success).toBe(true)
    expect(report.applied).toBe(true)
    expect(report.filesScanned).toBe(1)
    expect(report.filesChanged).toBe(1)
    expect(report.files[0]).toMatchObject({
      path: 'docs/example.mdx',
      migratedBindings: 1,
    })
    expect(
      await fs.readFile(path.join(cwd, 'docs/example.mdx'), 'utf8'),
    ).toContain(`from '@chakra-ui/react'`)
  })

  it('rolls an MDX write and manifest change back when installation fails', async () => {
    const source = `import { Sidebar } from '@saas-ui/react'\n\n# Example\n`
    const cwd = await project(source)
    const manifest = await fs.readFile(path.join(cwd, 'package.json'), 'utf8')
    const report = await migrateReactToRegistry({
      config,
      cwd,
      installer: async () => {
        throw new Error('template installation failed')
      },
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.applied).toBe(false)
    expect(report.diagnostics.at(-1)).toMatchObject({
      code: 'apply-error',
      message: 'template installation failed',
    })
    expect(await fs.readFile(path.join(cwd, 'docs/example.mdx'), 'utf8')).toBe(
      source,
    )
    expect(await fs.readFile(path.join(cwd, 'package.json'), 'utf8')).toBe(
      manifest,
    )
  })
})
