import assert from 'node:assert/strict'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {
  type InitResult,
  runInitWithResult,
} from '../../src/commands/init/impl'
import { installRegistryItems } from '../../src/utils/add-components'
import type { Config } from '../../src/utils/get-config'
import {
  SUPPORTED_PRESET_VERSION,
  supportedPackageDeclaration,
} from '../../src/utils/package-compatibility'
import { hashContent } from '../../src/utils/registry-content-hash'
import type { RegistryClient } from '../../src/utils/registry/client'
import {
  type RegistryIndexItem,
  type RegistryItem,
  isRegistryItemTypeInstallable,
} from '../../src/utils/registry/schema'
import { selectAllRegistryItems } from '../../src/utils/registry/select-items'
import type {
  DependencyInstallRequest,
  DependencyInstaller,
} from '../../src/utils/updaters/update-dependencies'
import {
  CONSUMER_TEMPLATE_ROOT,
  createLocalRegistryClient,
} from './local-registry'

export type ColorModeVariant = 'on' | 'off'

export const CONSUMER_ALIASES = {
  components: '@/design',
  ui: '@/design-system',
  lib: '@/shared',
  utils: '@/shared/utils',
  hooks: '@/hooks',
  // The canonical templates keep icons as a sibling of their `ui` source
  // root, so this deliberately distinct alias also exercises target routing.
  icons: '@/icons',
} as const

export const ADD_ITEMS = ['sidebar', 'navbar'] as const

const developmentSourcePattern =
  /(?:^|\/)(?:__stories__|__tests__|stories|tests?)(?:\/|$)|(?:^|\.)(?:test-d|spec-d|type-tests?|test|spec|stories|story|preview)\.[cm]?[jt]sx?$/i

const commonItemTargets = {
  navbar: [
    'src/design-system/navbar/index.ts',
    'src/design-system/navbar/navbar.context.ts',
    'src/design-system/navbar/navbar.tsx',
  ],
  sidebar: [
    'src/design-system/sidebar/index.ts',
    'src/design-system/sidebar/sidebar.context.ts',
    'src/design-system/sidebar/sidebar.tsx',
  ],
  'use-link': ['src/shared/use-link/use-link.tsx'],
} as const

const expectedTargets = {
  on: {
    'color-mode': ['src/design/setup/color-mode/color-mode.tsx'],
    ...commonItemTargets,
    provider: ['src/design/setup/provider/provider.tsx'],
  },
  off: {
    ...commonItemTargets,
    'provider-no-color-mode': ['src/design/setup/provider/provider.tsx'],
  },
} as const satisfies Record<ColorModeVariant, Record<string, readonly string[]>>

const expectedPrimitiveDeclaration = supportedPackageDeclaration(
  '@saas-ui/react',
)

const expectedDependencies = {
  // Init packages are already in the fixture manifest. Navbar and Sidebar wrap
  // unstyled primitives, so add installs the current @saas-ui/react pin.
  on: [[expectedPrimitiveDeclaration]],
  off: [[expectedPrimitiveDeclaration]],
} as const satisfies Record<ColorModeVariant, readonly (readonly string[])[]>

export const expectedInstallAllDependencies = [
  '@saas-js/conditions@^0.1.0',
  '@saas-js/conditions-react@^0.1.0',
  '@saas-ui/hooks',
  expectedPrimitiveDeclaration,
  '@tanstack/react-table@9.0.0-beta.80',
  '@tanstack/react-virtual@^3.13.12',
  '@tiptap/react@^3.30.2',
  '@tiptap/starter-kit@^3.30.2',
] as const

const expectedInstallation = {
  on: {
    requestedItems: ['navbar', 'provider', 'sidebar'],
    transitiveItems: ['color-mode', 'use-link'],
  },
  off: {
    requestedItems: ['navbar', 'provider-no-color-mode', 'sidebar'],
    transitiveItems: ['use-link'],
  },
} as const satisfies Record<
  ColorModeVariant,
  {
    requestedItems: readonly string[]
    transitiveItems: readonly string[]
  }
>

export interface ConsumerFixtureOptions {
  cwd: string
  colorMode: ColorModeVariant
  client?: RegistryClient
  dependencyInstaller?: DependencyInstaller
}

