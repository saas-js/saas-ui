import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  utimes,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import ts from 'typescript'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { diffRegistryItems, shouldFailDiffCheck } from '#commands/diff/impl'
import { createUpdatePlan, updateRegistryItems } from '#commands/update/impl'
import { installRegistryItems } from '#utils/add-components'
import type { Config } from '#utils/get-config'
import {
  applyInstallPlan,
  createInstallPlan,
  prepareStagedProjectFile,
  resolveRegistryFileTarget,
} from '#utils/install-plan'
import { logger } from '#utils/logger'
import { SUPPORTED_PRESET_VERSION } from '#utils/package-compatibility'
import { reconcilePackageDependencies } from '#utils/package-dependencies'
import {
  type RegistryClient,
  createRegistryClient,
  resolveRegistryGraph,
} from '#utils/registry'
import {
  canonicalRegistryItemContentHash,
  hashContent,
} from '#utils/registry-content-hash'
import type { RegistryItem } from '#utils/registry/schema'

const projects: string[] = []

afterEach(async () => {
  await Promise.all(
    projects.splice(0).map((cwd) => rm(cwd, { recursive: true, force: true })),
  )
})

async function project() {
  const cwd = await mkdtemp(path.join(tmpdir(), 'saas-ui-cli-'))
  projects.push(cwd)
  await writeFile(path.join(cwd, 'package.json'), '{"private":true}\n')
  const config: Config = {
    system: 'chakra',
    style: 'default',
    rsc: false,
    tsx: true,
    installed: [],
    aliases: {
      components: '@/design',
      utils: '@/shared/utils',
      ui: '@/design-system',
      lib: '@/shared',
      hooks: '@/behaviors',
      icons: '@/glyphs',
    },
    resolvedPaths: {
      cwd,
      components: path.join(cwd, 'src/design'),
      utils: path.join(cwd, 'src/shared/utils'),
      ui: path.join(cwd, 'src/design-system'),
      lib: path.join(cwd, 'src/shared'),
      hooks: path.join(cwd, 'src/behaviors'),
      icons: path.join(cwd, 'src/glyphs'),
    },
  }
  return { cwd, config }
}

async function readInstalled(cwd: string): Promise<string[]> {
  const contents = JSON.parse(
    await readFile(path.join(cwd, 'components.json'), 'utf8'),
  ) as { installed?: string[] }
  return contents.installed ?? []
}

function getRegistryLockPath(cwd: string) {
  return path.join(cwd, '.saas-ui/registry-lock.json')
}

function item(name: string, options: Partial<RegistryItem> = {}): RegistryItem {
  const result: RegistryItem = {
    schemaVersion: 1,
    name,
    type: 'registry:ui',
    files: [],
    ...options,
  }
  if (
    typeof result.meta?.contentHash === 'string' &&
    !/^[a-f0-9]{64}$/.test(result.meta.contentHash)
  ) {
    result.meta = {
      ...result.meta,
      contentHash: canonicalRegistryItemContentHash(result),
    }
  }
  return result
}

function memoryClient(items: Record<string, RegistryItem>): RegistryClient {
  return {
    async getIndex() {
      return Object.values(items)
    },
    async getItem(reference) {
      const value = items[reference]
      if (!value) throw new Error(`Missing synthetic item: ${reference}`)
      return structuredClone(value)
    },
  }
}

