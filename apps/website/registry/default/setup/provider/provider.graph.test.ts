import {
  analyzeItemFiles,
  discoverRegistryItems,
  resolveDependencyGraph,
  validateRegistry,
} from '@saas-ui/registry/compiler'
import path from 'node:path'

describe('provider registry alternatives', () => {
  it('keeps color mode out of the no-color-mode dependency closure', async () => {
    const websiteRoot = path.resolve(process.cwd(), 'apps/website')
    const discovery = await discoverRegistryItems({
      sourceRoots: [path.join(websiteRoot, 'registry/default')],
    })
    const analysis = await analyzeItemFiles(discovery, {
      aliases: { '@': websiteRoot },
    })
    const graph = resolveDependencyGraph(analysis, {
      externalPackages: ['react', 'react-dom'],
    })
    const validation = validateRegistry(graph)
    const items = new Map(graph.items.map((item) => [item.name, item]))

    function dependencyClosure(name: string) {
      const names = new Set<string>()
      const packages = new Set<string>()
      const visit = (dependency: string) => {
        if (names.has(dependency)) return
        names.add(dependency)
        const item = items.get(dependency)
        if (!item) return
        item.externalPackages.forEach((packageName) =>
          packages.add(packageName),
        )
        item.registryDependencies.forEach(visit)
      }
      visit(name)
      return { names, packages }
    }

    const provider = items.get('provider')!
    const providerWithoutColorMode = items.get('provider-no-color-mode')!
    const defaultClosure = dependencyClosure('provider')
    const noColorModeClosure = dependencyClosure('provider-no-color-mode')

    expect(defaultClosure.names).toContain('color-mode')
    expect(defaultClosure.packages).toContain('next-themes')
    expect(noColorModeClosure.names).toEqual(
      new Set(['provider-no-color-mode', 'use-link']),
    )
    expect(noColorModeClosure.packages).not.toContain('next-themes')
    expect(providerWithoutColorMode.registryDependencies).toEqual(['use-link'])
    expect(
      providerWithoutColorMode.files.flatMap((file) => file.moduleSpecifiers),
    ).not.toContain('@/registry/default/setup/color-mode/color-mode.tsx')

    const [providerTarget] = provider.files.map((file) => file.target)
    const [providerWithoutColorModeTarget] = providerWithoutColorMode.files.map(
      (file) => file.target,
    )
    expect(providerTarget).toBe('components/setup/provider/provider.tsx')
    expect(providerWithoutColorModeTarget).toBe(providerTarget)
    expect(provider.metadata.meta).toMatchObject({
      exclusiveGroup: 'provider',
      exclusiveDefault: true,
      conflicts: ['provider-no-color-mode'],
    })
    expect(providerWithoutColorMode.metadata.meta).toMatchObject({
      exclusiveGroup: 'provider',
      conflicts: ['provider'],
    })
    expect(providerWithoutColorMode.metadata.meta).not.toHaveProperty(
      'exclusiveDefault',
    )

    const providerGroup = [provider, providerWithoutColorMode].filter(
      (item) => item.metadata.meta?.exclusiveGroup === 'provider',
    )
    expect(
      providerGroup
        .filter((item) => item.metadata.meta?.exclusiveDefault === true)
        .map((item) => item.name),
    ).toEqual(['provider'])

    expect(
      validation.diagnostics.filter(
        (diagnostic) =>
          diagnostic.severity === 'error' &&
          ['provider', 'provider-no-color-mode'].includes(
            diagnostic.itemName ?? '',
          ),
      ),
    ).toEqual([])
  }, 30_000)
})