export interface ConsumerFixtureResult {
  cwd: string
  colorMode: ColorModeVariant
  client: RegistryClient
  config: Config
  init: InitResult
  add: Awaited<ReturnType<typeof installRegistryItems>>
  dependencyRequests: DependencyInstallRequest[]
  dependencyInstaller: DependencyInstaller
}

export interface InstallAllConsumerFixtureResult extends Omit<
  ConsumerFixtureResult,
  'add' | 'colorMode'
> {
  colorMode: 'on'
  add: Awaited<ReturnType<typeof installRegistryItems>>
  index: RegistryIndexItem[]
  selectedItems: string[]
  excludedItems: string[]
}

export async function prepareConsumerProject(
  cwd: string,
  colorMode: ColorModeVariant,
) {
  await fs.rm(cwd, { force: true, recursive: true })
  await fs.cp(CONSUMER_TEMPLATE_ROOT, cwd, { recursive: true })

  const packagePath = path.join(cwd, 'package.json')
  const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf8')) as {
    dependencies: Record<string, string>
  }
  packageJson.dependencies['@saas-ui/chakra-preset'] = SUPPORTED_PRESET_VERSION
  if (colorMode === 'on') {
    packageJson.dependencies['next-themes'] = '^0.4.6'
  } else {
    delete packageJson.dependencies['next-themes']
  }
  await fs.writeFile(
    packagePath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    'utf8',
  )
}

function copyDependencyRequest(request: DependencyInstallRequest) {
  return {
    cwd: request.cwd,
    dependencies: [...request.dependencies],
    devDependencies: [...request.devDependencies],
  }
}

export async function installConsumerFixture(
  options: ConsumerFixtureOptions,
): Promise<ConsumerFixtureResult> {
  const cwd = path.resolve(options.cwd)
  const client = options.client ?? createLocalRegistryClient()
  const dependencyRequests: DependencyInstallRequest[] = []
  const dependencyInstaller: DependencyInstaller = async (request) => {
    dependencyRequests.push(copyDependencyRequest(request))
    await options.dependencyInstaller?.(request)
  }

  await prepareConsumerProject(cwd, options.colorMode)
  const init = await runInitWithResult(
    {
      cwd,
      yes: true,
      defaults: true,
      force: false,
      silent: true,
      colorMode: options.colorMode,
      componentsAlias: CONSUMER_ALIASES.components,
      uiAlias: CONSUMER_ALIASES.ui,
      libAlias: CONSUMER_ALIASES.lib,
      utilsAlias: CONSUMER_ALIASES.utils,
      hooksAlias: CONSUMER_ALIASES.hooks,
      iconsAlias: CONSUMER_ALIASES.icons,
    },
    {
      registryClient: client,
      dependencyInstaller,
    },
  )
  assert(init, 'Noninteractive init unexpectedly returned no result.')

  const add = await installRegistryItems(ADD_ITEMS, init.config, {
    client,
    dependencyInstaller,
    silent: true,
  })

  return {
    cwd,
    colorMode: options.colorMode,
    client,
    config: init.config,
    init,
    add,
    dependencyRequests,
    dependencyInstaller,
  }
}

/**
 * Materialize a clean project through init, then exercise the same install-all
 * selection and planner used by `saas-ui add --all` against canonical JSON.
 */
export async function installAllConsumerFixture(
  cwdInput: string,
  options: Pick<ConsumerFixtureOptions, 'client' | 'dependencyInstaller'> = {},
): Promise<InstallAllConsumerFixtureResult> {
  const cwd = path.resolve(cwdInput)
  const client = options.client ?? createLocalRegistryClient()
  const dependencyRequests: DependencyInstallRequest[] = []
  const dependencyInstaller: DependencyInstaller = async (request) => {
    dependencyRequests.push(copyDependencyRequest(request))
    await options.dependencyInstaller?.(request)
  }

  await prepareConsumerProject(cwd, 'on')
  const init = await runInitWithResult(
    {
      cwd,
      yes: true,
      defaults: true,
      force: false,
      silent: true,
      colorMode: 'on',
      componentsAlias: CONSUMER_ALIASES.components,
      uiAlias: CONSUMER_ALIASES.ui,
      libAlias: CONSUMER_ALIASES.lib,
      utilsAlias: CONSUMER_ALIASES.utils,
      hooksAlias: CONSUMER_ALIASES.hooks,
      iconsAlias: CONSUMER_ALIASES.icons,
    },
    { registryClient: client, dependencyInstaller },
  )
  assert(
    init,
    'Noninteractive install-all init unexpectedly returned no result.',
  )

  const index = await client.getIndex()
  const selectedItems = selectAllRegistryItems(index)
  const selected = new Set(selectedItems)
  const excludedItems = index
    .filter(
      (entry) =>
        !entry.private &&
        isRegistryItemTypeInstallable(entry.type) &&
        !selected.has(entry.name),
    )
    .map((entry) => entry.name)
    .sort()
  const add = await installRegistryItems(selectedItems, init.config, {
    client,
    dependencyInstaller,
    silent: true,
  })

  return {
    cwd,
    colorMode: 'on',
    client,
    config: init.config,
    init,
    add,
    dependencyRequests,
    dependencyInstaller,
    index,
    selectedItems,
    excludedItems,
  }
}