describe('registry graph and install plans', () => {
  it('keeps same-named items from different namespaces distinct', async () => {
    const { config } = await project()
    config.registries = {
      '@one': 'https://one.example/{name}.json',
      '@two': 'https://two.example/{name}.json',
    }
    const client: RegistryClient = {
      async getIndex() {
        return []
      },
      async getItem(reference) {
        const registry = new URL(reference).hostname.split('.')[0]
        return item('button', {
          files: [
            {
              path: 'ui/button.tsx',
              target: `components/vendors/${registry}-button.tsx`,
              type: 'registry:ui',
              content: `export const registry = '${registry}'\n`,
            },
          ],
        })
      },
    }

    const plan = await createInstallPlan(
      ['@one/button', '@two/button'],
      config,
      { client },
    )
    expect(plan.items.map((entry) => entry.reference)).toEqual([
      '@one/button',
      '@two/button',
    ])
    expect(plan.files.map((file) => file.item)).toEqual([
      '@one/button',
      '@two/button',
    ])
    expect(plan.conflicts).toEqual([])
  })

  it('installs regular component files below the components root', async () => {
    const { config } = await project()

    expect(
      resolveRegistryFileTarget(
        {
          path: 'forms/fields/text-field.tsx',
          type: 'registry:component',
          content: 'export const TextField = () => null\n',
        },
        config,
      ),
    ).toBe(
      path.join(config.resolvedPaths.components, 'forms/fields/text-field.tsx'),
    )
  })

  it('resolves dependencies first and installs alias-aware nested targets once', async () => {
    const { cwd, config } = await project()
    const client = memoryClient({
      context: item('context', {
        type: 'registry:lib',
        dependencies: ['react'],
        files: [
          {
            path: 'lib/create-context.ts',
            type: 'registry:lib',
            content: 'export const createContext = () => null\n',
          },
        ],
      }),
      provider: item('provider', {
        type: 'registry:setup',
        registryDependencies: ['context'],
        dependencies: ['@chakra-ui/react'],
        files: [
          {
            path: 'setup/provider/provider.tsx',
            target: 'components/setup/provider/provider.tsx',
            type: 'registry:setup',
            content:
              "import { createContext } from '@/registry/default/lib/create-context.ts'\nexport { createContext }\n",
          },
        ],
      }),
      navbar: item('navbar', {
        files: [
          {
            path: 'ui/navigation/navbar.tsx',
            type: 'registry:ui',
            content: 'export const Navbar = () => null\n',
          },
        ],
      }),
      assets: item('assets', {
        type: 'registry:hook',
        files: [
          {
            path: 'hooks/use-toggle.ts',
            type: 'registry:hook',
            content: 'export const useToggle = () => false\n',
          },
          {
            path: 'icons/menu-icon.tsx',
            type: 'registry:icon',
            content: 'export const MenuIcon = () => null\n',
          },
        ],
      }),
      sidebar: item('sidebar', {
        version: '1.2.3',
        registryDependencies: ['provider', 'navbar', 'assets'],
        dependencies: ['@chakra-ui/react'],
        devDependencies: ['@types/react'],
        meta: { contentHash: 'sidebar-v1' },
        files: [
          {
            path: 'ui/sidebar/sidebar.tsx',
            type: 'registry:ui',
            content:
              "import { Navbar } from '@/registry/default/ui/navigation/navbar.tsx'\nimport { useToggle } from '@/registry/default/hooks/use-toggle.ts'\nimport { MenuIcon } from '@/registry/default/icons/menu-icon.tsx'\nexport { Navbar } from '../navigation/navbar.tsx'\nexport const Sidebar = () => [useToggle, MenuIcon]\n",
          },
          {
            path: 'ui/sidebar/index.ts',
            type: 'registry:ui',
            content: "export * from './sidebar.tsx'\n",
          },
        ],
      }),
    })
    const install = vi.fn(async () => undefined)

    const plan = await createInstallPlan(['sidebar'], config, {
      client,
      dependencies: ['@emotion/react'],
    })
    expect(plan.items.map(({ name }) => name)).toEqual([
      'context',
      'provider',
      'navbar',
      'assets',
      'sidebar',
    ])
    expect(plan.dependencies).toEqual([
      '@chakra-ui/react@^3.28.0',
      '@emotion/react@^11.0.0',
      'react',
    ])
    expect(plan.devDependencies).toEqual(['@types/react'])
    expect(plan.conflicts).toEqual([])

    await applyInstallPlan(plan, config, { dependencyInstaller: install })

    expect(install).toHaveBeenCalledTimes(1)
    expect(install).toHaveBeenCalledWith({
      cwd,
      dependencies: [
        '@chakra-ui/react@^3.28.0',
        '@emotion/react@^11.0.0',
        'react',
      ],
      devDependencies: ['@types/react'],
    })
    const sidebar = await readFile(
      path.join(cwd, 'src/design-system/sidebar/sidebar.tsx'),
      'utf8',
    )
    expect(sidebar).toContain("from '@/design-system/navigation/navbar'")
    expect(sidebar).toContain("from '@/behaviors/use-toggle'")
    expect(sidebar).toContain("from '@/glyphs/menu-icon'")
    expect(sidebar).toContain("from '../navigation/navbar'")
    expect(sidebar).not.toMatch(/\.tsx['"]/)
    await expect(
      readFile(
        path.join(cwd, 'src/design-system/navigation/navbar.tsx'),
        'utf8',
      ),
    ).resolves.toContain('Navbar')
    await expect(
      readFile(
        path.join(cwd, 'src/design/setup/provider/provider.tsx'),
        'utf8',
      ),
    ).resolves.toContain("from '@/shared/create-context'")
    await expect(
      readFile(path.join(cwd, 'src/shared/create-context.ts'), 'utf8'),
    ).resolves.toContain('createContext')
    await expect(
      readFile(path.join(cwd, 'src/behaviors/use-toggle.ts'), 'utf8'),
    ).resolves.toContain('useToggle')
    await expect(
      readFile(path.join(cwd, 'src/glyphs/menu-icon.tsx'), 'utf8'),
    ).resolves.toContain('MenuIcon')

    const compilerConfig = ts.parseJsonConfigFileContent(
      {
        compilerOptions: {
          strict: true,
          noEmit: true,
          target: 'ESNext',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          jsx: 'Preserve',
          baseUrl: '.',
          paths: { '@/*': ['./src/*'] },
        },
        include: ['src/**/*.ts', 'src/**/*.tsx'],
      },
      ts.sys,
      cwd,
    )
    const program = ts.createProgram(
      compilerConfig.fileNames,
      compilerConfig.options,
    )
    const diagnostics = ts.getPreEmitDiagnostics(program)
    expect(
      diagnostics.map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      ),
    ).toEqual([])

    await expect(
      readFile(path.join(cwd, 'components.json'), 'utf8'),
    ).rejects.toThrow()
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  }, 15_000)

  it('keeps dry-run project state unchanged while reporting exact actions', async () => {
    const { cwd, config } = await project()
    const client = memoryClient({
      sidebar: item('sidebar', {
        dependencies: ['react'],
        files: [
          {
            path: 'ui/sidebar/sidebar.tsx',
            type: 'registry:ui',
            content: 'export const Sidebar = () => null\n',
          },
        ],
      }),
    })
    const before = await readdir(cwd)
    const result = await installRegistryItems(['sidebar'], config, {
      client,
      dryRun: true,
      silent: true,
    })
    expect(result.applied).toBe(false)
    expect(result.plan.files).toMatchObject([
      { action: 'create', target: 'src/design-system/sidebar/sidebar.tsx' },
    ])
    expect(result.plan.dependencies).toEqual(['react'])
    expect(await readdir(cwd)).toEqual(before)
  })

  it('treats add diff output as a filtered non-mutating install plan', async () => {
    const { cwd, config } = await project()
    const client = memoryClient({
      sidebar: item('sidebar', {
        files: [
          {
            path: 'ui/sidebar/sidebar.tsx',
            type: 'registry:ui',
            content: 'export const Sidebar = () => null\n',
          },
        ],
      }),
    })
    const before = await readdir(cwd)
    const log = vi.spyOn(logger, 'log').mockImplementation(() => undefined)

    try {
      const result = await installRegistryItems(['sidebar'], config, {
        client,
        diff: 'sidebar.tsx',
      })
      expect(result.applied).toBe(false)
      expect(log).toHaveBeenCalledWith(
        expect.stringContaining('Registry diff: sidebar'),
      )
      expect(log).toHaveBeenCalledWith(
        expect.stringContaining('+export const Sidebar = () => null'),
      )
      expect(await readdir(cwd)).toEqual(before)
    } finally {
      log.mockRestore()
    }
  })

  it('reports every preflight conflict and performs no partial writes', async () => {
    const { cwd, config } = await project()
    await mkdir(path.join(cwd, 'src/design-system/card'), { recursive: true })
    await writeFile(path.join(cwd, 'src/design-system/card/a.ts'), 'local-a\n')
    await writeFile(path.join(cwd, 'src/design-system/card/b.ts'), 'local-b\n')
    const client = memoryClient({
      card: item('card', {
        files: [
          { path: 'ui/card/a.ts', type: 'registry:ui', content: 'remote-a\n' },
          { path: 'ui/card/b.ts', type: 'registry:ui', content: 'remote-b\n' },
          { path: 'ui/card/c.ts', type: 'registry:ui', content: 'remote-c\n' },
        ],
      }),
    })
    const plan = await createInstallPlan(['card'], config, { client })
    expect(plan.conflicts).toHaveLength(2)
    await expect(applyInstallPlan(plan, config)).rejects.toThrow('2 conflict')
    await expect(
      readFile(path.join(cwd, 'src/design-system/card/a.ts'), 'utf8'),
    ).resolves.toBe('local-a\n')
    await expect(
      readFile(path.join(cwd, 'src/design-system/card/c.ts'), 'utf8'),
    ).rejects.toThrow()
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  })

  it('rejects traversal, collisions, and symlink escapes during planning', async () => {
    const { cwd, config } = await project()
    const outside = await mkdtemp(path.join(tmpdir(), 'saas-ui-outside-'))
    projects.push(outside)
    await mkdir(path.join(cwd, 'src'), { recursive: true })
    await symlink(outside, path.join(cwd, 'src/link'))
    config.resolvedPaths.icons = path.join(cwd, 'src/link')
    const client = memoryClient({
      unsafe: item('unsafe', {
        files: [
          {
            path: 'ui/../escape.ts',
            type: 'registry:ui',
            content: 'escape\n',
          },
          {
            path: 'icons/a.tsx',
            type: 'registry:icon',
            content: 'a\n',
          },
          {
            path: 'ui/one.ts',
            target: 'ui/same.ts',
            type: 'registry:ui',
            content: 'one\n',
          },
          {
            path: 'ui/two.ts',
            target: 'ui/same.ts',
            type: 'registry:ui',
            content: 'two\n',
          },
        ],
      }),
    })
    const plan = await createInstallPlan(['unsafe'], config, { client })
    expect(plan.conflicts.map(({ kind }) => kind)).toEqual(
      expect.arrayContaining(['unsafe-path', 'collision']),
    )
    expect(
      plan.conflicts.filter(({ kind }) => kind === 'unsafe-path'),
    ).toHaveLength(2)
  })

  it('does not write files or a lock when dependency installation fails', async () => {
    const { cwd, config } = await project()
    const client = memoryClient({
      sidebar: item('sidebar', {
        dependencies: ['react'],
        files: [
          {
            path: 'ui/sidebar.tsx',
            type: 'registry:ui',
            content: 'export const Sidebar = 1\n',
          },
        ],
      }),
    })
    const plan = await createInstallPlan(['sidebar'], config, { client })
    await expect(
      applyInstallPlan(plan, config, {
        dependencyInstaller: async () => {
          throw new Error('install failed')
        },
      }),
    ).rejects.toThrow('install failed')
    await expect(
      readFile(path.join(cwd, 'src/design-system/sidebar.tsx'), 'utf8'),
    ).rejects.toThrow()
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
    expect(await readdir(cwd)).toEqual(['package.json'])
  })
})

function exclusiveProviderItems() {
  return {
    'provider-shared': item('provider-shared', {
      type: 'registry:lib',
      files: [
        {
          path: 'lib/provider-shared.ts',
          type: 'registry:lib',
          content: 'export const system = {}\n',
        },
      ],
    }),
    provider: item('provider', {
      type: 'registry:setup',
      registryDependencies: ['provider-shared'],
      meta: {
        contentHash: 'provider-color',
        exclusiveGroup: 'provider',
        conflicts: ['provider-no-color-mode'],
      },
      files: [
        {
          path: 'setup/provider/provider.tsx',
          target: 'components/setup/provider/provider.tsx',
          type: 'registry:setup',
          content: 'export const Provider = "color-mode"\n',
        },
        {
          path: 'setup/provider/color-mode.ts',
          target: 'components/setup/provider/color-mode.ts',
          type: 'registry:setup',
          content: 'export const colorMode = true\n',
        },
      ],
    }),
    'provider-no-color-mode': item('provider-no-color-mode', {
      type: 'registry:setup',
      registryDependencies: ['provider-shared'],
      meta: {
        contentHash: 'provider-plain',
        exclusiveGroup: 'provider',
        conflicts: ['provider'],
      },
      files: [
        {
          path: 'setup/provider-no-color-mode/provider-no-color-mode.tsx',
          target: 'components/setup/provider/provider.tsx',
          type: 'registry:setup',
          content: 'export const Provider = "plain"\n',
        },
      ],
    }),
  }
}

describe('exclusive registry alternatives', () => {
  it('dry-runs and switches both directions without deleting old files', async () => {
    const { cwd, config } = await project()
    const client = memoryClient(exclusiveProviderItems())
    const providerTarget = path.join(
      cwd,
      'src/design/setup/provider/provider.tsx',
    )
    const colorModeTarget = path.join(
      cwd,
      'src/design/setup/provider/color-mode.ts',
    )

    await installRegistryItems(['provider'], config, { client, silent: true })
    expect(await readInstalled(cwd)).toEqual(['provider'])

    const dryRun = await installRegistryItems(
      ['provider-no-color-mode'],
      config,
      { client, dryRun: true, overwrite: true, silent: true },
    )
    expect(dryRun.plan.replacedItems).toEqual(['provider'])
    expect(dryRun.plan.conflicts).toEqual([])
    expect(dryRun.plan.files).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'update',
          target: 'src/design/setup/provider/provider.tsx',
        }),
      ]),
    )
    await expect(readFile(providerTarget, 'utf8')).resolves.toContain(
      'color-mode',
    )
    expect(await readInstalled(cwd)).toEqual(['provider'])

    await installRegistryItems(['provider-no-color-mode'], config, {
      client,
      overwrite: true,
      silent: true,
    })
    await expect(readFile(providerTarget, 'utf8')).resolves.toContain('plain')
    await expect(readFile(colorModeTarget, 'utf8')).resolves.toContain(
      'colorMode',
    )
    expect(await readInstalled(cwd)).toEqual(['provider-no-color-mode'])

    const backToColor = await installRegistryItems(['provider'], config, {
      client,
      overwrite: true,
      silent: true,
    })
    expect(backToColor.plan.replacedItems).toEqual(['provider-no-color-mode'])
    await expect(readFile(providerTarget, 'utf8')).resolves.toContain(
      'color-mode',
    )
    await expect(readFile(colorModeTarget, 'utf8')).resolves.toContain(
      'colorMode',
    )
    expect(await readInstalled(cwd)).toEqual(['provider'])
  })

  it('requires overwrite for an existing target and preserves unrelated files', async () => {
    const { cwd, config } = await project()
    const client = memoryClient(exclusiveProviderItems())
    const providerTarget = path.join(
      cwd,
      'src/design/setup/provider/provider.tsx',
    )
    const colorModeTarget = path.join(
      cwd,
      'src/design/setup/provider/color-mode.ts',
    )
    await installRegistryItems(['provider'], config, { client, silent: true })
    await writeFile(providerTarget, 'export const Provider = "mine"\n')

    const blocked = await createInstallPlan(
      ['provider-no-color-mode'],
      config,
      { client },
    )
    expect(blocked.replacedItems).toEqual(['provider'])
    expect(blocked.conflicts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'existing',
          target: 'src/design/setup/provider/provider.tsx',
        }),
      ]),
    )
    await expect(applyInstallPlan(blocked, config)).rejects.toThrow('exists')
    await expect(readFile(providerTarget, 'utf8')).resolves.toContain('mine')
    await expect(readFile(colorModeTarget, 'utf8')).resolves.toContain(
      'colorMode',
    )

    const forced = await createInstallPlan(['provider-no-color-mode'], config, {
      client,
      overwrite: true,
    })
    expect(forced.conflicts).toEqual([])
    await applyInstallPlan(forced, config)
    await expect(readFile(providerTarget, 'utf8')).resolves.toContain('plain')
    await expect(readFile(colorModeTarget, 'utf8')).resolves.toContain(
      'colorMode',
    )
  })

  it('rejects selecting multiple alternatives from the same metadata group', async () => {
    const { config } = await project()
    const client = memoryClient(exclusiveProviderItems())
    const plan = await createInstallPlan(
      ['provider', 'provider-no-color-mode'],
      config,
      { client },
    )
    expect(plan.conflicts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'exclusive-selection',
          target: 'provider',
        }),
      ]),
    )
  })
})

