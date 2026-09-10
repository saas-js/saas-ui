import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  COLOR_MODE_DEPENDENCY,
  INIT_DEPENDENCIES,
  type InitAdapters,
  InitConflictError,
  type InitOptions,
  InitUnsupportedSystemError,
  runInitWithResult,
} from '../../src/commands/init/impl'
import {
  type CreateInstallPlanOptions,
  type InstallPlan,
  applyInstallPlan,
} from '../../src/utils/install-plan'
import { SUPPORTED_PRESET_VERSION } from '../../src/utils/package-compatibility'
import type { RegistryClient } from '../../src/utils/registry/client'
import type { RegistryItem } from '../../src/utils/registry/schema'

const temporaryDirectories: string[] = []

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      fs.rm(directory, {
        force: true,
        recursive: true,
      }),
    ),
  )
})

async function createProject(
  options: {
    src?: boolean
    config?: Record<string, unknown>
  } = {},
) {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'saas-ui-init-'))
  temporaryDirectories.push(cwd)
  await fs.writeFile(
    path.join(cwd, 'package.json'),
    JSON.stringify({
      private: true,
      dependencies: {
        react: '^19.0.0',
      },
    }),
  )
  await fs.writeFile(
    path.join(cwd, 'tsconfig.json'),
    `${JSON.stringify({ compilerOptions: {} }, null, 2)}\n`,
  )
  if (options.src) {
    await fs.mkdir(path.join(cwd, 'src'), { recursive: true })
  }
  if (options.config) {
    await fs.writeFile(
      path.join(cwd, 'components.json'),
      `${JSON.stringify(options.config, null, 2)}\n`,
    )
  }
  return cwd
}

async function readInstalled(cwd: string): Promise<string[]> {
  const config = JSON.parse(
    await fs.readFile(path.join(cwd, 'components.json'), 'utf8'),
  ) as { installed?: string[] }
  return config.installed ?? []
}

function createEmptyPlan(
  requested: readonly string[],
  style: string,
  options: CreateInstallPlanOptions,
): InstallPlan {
  return {
    schemaVersion: 1,
    style,
    mode: 'add',
    requestedItems: [...requested],
    transitiveItems: [],
    replacedItems: [],
    items: [],
    dependencies: [...(options.dependencies ?? [])],
    devDependencies: [],
    conflicts: [],
    files: [],
    docs: [],
  }
}

function createAdapters() {
  const calls: Array<{
    requested: string[]
    options: CreateInstallPlanOptions
  }> = []
  const apply = vi.fn(
    async (...args: Parameters<typeof applyInstallPlan>): Promise<never> => {
      const applyOptions = args[2] ?? {}
      for (const file of applyOptions.stagedProjectFiles ?? []) {
        await fs.mkdir(path.dirname(file.absoluteTarget), { recursive: true })
        await fs.writeFile(file.absoluteTarget, file.content, 'utf8')
      }
      return undefined as never
    },
  )
  const adapters: InitAdapters = {
    prompt: vi.fn(async () => {
      throw new Error('A noninteractive init must not prompt.')
    }) as never,
    createInstallPlan: async (requested, config, options) => {
      calls.push({ requested: [...requested], options })
      return createEmptyPlan(requested, config.style, options)
    },
    applyInstallPlan: apply,
  }
  return { adapters, apply, calls }
}

function createRegistryClient(items: RegistryItem[]): RegistryClient {
  const byName = new Map(items.map((item) => [item.name, item]))
  return {
    async getIndex() {
      return items
    },
    async getItem(reference) {
      const item = byName.get(reference)
      if (!item) throw new Error(`Unknown test registry item: ${reference}`)
      return item
    },
  }
}

