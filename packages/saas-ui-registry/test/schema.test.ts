import { promises as fs } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  REGISTRY_SCHEMA_VERSION,
  RegistrySchemaVersionError,
  componentsConfigSchema,
  getRegistryVisibilityIssues,
  isRegistryFileTypeInstallable,
  isRegistryItemInstallable,
  isRegistryItemTypeInstallable,
  npmPackageNameSchema,
  npmPackageSelectorSchema,
  packageDependencySchema,
  parsePackageDependencyReference,
  parseRegistryIndex,
  parseRegistryItem,
  registryDependencyReferenceSchema,
  registryEntrySchema,
  registryItemSchema,
  registryItemVersionSchema,
  registrySchema,
} from '../src/schema.js'

const repositoryRoot = path.resolve(import.meta.dirname, '../../..')

describe('registry schema', () => {
  it('accepts shadcn-compatible namespaced registry configuration', () => {
    const config = componentsConfigSchema.parse({
      $schema: 'https://saas-ui.dev/r/schema/components.json',
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
      },
      registries: {
        '@acme': 'https://registry.example/{name}.json',
        '@private': {
          url: 'https://private.example/{style}/{name}.json',
          headers: { Authorization: 'Bearer ${REGISTRY_TOKEN}' },
          params: { version: '${REGISTRY_VERSION:-latest}' },
        },
      },
    })

    expect(config.registries).toHaveProperty('@acme')
    expect(config.installed).toEqual([])
  })

  it('distinguishes authored entries from normalized registry items', () => {
    const entry = {
      name: 'sidebar',
      type: 'registry:ui' as const,
      files: ['ui/sidebar/sidebar.tsx'],
    }

    expect(registryEntrySchema.safeParse(entry).success).toBe(true)
    expect(registryItemSchema.safeParse(entry).success).toBe(false)

    const item = registryItemSchema.parse({
      ...entry,
      files: [
        {
          path: 'ui/sidebar/sidebar.tsx',
          type: 'registry:ui',
          content: 'export function Sidebar() {}',
        },
      ],
    })
    expect(item.schemaVersion).toBe(REGISTRY_SCHEMA_VERSION)
  })

  it('reports an explicit error for incompatible payload versions', () => {
    const parse = () =>
      parseRegistryItem(
        {
          schemaVersion: REGISTRY_SCHEMA_VERSION + 1,
          name: 'sidebar',
          type: 'registry:ui',
        },
        'test registry item',
      )

    expect(parse).toThrow(RegistrySchemaVersionError)
    expect(parse).toThrow(/supports version 1/)
    expect(parse).toThrow(/update the CLI/i)
  })

  it('defines installable item and file types', () => {
    expect(isRegistryItemTypeInstallable('registry:setup')).toBe(true)
    expect(isRegistryItemTypeInstallable('registry:component')).toBe(true)
    expect(isRegistryItemTypeInstallable('registry:example')).toBe(false)
    expect(isRegistryFileTypeInstallable('registry:component')).toBe(true)
    expect(isRegistryFileTypeInstallable('registry:story')).toBe(false)
    expect(
      isRegistryItemInstallable({
        name: 'sidebar',
        type: 'registry:ui',
        files: [
          {
            path: 'sidebar.tsx',
            type: 'registry:ui',
            content: 'export const Sidebar = () => null\n',
          },
        ],
      }),
    ).toBe(true)
    expect(
      isRegistryItemInstallable({
        name: 'forms',
        type: 'registry:component',
        files: [
          {
            path: 'forms/index.ts',
            type: 'registry:component',
            content: "export { Form } from './form'\n",
          },
        ],
      }),
    ).toBe(true)
    expect(
      isRegistryItemInstallable({
        name: 'contentless-sidebar',
        type: 'registry:ui',
        files: [{ path: 'sidebar.tsx', type: 'registry:ui' }],
      }),
    ).toBe(false)
    expect(
      isRegistryItemInstallable({
        name: 'empty-sidebar',
        type: 'registry:ui',
        files: [{ path: 'sidebar.tsx', type: 'registry:ui', content: '' }],
      }),
    ).toBe(false)
    expect(
      isRegistryItemInstallable({
        name: 'whitespace-file',
        type: 'registry:ui',
        files: [{ path: 'spacer.txt', type: 'registry:ui', content: '\n' }],
      }),
    ).toBe(true)
    expect(
      parseRegistryIndex([
        {
          name: 'contentless-index-entry',
          type: 'registry:ui',
          files: [{ path: 'sidebar.tsx', type: 'registry:ui' }],
        },
      ]),
    ).toHaveLength(1)
    expect(
      isRegistryItemInstallable({
        name: 'sidebar-story',
        type: 'registry:example',
        files: [{ path: 'sidebar.stories.tsx', type: 'registry:story' }],
      }),
    ).toBe(false)
  })

  it('defines stable package and registry dependency references', () => {
    for (const dependency of [
      'next-themes',
      '@chakra-ui/react',
      'react@19',
      'react@19.1',
      'react@19.1.0',
      'react@^19',
      '@chakra-ui/react@~3.28',
      '@saas-ui/chakra-preset@3.0.0-next.9',
      'pkg@^1.2.3+build.4',
    ]) {
      expect(packageDependencySchema.safeParse(dependency).success).toBe(true)
    }

    for (const dependency of [
      'https://example.com/a',
      'pkg@latest',
      'pkg@next',
      'pkg@workspace:*',
      'pkg@npm:other@1.0.0',
      'pkg@github:user/repo',
      'pkg@git+https://github.com/user/repo.git',
      'pkg@>=1.0.0',
      'pkg@1.0.0 || 2.0.0',
      'pkg@1.0.0 - 2.0.0',
      'pkg@1.x',
      '@scope/pkg@x/y',
      '@scope',
      '@scope/',
      '@scope//pkg@1.0.0',
      '@Scope/pkg@1.0.0',
      'pkg@01.2.3',
      'pkg@1.2.3-01',
    ]) {
      expect(packageDependencySchema.safeParse(dependency).success).toBe(false)
    }

    expect(npmPackageNameSchema.safeParse('@scope/pkg').success).toBe(true)
    expect(npmPackageNameSchema.safeParse('@scope/pkg@1').success).toBe(false)
    expect(npmPackageSelectorSchema.safeParse('^1.2').success).toBe(true)
    expect(npmPackageSelectorSchema.safeParse('latest').success).toBe(false)
    expect(parsePackageDependencyReference('@scope/pkg@^1.2')).toEqual({
      name: '@scope/pkg',
      selector: '^1.2',
    })
    expect(parsePackageDependencyReference('@scope/pkg@x/y')).toBeNull()

    expect(registryDependencyReferenceSchema.safeParse('sidebar').success).toBe(
      true,
    )
    expect(() =>
      parseRegistryItem({
        schemaVersion: REGISTRY_SCHEMA_VERSION,
        name: 'sidebar',
        type: 'registry:ui',
        registryDependencies: ['../ui/button/button.tsx'],
      }),
    ).toThrow()
    expect(
      registryDependencyReferenceSchema.safeParse(
        'https://registry.example.com/sidebar.json',
      ).success,
    ).toBe(true)
    expect(
      registryDependencyReferenceSchema.safeParse('@acme/sidebar').success,
    ).toBe(true)
    expect(
      registryDependencyReferenceSchema.safeParse('../provider/use-link.tsx')
        .success,
    ).toBe(false)
  })

  it('requires SemVer item versions', () => {
    expect(registryItemVersionSchema.safeParse('1.2.3-next.1').success).toBe(
      true,
    )
    expect(registryItemVersionSchema.safeParse('next').success).toBe(false)
  })

  it('allows private-to-public dependencies and rejects the reverse', () => {
    const entries = [
      {
        name: 'public-provider',
        type: 'registry:setup' as const,
      },
      {
        name: 'private-sidebar',
        type: 'registry:ui' as const,
        private: true,
        registryDependencies: ['public-provider'],
      },
    ]

    expect(getRegistryVisibilityIssues(entries)).toEqual([])
    expect(
      registrySchema.safeParse({
        name: 'pro',
        homepage: 'https://saas-ui.dev',
        items: entries,
      }).success,
    ).toBe(true)

    const invalidEntries = [
      entries[0],
      {
        ...entries[1],
        registryDependencies: undefined,
      },
      {
        name: 'public-app-shell',
        type: 'registry:ui' as const,
        registryDependencies: ['private-sidebar'],
      },
    ]

    const result = registrySchema.safeParse({
      name: 'mixed',
      homepage: 'https://saas-ui.dev',
      items: invalidEntries,
    })
    expect(result.success).toBe(false)
    expect(getRegistryVisibilityIssues(invalidEntries)[0]?.message).toMatch(
      /cannot depend on private item/,
    )
  })

  it('accepts unversioned v1 payloads during the migration', () => {
    expect(
      parseRegistryItem({
        name: 'provider',
        type: 'registry:setup',
      }),
    ).toMatchObject({
      schemaVersion: REGISTRY_SCHEMA_VERSION,
      name: 'provider',
    })
  })

  it('validates the current public registry artifacts', async () => {
    const relativePath = 'apps/website/public/r'
    const registryPath = path.join(repositoryRoot, relativePath)
    const index = JSON.parse(
      await fs.readFile(path.join(registryPath, 'index.json'), 'utf8'),
    )
    expect(parseRegistryIndex(index)).not.toHaveLength(0)

    const stylesPath = path.join(registryPath, 'styles/default')
    const itemFiles = (await fs.readdir(stylesPath)).filter((file) =>
      file.endsWith('.json'),
    )

    for (const file of itemFiles) {
      const item = JSON.parse(
        await fs.readFile(path.join(stylesPath, file), 'utf8'),
      )
      expect(() => parseRegistryItem(item, file)).not.toThrow()
    }
  })
})
