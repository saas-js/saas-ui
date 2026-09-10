import { parse } from '@babel/parser'
import { generateHelpTextForAllCommands } from '@stricli/core'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { app } from '../../src/app'
import {
  createCommandMigrationPackageAdapter,
  resolveReactToRegistryTarget,
} from '../../src/commands/migrate/react-to-registry/impl'
import type { Config } from '../../src/utils/get-config'
import {
  formatMigrationReport,
  migrateReactToRegistry,
  transformReactToRegistrySource,
} from '../../src/utils/migrations/react-to-registry'
import {
  canonicalRegistryItemExports,
  canonicalSetupItemExports,
  chakraReactExports,
  chakraStyledSystemExports,
  defaultRegistryExportMap,
  presetLegacyExports,
  unsupportedLegacyExports,
  verifyLegacyExportProvenance,
} from '../../src/utils/migrations/react-to-registry-mapping'
import type { MigrationPackageAdapter } from '../../src/utils/migrations/react-to-registry-packages'
import { SUPPORTED_PRESET_VERSION } from '../../src/utils/package-compatibility'

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../..',
)

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

async function fixture(files: Record<string, string>) {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'sui-migrate-'))
  const contents = {
    'package.json': `${JSON.stringify(
      {
        name: 'migration-fixture',
        private: true,
        dependencies: { '@saas-ui/react': 'workspace:*' },
      },
      null,
      2,
    )}\n`,
    ...files,
  }
  for (const [name, content] of Object.entries(contents)) {
    const target = path.join(cwd, name)
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, content, 'utf8')
  }
  return cwd
}

function transform(source: string) {
  return transformReactToRegistrySource({
    config,
    filePath: 'src/example.tsx',
    source,
  })
}

