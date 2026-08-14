import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { type LegacyCheckScope, scanLegacyReferences } from './legacy-check'

const roots: string[] = []

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'saas-ui-legacy-check-'))
  roots.push(root)
  return root
}

async function write(root: string, file: string, content: string) {
  const target = path.join(root, file)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, content, 'utf8')
}

afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true })),
  )
})

describe('legacy package regression guard', () => {
  it('finds static, type, dynamic, reference, and manifest uses', async () => {
    const root = await fixture()
    await write(
      root,
      'migrated/static.ts',
      `import { Box } from '@saas-ui/react'`,
    )
    await write(
      root,
      'migrated/type.ts',
      `import type { SidebarProps } from '@saas-ui/react/sidebar'`,
    )
    await write(root, 'migrated/dynamic.ts', `import('@saas-ui/core')`)
    await write(
      root,
      'migrated/common.cjs',
      `require('@saas-ui/core/grid-list')`,
    )
    await write(
      root,
      'migrated/reference.ts',
      `/// <reference types="@saas-ui/react" />`,
    )
    await write(
      root,
      'migrated/package.json',
      JSON.stringify({ dependencies: { '@saas-ui/react': 'next' } }),
    )

    const result = await scanLegacyReferences({
      repositoryRoot: root,
      scopes: [{ name: 'fixture', root: 'migrated' }],
    })

    expect(
      result.references.map(({ package: name, path, specifier }) => ({
        name,
        path,
        specifier,
      })),
    ).toEqual([
      {
        name: '@saas-ui/core',
        path: 'migrated/common.cjs',
        specifier: '@saas-ui/core/grid-list',
      },
      {
        name: '@saas-ui/core',
        path: 'migrated/dynamic.ts',
        specifier: '@saas-ui/core',
      },
    ])
  })

  it('limits convention exclusions to installable template scopes', async () => {
    const root = await fixture()
    await write(root, 'migrated/CHANGELOG.md', `import '@saas-ui/react'`)
    await write(root, 'migrated/input.test.ts', `import '@saas-ui/react'`)
    await write(root, 'migrated/button.stories.tsx', `import '@saas-ui/core'`)
    await write(root, 'migrated/guide.mdx', `import '@saas-ui/core'`)
    await write(root, 'migrated/runtime.ts', `import '@saas-ui/react-panda'`)

    const result = await scanLegacyReferences({
      repositoryRoot: root,
      scopes: [
        {
          name: 'fixture',
          root: 'migrated',
          mode: 'installable-tree',
        },
      ],
    })

    expect(result.references.map(({ path }) => path)).toEqual([
      'migrated/guide.mdx',
    ])
    expect(result.files).toBe(2)

    const ordinary = await scanLegacyReferences({
      repositoryRoot: root,
      scopes: [{ name: 'fixture', root: 'migrated' }],
    })
    expect(ordinary.references.map(({ path }) => path)).toEqual([
      'migrated/button.stories.tsx',
      'migrated/guide.mdx',
    ])
  })

  it('requires precise, live allowlist entries', async () => {
    const root = await fixture()
    await write(root, 'migrated/bridge.ts', `export * from '@saas-ui/core'`)
    const options = {
      repositoryRoot: root,
      scopes: [{ name: 'fixture', root: 'migrated' }],
      allowlist: [
        {
          path: 'migrated/bridge.ts',
          package: '@saas-ui/core' as const,
          reason: 'Time-bounded compatibility bridge.',
        },
      ],
    }

    await expect(scanLegacyReferences(options)).resolves.toMatchObject({
      references: [],
    })
    await write(root, 'migrated/bridge.ts', `export const migrated = true`)
    await expect(scanLegacyReferences(options)).rejects.toThrow(
      'Stale legacy-check allowlist entries',
    )
  })

  it('fails closed for missing or malformed required scopes', async () => {
    const root = await fixture()
    await write(root, 'not-a-directory', 'file')

    await expect(
      scanLegacyReferences({
        repositoryRoot: root,
        scopes: [{ name: 'missing', root: 'missing' }],
      }),
    ).rejects.toThrow('Cannot read legacy-check scope')
    await expect(
      scanLegacyReferences({
        repositoryRoot: root,
        scopes: [{ name: 'file', root: 'not-a-directory' }],
      }),
    ).rejects.toThrow('is not a directory')
    await expect(
      scanLegacyReferences({
        repositoryRoot: root,
        scopes: [{ name: 'optional', root: 'missing', optional: true }],
      }),
    ).resolves.toMatchObject({ skippedScopes: ['optional'] })
  })

  it('rejects empty and ambiguous scope configuration', async () => {
    const root = await fixture()
    await mkdir(path.join(root, 'empty'))
    await write(root, 'migrated/runtime.ts', 'export const migrated = true')

    await expect(
      scanLegacyReferences({ repositoryRoot: root, scopes: [] }),
    ).rejects.toThrow('requires at least one scope')
    await expect(
      scanLegacyReferences({
        repositoryRoot: root,
        scopes: [{ name: 'empty', root: 'empty' }],
      }),
    ).rejects.toThrow('contains no enforceable files')
    await expect(
      scanLegacyReferences({
        repositoryRoot: root,
        scopes: [
          { name: 'duplicate', root: 'migrated' },
          { name: 'duplicate', root: 'empty' },
        ],
      }),
    ).rejects.toThrow('Duplicate legacy-check scope name')
  })

  it('limits an available Pro scope to configured blocks and hooks', async () => {
    const root = await fixture()
    const scope: LegacyCheckScope = {
      name: 'pro',
      root: 'blocks',
      mode: 'pro-installable',
    }
    await write(
      root,
      'blocks/cards/card/component.config.ts',
      'export default {}',
    )
    await write(
      root,
      'blocks/cards/card/card.tsx',
      `import { Box } from '@saas-ui/react'`,
    )
    await write(
      root,
      'blocks/cards/card/card.stories.tsx',
      `import { Story } from '@saas-ui/react'`,
    )
    await write(
      root,
      'blocks/templates/writer/writer.tsx',
      `import { Writer } from '@saas-ui/react'`,
    )
    await write(
      root,
      'blocks/hooks/use-open.ts',
      `import type { Core } from '@saas-ui/core'`,
    )

    const result = await scanLegacyReferences({
      repositoryRoot: root,
      scopes: [scope],
    })

    expect(result.references.map(({ path }) => path)).toEqual([
      'blocks/hooks/use-open.ts',
    ])
  })
})