describe('diff and update', () => {
  it('preserves namespace provenance for later diff and update commands', async () => {
    const { cwd, config } = await project()
    config.registries = {
      '@acme': 'https://registry.acme.test/{name}.json',
    }
    let current = item('button', {
      files: [
        {
          path: 'ui/button.tsx',
          type: 'registry:ui',
          content: 'export const Button = 1\n',
        },
      ],
    })
    const references: string[] = []
    const client: RegistryClient = {
      async getIndex() {
        return []
      },
      async getItem(reference) {
        references.push(reference)
        expect(reference).toBe('https://registry.acme.test/button.json')
        return structuredClone(current)
      },
    }

    await installRegistryItems(['@acme/button'], config, {
      client,
      silent: true,
    })
    expect(await readInstalled(cwd)).toEqual(['@acme/button'])

    current = item('button', {
      files: [
        {
          path: 'ui/button.tsx',
          type: 'registry:ui',
          content: 'export const Button = 2\n',
        },
      ],
    })
    const diff = await diffRegistryItems([], config, { client })
    expect(diff.hasChanges).toBe(true)
    await updateRegistryItems([], config, { all: true, client })
    await expect(
      readFile(path.join(cwd, 'src/design-system/button.tsx'), 'utf8'),
    ).resolves.toContain('Button = 2')
    expect(references).toEqual([
      'https://registry.acme.test/button.json',
      'https://registry.acme.test/button.json',
      'https://registry.acme.test/button.json',
    ])
  })

  it('diffs current files and updates without deleting obsolete files', async () => {
    const { cwd, config } = await project()
    let current = item('badge', {
      version: '1.0.0',
      meta: { contentHash: 'v1' },
      files: [
        {
          path: 'ui/badge/badge.tsx',
          type: 'registry:ui',
          content: 'export const Badge = 1\n',
        },
      ],
    })
    const client: RegistryClient = {
      async getIndex() {
        return [current]
      },
      async getItem() {
        return structuredClone(current)
      },
    }
    await installRegistryItems(['badge'], config, { client, silent: true })
    const target = path.join(cwd, 'src/design-system/badge/badge.tsx')
    const initialConfig = await readFile(
      path.join(cwd, 'components.json'),
      'utf8',
    )

    current = item('badge', {
      version: '1.1.0',
      meta: { contentHash: 'v2' },
      files: [
        {
          path: 'ui/badge/badge.tsx',
          type: 'registry:ui',
          content: 'export const Badge = 2\n',
        },
      ],
    })
    const diff = await diffRegistryItems(['badge'], config, { client })
    expect(diff.hasChanges).toBe(true)
    expect(shouldFailDiffCheck(diff, true)).toBe(true)
    expect(shouldFailDiffCheck(diff, false)).toBe(false)
    expect(diff.items[0]).toMatchObject({
      name: 'badge',
      files: [{ status: 'update' }],
    })
    const dryRun = await updateRegistryItems([], config, {
      all: true,
      client,
      dryRun: true,
    })
    expect(dryRun.applied).toBe(false)
    expect(dryRun.plan.files).toMatchObject([{ action: 'update' }])
    await expect(readFile(target, 'utf8')).resolves.toContain('Badge = 1')
    await expect(
      readFile(path.join(cwd, 'components.json'), 'utf8'),
    ).resolves.toBe(initialConfig)

    await writeFile(target, 'export const Badge = "mine"\n')
    const modified = await diffRegistryItems(['badge'], config, { client })
    expect(modified.items[0]?.files).toMatchObject([{ status: 'update' }])

    await updateRegistryItems(['badge'], config, { client })
    await expect(readFile(target, 'utf8')).resolves.toContain('Badge = 2')
    expect(await readInstalled(cwd)).toEqual(['badge'])

    current = item('badge', {
      version: '2.0.0',
      meta: { contentHash: 'v3' },
      files: [],
    })
    const removal = await updateRegistryItems(['badge'], config, { client })
    expect(removal.plan.files).toEqual([])
    await expect(readFile(target, 'utf8')).resolves.toContain('Badge = 2')
  })

  it('installs new dependencies without deleting old dependency files', async () => {
    const { cwd, config } = await project()
    const upstream: Record<string, RegistryItem> = {
      old: item('old', {
        files: [
          {
            path: 'ui/old.tsx',
            type: 'registry:ui',
            content: 'export const dependency = "old"\n',
          },
        ],
      }),
      root: item('root', {
        registryDependencies: ['old'],
        files: [
          {
            path: 'ui/root.tsx',
            type: 'registry:ui',
            content: 'export const root = true\n',
          },
        ],
      }),
    }
    const client = memoryClient(upstream)
    await installRegistryItems(['root'], config, { client, silent: true })

    upstream.new = item('new', {
      files: [
        {
          path: 'ui/new.tsx',
          type: 'registry:ui',
          content: 'export const dependency = "new"\n',
        },
      ],
    })
    upstream.root = item('root', {
      registryDependencies: ['new'],
      files: [
        {
          path: 'ui/root.tsx',
          type: 'registry:ui',
          content: 'export const root = true\n',
        },
      ],
    })
    delete upstream.old

    const diff = await diffRegistryItems([], config, { client })
    expect(diff.plan.requestedItems).toEqual(['root'])
    expect(diff.items.map((entry) => entry.name)).toEqual(['new', 'root'])

    const updated = await updateRegistryItems([], config, {
      all: true,
      client,
    })
    expect(updated.plan.requestedItems).toEqual(['root'])
    await expect(
      readFile(path.join(cwd, 'src/design-system/old.tsx'), 'utf8'),
    ).resolves.toContain('"old"')
    await expect(
      readFile(path.join(cwd, 'src/design-system/new.tsx'), 'utf8'),
    ).resolves.toContain('"new"')
    expect(await readInstalled(cwd)).toEqual(['root'])
  })

  it('leaves unreachable local files untouched', async () => {
    const { cwd, config } = await project()
    const upstream: Record<string, RegistryItem> = {
      dependency: item('dependency', {
        files: [
          {
            path: 'ui/dependency.tsx',
            type: 'registry:ui',
            content: 'export const dependency = 1\n',
          },
        ],
      }),
      root: item('root', { registryDependencies: ['dependency'] }),
    }
    const client = memoryClient(upstream)
    await installRegistryItems(['root'], config, { client, silent: true })
    const dependencyTarget = path.join(cwd, 'src/design-system/dependency.tsx')
    await writeFile(dependencyTarget, 'export const dependency = "mine"\n')
    upstream.root = item('root')

    const update = await updateRegistryItems([], config, { all: true, client })
    await expect(readFile(dependencyTarget, 'utf8')).resolves.toContain('mine')
  })

  it('does not promote or fetch stale transitive items as update roots', async () => {
    const { config } = await project()
    const upstream: Record<string, RegistryItem> = {
      dependency: item('dependency'),
      root: item('root', { registryDependencies: ['dependency'] }),
    }
    const client = memoryClient(upstream)
    await installRegistryItems(['root'], config, { client, silent: true })
    delete upstream.dependency

    await expect(
      updateRegistryItems([], config, { all: true, client }),
    ).rejects.toThrow(
      'Registry dependency "dependency" required by "root" could not be resolved upstream',
    )
    await expect(diffRegistryItems([], config, { client })).rejects.toThrow(
      'Registry dependency "dependency" required by "root" could not be resolved upstream',
    )
    expect(await readInstalled(config.resolvedPaths.cwd)).toEqual(['root'])
  })

  it('reports a missing requested root without changing config or files', async () => {
    const { cwd, config } = await project()
    const upstream: Record<string, RegistryItem> = {
      root: item('root', {
        files: [
          {
            path: 'ui/root.tsx',
            type: 'registry:ui',
            content: 'export const root = 1\n',
          },
        ],
      }),
    }
    const client = memoryClient(upstream)
    await installRegistryItems(['root'], config, { client, silent: true })
    const configBefore = await readFile(
      path.join(cwd, 'components.json'),
      'utf8',
    )
    delete upstream.root

    await expect(
      updateRegistryItems([], config, { all: true, client }),
    ).rejects.toThrow(
      'Requested registry item "root" could not be resolved upstream',
    )
    await expect(diffRegistryItems([], config, { client })).rejects.toThrow(
      'Requested registry item "root" could not be resolved upstream',
    )
    await expect(
      readFile(path.join(cwd, 'components.json'), 'utf8'),
    ).resolves.toBe(configBefore)
    await expect(
      readFile(path.join(cwd, 'src/design-system/root.tsx'), 'utf8'),
    ).resolves.toContain('root = 1')
  })

  it('ignores dependency-only changes when installed files are unchanged', async () => {
    const { config } = await project()
    let current = item('root', {
      dependencies: ['react@^19'],
      files: [
        {
          path: 'ui/root.tsx',
          type: 'registry:ui',
          content: 'export const root = true\n',
        },
      ],
    })
    const client: RegistryClient = {
      async getIndex() {
        return [current]
      },
      async getItem() {
        return structuredClone(current)
      },
    }
    await installRegistryItems(['root'], config, {
      client,
      dependencyInstaller: async () => undefined,
      silent: true,
    })
    current = item('root', {
      dependencies: ['react@^20'],
      files: current.files,
    })

    const diff = await diffRegistryItems([], config, { client })
    expect(diff.hasChanges).toBe(false)
    expect(diff.items).toContainEqual({
      name: 'root',
      files: [expect.objectContaining({ status: 'unchanged' })],
    })
  })
})