describe('react-to-registry source migration', () => {
  it('is registered as a nested command with kebab-case flags', () => {
    const help = generateHelpTextForAllCommands(app)
      .map(([route, documentation]) => `${route}\n${documentation}`)
      .join('\n')

    expect(help).toContain('migrate react-to-registry')
    expect(help).toContain('--dry-run')
    expect(help).not.toContain('--dryRun')
  })

  it('splits mixed primitive and registry imports and coalesces Chakra imports', () => {
    const result = transform(`import { Box } from '@chakra-ui/react'
import { Button, Box as LayoutBox, Sidebar } from '@saas-ui/react'

export { Box, Button, LayoutBox, Sidebar }
`)

    expect(result.report.diagnostics).toEqual([])
    expect(result.report.requestedItems).toEqual(['sidebar'])
    expect(result.output).not.toContain(`from '@saas-ui/react'`)
    expect(result.output).toContain(
      `import { Box, Button, Box as LayoutBox } from '@chakra-ui/react'`,
    )
    expect(result.output).toContain(
      `import { Sidebar } from '@/components/ui/sidebar'`,
    )
  })

  it('preserves aliases and type-only bindings', () => {
    const result = transform(`import type {
  SearchInputProps as SearchProps,
  BoxProps as PrimitiveProps,
} from '@saas-ui/react'

export type Pair = [SearchProps, PrimitiveProps]
`)

    expect(result.output).toContain(
      `import type { SearchInputProps as SearchProps } from '@/components/ui/search-input'`,
    )
    expect(result.output).toContain(
      `import type { BoxProps as PrimitiveProps } from '@chakra-ui/react'`,
    )
    expect(result.report.requestedItems).toEqual(['search-input'])
  })

  it.each([
    ['button value/type', 'Button, type ButtonProps'],
    ['input grouped exports', 'Input, type InputProps, InputPropsProvider'],
    ['input-group value/type', 'InputGroup, type InputGroupProps'],
    ['portal value/type', 'Portal, type PortalProps'],
    ['checkbox grouped value/type', 'CheckboxGroup, type CheckboxGroupProps'],
    ['radio group', 'RadioGroup'],
    [
      'root components and props',
      'NativeSelectRoot, RadioCardRoot, type AlertRootProps, type ProgressRootProps, type StepsRootProps, type TableRootProps',
    ],
  ])(
    'routes direct Chakra provenance for %s without templates',
    (_label, bindings) => {
      const result = transform(`import { ${bindings} } from '@saas-ui/react'\n`)

      expect(result.report.diagnostics).toEqual([])
      expect(result.report.requestedItems).toEqual([])
      expect(result.output).toContain(`from '@chakra-ui/react'`)
      expect(result.output).not.toContain(`@/components/`)
      expect(result.output).not.toContain(`@saas-ui/react`)
    },
  )

  it('routes the historical composed Persona component and props together', () => {
    const result = transform(`import {
  Persona as UserPersona,
  type PersonaProps as UserPersonaProps,
} from '@saas-ui/react'
`)

    expect(result.report.diagnostics).toEqual([])
    expect(result.report.requestedItems).toEqual(['persona'])
    expect(result.output).toContain(
      `import { Persona as UserPersona, type PersonaProps as UserPersonaProps } from '@/components/ui/persona/persona-composed'`,
    )
  })

  it.each([
    ['Sidebar', 'sidebar'],
    ['Navbar', 'navbar'],
    ['GridList', 'grid-list'],
    ['SearchInput', 'search-input'],
    ['IconBadge', 'icon-badge'],
    ['createIcon', 'icons'],
    ['Theme', 'theme'],
  ])(
    'requests the %s custom composition from the registry',
    (exportName, item) => {
      const result = transform(
        `import { ${exportName} as LocalComponent } from '@saas-ui/react'\n`,
      )

      expect(result.report.diagnostics).toEqual([])
      expect(result.report.requestedItems).toEqual([item])
      expect(result.output).toContain(
        `import { ${exportName} as LocalComponent } from '@/components/ui/${item}'`,
      )
    },
  )

  it('routes Theme and ThemeProps to the portable local template', () => {
    const result = transform(`import {
  Theme as NestedTheme,
  type ThemeProps as NestedThemeProps,
} from '@saas-ui/react'

export { NestedTheme }
export type { NestedThemeProps }
`)

    expect(result.report.diagnostics).toEqual([])
    expect(result.report.requestedItems).toEqual(['theme'])
    expect(result.output).toContain(
      'import { Theme as NestedTheme, ' +
        "type ThemeProps as NestedThemeProps } from '@/components/ui/theme'",
    )
    expect(result.output).not.toContain(`from '@saas-ui/react'`)
  })

  it('routes createIcon to the portable icons template', () => {
    const result = transform(`import {
  createIcon as makeIcon,
} from '@saas-ui/react'

export const CheckIcon = makeIcon({ d: 'M4 12l5 5L20 6' })
`)

    expect(result.report.diagnostics).toEqual([])
    expect(result.report.requestedItems).toEqual(['icons'])
    expect(result.output).toContain(
      `import { createIcon as makeIcon } from '@/components/ui/icons'`,
    )
    expect(result.output).not.toContain(`from '@saas-ui/react'`)
  })

  it('keeps styled-system provenance and preset exports on their dedicated modules', () => {
    const result = transform(`import {
  chakra,
  defineRecipe,
  type HTMLChakraProps,
  type RecipeProps,
  defaultConfig,
  defaultSystem,
  type ColorPalette,
} from '@saas-ui/react'
`)

    expect(result.report.diagnostics).toEqual([])
    expect(result.report.requestedItems).toEqual([])
    expect(result.output).toContain(`from '@chakra-ui/react/styled-system'`)
    expect(result.output).toContain(`from '@saas-ui/chakra-preset'`)
    expect(result.output).toContain(`from '@saas-ui/chakra-preset/colors'`)
    expect(result.output).not.toContain(`from '@saas-ui/react'`)
  })

  it('coalesces with type-only imports without duplicates and preserves comments', () => {
    const result = transform(`import type { FlexProps } from '@chakra-ui/react'
// Keep this migration note.
import type { BoxProps, FlexProps as ExistingFlex } from '@saas-ui/react'
`)

    expect(result.report.diagnostics).toEqual([])
    expect(result.output).toContain('// Keep this migration note.')
    expect(result.output).toContain(
      `import type { FlexProps, BoxProps, FlexProps as ExistingFlex } from '@chakra-ui/react'`,
    )
    expect(result.output).not.toContain('type BoxProps')
    expect(result.output.match(/from '@chakra-ui\/react'/g)).toHaveLength(1)
  })

  it('moves the provider, provider types, color mode, and preset system', () => {
    const result = transform(`import {
  SuiProvider as AppProvider,
  type SuiProviderProps,
  defaultSystem,
  useColorMode,
} from '@saas-ui/react'

export { AppProvider, defaultSystem, useColorMode }
export type { SuiProviderProps }
`)

    expect(result.output).toContain(`Provider as AppProvider`)
    expect(result.output).toContain(`type ProviderProps as SuiProviderProps`)
    expect(result.output).toContain(
      `from '@/components/setup/provider/provider'`,
    )
    expect(result.output).toContain(
      `from '@/components/setup/color-mode/color-mode'`,
    )
    expect(result.output).toContain(
      `import { defaultSystem } from '@saas-ui/chakra-preset'`,
    )
    expect(result.report.requestedItems).toEqual(['color-mode', 'provider'])
  })

  it('moves the historical SaasProvider export to the provider template', () => {
    const result = transform(`import { SaasProvider } from '@saas-ui/react'\n`)

    expect(result.report.diagnostics).toEqual([])
    expect(result.output).toContain(
      `import { Provider as SaasProvider } from '@/components/setup/provider/provider'`,
    )
    expect(result.report.requestedItems).toEqual(['color-mode', 'provider'])
  })

  it('maps custom namespace-style exports to their individual templates', () => {
    const result = transform(`import {
  GridList as Results,
  Navbar,
  Persona,
  SearchInput,
  IconBadge,
} from '@saas-ui/react'
`)

    expect(result.output).toContain(
      `import { GridList as Results } from '@/components/ui/grid-list'`,
    )
    expect(result.output).toContain(
      `import { Navbar } from '@/components/ui/navbar'`,
    )
    expect(result.output).toContain(
      `import { Persona } from '@/components/ui/persona/persona-composed'`,
    )
    expect(result.report.requestedItems).toEqual([
      'grid-list',
      'icon-badge',
      'navbar',
      'persona',
      'search-input',
    ])
  })

  it('uses an injected export map and configured aliases', () => {
    const result = transformReactToRegistrySource({
      config: {
        aliases: {
          ...config.aliases,
          ui: '#design/ui',
        },
      },
      filePath: 'custom.ts',
      source: `import { DataPanel as Panel } from '@saas-ui/react'\n`,
      registryExports: {
        DataPanel: {
          item: 'data-panel',
          exportName: 'DataPanel',
          root: 'ui',
        },
      },
    })

    expect(result.output).toBe(
      `import { DataPanel as Panel } from '#design/ui/data-panel'\n`,
    )
    expect(result.report.requestedItems).toEqual(['data-panel'])
  })

  it('reports manual cases without dropping any source', () => {
    const cases = [
      `import SaasUI from '@saas-ui/react'`,
      `import * as SaasUI from '@saas-ui/react'`,
      `export { Sidebar } from '@saas-ui/react'`,
      `export * from '@saas-ui/react'`,
      `const load = () => import('@saas-ui/react')`,
      `const sui = require('@saas-ui/react')`,
      `type LegacySidebar = import('@saas-ui/react').Sidebar`,
      `type LegacyModule = typeof import('@saas-ui/react')`,
      `declare module '@saas-ui/react' { export interface Theme {} }`,
      `const resolved = require.resolve('@saas-ui/react')`,
      `vi.mock('@saas-ui/react')`,
      `/// <reference types="@saas-ui/react" />`,
      `import { useSui } from '@saas-ui/react'`,
      `import { NotARealExport } from '@saas-ui/react'`,
    ]

    for (const source of cases) {
      const result = transform(`${source}\n`)
      expect(result.report.diagnostics[0]?.severity).toBe('error')
      expect(result.report.changed).toBe(false)
      expect(result.output).toBe(`${source}\n`)
    }
  })

  it('fails closed on TypeScript import types and type queries', () => {
    for (const source of [
      `type SidebarType = import('@saas-ui/react').Sidebar\n`,
      `type LegacyModule = typeof import('@saas-ui/react')\n`,
    ]) {
      const result = transform(source)
      expect(result.output).toBe(source)
      expect(result.report.changed).toBe(false)
      expect(result.report.diagnostics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code: 'unsupported-type-import' }),
        ]),
      )
    }
  })
})