function createCanonicalSetupClient() {
  return createRegistryClient([
    {
      schemaVersion: 1,
      name: 'use-link',
      type: 'registry:lib',
      dependencies: ['@chakra-ui/react'],
      files: [
        {
          path: 'lib/use-link/use-link.tsx',
          type: 'registry:lib',
          content: 'export const LinkProvider = "link-provider"\n',
        },
      ],
    },
    {
      schemaVersion: 1,
      name: 'color-mode',
      type: 'registry:setup',
      dependencies: ['@chakra-ui/react', 'next-themes'],
      files: [
        {
          path: 'setup/color-mode/color-mode.tsx',
          target: 'components/setup/color-mode/color-mode.tsx',
          type: 'registry:setup',
          content: 'export const ColorModeProvider = "color-mode"\n',
        },
      ],
    },
    {
      schemaVersion: 1,
      name: 'provider',
      type: 'registry:setup',
      dependencies: ['@chakra-ui/react', '@saas-ui/chakra-preset'],
      registryDependencies: ['color-mode', 'use-link'],
      meta: {
        exclusiveGroup: 'provider',
        conflicts: ['provider-no-color-mode'],
      },
      files: [
        {
          path: 'setup/provider/provider.tsx',
          target: 'components/setup/provider/provider.tsx',
          type: 'registry:setup',
          content: 'export const Provider = "provider-with-color-mode"\n',
        },
      ],
    },
    {
      schemaVersion: 1,
      name: 'provider-no-color-mode',
      type: 'registry:setup',
      dependencies: ['@chakra-ui/react', '@saas-ui/chakra-preset'],
      registryDependencies: ['use-link'],
      meta: {
        exclusiveGroup: 'provider',
        conflicts: ['provider'],
      },
      files: [
        {
          path: 'setup/provider-no-color-mode/provider-no-color-mode.tsx',
          target: 'components/setup/provider/provider.tsx',
          type: 'registry:setup',
          content: 'export const Provider = "provider-without-color-mode"\n',
        },
      ],
    },
  ])
}

function options(
  cwd: string,
  overrides: Partial<InitOptions> = {},
): InitOptions {
  return {
    cwd,
    yes: true,
    defaults: true,
    force: false,
    silent: true,
    ...overrides,
  }
}