describe('install payload integrity', () => {
  it('accepts the compiler canonical hash across files and dependency metadata', async () => {
    const { config } = await project()
    const integrity = item('integrity', {
      dependencies: ['z', 'a', 'z'],
      devDependencies: ['types'],
      registryDependencies: ['dep'],
      meta: {
        compiler: { client: true },
        contentHash:
          'e060374e35cc6d805259612b1a761b35aa454ab9110ace4cbd2071a92f519d91',
      },
      files: [
        {
          path: 'ui/integrity.ts',
          type: 'registry:ui',
          content: 'x\r\n',
        },
      ],
    })
    const plan = await createInstallPlan(['integrity'], config, {
      client: memoryClient({ dep: item('dep'), integrity }),
    })
    expect(
      plan.items.find(({ name }) => name === 'integrity')?.contentHash,
    ).toBe('e060374e35cc6d805259612b1a761b35aa454ab9110ace4cbd2071a92f519d91')
  })

  it.each([
    {
      label: 'contentless',
      payload: item('broken', {
        files: [{ path: 'ui/broken.tsx', type: 'registry:ui' }],
      }),
      message: 'content',
    },
    {
      label: 'non-installable file',
      payload: item('broken', {
        files: [
          {
            path: 'examples/broken.tsx',
            type: 'registry:example',
            content: 'export default null\n',
          },
        ],
      }),
      message: 'type',
    },
    {
      label: 'non-installable item',
      payload: item('broken', { type: 'registry:example' }),
      message: 'type',
    },
  ])(
    'rejects a $label payload without silently skipping it',
    async ({ payload, message }) => {
      const { config } = await project()
      await expect(
        createInstallPlan(['broken'], config, {
          client: memoryClient({ broken: payload }),
        }),
      ).rejects.toThrow(message)
    },
  )

  it('rejects malformed and mismatched declared SHA-256 hashes', async () => {
    const { config } = await project()
    const malformed = item('malformed')
    malformed.meta = { contentHash: 'NOT-A-SHA' }
    await expect(
      createInstallPlan(['malformed'], config, {
        client: memoryClient({ malformed }),
      }),
    ).rejects.toThrow('invalid content hash')

    const mismatch = item('mismatch')
    mismatch.meta = { contentHash: '0'.repeat(64) }
    await expect(
      createInstallPlan(['mismatch'], config, {
        client: memoryClient({ mismatch }),
      }),
    ).rejects.toThrow('integrity check')
  })

  it.each([
    {
      label: 'an incompatible runtime version',
      manifest: { dependencies: { react: '^18' } },
      itemOptions: { dependencies: ['react@^19'] },
      message: 'package.json declares "^18"',
    },
    {
      label: 'an existing development classification',
      manifest: { devDependencies: { react: '^19' } },
      itemOptions: { dependencies: ['react@^19'] },
      message: 'already declared in devDependencies',
    },
    {
      label: 'an existing runtime classification',
      manifest: { dependencies: { react: '^19' } },
      itemOptions: { devDependencies: ['react@^19'] },
      message: 'already declared in dependencies',
    },
  ])(
    'rejects $label before package or file mutation',
    async ({ manifest, itemOptions, message }) => {
      const { cwd, config } = await project()
      const packageJson = `${JSON.stringify({ private: true, ...manifest }, null, 2)}\n`
      await writeFile(path.join(cwd, 'package.json'), packageJson)
      const payload = item('component', {
        ...itemOptions,
        files: [
          {
            path: 'ui/component.tsx',
            type: 'registry:ui',
            content: 'export const component = true\n',
          },
        ],
      })
      const dependencyInstaller = vi.fn(async () => undefined)

      await expect(
        installRegistryItems(['component'], config, {
          client: memoryClient({ component: payload }),
          dependencyInstaller,
          silent: true,
        }),
      ).rejects.toThrow(message)
      expect(dependencyInstaller).not.toHaveBeenCalled()
      await expect(
        readFile(path.join(cwd, 'package.json'), 'utf8'),
      ).resolves.toBe(packageJson)
      await expect(
        readFile(path.join(cwd, 'src/design-system/component.tsx'), 'utf8'),
      ).rejects.toThrow()
      await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
    },
  )

  it('treats compatible existing package declarations as satisfied', async () => {
    const { cwd, config } = await project()
    await writeFile(
      path.join(cwd, 'package.json'),
      JSON.stringify({ dependencies: { react: '^19' } }),
    )
    const payload = item('component', { dependencies: ['react@^19'] })
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    expect(plan.conflicts).toEqual([])
    expect(plan.dependencies).toEqual([])
  })

  it('pins bare supported registry dependencies to centralized ranges', async () => {
    const { config } = await project()
    const payload = item('component', {
      dependencies: [
        '@chakra-ui/react',
        '@emotion/react',
        '@saas-ui/chakra-preset',
        'next-themes',
      ],
    })

    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })

    expect(plan.conflicts).toEqual([])
    expect(plan.dependencies).toEqual([
      '@chakra-ui/react@^3.28.0',
      '@emotion/react@^11.0.0',
      `@saas-ui/chakra-preset@${SUPPORTED_PRESET_VERSION}`,
      'next-themes@^0.4.6',
    ])
    expect(plan.dependencies).not.toContain('@chakra-ui/react')
    expect(plan.dependencies).not.toContain('@emotion/react')
    expect(plan.dependencies).not.toContain('@saas-ui/chakra-preset')
    expect(plan.dependencies).not.toContain('next-themes')
  })

  it('canonicalizes compatible explicit specs for supported packages', async () => {
    const { config } = await project()
    const payload = item('component', {
      dependencies: [
        '@chakra-ui/react@~3.28.1',
        '@emotion/react@11.13.0',
        '@saas-ui/chakra-preset@^3.0.0',
        'next-themes@~0.4.6',
      ],
    })

    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })

    expect(plan.conflicts).toEqual([])
    expect(plan.dependencies).toEqual([
      '@chakra-ui/react@^3.28.0',
      '@emotion/react@^11.0.0',
      `@saas-ui/chakra-preset@${SUPPORTED_PRESET_VERSION}`,
      'next-themes@^0.4.6',
    ])
  })

  it.each([
    {
      label: 'optionalDependencies',
      manifest: {
        optionalDependencies: { '@chakra-ui/react': '^3.28.0' },
      },
    },
    {
      label: 'peerDependencies',
      manifest: { peerDependencies: { '@chakra-ui/react': '^3.28.0' } },
    },
    {
      label: 'multiple sections',
      manifest: {
        dependencies: { '@chakra-ui/react': '^3.28.0' },
        peerDependencies: { '@chakra-ui/react': '^3.28.0' },
      },
    },
    {
      label: 'a malformed optional dependency section',
      manifest: { optionalDependencies: { '@chakra-ui/react': 3 } },
    },
  ])(
    'fails closed on a supported package declared in $label',
    async ({ manifest }) => {
      const { cwd, config } = await project()
      const packageJson = `${JSON.stringify({ private: true, ...manifest }, null, 2)}\n`
      await writeFile(path.join(cwd, 'package.json'), packageJson)
      const payload = item('component', {
        dependencies: ['@chakra-ui/react'],
        files: [
          {
            path: 'ui/component.tsx',
            type: 'registry:ui',
            content: 'export const component = true\n',
          },
        ],
      })
      const dependencyInstaller = vi.fn(async () => undefined)

      await expect(
        installRegistryItems(['component'], config, {
          client: memoryClient({ component: payload }),
          dependencyInstaller,
          silent: true,
        }),
      ).rejects.toThrow(
        /dependency sections|already declared in|non-string package.json/,
      )
      expect(dependencyInstaller).not.toHaveBeenCalled()
      await expect(
        readFile(path.join(cwd, 'package.json'), 'utf8'),
      ).resolves.toBe(packageJson)
      await expect(
        readFile(path.join(cwd, 'src/design-system/component.tsx'), 'utf8'),
      ).rejects.toThrow()
      await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
    },
  )

  it('validates workspace protocol packages against their local version', async () => {
    const { cwd, config } = await project()
    const preset = path.join(cwd, 'packages/chakra-preset')
    await mkdir(preset, { recursive: true })
    await writeFile(
      path.join(cwd, 'pnpm-workspace.yaml'),
      'packages:\n  - packages/*\n',
    )
    await writeFile(
      path.join(preset, 'package.json'),
      JSON.stringify({
        name: '@saas-ui/chakra-preset',
        version: SUPPORTED_PRESET_VERSION,
      }),
    )
    await writeFile(
      path.join(cwd, 'package.json'),
      JSON.stringify({
        private: true,
        dependencies: { '@saas-ui/chakra-preset': 'workspace:*' },
      }),
    )
    const payload = item('component', {
      dependencies: ['@saas-ui/chakra-preset'],
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = true\n',
        },
      ],
    })

    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    expect(plan.conflicts).toEqual([])
    expect(plan.dependencies).toEqual([])

    await writeFile(
      path.join(preset, 'package.json'),
      JSON.stringify({
        name: '@saas-ui/chakra-preset',
        version: '3.0.0-beta.2',
      }),
    )
    const incompatible = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    expect(incompatible.conflicts).toContainEqual(
      expect.objectContaining({
        kind: 'dependency-version',
        target: '@saas-ui/chakra-preset',
      }),
    )
    const packagePath = path.join(cwd, 'package.json')
    const packageJson = await readFile(packagePath, 'utf8')
    const dependencyInstaller = vi.fn(async () => undefined)
    await expect(
      installRegistryItems(['component'], config, {
        client: memoryClient({ component: payload }),
        dependencyInstaller,
        silent: true,
      }),
    ).rejects.toThrow('incompatible specifier')
    expect(dependencyInstaller).not.toHaveBeenCalled()
    await expect(readFile(packagePath, 'utf8')).resolves.toBe(packageJson)
    await expect(
      readFile(path.join(cwd, 'src/design-system/component.tsx'), 'utf8'),
    ).rejects.toThrow()
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  })

  it('rejects an incompatible supported spec before any mutation', async () => {
    const { cwd, config } = await project()
    const packagePath = path.join(cwd, 'package.json')
    const packageJson = '{"private":true}\n'
    await writeFile(packagePath, packageJson)
    const payload = item('component', {
      dependencies: ['@chakra-ui/react@^2.10.0'],
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = true\n',
        },
      ],
    })
    const dependencyInstaller = vi.fn(async () => undefined)
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })

    expect(plan.dependencies).toEqual([])
    expect(plan.conflicts).toContainEqual(
      expect.objectContaining({
        kind: 'dependency-version',
        target: '@chakra-ui/react',
      }),
    )
    await expect(
      applyInstallPlan(plan, config, { dependencyInstaller }),
    ).rejects.toThrow('requires @chakra-ui/react@^3.28.0')
    expect(dependencyInstaller).not.toHaveBeenCalled()
    await expect(readFile(packagePath, 'utf8')).resolves.toBe(packageJson)
    await expect(
      readFile(path.join(cwd, 'src/design-system/component.tsx'), 'utf8'),
    ).rejects.toThrow()
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  })
})