describe('react-to-registry project migration', () => {
  it('plans base runtime packages for primitive-only migration and removes the legacy package', async () => {
    const cwd = await fixture({
      'src/app.tsx': `import { Box } from '@saas-ui/react'\n`,
    })
    const report = await migrateReactToRegistry({ config, cwd, write: true })

    expect(report.success).toBe(true)
    expect(report.requiredPackages).toEqual([
      '@chakra-ui/react',
      '@emotion/react',
      '@saas-ui/chakra-preset',
    ])
    expect(report.packageActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'remove',
          package: '@saas-ui/react',
          status: 'applied',
        }),
      ]),
    )
    const manifest = JSON.parse(
      await fs.readFile(path.join(cwd, 'package.json'), 'utf8'),
    )
    expect(manifest.dependencies).toMatchObject({
      '@chakra-ui/react': '^3.28.0',
      '@emotion/react': '^11.0.0',
      '@saas-ui/chakra-preset': SUPPORTED_PRESET_VERSION,
    })
    expect(manifest.dependencies).not.toHaveProperty('@saas-ui/react')
  })

  it('keeps @saas-ui/react when installed templates still import primitives', async () => {
    const cwd = await fixture({
      'src/app.tsx': `import { Box } from '@saas-ui/react'\n`,
      'src/sidebar.tsx': `import { Sidebar } from '@saas-ui/react/sidebar'\n`,
    })
    const report = await migrateReactToRegistry({ config, cwd, write: true })

    expect(report.success).toBe(true)
    expect(report.packageActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'retain',
          package: '@saas-ui/react',
          status: 'unchanged',
        }),
      ]),
    )
    expect(await fs.readFile(path.join(cwd, 'src/app.tsx'), 'utf8')).toContain(
      '@chakra-ui/react',
    )
    expect(
      await fs.readFile(path.join(cwd, 'src/sidebar.tsx'), 'utf8'),
    ).toContain('@saas-ui/react/sidebar')
    const manifest = JSON.parse(
      await fs.readFile(path.join(cwd, 'package.json'), 'utf8'),
    )
    expect(manifest.dependencies).toHaveProperty('@saas-ui/react')
  })

  it('plans next-themes for provider and color-mode migration', async () => {
    const cwd = await fixture({
      'src/provider.tsx': `import { SuiProvider, useColorMode } from '@saas-ui/react'\n`,
    })
    const report = await migrateReactToRegistry({
      config,
      cwd,
      installer: async () => undefined,
    })

    expect(report.success).toBe(true)
    expect(report.requiredPackages).toContain('next-themes')
    expect(report.requestedItems).toEqual(['color-mode', 'provider'])
    expect(report.packageActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ package: 'next-themes', action: 'add' }),
      ]),
    )
  })

  it('retains the legacy package and fails with a machine-readable manual action when unscanned references remain', async () => {
    const selected = `import { Box } from '@saas-ui/react'\n`
    const remaining = `import { Sidebar } from '@saas-ui/react'\n`
    const cwd = await fixture({
      'src/selected.tsx': selected,
      'src/unselected.tsx': remaining,
    })
    const report = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src/selected.tsx'],
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.applied).toBe(false)
    expect(report.packageActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          package: '@saas-ui/react',
          action: 'retain',
          status: 'manual',
          required: true,
        }),
      ]),
    )
    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'required-manual-package-action' }),
      ]),
    )
    expect(await fs.readFile(path.join(cwd, 'src/selected.tsx'), 'utf8')).toBe(
      selected,
    )
  })

  it('retains the legacy package while non-dependency package references remain', async () => {
    const cwd = await fixture({
      'package.json': `${JSON.stringify(
        {
          name: 'migration-fixture',
          dependencies: { '@saas-ui/react': '1.0.0' },
          scripts: { inspect: `node -p "require('@saas-ui/react')"` },
        },
        null,
        2,
      )}\n`,
      'src/app.tsx': `import { Box } from '@saas-ui/react'\n`,
    })
    const report = await migrateReactToRegistry({ config, cwd, write: true })

    expect(report.success).toBe(false)
    expect(report.packageActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          package: '@saas-ui/react',
          status: 'manual',
          action: 'retain',
        }),
      ]),
    )
    const manifest = JSON.parse(
      await fs.readFile(path.join(cwd, 'package.json'), 'utf8'),
    )
    expect(manifest.dependencies).toHaveProperty('@saas-ui/react')
  })

  it('scans root and nested lib source paths by default', async () => {
    const cwd = await fixture({
      'lib/widget.ts': `import { Box } from '@saas-ui/react'\n`,
      'src/lib/widget.tsx': `import { Box } from '@saas-ui/react'\n`,
    })
    const report = await migrateReactToRegistry({ config, cwd })

    expect(report.success).toBe(true)
    expect(report.filesScanned).toBe(2)
    expect(report.files.map((file) => file.path)).toEqual([
      'lib/widget.ts',
      'src/lib/widget.tsx',
    ])
    expect(report.filesChanged).toBe(2)
  })

  it('retains the legacy package when an unselected root lib source remains', async () => {
    const selected = `import { Box } from '@saas-ui/react'\n`
    const cwd = await fixture({
      'lib/widget.ts': `import { Sidebar } from '@saas-ui/react'\n`,
      'src/selected.tsx': selected,
    })
    const report = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src/selected.tsx'],
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.applied).toBe(false)
    expect(report.packageActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          package: '@saas-ui/react',
          action: 'retain',
          status: 'manual',
          reason: expect.stringContaining('lib/widget.ts'),
        }),
      ]),
    )
    expect(await fs.readFile(path.join(cwd, 'src/selected.tsx'), 'utf8')).toBe(
      selected,
    )
  })

  it('ignores generated output paths even when inputs name them explicitly', async () => {
    const legacyImport = `import { Box } from '@saas-ui/react'\n`
    const cwd = await fixture({
      '.next/server/app.js': legacyImport,
      'build/app.js': legacyImport,
      'coverage/app.js': legacyImport,
      'dist/app.js': legacyImport,
      'node_modules/example/app.js': legacyImport,
      'src/app.tsx': legacyImport,
    })
    const report = await migrateReactToRegistry({
      config,
      cwd,
      inputs: [
        '.next/server/app.js',
        'build/app.js',
        'coverage/app.js',
        'dist/app.js',
        'node_modules/example/app.js',
        'src/app.tsx',
      ],
    })

    expect(report.success).toBe(true)
    expect(report.filesScanned).toBe(1)
    expect(report.files.map((file) => file.path)).toEqual(['src/app.tsx'])
    expect(report.filesChanged).toBe(1)
  })

  it('retains the legacy package while an MDX import remains', async () => {
    const selected = `import { Box } from '@saas-ui/react'\n`
    const cwd = await fixture({
      'docs/example.mdx': `import { Sidebar } from '@saas-ui/react'\n\n# Example\n`,
      'src/selected.tsx': selected,
    })
    const report = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src/selected.tsx'],
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.applied).toBe(false)
    expect(report.filesScanned).toBe(1)
    expect(report.packageActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          package: '@saas-ui/react',
          action: 'retain',
          status: 'manual',
          reason: expect.stringContaining('docs/example.mdx'),
        }),
      ]),
    )
    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'required-manual-package-action' }),
      ]),
    )
    expect(await fs.readFile(path.join(cwd, 'src/selected.tsx'), 'utf8')).toBe(
      selected,
    )
  })

  it('rolls source changes back when the package adapter fails during apply', async () => {
    const original = `import { Box } from '@saas-ui/react'\n`
    const cwd = await fixture({ 'src/app.tsx': original })
    const originalManifest = await fs.readFile(
      path.join(cwd, 'package.json'),
      'utf8',
    )
    const adapter = createCommandMigrationPackageAdapter(async () => {
      throw new Error('manifest adapter rejected apply')
    })
    const report = await migrateReactToRegistry({
      config,
      cwd,
      packageAdapter: adapter,
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.applied).toBe(false)
    expect(report.diagnostics.at(-1)).toMatchObject({
      code: 'apply-error',
      message: 'manifest adapter rejected apply',
    })
    expect(await fs.readFile(path.join(cwd, 'src/app.tsx'), 'utf8')).toBe(
      original,
    )
    expect(await fs.readFile(path.join(cwd, 'package.json'), 'utf8')).toBe(
      originalManifest,
    )
  })

  it('finishes package planning before any source mutation', async () => {
    const original = `import { Box } from '@saas-ui/react'\n`
    const cwd = await fixture({ 'src/app.tsx': original })
    const adapter: MigrationPackageAdapter = {
      plan: async () => {
        throw new Error('package preflight rejected')
      },
      apply: async () => {
        throw new Error('apply must not run')
      },
      rollback: async () => {
        throw new Error('rollback must not run')
      },
    }
    const report = await migrateReactToRegistry({
      config,
      cwd,
      packageAdapter: adapter,
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'package-plan-error',
          message: 'package preflight rejected',
        }),
      ]),
    )
    expect(await fs.readFile(path.join(cwd, 'src/app.tsx'), 'utf8')).toBe(
      original,
    )
  })

  it('migrates multiple files, requests one deterministic install set, and is idempotent', async () => {
    const cwd = await fixture({
      'src/a.tsx': `import { Sidebar, Box } from '@saas-ui/react'\n`,
      'src/nested/b.ts': `import type { PersonaPresence } from '@saas-ui/react'\n`,
    })
    const requests: string[][] = []
    const first = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src/a.tsx', 'src/nested'],
      installer: async ({ items }) => requests.push([...items]),
      write: true,
    })

    expect(first.success).toBe(true)
    expect(first.applied).toBe(true)
    expect(first.filesChanged).toBe(2)
    expect(requests).toEqual([['persona', 'sidebar']])
    expect(
      await fs.readFile(path.join(cwd, 'src/a.tsx'), 'utf8'),
    ).not.toContain('@saas-ui/react')

    const second = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src'],
      installer: async ({ items }) => requests.push([...items]),
      write: true,
    })
    expect(second.filesChanged).toBe(0)
    expect(requests).toHaveLength(1)
  })

  it('keeps dry runs mutation-free and does not call the installer', async () => {
    const original = `import { Sidebar } from '@saas-ui/react'\n`
    const cwd = await fixture({ 'src/app.tsx': original })
    let called = false
    const report = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src/**/*.tsx'],
      installer: async () => {
        called = true
      },
    })

    expect(report.mode).toBe('dry-run')
    expect(report.filesChanged).toBe(1)
    expect(report.requestedItems).toEqual(['sidebar'])
    expect(called).toBe(false)
    expect(await fs.readFile(path.join(cwd, 'src/app.tsx'), 'utf8')).toBe(
      original,
    )
    expect(formatMigrationReport(report)).toContain(
      'Dry run only; no files or templates were changed.',
    )
  })

  it('makes a parse failure block all source and installer mutations', async () => {
    const valid = `import { Sidebar } from '@saas-ui/react'\n`
    const invalid = `import { Box from '@saas-ui/react'\n`
    const cwd = await fixture({
      'src/invalid.tsx': invalid,
      'src/valid.tsx': valid,
    })
    let called = false
    const report = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src'],
      installer: async () => {
        called = true
      },
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.applied).toBe(false)
    expect(
      report.diagnostics.some((entry) => entry.code === 'parse-error'),
    ).toBe(true)
    expect(called).toBe(false)
    expect(await fs.readFile(path.join(cwd, 'src/valid.tsx'), 'utf8')).toBe(
      valid,
    )
    expect(await fs.readFile(path.join(cwd, 'src/invalid.tsx'), 'utf8')).toBe(
      invalid,
    )
  })

  it('rolls source files back when the command-independent installer rejects', async () => {
    const original = `import { Sidebar } from '@saas-ui/react'\n`
    const cwd = await fixture({ 'src/app.tsx': original })
    const originalManifest = await fs.readFile(
      path.join(cwd, 'package.json'),
      'utf8',
    )
    const report = await migrateReactToRegistry({
      config,
      cwd,
      inputs: ['src/app.tsx'],
      installer: async () => {
        throw new Error('installer rejected its plan')
      },
      write: true,
    })

    expect(report.success).toBe(false)
    expect(report.diagnostics.at(-1)).toMatchObject({
      code: 'apply-error',
      message: 'installer rejected its plan',
    })
    expect(await fs.readFile(path.join(cwd, 'src/app.tsx'), 'utf8')).toBe(
      original,
    )
    expect(await fs.readFile(path.join(cwd, 'package.json'), 'utf8')).toBe(
      originalManifest,
    )
  })
})