describe('saas-ui init', () => {
  it('creates the default config and requests the color-mode provider noninteractively', async () => {
    const cwd = await createProject({ src: true })
    const { adapters, apply, calls } = createAdapters()
    const dependencyInstaller = vi.fn(async () => {})
    adapters.dependencyInstaller = dependencyInstaller

    const result = await runInitWithResult(options(cwd), adapters)

    expect(result?.components).toEqual(['provider'])
    expect(result?.dependencies).toEqual([
      ...INIT_DEPENDENCIES,
      COLOR_MODE_DEPENDENCY,
    ])
    expect(calls).toHaveLength(1)
    expect(calls[0]?.options.dependencies).toEqual(result?.dependencies)
    expect(calls[0]?.options.client).toBeUndefined()
    expect(apply).toHaveBeenCalledWith(
      expect.any(Object),
      result?.config,
      expect.objectContaining({ dependencyInstaller, silent: true }),
    )
    expect(
      apply.mock.calls[0]?.[2]?.stagedProjectFiles?.map((file) =>
        path.basename(file.absoluteTarget),
      ),
    ).toEqual(['tsconfig.json', 'components.json'])
    expect(
      JSON.parse(await fs.readFile(path.join(cwd, 'components.json'), 'utf8')),
    ).toMatchObject({
      system: 'chakra',
      style: 'default',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
    })
  })

  it('omits color-mode and next-themes when color mode is off', async () => {
    const cwd = await createProject()
    const { adapters, calls } = createAdapters()

    const result = await runInitWithResult(
      options(cwd, { colorMode: 'off' }),
      adapters,
    )

    expect(result?.components).toEqual(['provider-no-color-mode'])
    expect(result?.dependencies).toEqual([...INIT_DEPENDENCIES])
    expect(calls[0]?.requested).toEqual(['provider-no-color-mode'])
    expect(calls[0]?.requested).not.toEqual(
      expect.arrayContaining(['provider', 'color-mode']),
    )
    expect(calls[0]?.options.dependencies).not.toContain(COLOR_MODE_DEPENDENCY)
  })

  it.each([
    {
      colorMode: 'on' as const,
      requested: 'provider',
      transitive: ['color-mode', 'use-link'],
      dependency: COLOR_MODE_DEPENDENCY,
    },
    {
      colorMode: 'off' as const,
      requested: 'provider-no-color-mode',
      transitive: ['use-link'],
      dependency: null,
    },
  ])(
    'installs the exact canonical setup graph for color-mode=$colorMode',
    async ({ colorMode, requested, transitive, dependency }) => {
      const cwd = await createProject({ src: true })
      const dependencyInstaller = vi.fn(async () => {})

      const result = await runInitWithResult(
        options(cwd, {
          colorMode,
          componentsAlias: '@/widgets',
        }),
        {
          dependencyInstaller,
          registryClient: createCanonicalSetupClient(),
        },
      )

      expect(result?.plan.requestedItems).toEqual([requested])
      expect(result?.plan.transitiveItems).toEqual(transitive)
      expect(result?.plan.dependencies).toEqual(
        [...INIT_DEPENDENCIES, ...(dependency ? [dependency] : [])].sort(),
      )
      expect(result?.plan.files).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            action: 'create',
            target: 'src/widgets/setup/provider/provider.tsx',
          }),
        ]),
      )
      expect(dependencyInstaller).toHaveBeenCalledWith({
        cwd,
        dependencies: result?.plan.dependencies,
        devDependencies: [],
      })

      if (colorMode === 'off') {
        expect(result?.plan.requestedItems).not.toEqual(
          expect.arrayContaining(['provider', 'color-mode']),
        )
        expect(result?.plan.transitiveItems).not.toContain('color-mode')
        expect(result?.plan.dependencies).not.toContain(COLOR_MODE_DEPENDENCY)
      }
    },
  )

  it('adds every distinct local alias prefix without replacing authoritative mappings', async () => {
    const cwd = await createProject()
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      `${JSON.stringify(
        {
          compilerOptions: {
            baseUrl: '.',
            paths: {
              '@/*': ['./resources/js/*'],
              'unrelated/*': ['./vendor/*'],
            },
          },
        },
        null,
        2,
      )}\n`,
    )
    const { adapters } = createAdapters()

    await runInitWithResult(
      options(cwd, {
        componentsAlias: '@/components',
        uiAlias: '~/ui',
        utilsAlias: '#utils',
        libAlias: '#/lib',
        hooksAlias: '~/hooks',
        iconsAlias: '@/icons',
      }),
      adapters,
    )

    const tsconfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
    )
    expect(tsconfig.compilerOptions.paths).toEqual({
      '@/*': ['./resources/js/*'],
      'unrelated/*': ['./vendor/*'],
      '~/*': ['./*'],
      '#*': ['./*'],
      '#/*': ['./*'],
    })
  })

  it('preserves inherited path mappings and resolves the install plan through them', async () => {
    const cwd = await createProject({ src: true })
    await fs.mkdir(path.join(cwd, 'config'), { recursive: true })
    await fs.writeFile(
      path.join(cwd, 'config/base.json'),
      `${JSON.stringify(
        {
          compilerOptions: {
            baseUrl: '.',
            paths: {
              '@/*': ['../legacy/*'],
              'shared/*': ['../shared/*'],
            },
          },
        },
        null,
        2,
      )}\n`,
    )
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      `${JSON.stringify({ extends: './config/base.json' }, null, 2)}\n`,
    )
    const { adapters } = createAdapters()

    const result = await runInitWithResult(
      options(cwd, {
        componentsAlias: '~/components',
        utilsAlias: '@/lib/utils',
      }),
      adapters,
    )

    expect(result?.config.resolvedPaths.components).toBe(
      path.join(cwd, 'src/components'),
    )
    expect(result?.config.resolvedPaths.utils).toBe(
      path.join(cwd, 'legacy/lib/utils'),
    )
    const rootConfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
    )
    expect(rootConfig.extends).toBe('./config/base.json')
    expect(rootConfig.compilerOptions.paths).toEqual({
      '@/*': ['../legacy/*'],
      'shared/*': ['../shared/*'],
      '~/*': ['../src/*'],
    })
  })

  it('uses an inherited baseUrl as the reference frame for a new mapping', async () => {
    const cwd = await createProject({ src: true })
    await fs.writeFile(
      path.join(cwd, 'tsconfig.base.json'),
      `${JSON.stringify({ compilerOptions: { baseUrl: './src' } }, null, 2)}\n`,
    )
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      `${JSON.stringify({ extends: './tsconfig.base.json' }, null, 2)}\n`,
    )
    const { adapters } = createAdapters()

    const result = await runInitWithResult(options(cwd), adapters)

    expect(result?.config.resolvedPaths.components).toBe(
      path.join(cwd, 'src/components'),
    )
    const rootConfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
    )
    expect(rootConfig.compilerOptions.baseUrl).toBeUndefined()
    expect(rootConfig.compilerOptions.paths['@/*']).toEqual(['./*'])
  })

  it('resolves a package extends entry through its package.json tsconfig field', async () => {
    const cwd = await createProject({ src: true })
    const packageDirectory = path.join(cwd, 'node_modules/example-tsconfig')
    await fs.mkdir(packageDirectory, { recursive: true })
    await fs.writeFile(
      path.join(packageDirectory, 'package.json'),
      `${JSON.stringify({
        name: 'example-tsconfig',
        tsconfig: 'base.json',
      })}\n`,
    )
    await fs.writeFile(
      path.join(packageDirectory, 'base.json'),
      `${JSON.stringify({ compilerOptions: { baseUrl: './src' } }, null, 2)}\n`,
    )
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      `${JSON.stringify({ extends: 'example-tsconfig' }, null, 2)}\n`,
    )
    const { adapters } = createAdapters()

    const result = await runInitWithResult(options(cwd), adapters)

    expect(result?.config.resolvedPaths.components).toBe(
      path.join(cwd, 'src/components'),
    )
    const rootConfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
    )
    expect(rootConfig.compilerOptions.paths['@/*']).toEqual(['../../../src/*'])
  })

  it('does not duplicate src when the root config baseUrl is ./src', async () => {
    const cwd = await createProject({ src: true })
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      `${JSON.stringify({ compilerOptions: { baseUrl: './src' } }, null, 2)}\n`,
    )
    const { adapters } = createAdapters()

    const result = await runInitWithResult(options(cwd), adapters)

    expect(result?.config.resolvedPaths.components).toBe(
      path.join(cwd, 'src/components'),
    )
    const rootConfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
    )
    expect(rootConfig.compilerOptions.paths['@/*']).toEqual(['./*'])
  })

  it('uses only parents that contribute baseUrl in a multi-extends chain', async () => {
    const cwd = await createProject({ src: true })
    await fs.writeFile(
      path.join(cwd, 'with-base.json'),
      `${JSON.stringify({ compilerOptions: { baseUrl: './src' } }, null, 2)}\n`,
    )
    await fs.writeFile(
      path.join(cwd, 'without-base.json'),
      `${JSON.stringify({ compilerOptions: { strict: true } }, null, 2)}\n`,
    )
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      `${JSON.stringify(
        { extends: ['./with-base.json', './without-base.json'] },
        null,
        2,
      )}\n`,
    )
    const { adapters } = createAdapters()

    const result = await runInitWithResult(options(cwd), adapters)

    expect(result?.config.resolvedPaths.components).toBe(
      path.join(cwd, 'src/components'),
    )
    const rootConfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
    )
    expect(rootConfig.compilerOptions.paths['@/*']).toEqual(['./*'])
  })

  it('rejects conflicting inherited mappings before any mutation', async () => {
    const cwd = await createProject({ src: true })
    await fs.writeFile(
      path.join(cwd, 'first.json'),
      `${JSON.stringify(
        { compilerOptions: { paths: { '@/*': ['./first/*'] } } },
        null,
        2,
      )}\n`,
    )
    await fs.writeFile(
      path.join(cwd, 'second.json'),
      `${JSON.stringify(
        { compilerOptions: { paths: { '@/*': ['./second/*'] } } },
        null,
        2,
      )}\n`,
    )
    const tsconfigPath = path.join(cwd, 'tsconfig.json')
    const source = `${JSON.stringify(
      { extends: ['./first.json', './second.json'] },
      null,
      2,
    )}\n`
    await fs.writeFile(tsconfigPath, source)
    const { adapters, apply, calls } = createAdapters()

    await expect(runInitWithResult(options(cwd), adapters)).rejects.toThrow(
      'Conflicting inherited path mappings',
    )

    expect(calls).toHaveLength(0)
    expect(apply).not.toHaveBeenCalled()
    await expect(fs.readFile(tsconfigPath, 'utf8')).resolves.toBe(source)
    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('rejects malformed inherited mappings without staging project files', async () => {
    const cwd = await createProject({ src: true })
    await fs.writeFile(
      path.join(cwd, 'tsconfig.base.json'),
      `${JSON.stringify(
        { compilerOptions: { paths: { '@/*': [] } } },
        null,
        2,
      )}\n`,
    )
    const tsconfigPath = path.join(cwd, 'tsconfig.json')
    const source = `${JSON.stringify(
      { extends: './tsconfig.base.json' },
      null,
      2,
    )}\n`
    await fs.writeFile(tsconfigPath, source)
    const { adapters, apply, calls } = createAdapters()

    await expect(runInitWithResult(options(cwd), adapters)).rejects.toThrow(
      'is not a non-empty string array',
    )

    expect(calls).toHaveLength(0)
    expect(apply).not.toHaveBeenCalled()
    await expect(fs.readFile(tsconfigPath, 'utf8')).resolves.toBe(source)
    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('reports an invalid existing alias mapping without replacing it', async () => {
    const cwd = await createProject()
    const tsconfigPath = path.join(cwd, 'tsconfig.json')
    const source = `${JSON.stringify(
      { compilerOptions: { paths: { '@/*': [] } } },
      null,
      2,
    )}\n`
    await fs.writeFile(tsconfigPath, source)
    const { adapters, apply } = createAdapters()

    await expect(runInitWithResult(options(cwd), adapters)).rejects.toThrow(
      'refusing to replace it',
    )
    expect(apply).not.toHaveBeenCalled()
    await expect(fs.readFile(tsconfigPath, 'utf8')).resolves.toBe(source)
    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it.each([
    { componentsAlias: '~/widgets', requestedPattern: '~/*' },
    { componentsAlias: '#widgets', requestedPattern: '#*' },
  ])(
    'adds $requestedPattern when the project already has a different alias prefix',
    async ({ componentsAlias, requestedPattern }) => {
      const cwd = await createProject()
      await fs.writeFile(
        path.join(cwd, 'tsconfig.json'),
        `${JSON.stringify(
          {
            compilerOptions: {
              baseUrl: '.',
              paths: {
                '@/*': ['./*'],
                'custom/*': ['./vendor/*'],
              },
            },
          },
          null,
          2,
        )}\n`,
      )
      const { adapters } = createAdapters()

      const result = await runInitWithResult(
        options(cwd, { componentsAlias }),
        adapters,
      )

      expect(result?.aliasWritten).toBe(true)
      const tsconfig = JSON.parse(
        await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
      )
      expect(tsconfig.compilerOptions.paths).toMatchObject({
        '@/*': ['./*'],
        'custom/*': ['./vendor/*'],
        [requestedPattern]: ['./*'],
      })
    },
  )

  it.each([
    {
      initial: 'on' as const,
      next: 'off' as const,
      installed: 'provider',
      requested: 'provider-no-color-mode',
      marker: 'provider-without-color-mode',
    },
    {
      initial: 'off' as const,
      next: 'on' as const,
      installed: 'provider-no-color-mode',
      requested: 'provider',
      marker: 'provider-with-color-mode',
    },
  ])(
    'reruns color-mode=$initial idempotently and atomically switches to $next',
    async ({ initial, next, installed, requested, marker }) => {
      const cwd = await createProject({ src: true })
      const adapters: InitAdapters = {
        dependencyInstaller: vi.fn(async () => {}),
        registryClient: createCanonicalSetupClient(),
      }

      await runInitWithResult(options(cwd, { colorMode: initial }), adapters)
      const rerun = await runInitWithResult(
        options(cwd, { colorMode: initial }),
        adapters,
      )
      expect(
        rerun?.plan.files.every((file) => file.action === 'unchanged'),
      ).toBe(true)
      expect(await readInstalled(cwd)).toEqual([installed])

      const switched = await runInitWithResult(
        options(cwd, { colorMode: next }),
        adapters,
      )
      expect(switched?.plan.replacedItems).toEqual([installed])
      expect(switched?.plan.conflicts).toEqual([])
      expect(switched?.plan.files).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            action: 'update',
            target: 'src/components/setup/provider/provider.tsx',
          }),
        ]),
      )
      await expect(
        fs.readFile(
          path.join(cwd, 'src/components/setup/provider/provider.tsx'),
          'utf8',
        ),
      ).resolves.toContain(marker)
      expect(await readInstalled(cwd)).toEqual([requested])
    },
  )

  it('overwrites a locally modified provider when switching setup', async () => {
    const cwd = await createProject({ src: true })
    const providerPath = path.join(
      cwd,
      'src/components/setup/provider/provider.tsx',
    )
    const adapters: InitAdapters = {
      dependencyInstaller: vi.fn(async () => {}),
      registryClient: createCanonicalSetupClient(),
    }

    await runInitWithResult(options(cwd, { colorMode: 'on' }), adapters)
    await fs.writeFile(providerPath, 'export const Provider = "mine"\n')

    const switched = await runInitWithResult(
      options(cwd, { colorMode: 'off' }),
      adapters,
    )
    expect(switched?.plan.replacedItems).toEqual(['provider'])
    expect(switched?.plan.conflicts).toEqual([])
    await expect(fs.readFile(providerPath, 'utf8')).resolves.toContain(
      'provider-without-color-mode',
    )
    expect(await readInstalled(cwd)).toEqual(['provider-no-color-mode'])
  })

  it('adds the documented starter set and positional starter components', async () => {
    const cwd = await createProject()
    const { adapters } = createAdapters()

    const result = await runInitWithResult(
      options(cwd, {
        colorMode: 'off',
        starter: true,
        components: ['navbar', 'sidebar'],
      }),
      adapters,
    )

    expect(result?.components).toEqual([
      'provider-no-color-mode',
      'sidebar',
      'navbar',
    ])
  })

  it('rejects manually requested provider setup alternatives', async () => {
    const cwd = await createProject()
    const { adapters, calls } = createAdapters()

    await expect(
      runInitWithResult(
        options(cwd, {
          colorMode: 'off',
          components: ['provider', 'color-mode'],
        }),
        adapters,
      ),
    ).rejects.toBeInstanceOf(InitConflictError)
    expect(calls).toHaveLength(0)
  })

  it('preserves an existing config and is idempotent', async () => {
    const cwd = await createProject({
      src: true,
      config: {
        $schema: 'https://saas-ui.dev/r/schema/components.json',
        system: 'chakra',
        style: 'custom',
        rsc: false,
        tsx: true,
        aliases: {
          components: '#components',
          ui: '#components/ui',
          utils: '#shared/utils',
          lib: '#shared',
          hooks: '#hooks',
          icons: '#components/icons',
        },
      },
    })
    const { adapters, apply } = createAdapters()

    const first = await runInitWithResult(options(cwd), adapters)
    const second = await runInitWithResult(options(cwd), adapters)

    expect(first?.rawConfig.style).toBe('custom')
    expect(first?.rawConfig.aliases.components).toBe('#components')
    expect(first?.configWritten).toBe(true)
    expect(second?.configWritten).toBe(false)
    expect(second?.aliasWritten).toBe(false)
    expect(await readInstalled(cwd)).toEqual(['provider'])
    expect(apply.mock.calls[1]?.[2]?.stagedProjectFiles).toEqual([])
  })

  it('reports existing-config changes before planning unless force is used', async () => {
    const cwd = await createProject({
      config: {
        system: 'chakra',
        style: 'default',
        rsc: false,
        tsx: true,
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      },
    })
    const { adapters, calls } = createAdapters()

    await expect(
      runInitWithResult(options(cwd, { style: 'brutalist' }), adapters),
    ).rejects.toBeInstanceOf(InitConflictError)
    expect(calls).toHaveLength(0)

    const result = await runInitWithResult(
      options(cwd, { force: true, style: 'brutalist' }),
      adapters,
    )
    expect(result?.rawConfig.style).toBe('brutalist')
  })

  it('rejects an existing Panda config before planning Chakra setup', async () => {
    const cwd = await createProject({
      config: {
        system: 'panda',
        style: 'default',
        rsc: false,
        tsx: true,
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      },
    })
    const { adapters, calls, apply } = createAdapters()

    await expect(
      runInitWithResult(options(cwd), adapters),
    ).rejects.toBeInstanceOf(InitUnsupportedSystemError)
    expect(calls).toHaveLength(0)
    expect(apply).not.toHaveBeenCalled()
    expect(
      JSON.parse(await fs.readFile(path.join(cwd, 'components.json'), 'utf8')),
    ).toMatchObject({ system: 'panda' })
  })

  it.each([
    { src: true, relative: 'src/widgets', aliasTarget: './src/*' },
    { src: false, relative: 'widgets', aliasTarget: './*' },
  ])(
    'honors custom aliases in a project with src=$src',
    async ({ src, relative, aliasTarget }) => {
      const cwd = await createProject({ src })
      const { adapters } = createAdapters()

      const result = await runInitWithResult(
        options(cwd, {
          componentsAlias: '@/widgets',
          utilsAlias: '@/shared/utils',
        }),
        adapters,
      )

      expect(result?.config.resolvedPaths.components).toBe(
        path.join(cwd, relative),
      )
      expect(result?.rawConfig.aliases.ui).toBe('@/widgets/ui')
      const tsconfig = JSON.parse(
        await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
      )
      expect(tsconfig.compilerOptions.paths['@/*']).toEqual([aliasTarget])
    },
  )

  it('does not write components.json when installation planning fails', async () => {
    const cwd = await createProject()
    const { adapters, apply } = createAdapters()
    adapters.createInstallPlan = async () => {
      throw new Error('registry unavailable')
    }

    await expect(runInitWithResult(options(cwd), adapters)).rejects.toThrow(
      'registry unavailable',
    )
    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
    expect(apply).not.toHaveBeenCalled()
  })

  it('validates an unreadable alias config before installation writes', async () => {
    const cwd = await createProject()
    await fs.writeFile(path.join(cwd, 'tsconfig.json'), '{ invalid json')
    const { adapters, apply, calls } = createAdapters()

    await expect(runInitWithResult(options(cwd), adapters)).rejects.toThrow(
      /malformed JSON5|must contain valid JSON/,
    )
    expect(calls).toHaveLength(0)
    expect(apply).not.toHaveBeenCalled()
    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('updates JSON-with-comments TypeScript configs after apply', async () => {
    const cwd = await createProject()
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      '{\n  // compiler configuration\n  "compilerOptions": {\n    "strict": true,\n  },\n}\n',
    )
    const { adapters } = createAdapters()

    await runInitWithResult(options(cwd), adapters)

    const tsconfig = JSON.parse(
      await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8'),
    )
    expect(tsconfig.compilerOptions).toMatchObject({
      strict: true,
      paths: { '@/*': ['./*'] },
    })
  })

  it('rolls back registry, config, alias, and lock writes when the config transaction faults', async () => {
    const cwd = await createProject({ src: true })
    const tsconfigPath = path.join(cwd, 'tsconfig.json')
    const originalTsconfig = await fs.readFile(tsconfigPath, 'utf8')
    const providerPath = path.join(
      cwd,
      'src/components/setup/provider/provider.tsx',
    )
    const registryClient = createRegistryClient([
      {
        schemaVersion: 1,
        name: 'provider',
        type: 'registry:setup',
        files: [
          {
            path: 'setup/provider/provider.tsx',
            target: 'components/setup/provider/provider.tsx',
            type: 'registry:setup',
            content: 'export const Provider = "atomic"\n',
          },
        ],
      },
    ])

    await expect(
      runInitWithResult(options(cwd), {
        dependencyInstaller: vi.fn(async () => {}),
        registryClient,
        transaction: {
          onPhase(phase) {
            if (phase === 'files-committed') {
              throw new Error('injected config commit fault')
            }
          },
        },
      }),
    ).rejects.toThrow('injected config commit fault')

    await expect(fs.access(providerPath)).rejects.toMatchObject({
      code: 'ENOENT',
    })
    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
    expect(await fs.readFile(tsconfigPath, 'utf8')).toBe(originalTsconfig)
  })

  it('rejects a registry/config target collision without committing either side', async () => {
    const cwd = await createProject()
    const originalTsconfig = await fs.readFile(
      path.join(cwd, 'tsconfig.json'),
      'utf8',
    )
    const registryClient = createRegistryClient([
      {
        schemaVersion: 1,
        name: 'provider',
        type: 'registry:setup',
        files: [
          {
            path: 'setup/provider/components.json',
            target: '~/components.json',
            type: 'registry:setup',
            content: '{"ownedBy":"registry"}\n',
          },
        ],
      },
    ])

    await expect(
      runInitWithResult(options(cwd), {
        dependencyInstaller: vi.fn(async () => {}),
        registryClient,
      }),
    ).rejects.toThrow(
      'Staged project file "components.json" collides with registry item "provider".',
    )

    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
    expect(await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8')).toBe(
      originalTsconfig,
    )
  })

  it('reports planned file conflicts before applying or writing config', async () => {
    const cwd = await createProject()
    const { adapters, apply } = createAdapters()
    adapters.createInstallPlan = async (requested, config, planOptions) => ({
      ...createEmptyPlan(requested, config.style, planOptions),
      conflicts: [
        {
          kind: 'existing',
          target: 'src/components/setup/provider.tsx',
          items: ['provider'],
          message: 'Provider already exists.',
        },
      ],
    })

    await expect(runInitWithResult(options(cwd), adapters)).rejects.toThrow(
      'Provider already exists',
    )
    await expect(
      fs.access(path.join(cwd, 'components.json')),
    ).rejects.toMatchObject({ code: 'ENOENT' })
    expect(apply).not.toHaveBeenCalled()
  })

  it.each([
    ['@chakra-ui/react', '^2.10.0'],
    ['@saas-ui/chakra-preset', '^2.0.0'],
  ])(
    'rejects incompatible existing %s before any mutation',
    async (packageName, specifier) => {
      const cwd = await createProject({ src: true })
      const packagePath = path.join(cwd, 'package.json')
      const tsconfigPath = path.join(cwd, 'tsconfig.json')
      const packageSource = `${JSON.stringify(
        {
          private: true,
          dependencies: { react: '^19.0.0', [packageName]: specifier },
        },
        null,
        2,
      )}\n`
      await fs.writeFile(packagePath, packageSource)
      const tsconfigSource = await fs.readFile(tsconfigPath, 'utf8')
      const dependencyInstaller = vi.fn(async () => {})

      await expect(
        runInitWithResult(options(cwd, { colorMode: 'off' }), {
          dependencyInstaller,
          registryClient: createCanonicalSetupClient(),
        }),
      ).rejects.toThrow('incompatible specifier')
      expect(dependencyInstaller).not.toHaveBeenCalled()
      await expect(fs.readFile(packagePath, 'utf8')).resolves.toBe(
        packageSource,
      )
      await expect(fs.readFile(tsconfigPath, 'utf8')).resolves.toBe(
        tsconfigSource,
      )
      await expect(
        fs.access(path.join(cwd, 'components.json')),
      ).rejects.toMatchObject({ code: 'ENOENT' })
      await expect(
        fs.access(path.join(cwd, '.saas-ui/registry-lock.json')),
      ).rejects.toMatchObject({ code: 'ENOENT' })
    },
  )

  it('accepts existing declarations proven by centralized policies', async () => {
    const cwd = await createProject({ src: true })
    const packagePath = path.join(cwd, 'package.json')
    const packageSource = `${JSON.stringify(
      {
        private: true,
        dependencies: {
          react: '^19.0.0',
          '@chakra-ui/react': '^3.30.0',
          '@emotion/react': '11',
          '@saas-ui/chakra-preset': '>=3.0.0 <4.0.0',
          'next-themes': '^0.4.6',
        },
      },
      null,
      2,
    )}\n`
    await fs.writeFile(packagePath, packageSource)
    const dependencyInstaller = vi.fn(async () => {})

    const result = await runInitWithResult(options(cwd), {
      dependencyInstaller,
      registryClient: createCanonicalSetupClient(),
    })

    expect(result?.dependencies).toEqual([
      '@chakra-ui/react@^3.28.0',
      '@emotion/react@^11.0.0',
      `@saas-ui/chakra-preset@${SUPPORTED_PRESET_VERSION}`,
      'next-themes@^0.4.6',
    ])
    expect(result?.plan.dependencies).toEqual([])
    expect(dependencyInstaller).not.toHaveBeenCalled()
    await expect(fs.readFile(packagePath, 'utf8')).resolves.toBe(packageSource)
  })
})
