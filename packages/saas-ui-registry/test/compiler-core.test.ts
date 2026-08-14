import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import {
  analyzeItemFiles,
  discoverRegistryItems,
  resolveDependencyGraph,
  validateRegistry,
} from '../src/compiler/index.js'

const temporaryDirectories: string[] = []

async function createFixture(
  files: Readonly<Record<string, string>>,
  style = 'default',
) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'sui-registry-'))
  temporaryDirectories.push(directory)
  const styleRoot = path.join(directory, style)
  for (const [relativePath, content] of Object.entries(files)) {
    const filename = path.join(styleRoot, relativePath)
    await fs.mkdir(path.dirname(filename), { recursive: true })
    await fs.writeFile(filename, content, 'utf8')
  }
  return styleRoot
}

async function validateFixture(files: Readonly<Record<string, string>>) {
  const root = await createFixture(files)
  const discovered = await discoverRegistryItems({ sourceRoots: [root] })
  const analyzed = await analyzeItemFiles(discovered)
  return validateRegistry(resolveDependencyGraph(analyzed))
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => fs.rm(directory, { force: true, recursive: true })),
  )
})

describe('registry compiler core', () => {
  it('resolves external UI, setup, icon, hook, and nested files by catalog ownership', async () => {
    const root = await createFixture({
      'ui/dashboard/dashboard.tsx': `
        import { Button } from '#registry/default/ui/button/button'
        import { useThing } from '#registry/default/hooks/use-thing'
        import { XIcon } from '#registry/default/icons/x-icon'
        import { Theme } from '#registry/default/setup/theme/theme'
        import { nested } from '#registry/default/ui/complex/nested'
        export const Dashboard = () => [Button, useThing, XIcon, Theme, nested]
      `,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered, {
      externalRegistries: [
        {
          alias: '#registry/default',
          baseUrl: 'https://public.example/r',
          index: [
            {
              name: 'button',
              type: 'registry:ui',
              files: [{ path: 'ui/button/button.tsx', type: 'registry:ui' }],
            },
            {
              name: 'use-thing',
              type: 'registry:hook',
              files: [{ path: 'hooks/use-thing.ts', type: 'registry:hook' }],
            },
            {
              name: 'x-icon',
              type: 'registry:icon',
              files: [{ path: 'icons/x-icon.tsx', type: 'registry:icon' }],
            },
            {
              name: 'theme',
              type: 'registry:setup',
              files: [{ path: 'setup/theme/theme.ts', type: 'registry:setup' }],
            },
            {
              name: 'complex',
              type: 'registry:ui',
              files: [{ path: 'ui/complex/nested.ts', type: 'registry:ui' }],
            },
          ],
        },
      ],
    })
    const graph = resolveDependencyGraph(analyzed)

    expect(graph.items[0]?.registryDependencies).toEqual([
      'https://public.example/r/styles/default/button.json',
      'https://public.example/r/styles/default/complex.json',
      'https://public.example/r/styles/default/theme.json',
      'https://public.example/r/styles/default/use-thing.json',
      'https://public.example/r/styles/default/x-icon.json',
    ])
    expect(graph.diagnostics).toEqual([])
  })

  it('diagnoses missing, ambiguous, duplicate, and malformed external catalogs', async () => {
    const root = await createFixture({
      'ui/dashboard/dashboard.tsx': `
        import { Missing } from '#registry/public/ui/missing'
        import { Ambiguous } from '#registry/public/ui/ambiguous'
        export const Dashboard = () => [Missing, Ambiguous]
      `,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered, {
      externalRegistries: [
        {
          alias: '#registry/public',
          baseUrl: 'https://public.example/r',
          index: [
            {
              name: 'one',
              type: 'registry:ui',
              files: [{ path: 'ui/ambiguous.ts', type: 'registry:ui' }],
            },
            {
              name: 'two',
              type: 'registry:ui',
              files: [{ path: 'ui/ambiguous.ts', type: 'registry:ui' }],
            },
          ],
        },
        {
          alias: '#registry/public',
          baseUrl: 'https://public.example/r',
          index: [],
        },
        {
          alias: '#registry/bad',
          baseUrl: 'file:///tmp/registry',
          index: [],
        },
      ],
    })

    expect(analyzed.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'external-registry-ambiguous-file' }),
        expect.objectContaining({ code: 'external-registry-item-not-found' }),
        expect.objectContaining({ code: 'external-registry-duplicate-alias' }),
        expect.objectContaining({ code: 'external-registry-invalid-catalog' }),
      ]),
    )
  })
  it('inherits an owning source version without overriding item metadata', async () => {
    const root = await createFixture({
      'ui/sidebar/component.config.ts': `
        export default { version: '1.2.3' }
      `,
      'ui/sidebar/sidebar.tsx': `export const Sidebar = () => null`,
      'hooks/use-copy.ts': `export const useCopy = () => undefined`,
    })

    const result = await discoverRegistryItems({
      sourceRoots: [{ path: root, version: '3.0.0-next.8' }],
    })

    expect(result.diagnostics).toEqual([])
    expect(
      Object.fromEntries(
        result.items.map((item) => [item.name, item.metadata.version]),
      ),
    ).toEqual({
      sidebar: '1.2.3',
      'use-copy': '3.0.0-next.8',
    })
  })

  it('rejects executable component config instead of evaluating it', async () => {
    const root = await createFixture({
      'ui/unsafe/component.config.ts': `
        export default {
          description: (() => { throw new Error('must not execute') })(),
        }
      `,
      'ui/unsafe/unsafe.tsx': `export const Unsafe = () => null`,
    })

    const result = await discoverRegistryItems({ sourceRoots: [root] })

    expect(result.items.find((item) => item.name === 'unsafe')?.config).toEqual(
      {},
    )
    expect(result.diagnostics).toEqual([
      expect.objectContaining({ code: 'config-not-static', severity: 'error' }),
    ])
  })

  it('discovers nested convention items and statically reads config', async () => {
    const root = await createFixture({
      'ui/sidebar/component.config.ts': `
        export default {
          description: 'Application navigation',
          preview: './sidebar.stories.tsx',
          exclude: ['internal-*.ts'],
          targets: { 'sidebar.tsx': '~/components/ui/sidebar.tsx' },
        }
      `,
      'ui/sidebar/sidebar.tsx': `export const Sidebar = () => null`,
      'ui/sidebar/sidebar.context.ts': `export const context = {}`,
      'ui/sidebar/internal-secret.ts': `export const secret = true`,
      'ui/sidebar/sidebar.test.tsx': `throw new Error('not installable')`,
      'ui/sidebar/sidebar.stories.tsx': `export default {}`,
      'ui/sidebar/sidebar.example.tsx': `export default function Example() {}`,
      'icons/index.ts': `export * from './close-icon'`,
      'icons/close-icon.tsx': `export const CloseIcon = () => null`,
      'hooks/use-copy.ts': `export const useCopy = () => undefined`,
      'blocks/settings/profile-card/component.config.ts': `
        export default { description: 'Profile card' }
      `,
      'blocks/settings/profile-card/profile-card.tsx': `export const ProfileCard = () => null`,
      'blocks/settings/profile-card/profile-card.stories.tsx': `export default {}`,
    })

    const result = await discoverRegistryItems({ sourceRoots: [root] })

    expect(result.diagnostics).toEqual([])
    expect(result.items.map((item) => [item.name, item.type])).toEqual([
      ['close-icon', 'registry:icon'],
      ['profile-card', 'registry:block'],
      ['sidebar', 'registry:ui'],
      ['use-copy', 'registry:hook'],
    ])
    const sidebar = result.items.find((item) => item.name === 'sidebar')
    expect(sidebar?.metadata).toMatchObject({
      description: 'Application navigation',
      preview: './sidebar.stories.tsx',
    })
    expect(sidebar?.filePaths.map((file) => path.basename(file))).toEqual([
      'sidebar.context.ts',
      'sidebar.tsx',
    ])
    expect(
      result.items.find((item) => item.name === 'profile-card')?.filePaths,
    ).toHaveLength(1)
    const analyzed = await analyzeItemFiles(result)
    expect(
      analyzed.items
        .find((item) => item.name === 'sidebar')
        ?.files.find((file) => file.itemRelativePath === 'sidebar.tsx')?.target,
    ).toBe('~/components/ui/sidebar.tsx')
  })

  it('aggregates a configured forms root as one component item', async () => {
    const root = await createFixture({
      'forms/component.config.ts': `
        export default { description: 'TanStack forms' }
      `,
      'forms/index.ts': `export { Form } from './form'`,
      'forms/form.tsx': `export const Form = () => null`,
      'forms/fields/text-field.tsx': `export const TextField = () => null`,
    })

    const result = await discoverRegistryItems({ sourceRoots: [root] })

    expect(result.diagnostics).toEqual([])
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toMatchObject({
      name: 'forms',
      type: 'registry:component',
      relativeDirectory: 'forms',
      metadata: { description: 'TanStack forms' },
    })
    expect(
      result.items[0].filePaths.map((file) =>
        path.relative(root, file).replaceAll(path.sep, '/'),
      ),
    ).toEqual([
      'forms/fields/text-field.tsx',
      'forms/form.tsx',
      'forms/index.ts',
    ])
  })

  it('rejects configured target selectors that match no installable file', async () => {
    const root = await createFixture({
      'ui/sidebar/component.config.ts': `
        export default {
          targets: { 'renamed-sidebar.tsx': 'ui/sidebar.tsx' },
        }
      `,
      'ui/sidebar/sidebar.tsx': `export const Sidebar = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)

    expect(analyzed.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'configured-target-source-not-found',
          itemName: 'sidebar',
          severity: 'error',
        }),
      ]),
    )
  })

  it('rejects configured files and previews that do not exist', async () => {
    const report = await validateFixture({
      'ui/sidebar/component.config.ts': `
        export default { preview: './missing.example.tsx' }
      `,
      'ui/sidebar/sidebar.tsx': `export const Sidebar = () => null`,
      'ui/navbar/component.config.ts': `
        export default { primaryFile: './missing.tsx' }
      `,
      'ui/navbar/navbar.tsx': `export const Navbar = () => null`,
      'ui/persona/component.config.ts': `
        export default { include: ['./missing.tsx'] }
      `,
      'ui/persona/persona.tsx': `export const Persona = () => null`,
    })

    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'configured-preview-not-found',
          itemName: 'sidebar',
          severity: 'error',
        }),
        expect.objectContaining({
          code: 'configured-primary-file-not-found',
          itemName: 'navbar',
          severity: 'error',
        }),
        expect.objectContaining({
          code: 'configured-include-not-found',
          itemName: 'persona',
          severity: 'error',
        }),
      ]),
    )
  })

  it('rejects injected story and test files in an installable payload', async () => {
    const root = await createFixture({
      'ui/sidebar/sidebar.tsx': `export const Sidebar = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const sidebar = graph.items.find((item) => item.name === 'sidebar')!
    const source = sidebar.files[0]
    sidebar.files.push(
      {
        ...source,
        path: 'ui/sidebar/sidebar.stories.tsx',
        itemRelativePath: 'sidebar.stories.tsx',
      },
      {
        ...source,
        path: 'ui/sidebar/sidebar.test.tsx',
        itemRelativePath: 'sidebar.test.tsx',
      },
    )

    const report = validateRegistry(graph)

    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'non-installable-file-in-payload',
          filePath: 'ui/sidebar/sidebar.stories.tsx',
        }),
        expect.objectContaining({
          code: 'non-installable-file-in-payload',
          filePath: 'ui/sidebar/sidebar.test.tsx',
        }),
      ]),
    )
  })

  it('rejects duplicate item names within a style', async () => {
    const root = await createFixture({
      'ui/sidebar/sidebar.tsx': `export const Sidebar = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    graph.items.push({
      ...graph.items[0],
      id: 'default:duplicate-sidebar',
      sourceDirectory: path.join(root, 'ui', 'duplicate-sidebar'),
    })

    const report = validateRegistry(graph)

    expect(report.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'duplicate-item-name',
        itemName: 'sidebar',
        severity: 'error',
      }),
    )
  })

  it('rejects an external import omitted from generated dependencies', async () => {
    const root = await createFixture({
      'ui/calendar/calendar.tsx': `
        import { format } from 'date-fns'
        export const Calendar = () => format(new Date(), 'yyyy-MM-dd')
      `,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const calendar = graph.items.find((item) => item.name === 'calendar')!
    calendar.dependencies = []

    const report = validateRegistry(graph)

    expect(report.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'external-package-not-generated',
        dependency: 'date-fns',
        itemName: 'calendar',
        severity: 'error',
      }),
    )
  })

  it('excludes type-test conventions and rejects any injected payload file', async () => {
    const root = await createFixture({
      'ui/sidebar/sidebar.tsx': `export const Sidebar = () => null`,
      'ui/sidebar/sidebar.types.ts': `export interface SidebarProps { open?: boolean }`,
      'ui/sidebar/sidebar.types.test-d.ts': `export type SidebarTypeTest = true`,
      'ui/sidebar/sidebar.contract.spec-d.tsx': `export type SidebarSpec = true`,
      'ui/sidebar/sidebar.behavior.type-test.ts': `export type SidebarBehaviorTest = true`,
      'ui/configured/component.config.ts': `
        export default {
          preview: './configured.test-d.ts',
          primaryFile: './configured.spec-d.tsx',
          include: ['./configured.contract.d.ts'],
        }
      `,
      'ui/configured/configured.tsx': `export const Configured = () => null`,
      'ui/configured/configured.contract.d.ts': `export interface ConfiguredContract { active: boolean }`,
      'ui/configured/configured.test-d.ts': `export type PreviewTest = true`,
      'ui/configured/configured.spec-d.tsx': `export type PrimaryTest = true`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const sidebar = discovered.items.find((item) => item.name === 'sidebar')
    const configured = discovered.items.find(
      (item) => item.name === 'configured',
    )

    expect(sidebar?.filePaths.map((file) => path.basename(file))).toEqual([
      'sidebar.tsx',
      'sidebar.types.ts',
    ])
    expect(configured?.previewPath).toBeUndefined()
    expect(configured?.primaryFilePath).toBeUndefined()
    expect(configured?.filePaths.map((file) => path.basename(file))).toEqual([
      'configured.contract.d.ts',
      'configured.tsx',
    ])
    expect(discovered.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'configured-preview-type-test' }),
        expect.objectContaining({
          code: 'configured-primary-file-type-test',
        }),
      ]),
    )

    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const resolvedSidebar = graph.items.find((item) => item.name === 'sidebar')!
    const source = resolvedSidebar.files[0]
    resolvedSidebar.files.push({
      ...source,
      path: 'ui/sidebar/sidebar.types.test-d.ts',
      itemRelativePath: 'sidebar.types.test-d.ts',
      sourcePath: path.join(root, 'ui/sidebar/sidebar.types.test-d.ts'),
    })
    const report = validateRegistry(graph)

    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'non-installable-file-in-payload',
          filePath: 'ui/sidebar/sidebar.types.test-d.ts',
        }),
      ]),
    )
  })

  it('analyzes every file and resolves cross-item and icon dependencies', async () => {
    const root = await createFixture({
      'ui/button/button.tsx': `export const Button = () => null`,
      'ui/button/index.ts': `export { Button } from './button'`,
      'ui/sidebar/sidebar.context.ts': `export const sidebarContext = {}`,
      'ui/sidebar/sidebar.tsx': `
        'use client'
        import { Button } from '../button'
        import { sidebarContext } from './sidebar.context.js'
        import { CloseIcon } from '../../icons/index.ts'
        import { XIcon } from '#registry/default/icons'
        import type { SidebarVariantProps } from '@saas-ui/chakra-preset/slot-recipes/sidebar'
        export { cn } from '../../lib/cn'
        export const recipeKey = 'suiSidebar'
        export const Sidebar = () => [Button, CloseIcon, XIcon, sidebarContext]
      `,
      'icons/index.ts': `export * from './close-icon'; export * from './x-icon'`,
      'icons/close-icon.tsx': `export const CloseIcon = () => null`,
      'icons/x-icon.tsx': `export const XIcon = () => null`,
      'lib/cn.ts': `export const cn = (...values: string[]) => values.join(' ')`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const sidebar = graph.items.find((item) => item.name === 'sidebar')

    expect(sidebar?.files).toHaveLength(2)
    expect(sidebar?.client).toBe(true)
    expect(sidebar?.files.every((file) => file.hash.length === 64)).toBe(true)
    expect(sidebar?.externalPackages).toEqual(['@saas-ui/chakra-preset'])
    expect(sidebar?.presetImports).toEqual([
      '@saas-ui/chakra-preset/slot-recipes/sidebar',
    ])
    expect(sidebar?.recipeReferences).toEqual(['suiSidebar'])
    expect(sidebar?.iconDependencies).toEqual(['close-icon', 'x-icon'])
    expect(sidebar?.registryDependencies).toEqual([
      'button',
      'close-icon',
      'cn',
      'x-icon',
    ])
    expect(graph.diagnostics).toEqual([])
  })

  it('reports parser errors, missing dependencies, cycles and policy violations', async () => {
    const root = await createFixture({
      'ui/public-one/component.config.ts': `
        export default {}
      `,
      'ui/public-one/public-one.tsx': `
        import { Core } from '@saas-ui/core/sidebar'
        import { Legacy } from '@saas-ui/react/sidebar'
        import { PrivateTwo } from '../private-two/private-two'
        export const PublicOne = <div>{Core}{Legacy}{PrivateTwo}</div>
      `,
      'ui/private-two/component.config.ts': `export default { private: true }`,
      'ui/private-two/private-two.tsx': `
        import { PublicOne } from '../public-one/public-one'
        export const PrivateTwo = PublicOne
      `,
      'ui/broken/broken.tsx': `export const broken = {`,
      'ui/missing-import/missing-import.tsx': `
        import { Missing } from '../does-not-exist'
        export const MissingImport = Missing
      `,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    graph.items
      .find((item) => item.name === 'public-one')
      ?.registryDependencies.push('missing-valid', '../raw/path.tsx')
    const report = validateRegistry(graph)

    expect(report.valid).toBe(false)
    expect(report.diagnostics.map((diagnostic) => diagnostic.code)).toEqual(
      expect.arrayContaining([
        'source-syntax-error',
        'module-not-found',
        'invalid-registry-dependency',
        'registry-dependency-not-found',
        'public-item-depends-on-private-item',
        'forbidden-template-package',
        'registry-dependency-cycle',
      ]),
    )
    expect(
      graph.items.find((item) => item.name === 'public-one')
        ?.registryDependencies,
    ).toEqual(expect.arrayContaining(['missing-valid', '../raw/path.tsx']))
    expect(
      report.diagnostics
        .filter(
          (diagnostic) => diagnostic.code === 'forbidden-template-package',
        )
        .map((diagnostic) => diagnostic.dependency),
    ).toEqual(['@saas-ui/core'])
  })

  it('validates later dependencies and exempts provided runtime packages', async () => {
    const root = await createFixture({
      'ui/alpha/alpha.tsx': `
        import React from 'react'
        import { Zulu } from '../zulu/zulu'
        export const Alpha = () => React.createElement(Zulu)
      `,
      'ui/zulu/zulu.tsx': `export const Zulu = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed, {
      externalPackages: ['react'],
    })
    const report = validateRegistry(graph)

    expect(report.valid).toBe(true)
    expect(
      report.diagnostics.some(
        (diagnostic) =>
          diagnostic.code === 'registry-dependency-not-found' ||
          diagnostic.code === 'external-package-not-generated',
      ),
    ).toBe(false)
    expect(
      graph.items.find((item) => item.name === 'alpha')?.dependencies,
    ).toEqual([])
  })

  it('validates collected recipe references when preset keys are supplied', async () => {
    const root = await createFixture({
      'ui/sidebar/sidebar.tsx': `
        export const recipes = ['suiSidebar', 'suiMissingRecipe']
      `,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const report = validateRegistry(graph, {
      presetRecipeKeys: ['suiSidebar'],
    })

    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'preset-recipe-not-found',
          dependency: 'suiMissingRecipe',
        }),
      ]),
    )
  })

  it('rewrites checked icon barrel imports to the exact installable icons', async () => {
    const root = await createFixture({
      'ui/accordion/accordion.tsx': `
        import { ChevronRightIcon as Chevron } from '#registry/default/icons'
        export const Accordion = () => Chevron
      `,
      'icons/index.ts': `
        export * from './chevron-right-icon'
        export * from './close-icon'
      `,
      'icons/chevron-right-icon.tsx': `export const ChevronRightIcon = () => null`,
      'icons/close-icon.tsx': `export const CloseIcon = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const accordion = graph.items.find((item) => item.name === 'accordion')

    expect(accordion?.registryDependencies).toEqual(['chevron-right-icon'])
    expect(accordion?.iconDependencies).toEqual(['chevron-right-icon'])
    expect(accordion?.files[0].content).toContain(
      "{ ChevronRightIcon as Chevron } from '#registry/default/icons/chevron-right-icon'",
    )
    expect(accordion?.files[0].content).not.toContain(
      "from '#registry/default/icons'",
    )
    expect(graph.diagnostics).toEqual([])
  })

  it('never suppresses unsupported checked icon barrel imports', async () => {
    const root = await createFixture({
      'ui/unsafe-icons/unsafe-icons.tsx': `
        import * as Icons from '../../icons/index'
        export const UnsafeIcons = Icons
      `,
      'icons/index.ts': `export * from './close-icon'`,
      'icons/close-icon.tsx': `export const CloseIcon = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)

    expect(graph.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'icon-barrel-import-unsupported' }),
        expect.objectContaining({ code: 'import-outside-registry-item' }),
      ]),
    )
  })

  it('validates direct preset recipe imports against preset recipe keys', async () => {
    const root = await createFixture({
      'ui/sidebar/sidebar.tsx': `
        import { sidebarSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/sidebar'
        export const recipeKey = 'suiSidebar'
        export const recipe = sidebarSlotRecipe
      `,
      'ui/key-only/key-only.tsx': `
        export const recipeKey = 'suiSidebar'
      `,
      'ui/unknown/unknown.tsx': `
        import { unknownSlotRecipe } from '@saas-ui/chakra-preset/slot-recipes/unknown'
        export const recipe = unknownSlotRecipe
      `,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const report = validateRegistry(graph, {
      presetRecipeKeys: ['suiSidebar'],
    })

    expect(
      graph.items.find((item) => item.name === 'sidebar')?.presetRecipeBindings,
    ).toEqual(['sidebar'])
    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'preset-recipe-binding-not-found',
          dependency: 'unknown',
        }),
        expect.objectContaining({
          code: 'preset-recipe-not-directly-bound',
          dependency: 'suiSidebar',
          itemName: 'key-only',
        }),
      ]),
    )
    expect(
      report.diagnostics.some(
        (diagnostic) =>
          diagnostic.code === 'preset-recipe-binding-not-found' &&
          diagnostic.itemName === 'sidebar',
      ),
    ).toBe(false)
    expect(
      report.diagnostics.some(
        (diagnostic) =>
          diagnostic.code === 'preset-recipe-not-directly-bound' &&
          diagnostic.itemName === 'sidebar',
      ),
    ).toBe(false)
  })

  it('rejects config syntax errors, unknown keys and privacy typos', async () => {
    const root = await createFixture({
      'ui/syntax/component.config.ts': `export default { description: `,
      'ui/syntax/syntax.tsx': `export const Syntax = () => null`,
      'ui/privacy/component.config.ts': `
        export default { isPrivate: true, unexpected: 'value' }
      `,
      'ui/privacy/privacy.tsx': `export const Privacy = () => null`,
    })
    const result = await discoverRegistryItems({ sourceRoots: [root] })

    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'config-syntax-error' }),
        expect.objectContaining({
          code: 'config-unknown-key',
          message: expect.stringContaining('use "private" instead'),
        }),
      ]),
    )
    expect(
      result.items.find((item) => item.name === 'privacy')?.config,
    ).toEqual({})
  })

  it('validates dependency version overrides and rejects unused overrides', async () => {
    const root = await createFixture({
      'ui/valid/component.config.ts': `
        export default { dependencyVersions: { '@dnd-kit/core': '^6.3.1' } }
      `,
      'ui/valid/valid.tsx': `
        import { DndContext } from '@dnd-kit/core'
        export const Valid = DndContext
      `,
      'ui/bad-key/component.config.ts': `
        export default { dependencyVersions: { '@scope/pkg@1': '^1.0.0' } }
      `,
      'ui/bad-key/bad-key.tsx': `export const BadKey = () => null`,
      'ui/bad-selector/component.config.ts': `
        export default { dependencyVersions: { '@scope/pkg': 'latest' } }
      `,
      'ui/bad-selector/bad-selector.tsx': `export const BadSelector = () => null`,
      'ui/unused/component.config.ts': `
        export default { dependencyVersions: { '@scope/pkg': '~1.2' } }
      `,
      'ui/unused/unused.tsx': `export const Unused = () => null`,
    })

    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    expect(
      discovered.diagnostics.filter(
        (diagnostic) => diagnostic.code === 'config-invalid',
      ),
    ).toHaveLength(2)

    const graph = resolveDependencyGraph(await analyzeItemFiles(discovered))
    expect(
      graph.items.find((item) => item.name === 'valid')?.dependencies,
    ).toEqual(['@dnd-kit/core@^6.3.1'])
    expect(graph.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'unused-dependency-version',
        dependency: '@scope/pkg',
        itemName: 'unused',
        severity: 'error',
      }),
    )
  })

  it('rejects compiler-owned config fields and validates authored exceptions', async () => {
    const root = await createFixture({
      'ui/bad-name/component.config.ts': `export default { name: 'Bad Name' }`,
      'ui/bad-name/bad-name.tsx': `export const BadName = () => null`,
      'ui/bad-version/component.config.ts': `export default { version: '1.0' }`,
      'ui/bad-version/bad-version.tsx': `export const BadVersion = () => null`,
      'ui/bad-dependency/component.config.ts': `export default { dependencies: ['https://example.com/pkg'] }`,
      'ui/bad-dependency/bad-dependency.tsx': `export const BadDependency = () => null`,
      'ui/bad-dev-dependency/component.config.ts': `export default { devDependencies: ['../pkg'] }`,
      'ui/bad-dev-dependency/bad-dev-dependency.tsx': `export const BadDevDependency = () => null`,
      'ui/bad-file-type/component.config.ts': `export default { files: [{ path: './bad-file-type.tsx', type: 'registry:unknown' }] }`,
      'ui/bad-file-type/bad-file-type.tsx': `export const BadFileType = () => null`,
      'ui/bad-target/component.config.ts': `export default { targets: { 'bad-target.tsx': '../escape.tsx' } }`,
      'ui/bad-target/bad-target.tsx': `export const BadTarget = () => null`,
      'ui/BadDirectory/BadDirectory.tsx': `export const BadDirectory = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const report = validateRegistry(graph)

    expect(
      discovered.diagnostics.filter(
        (diagnostic) => diagnostic.code === 'config-invalid',
      ),
    ).toHaveLength(2)
    expect(
      discovered.diagnostics.filter(
        (diagnostic) => diagnostic.code === 'config-unknown-key',
      ),
    ).toHaveLength(4)
    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'normalized-item-schema-invalid',
          itemName: 'BadDirectory',
        }),
        expect.objectContaining({
          code: 'invalid-item-name',
          itemName: 'BadDirectory',
        }),
      ]),
    )
  })

  it('preserves valid chunks while inferring installable files', async () => {
    const root = await createFixture({
      'blocks/cards/summary/component.config.ts': `
        export default {
          chunks: [{
            name: 'summary-card',
            description: 'Summary card',
            component: 'SummaryCard',
            file: 'summary.tsx',
          }],
        }
      `,
      'blocks/cards/summary/summary.tsx': `export const SummaryCard = () => null`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const summary = analyzed.items.find((item) => item.name === 'summary')

    expect(discovered.diagnostics).toEqual([])
    expect(summary?.metadata.chunks).toEqual([
      expect.objectContaining({ name: 'summary-card', file: 'summary.tsx' }),
    ])
    expect(summary?.files.map((file) => file.itemRelativePath)).toEqual([
      'summary.tsx',
    ])
  })

  it('rejects compiler-owned files and cross-item include capture', async () => {
    const root = await createFixture({
      'ui/traversal/component.config.ts': `
        export default { files: [{ path: '../owned/owned.tsx', type: 'registry:ui' }] }
      `,
      'ui/traversal/traversal.tsx': `export const Traversal = () => null`,
      'ui/capture/component.config.ts': `
        export default { files: [{ path: 'ui/owned/owned.tsx', type: 'registry:ui' }] }
      `,
      'ui/capture/capture.tsx': `export const Capture = () => null`,
      'ui/include-capture/component.config.ts': `
        export default { include: ['ui/owned'] }
      `,
      'ui/include-capture/include-capture.tsx': `export const IncludeCapture = () => null`,
      'ui/symlink/component.config.ts': `
        export default { files: [{ path: './linked.tsx', type: 'registry:ui' }] }
      `,
      'ui/symlink/source.tsx': `export const Source = () => null`,
      'ui/owned/owned.tsx': `export const Owned = () => null`,
    })
    await fs.symlink(
      path.join(root, 'ui/symlink/source.tsx'),
      path.join(root, 'ui/symlink/linked.tsx'),
    )

    const result = await discoverRegistryItems({ sourceRoots: [root] })

    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'config-unknown-key' }),
        expect.objectContaining({ code: 'configured-include-outside-item' }),
      ]),
    )
    expect(
      result.items
        .find((item) => item.name === 'capture')
        ?.filePaths.map((file) => path.basename(file)),
    ).toEqual(['capture.tsx'])
    expect(
      result.items
        .find((item) => item.name === 'symlink')
        ?.filePaths.map((file) => path.basename(file)),
    ).toEqual(['source.tsx'])
  })

  it('mirrors Pro layouts with an explicit style and nested hook convention', async () => {
    const root = await createFixture({
      'blocks/sidebar-layouts/sidebar1/component.config.ts': `
        export default {
          private: false,
          description: 'Sidebar with inset variant.',
          version: '1.1.0',
          category: 'Application',
          subcategory: 'Layouts',
          canvas: { center: true, height: '600px' },
        }
      `,
      'blocks/sidebar-layouts/sidebar1/sidebar1.tsx': `export const Sidebar1 = () => null`,
      'blocks/sidebar-layouts/sidebar1/sidebar1.stories.tsx': `export default {}`,
      'blocks/communication/chat-details/component.config.ts': `
        export default {
          description: 'A panel with chat bubbles',
          version: '1.1.0',
          category: 'Application',
          subcategory: 'Communication',
          canvas: { center: true },
        }
      `,
      'blocks/communication/chat-details/chat-details.tsx': `export const ChatDetails = () => null`,
      'blocks/communication/chat-details/chat-details.stories.tsx': `export default {}`,
      'blocks/hooks/use-open-state.ts': `export const useOpenState = () => true`,
      'blocks/story-canvas.tsx': `export const StoryCanvas = () => null`,
      'blocks/templates/writer/writer.stories.tsx': `export default {}`,
    })
    const discovered = await discoverRegistryItems({
      sourceRoots: [{ path: root, style: 'pro' }],
    })
    const analyzed = await analyzeItemFiles(discovered)

    expect(discovered.diagnostics).toEqual([])
    expect(
      discovered.items.map((item) => [item.name, item.type, item.style]),
    ).toEqual([
      ['chat-details', 'registry:block', 'pro'],
      ['sidebar1', 'registry:block', 'pro'],
      ['use-open-state', 'registry:hook', 'pro'],
    ])
    expect(
      analyzed.items
        .find((item) => item.name === 'sidebar1')
        ?.files.map((file) => file.itemRelativePath),
    ).toEqual(['sidebar1.tsx'])
  })

  it('keeps ui/icons as one UI item while classifying block hooks', async () => {
    const root = await createFixture({
      'ui/icons/create-icon.tsx': `export const createIcon = () => null`,
      'ui/icons/icons.tsx': `
        import { createIcon } from './create-icon'
        export const Icons = createIcon
      `,
      'ui/icons/index.ts': `export * from './create-icon'; export * from './icons'`,
      'blocks/hooks/use-open-state.ts': `export const useOpenState = () => true`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)
    const graph = resolveDependencyGraph(analyzed)
    const uiIcons = discovered.items.filter((item) => item.name === 'icons')

    expect(uiIcons).toHaveLength(1)
    expect(uiIcons[0]).toMatchObject({ type: 'registry:ui' })
    expect(uiIcons[0].filePaths.map((file) => path.basename(file))).toEqual([
      'create-icon.tsx',
      'icons.tsx',
      'index.ts',
    ])
    expect(
      discovered.items.find((item) => item.name === 'use-open-state'),
    ).toMatchObject({ type: 'registry:hook' })
    expect(
      graph.items.find((item) => item.name === 'icons')?.iconDependencies,
    ).toEqual([])
    expect(
      graph.diagnostics.some(
        (diagnostic) => diagnostic.code === 'icon-dependency-not-found',
      ),
    ).toBe(false)
  })

  it('rejects Pro file overrides and infers each block from its directory', async () => {
    const root = await createFixture({
      'blocks/files/files-list-card/component.config.ts': `
        export default {
          private: true,
          description: 'A card that displays a list of files',
          version: '1.1.0',
          category: 'Application',
          subcategory: 'Files',
          files: [
            { path: 'blocks/drawers/add-contact-drawer/add-contact-drawer.tsx', type: 'registry:component' },
            { path: 'blocks/drawers/add-contact-drawer/add-contact-drawer.stories.tsx', type: 'registry:story' },
          ],
          canvas: { center: true },
        }
      `,
      'blocks/files/files-list-card/files-list-card.tsx': `export const FilesListCard = () => null`,
      'blocks/files/file-cards/component.config.ts': `
        export default {
          private: true,
          description: 'A list of file cards',
          version: '1.1.0',
          category: 'Application',
          subcategory: 'Files',
          files: [
            { path: 'blocks/drawers/add-contact-drawer/add-contact-drawer.tsx', type: 'registry:component' },
            { path: 'blocks/drawers/add-contact-drawer/add-contact-drawer.stories.tsx', type: 'registry:story' },
          ],
          canvas: { center: true },
        }
      `,
      'blocks/files/file-cards/file-cards.tsx': `export const FileCards = () => null`,
      'blocks/drawers/add-contact-drawer/add-contact-drawer.tsx': `export const AddContactDrawer = () => null`,
      'blocks/drawers/add-contact-drawer/add-contact-drawer.stories.tsx': `export default {}`,
    })
    const discovered = await discoverRegistryItems({
      sourceRoots: [{ path: root, style: 'pro' }],
    })
    const rejectedOverrides = discovered.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'config-unknown-key',
    )

    expect(rejectedOverrides).toHaveLength(2)
    expect(
      discovered.items
        .find((item) => item.name === 'file-cards')
        ?.filePaths.map((file) => path.basename(file)),
    ).toEqual(['file-cards.tsx'])
    expect(
      discovered.items
        .find((item) => item.name === 'files-list-card')
        ?.filePaths.map((file) => path.basename(file)),
    ).toEqual(['files-list-card.tsx'])
  })

  it('proves renderable defaults for install files and explicit previews', async () => {
    const root = await createFixture({
      'ui/renderable/component.config.ts': `
        export default { preview: './renderable.preview.tsx' }
      `,
      'ui/renderable/renderable.tsx': `
        const Renderable = () => null
        export default Renderable
      `,
      'ui/renderable/renderable.preview.tsx': `
        const Preview = () => null
        export default Preview
      `,
      'ui/story-meta/component.config.ts': `
        export default { preview: './story-meta.preview.tsx' }
      `,
      'ui/story-meta/story-meta.tsx': `export const StoryMeta = () => null`,
      'ui/story-meta/story-meta.preview.tsx': `export default { title: 'Meta' }`,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const analyzed = await analyzeItemFiles(discovered)

    expect(
      analyzed.items.find((item) => item.name === 'renderable')?.files[0]
        .hasRenderableDefaultExport,
    ).toBe(true)
    expect(
      analyzed.items.find((item) => item.name === 'renderable')
        ?.previewAnalysis,
    ).toMatchObject({ hasRenderableDefaultExport: true })
    expect(
      analyzed.items.find((item) => item.name === 'story-meta')
        ?.previewAnalysis,
    ).toMatchObject({ hasRenderableDefaultExport: false })
  })

  it('accepts external preview ids without resolving them as files', async () => {
    const root = await createFixture({
      'blocks/add-contact-drawer/component.config.ts': `
        export default {
          preview: 'blocks-drawers-add-contact-drawer--default',
        }
      `,
      'blocks/add-contact-drawer/add-contact-drawer.tsx': `
        export const AddContactDrawer = () => null
      `,
    })
    const discovered = await discoverRegistryItems({ sourceRoots: [root] })
    const item = discovered.items.find(
      (candidate) => candidate.name === 'add-contact-drawer',
    )
    const analyzed = await analyzeItemFiles(discovered)
    const report = validateRegistry(resolveDependencyGraph(analyzed))

    expect(item?.previewPath).toBeUndefined()
    expect(item?.metadata.preview).toBe(
      'blocks-drawers-add-contact-drawer--default',
    )
    expect(report.valid).toBe(true)
    expect(report.diagnostics).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'configured-preview-not-found' }),
      ]),
    )
  })

  describe('exclusive alternative metadata', () => {
    it('accepts provider alternatives with a shared target', async () => {
      const report = await validateFixture({
        'setup/provider/component.config.ts': `
          export default {
            targets: {
              'provider.tsx': 'components/setup/provider/provider.tsx',
            },
            meta: {
              exclusiveGroup: 'provider',
              exclusiveDefault: true,
              conflicts: ['provider-no-color-mode'],
            },
          }
        `,
        'setup/provider/provider.tsx': `export const Provider = () => null`,
        'setup/provider-no-color-mode/component.config.ts': `
          export default {
            targets: {
              'provider-no-color-mode.tsx':
                'components/setup/provider/provider.tsx',
            },
            meta: {
              exclusiveGroup: 'provider',
              conflicts: ['provider'],
            },
          }
        `,
        'setup/provider-no-color-mode/provider-no-color-mode.tsx': `export const Provider = () => null`,
      })

      expect(report.valid).toBe(true)
      expect(
        report.diagnostics.filter((diagnostic) =>
          diagnostic.code.includes('exclusive'),
        ),
      ).toEqual([])
      expect(
        report.diagnostics.some(
          (diagnostic) => diagnostic.code === 'install-all-target-collision',
        ),
      ).toBe(false)
    })

    it('rejects arbitrary authored metadata outside the exclusivity contract', async () => {
      const root = await createFixture({
        'setup/provider/component.config.ts': `
          export default {
            meta: {
              exclusiveGroup: 'provider',
              analyticsLabel: 'plain-provider',
            },
          }
        `,
        'setup/provider/provider.tsx': `export const Provider = () => null`,
      })
      const discovered = await discoverRegistryItems({ sourceRoots: [root] })

      expect(discovered.diagnostics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: 'config-unknown-key',
            filePath: expect.stringContaining('component.config.ts'),
          }),
        ]),
      )
    })

    it.each([
      {
        label: 'empty group',
        meta: `{ exclusiveGroup: '', exclusiveDefault: true }`,
        code: 'invalid-exclusive-group',
      },
      {
        label: 'non-normalized group',
        meta: `{ exclusiveGroup: ' provider ', exclusiveDefault: true }`,
        code: 'invalid-exclusive-group',
      },
      {
        label: 'non-string group',
        meta: `{ exclusiveGroup: 42, exclusiveDefault: true }`,
        code: 'invalid-exclusive-group',
      },
      {
        label: 'non-boolean default',
        meta: `{ exclusiveGroup: 'provider', exclusiveDefault: 'yes' }`,
        code: 'invalid-exclusive-default',
      },
    ])('rejects $label metadata', async ({ meta, code }) => {
      const report = await validateFixture({
        'setup/provider/component.config.ts': `
          export default { meta: ${meta} }
        `,
        'setup/provider/provider.tsx': `export const Provider = () => null`,
      })

      expect(report.valid).toBe(false)
      expect(report.diagnostics).toEqual(
        expect.arrayContaining([expect.objectContaining({ code })]),
      )
    })

    it.each([
      {
        label: 'no default',
        alphaDefault: '',
        betaDefault: '',
        code: 'exclusive-group-missing-default',
      },
      {
        label: 'multiple defaults',
        alphaDefault: 'exclusiveDefault: true,',
        betaDefault: 'exclusiveDefault: true,',
        code: 'exclusive-group-multiple-defaults',
      },
    ])(
      'rejects an exclusive group with $label',
      async ({ alphaDefault, betaDefault, code }) => {
        const report = await validateFixture({
          'setup/alpha/component.config.ts': `
            export default {
              meta: {
                exclusiveGroup: 'provider',
                ${alphaDefault}
                conflicts: ['beta'],
              },
            }
          `,
          'setup/alpha/alpha.tsx': `export const Alpha = () => null`,
          'setup/beta/component.config.ts': `
            export default {
              meta: {
                exclusiveGroup: 'provider',
                ${betaDefault}
                conflicts: ['alpha'],
              },
            }
          `,
          'setup/beta/beta.tsx': `export const Beta = () => null`,
        })

        expect(report.valid).toBe(false)
        expect(report.diagnostics).toEqual(
          expect.arrayContaining([expect.objectContaining({ code })]),
        )
      },
    )

    it('accepts a singleton group without an explicit default', async () => {
      const report = await validateFixture({
        'setup/provider/component.config.ts': `
          export default { meta: { exclusiveGroup: 'provider' } }
        `,
        'setup/provider/provider.tsx': `export const Provider = () => null`,
      })

      expect(report.valid).toBe(true)
    })

    it.each([true, false])(
      'rejects exclusiveDefault=%s without a group',
      async (exclusiveDefault) => {
        const report = await validateFixture({
          'setup/provider/component.config.ts': `
            export default { meta: { exclusiveDefault: ${exclusiveDefault} } }
          `,
          'setup/provider/provider.tsx': `export const Provider = () => null`,
        })

        expect(report.diagnostics).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code: 'exclusive-default-without-group',
            }),
          ]),
        )
      },
    )

    it.each([
      {
        label: 'a non-array conflict list',
        alphaConflicts: `'beta'`,
        betaConflicts: `['alpha']`,
        code: 'invalid-exclusive-conflicts',
      },
      {
        label: 'a duplicate conflict',
        alphaConflicts: `['beta', 'beta']`,
        betaConflicts: `['alpha']`,
        code: 'duplicate-exclusive-conflict',
      },
      {
        label: 'a non-normalized conflict',
        alphaConflicts: `[' beta ']`,
        betaConflicts: `['alpha']`,
        code: 'invalid-exclusive-conflict',
      },
      {
        label: 'a non-string conflict',
        alphaConflicts: `[42]`,
        betaConflicts: `['alpha']`,
        code: 'invalid-exclusive-conflict',
      },
      {
        label: 'a missing same-style target',
        alphaConflicts: `['missing']`,
        betaConflicts: `['alpha']`,
        code: 'exclusive-conflict-not-found',
      },
      {
        label: 'a one-way conflict',
        alphaConflicts: `['beta']`,
        betaConflicts: `[]`,
        code: 'exclusive-conflict-not-reciprocal',
      },
    ])('rejects $label', async ({ alphaConflicts, betaConflicts, code }) => {
      const report = await validateFixture({
        'setup/alpha/component.config.ts': `
            export default {
              meta: {
                exclusiveGroup: 'provider',
                exclusiveDefault: true,
                conflicts: ${alphaConflicts},
              },
            }
          `,
        'setup/alpha/alpha.tsx': `export const Alpha = () => null`,
        'setup/beta/component.config.ts': `
            export default {
              meta: {
                exclusiveGroup: 'provider',
                conflicts: ${betaConflicts},
              },
            }
          `,
        'setup/beta/beta.tsx': `export const Beta = () => null`,
      })

      expect(report.valid).toBe(false)
      expect(report.diagnostics).toEqual(
        expect.arrayContaining([expect.objectContaining({ code })]),
      )
    })

    it('does not resolve a conflict target from another style', async () => {
      const defaultRoot = await createFixture({
        'setup/alpha/component.config.ts': `
          export default { meta: { conflicts: ['beta'] } }
        `,
        'setup/alpha/alpha.tsx': `export const Alpha = () => null`,
      })
      const proRoot = await createFixture(
        {
          'setup/beta/component.config.ts': `
            export default { meta: { conflicts: ['alpha'] } }
          `,
          'setup/beta/beta.tsx': `export const Beta = () => null`,
        },
        'pro',
      )
      const discovered = await discoverRegistryItems({
        sourceRoots: [defaultRoot, proRoot],
      })
      const analyzed = await analyzeItemFiles(discovered)
      const report = validateRegistry(resolveDependencyGraph(analyzed))

      expect(
        report.diagnostics.filter(
          (diagnostic) => diagnostic.code === 'exclusive-conflict-not-found',
        ),
      ).toHaveLength(2)
    })

    it.each([
      {
        label: 'private',
        directory: 'setup',
        privateField: 'private: true,',
      },
      {
        label: 'non-installable',
        directory: 'examples',
        privateField: '',
      },
    ])(
      'rejects a $label exclusive default',
      async ({ directory, privateField }) => {
        const report = await validateFixture({
          [`${directory}/private-default/component.config.ts`]: `
            export default {
              ${privateField}
              meta: {
                exclusiveGroup: 'provider',
                exclusiveDefault: true,
              },
            }
          `,
          [`${directory}/private-default/private-default.tsx`]: `export const PrivateDefault = () => null`,
        })

        expect(report.valid).toBe(false)
        expect(report.diagnostics).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code: 'exclusive-default-not-public-installable',
            }),
          ]),
        )
      },
    )

    it('rejects conflicts and target collisions selected by install-all', async () => {
      const report = await validateFixture({
        'setup/alpha/component.config.ts': `
            export default {
              targets: { 'alpha.tsx': 'components/setup/shared.tsx' },
              meta: {
                exclusiveGroup: 'singleton',
                conflicts: ['beta'],
              },
            }
          `,
        'setup/alpha/alpha.tsx': `export const Alpha = () => null`,
        'setup/beta/component.config.ts': `
            export default {
              targets: { 'beta.tsx': 'components/setup/shared.tsx' },
              meta: { conflicts: ['alpha'] },
            }
          `,
        'setup/beta/beta.tsx': `export const Beta = () => null`,
      })

      expect(report.diagnostics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: 'install-all-exclusive-conflict',
          }),
          expect.objectContaining({ code: 'install-all-target-collision' }),
        ]),
      )
    })
  })
})