describe('install transaction integrity', () => {
  it('rejects a target CAS race after dependency installation', async () => {
    const { cwd, config } = await project()
    const payload = item('component', {
      dependencies: ['react'],
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = "registry"\n',
        },
      ],
    })
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    const target = path.join(cwd, 'src/design-system/component.tsx')
    await expect(
      applyInstallPlan(plan, config, {
        dependencyInstaller: async () => {
          await mkdir(path.dirname(target), { recursive: true })
          await writeFile(target, 'export const component = "racer"\n')
        },
      }),
    ).rejects.toThrow('changed after planning')
    await expect(readFile(target, 'utf8')).resolves.toContain('racer')
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  })

  it('commits prepared project config files with registry files', async () => {
    const { cwd, config } = await project()
    const payload = item('component', {
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = true\n',
        },
      ],
    })
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    const tsconfig = path.join(cwd, 'tsconfig.json')
    const components = path.join(cwd, 'components.json')
    await writeFile(tsconfig, '{"compilerOptions":{}}\n')
    const stagedProjectFiles = await Promise.all([
      prepareStagedProjectFile(
        cwd,
        tsconfig,
        '{"compilerOptions":{"strict":true}}\n',
      ),
      prepareStagedProjectFile(cwd, components, '{"style":"default"}\n'),
    ])

    const result = await applyInstallPlan(plan, config, { stagedProjectFiles })
    expect(result.projectFiles).toMatchObject([
      { target: 'tsconfig.json', action: 'update' },
      { target: 'components.json', action: 'create' },
    ])
    await expect(readFile(tsconfig, 'utf8')).resolves.toContain('strict')
    await expect(readFile(components, 'utf8')).resolves.toContain('default')
    await expect(
      readFile(path.join(cwd, 'src/design-system/component.tsx'), 'utf8'),
    ).resolves.toContain('component = true')
  })

  it('rejects project-file collisions and symbolic-link targets', async () => {
    const { cwd, config } = await project()
    const payload = item('component', {
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = true\n',
        },
      ],
    })
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    const registryTarget = path.join(cwd, 'src/design-system/component.tsx')
    const collision = await prepareStagedProjectFile(
      cwd,
      registryTarget,
      'project-owned\n',
    )
    await expect(
      applyInstallPlan(plan, config, {
        stagedProjectFiles: [collision],
      }),
    ).rejects.toThrow('collides with registry item')

    const outside = path.join(cwd, 'outside.json')
    const linked = path.join(cwd, 'components.json')
    await writeFile(outside, '{}\n')
    await symlink(outside, linked)
    await expect(
      applyInstallPlan(plan, config, {
        stagedProjectFiles: [
          {
            absoluteTarget: linked,
            content: '{"style":"default"}\n',
            expected: { exists: false },
          },
        ],
      }),
    ).rejects.toThrow('symbolic link')
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  })

  it('detects project-file TOCTOU changes after dependency installation', async () => {
    const { cwd, config } = await project()
    const payload = item('component', {
      dependencies: ['react'],
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = true\n',
        },
      ],
    })
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    const components = path.join(cwd, 'components.json')
    await writeFile(components, '{"style":"old"}\n')
    const staged = await prepareStagedProjectFile(
      cwd,
      components,
      '{"style":"default"}\n',
    )

    await expect(
      applyInstallPlan(plan, config, {
        stagedProjectFiles: [staged],
        dependencyInstaller: async () => {
          await writeFile(components, '{"style":"racer"}\n')
        },
      }),
    ).rejects.toThrow('changed after planning')
    await expect(readFile(components, 'utf8')).resolves.toContain('racer')
    await expect(
      readFile(path.join(cwd, 'src/design-system/component.tsx'), 'utf8'),
    ).rejects.toThrow()
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  })

  it('rolls project and registry files back together on commit failure', async () => {
    const { cwd, config } = await project()
    const payload = item('component', {
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = true\n',
        },
      ],
    })
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    const tsconfig = path.join(cwd, 'tsconfig.json')
    const components = path.join(cwd, 'components.json')
    await writeFile(tsconfig, '{"compilerOptions":{}}\n')
    const stagedProjectFiles = await Promise.all([
      prepareStagedProjectFile(
        cwd,
        tsconfig,
        '{"compilerOptions":{"strict":true}}\n',
      ),
      prepareStagedProjectFile(cwd, components, '{"style":"default"}\n'),
    ])

    await expect(
      applyInstallPlan(plan, config, {
        stagedProjectFiles,
        transaction: {
          onPhase(phase) {
            if (phase === 'files-committed') throw new Error('commit fault')
          },
        },
      }),
    ).rejects.toThrow('commit fault')
    await expect(readFile(tsconfig, 'utf8')).resolves.toBe(
      '{"compilerOptions":{}}\n',
    )
    await expect(readFile(components, 'utf8')).rejects.toThrow()
    await expect(
      readFile(path.join(cwd, 'src/design-system/component.tsx'), 'utf8'),
    ).rejects.toThrow()
  })

  it('serializes concurrent writers and makes a stale plan fail CAS', async () => {
    const { config } = await project()
    const payload = item('component', {
      dependencies: ['react'],
      files: [
        {
          path: 'ui/component.tsx',
          type: 'registry:ui',
          content: 'export const component = true\n',
        },
      ],
    })
    const client = memoryClient({ component: payload })
    const firstPlan = await createInstallPlan(['component'], config, { client })
    const secondPlan = await createInstallPlan(['component'], config, {
      client,
    })
    let unblockFirst!: () => void
    const firstBlocked = new Promise<void>((resolve) => {
      unblockFirst = resolve
    })
    let firstStarted!: () => void
    const started = new Promise<void>((resolve) => {
      firstStarted = resolve
    })
    let secondLocked = false
    const first = applyInstallPlan(firstPlan, config, {
      dependencyInstaller: async () => {
        firstStarted()
        await firstBlocked
      },
    })
    await started
    const secondInstaller = vi.fn(async () => undefined)
    const second = applyInstallPlan(secondPlan, config, {
      dependencyInstaller: secondInstaller,
      transaction: {
        lockTimeoutMs: 2_000,
        onPhase(phase) {
          if (phase === 'locked') secondLocked = true
        },
      },
    })
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(secondLocked).toBe(false)
    unblockFirst()
    await first
    await expect(second).rejects.toThrow('changed after planning')
    expect(secondLocked).toBe(true)
    expect(secondInstaller).not.toHaveBeenCalled()
  })

  it('recovers a bounded stale project writer lock', async () => {
    const { cwd, config } = await project()
    const payload = item('component')
    const plan = await createInstallPlan(['component'], config, {
      client: memoryClient({ component: payload }),
    })
    const metadata = path.join(cwd, '.saas-ui')
    const writerLock = path.join(metadata, 'install.lock')
    await mkdir(metadata, { recursive: true })
    await writeFile(writerLock, 'stale-owner\n')
    const old = new Date(0)
    await utimes(writerLock, old, old)

    await applyInstallPlan(plan, config, {
      transaction: {
        lockTimeoutMs: 500,
        lockPollMs: 5,
        staleLockMs: 1,
      },
    })
    await expect(readFile(writerLock, 'utf8')).rejects.toThrow()
  })
})