describe('react-to-registry provenance and routing', () => {
  it('classifies every supported historical @saas-ui/react export exactly once', () => {
    const exports = new Set([
      ...chakraReactExports,
      ...chakraStyledSystemExports,
      ...presetLegacyExports,
      ...Object.keys(defaultRegistryExportMap),
      ...unsupportedLegacyExports,
    ])

    expect(exports.size).toBe(322)
    expect(verifyLegacyExportProvenance(exports)).toEqual([])
  })

  it('rejects unknown, overlapping, and stale registry provenance', () => {
    const issues = verifyLegacyExportProvenance(['Box', 'UnknownExport'], {
      Box: { item: 'missing-item' },
      FutureExport: {
        item: 'sidebar',
        exportName: 'NotARealSidebarExport',
      },
    })

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'unknown-export',
          exportName: 'UnknownExport',
        }),
        expect.objectContaining({
          kind: 'overlapping-classification',
          exportName: 'Box',
        }),
        expect.objectContaining({
          kind: 'unknown-registry-item',
          exportName: 'Box',
        }),
        expect.objectContaining({
          kind: 'stale-registry-export',
          exportName: 'FutureExport',
        }),
      ]),
    )
  })

  it('keeps every generated registry mapping backed by a canonical emitted export', async () => {
    const catalog = {
      ...canonicalRegistryItemExports,
      ...canonicalSetupItemExports,
    }
    for (const [item, expectedExports] of Object.entries(catalog)) {
      const artifact = JSON.parse(
        await fs.readFile(
          path.join(
            repositoryRoot,
            `apps/website/public/r/styles/default/${item}.json`,
          ),
          'utf8',
        ),
      ) as { files: Array<{ content: string }> }
      const emitted = new Set<string>()
      for (const file of artifact.files) {
        const ast = parse(file.content, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        })
        for (const node of ast.program.body) {
          if (node.type !== 'ExportNamedDeclaration') continue
          for (const specifier of node.specifiers) {
            if (
              specifier.type === 'ExportSpecifier' ||
              specifier.type === 'ExportNamespaceSpecifier'
            ) {
              const exported = specifier.exported
              emitted.add(
                exported.type === 'Identifier' ? exported.name : exported.value,
              )
            }
          }
          const declaration = node.declaration
          if (!declaration) continue
          if ('id' in declaration && declaration.id?.type === 'Identifier') {
            emitted.add(declaration.id.name)
          }
          if (declaration.type === 'VariableDeclaration') {
            for (const value of declaration.declarations) {
              if (value.id.type === 'Identifier') emitted.add(value.id.name)
            }
          }
        }
      }
      for (const exportName of expectedExports) {
        expect(emitted.has(exportName), `${item} must emit ${exportName}`).toBe(
          true,
        )
      }
    }
  })

  it('routes a monorepo root to packages/ui like add and diff', async () => {
    const cwd = await fixture({
      'turbo.json': '{}\n',
      'packages/ui/components.json': '{}\n',
      'packages/ui/package.json': '{"name":"@fixture/ui"}\n',
    })

    await expect(resolveReactToRegistryTarget(cwd)).resolves.toBe(
      path.join(cwd, 'packages', 'ui'),
    )
  })
})