export async function reinstallConsumerFixture(result: ConsumerFixtureResult) {
  const before = await snapshotProject(result.cwd)
  const init = await runInitWithResult(
    {
      cwd: result.cwd,
      yes: true,
      defaults: true,
      force: false,
      silent: true,
      colorMode: result.colorMode,
      componentsAlias: CONSUMER_ALIASES.components,
      uiAlias: CONSUMER_ALIASES.ui,
      libAlias: CONSUMER_ALIASES.lib,
      utilsAlias: CONSUMER_ALIASES.utils,
      hooksAlias: CONSUMER_ALIASES.hooks,
      iconsAlias: CONSUMER_ALIASES.icons,
    },
    {
      registryClient: result.client,
      dependencyInstaller: result.dependencyInstaller,
    },
  )
  assert(init, 'Idempotent init unexpectedly returned no result.')
  assert(
    init.plan.files.every((file) => file.action === 'unchanged'),
    'Idempotent init planned a registry file mutation.',
  )

  const add = await installRegistryItems(ADD_ITEMS, init.config, {
    client: result.client,
    dependencyInstaller: result.dependencyInstaller,
    silent: true,
  })
  assert(
    add.plan.files.every((file) => file.action === 'unchanged'),
    'Idempotent add planned a registry file mutation.',
  )
  assert.deepEqual(await snapshotProject(result.cwd), before)
}

export async function reinstallAllConsumerFixture(
  result: InstallAllConsumerFixtureResult,
) {
  const before = await snapshotProject(result.cwd)
  const init = await runInitWithResult(
    {
      cwd: result.cwd,
      yes: true,
      defaults: true,
      force: false,
      silent: true,
      colorMode: 'on',
      componentsAlias: CONSUMER_ALIASES.components,
      uiAlias: CONSUMER_ALIASES.ui,
      libAlias: CONSUMER_ALIASES.lib,
      utilsAlias: CONSUMER_ALIASES.utils,
      hooksAlias: CONSUMER_ALIASES.hooks,
      iconsAlias: CONSUMER_ALIASES.icons,
    },
    {
      registryClient: result.client,
      dependencyInstaller: result.dependencyInstaller,
    },
  )
  assert(init, 'Idempotent install-all init unexpectedly returned no result.')
  assert(
    init.plan.files.every((file) => file.action === 'unchanged'),
    'Idempotent install-all init planned a registry file mutation.',
  )

  const index = await result.client.getIndex()
  const selectedItems = selectAllRegistryItems(index)
  assert.deepEqual(selectedItems, result.selectedItems)
  const add = await installRegistryItems(selectedItems, init.config, {
    client: result.client,
    dependencyInstaller: result.dependencyInstaller,
    silent: true,
  })
  assert(
    add.plan.files.every((file) => file.action === 'unchanged'),
    'Idempotent install-all add planned a registry file mutation.',
  )
  assert.deepEqual(await snapshotProject(result.cwd), before)
}