describe('graph failures', () => {
  it('detects cycles and preserves source identity for duplicate names', async () => {
    const cycle = memoryClient({
      a: item('a', { registryDependencies: ['b'] }),
      b: item('b', { registryDependencies: ['a'] }),
    })
    await expect(resolveRegistryGraph(['a'], 'default', cycle)).rejects.toThrow(
      'a -> b -> a',
    )

    const duplicate = createRegistryClient(async (resource) => {
      if (resource === 'index.json') return []
      return item('duplicate')
    })
    const graph = await resolveRegistryGraph(
      ['https://one.example/item.json', 'https://two.example/item.json'],
      'default',
      duplicate,
    )
    expect(graph.items.map((entry) => entry.name)).toEqual([
      'duplicate',
      'duplicate',
    ])
    expect(graph.itemReferences).toEqual([
      'https://one.example/item.json',
      'https://two.example/item.json',
    ])
  })

  it('produces the same dependency order regardless of root order', async () => {
    const client = memoryClient({
      base: item('base'),
      alpha: item('alpha', { registryDependencies: ['base'] }),
      beta: item('beta', { registryDependencies: ['base'] }),
    })
    const first = await resolveRegistryGraph(
      ['beta', 'alpha'],
      'default',
      client,
    )
    const second = await resolveRegistryGraph(
      ['alpha', 'beta'],
      'default',
      client,
    )
    expect(first.items.map(({ name }) => name)).toEqual([
      'base',
      'alpha',
      'beta',
    ])
    expect(second.items.map(({ name }) => name)).toEqual(
      first.items.map(({ name }) => name),
    )
  })
})

