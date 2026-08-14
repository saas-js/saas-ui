import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { createMonorepoProject } from '../src/utils/create-project'
import { SUPPORTED_PRESET_VERSION } from '../src/utils/package-compatibility'

const projects: string[] = []

afterEach(async () => {
  await Promise.all(
    projects
      .splice(0)
      .map((project) => rm(project, { force: true, recursive: true })),
  )
})

async function generatedFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map((entry) => {
        const absolutePath = path.join(directory, entry.name)
        return entry.isDirectory()
          ? generatedFiles(absolutePath)
          : Promise.resolve([absolutePath])
      }),
    )
  ).flat()
}

async function scaffold(typescript: boolean) {
  const cwd = await mkdtemp(path.join(tmpdir(), 'saas-ui-create-project-'))
  projects.push(cwd)
  await createMonorepoProject({
    cwd,
    name: 'workspace',
    packageManager: 'pnpm',
    packageManagerVersion: '10.26.2',
    skipInstall: true,
    typescript,
  })
  return path.join(cwd, 'workspace')
}

describe('monorepo project scaffolder', () => {
  test.each([
    { extension: 'tsx', typescript: true },
    { extension: 'jsx', typescript: false },
  ])(
    'generates a local preset provider for $extension projects',
    async ({ extension, typescript }) => {
      const project = await scaffold(typescript)
      const [
        webManifest,
        uiManifest,
        webComponents,
        uiComponents,
        layout,
        provider,
      ] = await Promise.all([
        readFile(path.join(project, 'apps/web/package.json'), 'utf8').then(
          JSON.parse,
        ),
        readFile(path.join(project, 'packages/ui/package.json'), 'utf8').then(
          JSON.parse,
        ),
        readFile(path.join(project, 'apps/web/components.json'), 'utf8').then(
          JSON.parse,
        ),
        readFile(
          path.join(project, 'packages/ui/components.json'),
          'utf8',
        ).then(JSON.parse),
        readFile(
          path.join(project, `apps/web/src/app/layout.${extension}`),
          'utf8',
        ),
        readFile(
          path.join(
            project,
            `packages/ui/src/components/provider.${extension}`,
          ),
          'utf8',
        ),
      ])

      expect(webManifest.dependencies).toMatchObject({
        '@chakra-ui/react': '^3.28.0',
        '@emotion/react': '^11.0.0',
      })
      expect(uiManifest.dependencies).toMatchObject({
        '@chakra-ui/react': '^3.28.0',
        '@emotion/react': '^11.0.0',
        '@saas-ui/chakra-preset': SUPPORTED_PRESET_VERSION,
        'next-themes': '^0.4.6',
      })
      expect(webComponents.$schema).toBe(
        'https://saas-ui.dev/r/schema/components.json',
      )
      expect(uiComponents.$schema).toBe(
        'https://saas-ui.dev/r/schema/components.json',
      )
      expect(webComponents.installed).toEqual([])
      expect(uiComponents.installed).toEqual([])
      expect(layout).toContain(
        `import { Provider } from '@repo/ui/components/provider'`,
      )
      expect(layout).toContain('<Provider>{children}</Provider>')
      expect(provider).toContain('ChakraProvider value={defaultSystem}')
      expect(provider).toContain('ThemeProvider')

      const generatedSource = await Promise.all(
        (await generatedFiles(project)).map((file) => readFile(file, 'utf8')),
      )
      expect(generatedSource.join('\n')).not.toContain(`@saas-ui/${'react'}`)
    },
  )
})