export async function switchConsumerColorMode(
  result: ConsumerFixtureResult,
  colorMode: ColorModeVariant,
) {
  const switched = await runInitWithResult(
    {
      cwd: result.cwd,
      yes: true,
      defaults: true,
      force: false,
      silent: true,
      colorMode,
      componentsAlias: CONSUMER_ALIASES.components,
      uiAlias: CONSUMER_ALIASES.ui,
      libAlias: CONSUMER_ALIASES.lib,
      utilsAlias: CONSUMER_ALIASES.utils,
      hooksAlias: CONSUMER_ALIASES.hooks,
      iconsAlias: CONSUMER_ALIASES.icons,
    },
    {
      registryClient: result.client,
      dependencyInstaller: result.dependencyInstaller,
    },
  )
  assert(switched, 'Color-mode switch unexpectedly returned no result.')
  return switched
}

async function assertInstallation(
  cwd: string,
  colorMode: ColorModeVariant,
  client: RegistryClient,
) {
  const config = JSON.parse(
    await fs.readFile(path.join(cwd, 'components.json'), 'utf8'),
  ) as { installed?: string[] }
  const expected = expectedInstallation[colorMode]
  assert.deepEqual(config.installed, [...expected.requestedItems])
  await assert.rejects(
    fs.access(path.join(cwd, '.saas-ui/registry-lock.json')),
    { code: 'ENOENT' },
  )

  const itemNames = [
    ...expected.requestedItems,
    ...expected.transitiveItems,
  ].sort()
  const targets: Record<string, readonly string[]> = expectedTargets[colorMode]
  assert.deepEqual(Object.keys(targets).sort(), itemNames)

  for (const name of itemNames) {
    const payload = await client.getItem(name, 'default')
    for (const file of payload.files ?? []) {
      assert.doesNotMatch(
        file.path,
        developmentSourcePattern,
        `Registry item "${name}" includes development source ${file.path}.`,
      )
      if (file.target) {
        assert.doesNotMatch(
          file.target,
          developmentSourcePattern,
          `Registry item "${name}" targets development source ${file.target}.`,
        )
      }
    }
    for (const target of targets[name]!) {
      await fs.access(path.join(cwd, target))
    }
  }

  return config.installed ?? []
}

function importedModuleSpecifiers(source: string) {
  const fromOrDynamic = [
    ...source.matchAll(/(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g),
  ].map((match) => match[1]!)
  const sideEffects = [
    ...source.matchAll(/(?:^|\n)\s*import\s*['"]([^'"]+)['"]/g),
  ].map((match) => match[1]!)
  return [...fromOrDynamic, ...sideEffects]
}

async function sourceFiles(cwd: string) {
  const result: string[] = []
  async function visit(directory: string) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name)
      if (entry.isDirectory()) await visit(target)
      else if (/\.[cm]?[jt]sx?$/.test(entry.name)) result.push(target)
    }
  }
  await visit(path.join(cwd, 'src'))
  return result.sort()
}