describe('package dependency preflight', () => {
  it.each([
    {
      name: 'collapses duplicates and lets one explicit spec win',
      runtime: ['react', 'react@^19', 'react@^19'],
      development: [],
      dependencies: ['react@^19'],
      devDependencies: [],
      issues: [],
    },
    {
      name: 'parses scoped package specs',
      runtime: ['@scope/pkg', '@scope/pkg@~1.2'],
      development: [],
      dependencies: ['@scope/pkg@~1.2'],
      devDependencies: [],
      issues: [],
    },
    {
      name: 'rejects a scoped package selector containing a slash',
      runtime: ['@scope/pkg@x/y'],
      development: [],
      dependencies: [],
      devDependencies: [],
      issues: ['dependency-version:@scope/pkg'],
    },
    {
      name: 'sorts distinct packages deterministically',
      runtime: ['zeta', '@scope/pkg@^1', 'alpha'],
      development: ['types-z', '@types/react@^19'],
      dependencies: ['@scope/pkg@^1', 'alpha', 'zeta'],
      devDependencies: ['@types/react@^19', 'types-z'],
      issues: [],
    },
    {
      name: 'rejects competing unscoped explicit specs',
      runtime: ['react@18', 'react@19', 'react'],
      development: [],
      dependencies: ['react@18'],
      devDependencies: [],
      issues: ['dependency-version:react'],
    },
    {
      name: 'rejects competing scoped explicit specs',
      runtime: ['@scope/pkg@^1', '@scope/pkg@^2'],
      development: [],
      dependencies: ['@scope/pkg@^1'],
      devDependencies: [],
      issues: ['dependency-version:@scope/pkg'],
    },
    {
      name: 'rejects runtime and development classification overlap',
      runtime: ['@scope/pkg@^1'],
      development: ['@scope/pkg', '@scope/pkg@^1'],
      dependencies: ['@scope/pkg@^1'],
      devDependencies: [],
      issues: ['dependency-classification:@scope/pkg'],
    },
  ])(
    '$name',
    ({ runtime, development, dependencies, devDependencies, issues }) => {
      const result = reconcilePackageDependencies(runtime, development)
      expect(result.dependencies).toEqual(dependencies)
      expect(result.devDependencies).toEqual(devDependencies)
      expect(
        result.issues.map((issue) => `${issue.kind}:${issue.name}`),
      ).toEqual(issues)
    },
  )

  it('surfaces dependency conflicts in the plan before any mutation', async () => {
    const { cwd, config } = await project()
    const client = memoryClient({
      component: item('component', {
        dependencies: ['react@18'],
        devDependencies: ['@scope/pkg'],
        files: [
          {
            path: 'ui/component.ts',
            type: 'registry:ui',
            content: 'export const Component = true\n',
          },
        ],
      }),
    })
    const installer = vi.fn(async () => undefined)
    const plan = await createInstallPlan(['component'], config, {
      client,
      dependencies: ['react@19', '@scope/pkg@^1'],
    })
    expect(plan.dependencies).toEqual(['@scope/pkg@^1', 'react@18'])
    expect(plan.devDependencies).toEqual([])
    expect(plan.conflicts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'dependency-version',
          target: 'react',
        }),
        expect.objectContaining({
          kind: 'dependency-classification',
          target: '@scope/pkg',
        }),
      ]),
    )
    await expect(
      applyInstallPlan(plan, config, { dependencyInstaller: installer }),
    ).rejects.toThrow('Conflicting explicit dependency specs')
    expect(installer).not.toHaveBeenCalled()
    await expect(
      readFile(path.join(cwd, 'src/design-system/component.ts'), 'utf8'),
    ).rejects.toThrow()
    await expect(readFile(getRegistryLockPath(cwd), 'utf8')).rejects.toThrow()
  })
})

describe('lock hashes', () => {
  it('uses sha256 content hashes', () => {
    expect(hashContent('saas-ui')).toBe(
      '07339a8919980a1e75adc347939851de00f4e03ee50b392561337937b29a6cc0',
    )
  })
})