async function assertSourceBoundary(cwd: string) {
  for (const file of await sourceFiles(cwd)) {
    const source = await fs.readFile(file, 'utf8')
    const relative = path.relative(cwd, file)
    assert.doesNotMatch(
      relative,
      developmentSourcePattern,
      `The CLI installed development-only source ${relative}.`,
    )
    assert.doesNotMatch(source, /@saas-ui\/core(?:\/|['"])/)
    assert.doesNotMatch(source, /(?:@\/|#)registry\//)
    assert.doesNotMatch(source, /(?:^|['"])(?:\.\.\/)+(?:apps|packages)\//m)
    assert.doesNotMatch(source, /workspace:/)

    for (const specifier of importedModuleSpecifiers(source)) {
      assert.doesNotMatch(
        specifier,
        /^(?:apps|packages)\//,
        `${relative} imports a workspace source path: ${specifier}.`,
      )
      if (specifier.startsWith('@saas-ui/')) {
        assert.match(
          specifier,
          /^@saas-ui\/(?:chakra-preset|hooks|react)(?:\/|$)/,
          `${relative} imports a workspace-only Saas UI package: ${specifier}.`,
        )
      }
      if (
        specifier.startsWith('.') ||
        specifier.startsWith('@/') ||
        specifier.startsWith('#')
      ) {
        assert.doesNotMatch(
          specifier,
          /(?:\.d)?\.(?:ts|tsx|mts|cts)$/,
          `${relative} retains a TypeScript extension in ${specifier}.`,
        )
      }
    }
  }
}

export async function assertConsumerFixture(result: ConsumerFixtureResult) {
  const tsconfig = JSON.parse(
    await fs.readFile(path.join(result.cwd, 'tsconfig.json'), 'utf8'),
  ) as {
    compilerOptions?: Record<string, unknown>
    include?: string[]
  }
  assert.equal(
    tsconfig.compilerOptions?.strict,
    true,
    'The consumer fixture must strictly typecheck generated source.',
  )
  assert.equal(
    tsconfig.compilerOptions?.skipLibCheck,
    true,
    'The consumer fixture must ignore third-party declaration errors like a conventional Next.js project.',
  )
  assert(
    tsconfig.include?.includes('src/**/*.ts') &&
      tsconfig.include.includes('src/**/*.tsx'),
    'The consumer fixture must include all generated TypeScript source in its strict typecheck.',
  )
  assert.equal(
    Object.hasOwn(tsconfig.compilerOptions ?? {}, 'allowImportingTsExtensions'),
    false,
    'The consumer fixture must use standard extensionless TypeScript imports.',
  )

  const components = JSON.parse(
    await fs.readFile(path.join(result.cwd, 'components.json'), 'utf8'),
  ) as { aliases: Record<string, string> }
  assert.deepEqual(components.aliases, CONSUMER_ALIASES)

  const packageJson = JSON.parse(
    await fs.readFile(path.join(result.cwd, 'package.json'), 'utf8'),
  ) as { dependencies: Record<string, string> }
  assert.equal(
    Object.hasOwn(packageJson.dependencies, 'next-themes'),
    result.colorMode === 'on',
  )

  assert.deepEqual(
    result.dependencyRequests.map((request) => request.dependencies),
    expectedDependencies[result.colorMode].map((request) => [...request]),
  )
  assert(
    result.dependencyRequests.every(
      (request) =>
        request.cwd === result.cwd && !request.devDependencies.length,
    ),
  )

  const installed = await assertInstallation(
    result.cwd,
    result.colorMode,
    result.client,
  )
  const providerNames = installed.filter((name) =>
    ['provider', 'provider-no-color-mode'].includes(name),
  )
  assert.deepEqual(providerNames, [
    result.colorMode === 'on' ? 'provider' : 'provider-no-color-mode',
  ])

  const provider = await fs.readFile(
    path.join(result.cwd, 'src/design/setup/provider/provider.tsx'),
    'utf8',
  )
  assert.match(provider, /from ['"]@\/shared\/use-link\/use-link['"]/)
  if (result.colorMode === 'on') {
    assert.match(provider, /ColorModeProvider/)
    assert.match(
      provider,
      /from ['"]@\/design\/setup\/color-mode\/color-mode['"]/,
    )
  } else {
    assert.doesNotMatch(provider, /ColorModeProvider/)
    await assert.rejects(
      fs.access(
        path.join(result.cwd, 'src/design/setup/color-mode/color-mode.tsx'),
      ),
      { code: 'ENOENT' },
    )
  }

  const navbar = await fs.readFile(
    path.join(result.cwd, 'src/design-system/navbar/navbar.tsx'),
    'utf8',
  )
  assert.match(navbar, /from ['"]@\/shared\/use-link\/use-link['"]/)
  assert.doesNotMatch(navbar, /\.\.\/\.\.\/lib\/use-link/)

  await assertSourceBoundary(result.cwd)
}

export async function assertInstallAllConsumerFixture(
  result: InstallAllConsumerFixtureResult,
) {
  const publicInstallable = result.index
    .filter(
      (entry) => !entry.private && isRegistryItemTypeInstallable(entry.type),
    )
    .sort((left, right) => left.name.localeCompare(right.name))
  const selectedAgain = selectAllRegistryItems(result.index)
  assert.deepEqual(result.selectedItems, selectedAgain)
  assert.equal(
    new Set(result.selectedItems).size,
    result.selectedItems.length,
    'Install-all selection contains duplicate registry roots.',
  )
  assert.deepEqual(result.excludedItems, ['provider-no-color-mode'])
  assert.equal(
    result.selectedItems.length,
    publicInstallable.length - result.excludedItems.length,
  )

  const providerAlternatives = publicInstallable.filter(
    (entry) => entry.meta?.exclusiveGroup === 'provider',
  )
  assert.deepEqual(
    providerAlternatives.map((entry) => entry.name),
    ['provider', 'provider-no-color-mode'],
  )
  assert.deepEqual(
    providerAlternatives
      .filter((entry) => entry.meta?.exclusiveDefault === true)
      .map((entry) => entry.name),
    ['provider'],
  )
  assert(result.selectedItems.includes('provider'))
  assert(!result.selectedItems.includes('provider-no-color-mode'))

  assert.equal(result.add.applied, true)
  assert.equal(result.add.plan.conflicts.length, 0)
  assert.deepEqual(
    result.add.plan.items.map((item) => item.name).sort(),
    [...result.selectedItems].sort(),
  )
  assert(
    result.add.plan.files.every((file) => file.action !== 'conflict'),
    'Install-all planner produced a file conflict.',
  )

  const config = JSON.parse(
    await fs.readFile(path.join(result.cwd, 'components.json'), 'utf8'),
  ) as { installed?: string[] }
  assert.deepEqual(config.installed, [...result.selectedItems].sort())
  await assert.rejects(
    fs.access(path.join(result.cwd, '.saas-ui/registry-lock.json')),
    { code: 'ENOENT' },
  )

  for (const name of result.selectedItems) {
    const payload = await result.client.getItem(name, 'default')
    for (const file of payload.files ?? []) {
      assert.doesNotMatch(
        file.path,
        developmentSourcePattern,
        `Install-all payload "${name}" includes development source ${file.path}.`,
      )
      if (file.target) {
        assert.doesNotMatch(
          file.target,
          developmentSourcePattern,
          `Install-all payload "${name}" targets development source ${file.target}.`,
        )
      }
    }
  }

  for (const file of result.add.plan.files) {
    const content = await fs.readFile(path.join(result.cwd, file.target))
    assert.equal(hashContent(content), file.hash)
  }

  const packageJson = JSON.parse(
    await fs.readFile(path.join(result.cwd, 'package.json'), 'utf8'),
  ) as { dependencies: Record<string, string> }
  for (const dependency of [
    '@ark-ui/react',
    '@chakra-ui/react',
    '@emotion/react',
    '@saas-ui/chakra-preset',
    'next-themes',
  ]) {
    assert.equal(
      typeof packageJson.dependencies[dependency],
      'string',
      `Install-all fixture manifest is missing ${dependency}.`,
    )
    assert.doesNotMatch(packageJson.dependencies[dependency]!, /^workspace:/)
  }
  assert.deepEqual(result.dependencyRequests, [
    {
      cwd: result.cwd,
      dependencies: [...expectedInstallAllDependencies],
      devDependencies: [],
    },
  ])

  await assertSourceBoundary(result.cwd)
}

export async function assertSwitchedProvider(
  result: ConsumerFixtureResult,
  colorMode: ColorModeVariant,
) {
  const installed = await assertInstallation(
    result.cwd,
    colorMode,
    result.client,
  )
  const selected = colorMode === 'on' ? 'provider' : 'provider-no-color-mode'
  const replaced = colorMode === 'on' ? 'provider-no-color-mode' : 'provider'
  assert(installed.includes(selected))
  assert(!installed.includes(replaced))

  const provider = await fs.readFile(
    path.join(result.cwd, 'src/design/setup/provider/provider.tsx'),
    'utf8',
  )
  if (colorMode === 'on') assert.match(provider, /ColorModeProvider/)
  else {
    assert.doesNotMatch(provider, /ColorModeProvider/)
  }
  await assertSourceBoundary(result.cwd)
}

async function listFiles(root: string) {
  const files: string[] = []
  async function visit(directory: string) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      if (entry.name === '.next') continue
      const target = path.join(directory, entry.name)
      if (entry.isDirectory()) await visit(target)
      else files.push(target)
    }
  }
  await visit(root)
  return files.sort()
}

export async function snapshotProject(cwd: string) {
  const snapshot: Record<string, string> = {}
  for (const file of await listFiles(cwd)) {
    snapshot[path.relative(cwd, file).split(path.sep).join('/')] =
      await fs.readFile(file, 'utf8')
  }
  return snapshot
}

export async function createTemporaryConsumerDirectory() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'saas-ui-consumer-fixture-'))
}

export async function removeConsumerDirectory(cwd: string) {
  await fs.rm(cwd, { force: true, recursive: true })
}
