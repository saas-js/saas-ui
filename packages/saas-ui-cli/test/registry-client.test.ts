import { Response } from 'node-fetch'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { rawConfigSchema } from '#utils/get-config'
import {
  type RegistryHttpFetcher,
  createHttpRegistryClient,
  createRegistryClient,
} from '#utils/registry/client'
import { resolveRegistryGraph } from '#utils/registry/graph'
import type { RegistryItem } from '#utils/registry/schema'

afterEach(() => {
  vi.unstubAllEnvs()
})

function item(name: string, registryDependencies: string[] = []): RegistryItem {
  return {
    schemaVersion: 1,
    name,
    type: 'registry:ui',
    files: [],
    registryDependencies,
  }
}

function response(value: unknown) {
  return new Response(JSON.stringify(value), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
}

describe('HTTP registry authentication', () => {
  it('resolves private namespaces, parameters, and cross-registry dependencies', async () => {
    vi.stubEnv('PRIVATE_TOKEN', 'private-secret')
    const requests: Array<{
      authorization: string | null
      sharedKey: string | null
      url: string
    }> = []
    const client = createHttpRegistryClient({
      fetch: async (url, init) => {
        const headers = new Headers(init?.headers)
        requests.push({
          authorization: headers.get('authorization'),
          sharedKey: headers.get('x-shared-key'),
          url,
        })
        if (url.includes('/dashboard.json')) {
          return response(
            item('dashboard', [
              'widget',
              '@shared/chart',
              'https://cdn.example/utility.json',
            ]),
          )
        }
        if (url.includes('/widget.json')) return response(item('widget'))
        if (url.includes('/chart.json')) return response(item('chart'))
        if (url === 'https://cdn.example/utility.json') {
          return response(item('utility'))
        }
        throw new Error(`Unexpected request: ${url}`)
      },
      readAuthConfig: async () => null,
    })

    const graph = await resolveRegistryGraph(
      ['@private/dashboard'],
      'default',
      client,
      {
        '@private': {
          url: 'https://private.example/{style}/{name}.json',
          headers: { Authorization: 'Bearer ${PRIVATE_TOKEN}' },
          params: { version: 'latest' },
        },
        '@shared': {
          url: 'https://shared.example/{name}.json',
          headers: { 'X-Shared-Key': 'shared-secret' },
        },
      },
    )

    expect(graph.requestedReferences).toEqual(['@private/dashboard'])
    expect(graph.transitiveReferences).toEqual([
      '@private/widget',
      '@shared/chart',
      'https://cdn.example/utility.json',
    ])
    expect(graph.dependencies.dashboard).toEqual(['widget', 'chart', 'utility'])
    expect(requests).toEqual([
      {
        authorization: 'Bearer private-secret',
        sharedKey: null,
        url: 'https://private.example/default/dashboard.json?version=latest',
      },
      {
        authorization: 'Bearer private-secret',
        sharedKey: null,
        url: 'https://private.example/default/widget.json?version=latest',
      },
      {
        authorization: null,
        sharedKey: 'shared-secret',
        url: 'https://shared.example/chart.json',
      },
      {
        authorization: null,
        sharedKey: null,
        url: 'https://cdn.example/utility.json',
      },
    ])
  })

  it('fails closed for unknown namespaces, missing secrets, and HTTP headers', async () => {
    const client = createHttpRegistryClient({
      fetch: vi.fn(),
      readAuthConfig: async () => null,
    })

    await expect(
      resolveRegistryGraph(['@missing/button'], 'default', client),
    ).rejects.toThrow('Unknown registry namespace "@missing"')
    await expect(
      resolveRegistryGraph(['@private/button'], 'default', client, {
        '@private': {
          url: 'https://private.example/{name}.json',
          headers: { Authorization: 'Bearer ${MISSING_TOKEN}' },
        },
      }),
    ).rejects.toThrow('requires environment variable MISSING_TOKEN')
    await expect(
      resolveRegistryGraph(['@private/button'], 'default', client, {
        '@private': {
          url: 'http://private.example/{name}.json',
          headers: { Authorization: 'Bearer token' },
        },
      }),
    ).rejects.toThrow('cannot send authentication headers over HTTP')
  })

  it('does not expose private URL credentials in fetch errors', async () => {
    vi.stubEnv('PRIVATE_TOKEN', 'do-not-print-this')
    const client = createHttpRegistryClient({
      fetch: async () => {
        throw new Error('socket failed')
      },
      readAuthConfig: async () => null,
    })

    const result = resolveRegistryGraph(
      ['@private/button'],
      'default',
      client,
      {
        '@private': {
          url: 'https://private.example/${PRIVATE_TOKEN}/{name}.json',
          params: { token: '${PRIVATE_TOKEN}' },
        },
      },
    )

    await expect(result).rejects.toThrow('@private/button')
    await expect(result).rejects.not.toThrow('do-not-print-this')
  })

  it('does not expose registry response details for private namespaces', async () => {
    vi.stubEnv('PRIVATE_TOKEN', 'do-not-print-this')
    const client = createHttpRegistryClient({
      fetch: async () =>
        new Response(
          JSON.stringify({ error: 'Rejected token do-not-print-this' }),
          {
            headers: { 'content-type': 'application/json' },
            status: 401,
            statusText: 'Unauthorized',
          },
        ),
      readAuthConfig: async () => null,
    })

    const result = resolveRegistryGraph(
      ['@private/button'],
      'default',
      client,
      {
        '@private': {
          url: 'https://private.example/{name}.json',
          headers: { Authorization: 'Bearer ${PRIVATE_TOKEN}' },
        },
      },
    )

    await expect(result).rejects.toThrow('Unauthorized')
    await expect(result).rejects.not.toThrow('do-not-print-this')
  })

  it('does not leak credentials to cross-origin dependencies', async () => {
    const requests: Array<{ authorization: string | null; url: string }> = []
    const fetch: RegistryHttpFetcher = vi.fn(async (url, init) => {
      const value = String(url)
      requests.push({
        authorization: new Headers(init?.headers).get('authorization'),
        url: value,
      })
      if (value === 'https://registry.example/r/styles/default/root.json') {
        return response(
          item('root', ['https://attacker.example/private-item.json']),
        )
      }
      if (value === 'https://attacker.example/private-item.json') {
        return response(item('dependency'))
      }
      throw new Error(`Unexpected request: ${value}`)
    })
    const client = createHttpRegistryClient({
      baseUrl: 'https://registry.example/r',
      fetch,
      readAuthConfig: async () => ({ token: 'saved-secret' }),
    })

    await resolveRegistryGraph(['root'], 'default', client)

    expect(requests).toEqual([
      {
        authorization: 'Bearer saved-secret',
        url: 'https://registry.example/r/styles/default/root.json',
      },
      {
        authorization: null,
        url: 'https://attacker.example/private-item.json',
      },
    ])
  })

  it('authenticates same-origin absolute URLs', async () => {
    const authorizations: Array<string | null> = []
    const client = createHttpRegistryClient({
      baseUrl: 'https://registry.example/r',
      fetch: async (_url, init) => {
        authorizations.push(new Headers(init?.headers).get('authorization'))
        return response(item('remote'))
      },
      readAuthConfig: async () => ({ token: 'saved-secret' }),
    })

    await client.getItem(
      'https://registry.example/registry/remote.json',
      'default',
    )

    expect(authorizations).toEqual(['Bearer saved-secret'])
  })

  it('supports an explicit HTTPS credential origin for split deployments', async () => {
    const requests: Array<{ authorization: string | null; url: string }> = []
    const client = createHttpRegistryClient({
      baseUrl: 'https://public-registry.example/r',
      trustedAuthOrigin: 'https://private-registry.example/api',
      fetch: async (url, init) => {
        requests.push({
          authorization: new Headers(init?.headers).get('authorization'),
          url,
        })
        return response(
          item(
            url.startsWith('https://private-registry.example')
              ? 'private-item'
              : 'public-item',
          ),
        )
      },
      readAuthConfig: async () => ({ token: 'saved-secret' }),
    })

    await client.getItem('public-item', 'default')
    await client.getItem(
      'https://private-registry.example/api/private-item.json',
      'default',
    )

    expect(requests).toEqual([
      {
        authorization: null,
        url: 'https://public-registry.example/r/styles/default/public-item.json',
      },
      {
        authorization: 'Bearer saved-secret',
        url: 'https://private-registry.example/api/private-item.json',
      },
    ])
  })

  it('never authenticates plain HTTP resources', async () => {
    const authorizations: Array<string | null> = []
    const readAuthConfig = vi.fn(async () => ({ token: 'saved-secret' }))
    const client = createHttpRegistryClient({
      baseUrl: 'http://registry.example/r',
      fetch: async (_url, init) => {
        authorizations.push(new Headers(init?.headers).get('authorization'))
        return response(item('remote'))
      },
      readAuthConfig,
    })

    await client.getItem('remote', 'default')

    expect(authorizations).toEqual([null])
    expect(readAuthConfig).not.toHaveBeenCalled()
  })

  it('strips credentials from an HTTP dependency of an HTTPS registry', async () => {
    const requests: Array<{ authorization: string | null; url: string }> = []
    const fetch: RegistryHttpFetcher = vi.fn(async (url, init) => {
      requests.push({
        authorization: new Headers(init?.headers).get('authorization'),
        url,
      })
      if (url.endsWith('/styles/default/root.json')) {
        return response(item('root', ['http://registry.example/dependency']))
      }
      return response(item('dependency'))
    })
    const client = createHttpRegistryClient({
      baseUrl: 'https://registry.example/r',
      fetch,
      readAuthConfig: async () => ({ token: 'saved-secret' }),
    })

    await resolveRegistryGraph(['root'], 'default', client)

    expect(requests).toEqual([
      {
        authorization: 'Bearer saved-secret',
        url: 'https://registry.example/r/styles/default/root.json',
      },
      {
        authorization: null,
        url: 'http://registry.example/dependency',
      },
    ])
  })
})

describe('registry namespace configuration', () => {
  const config = {
    system: 'chakra',
    style: 'default',
    rsc: false,
    tsx: true,
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
    },
  }

  it('accepts shadcn-compatible registry definitions', () => {
    expect(
      rawConfigSchema.parse({
        ...config,
        registries: {
          '@public': 'https://example.com/{name}.json',
          '@private-registry': {
            url: 'https://private.example/{style}/{name}',
            headers: { Authorization: 'Bearer ${TOKEN}' },
            params: { version: '${VERSION:-latest}' },
          },
        },
      }).registries,
    ).toBeDefined()
  })

  it('rejects invalid namespace keys and URL templates', () => {
    expect(() =>
      rawConfigSchema.parse({
        ...config,
        registries: { public: 'https://example.com/{name}.json' },
      }),
    ).toThrow('Invalid registry namespace')
    expect(() =>
      rawConfigSchema.parse({
        ...config,
        registries: { '@public': 'https://example.com/static.json' },
      }),
    ).toThrow('must include {name}')
  })
})

describe('registry item identity', () => {
  it('surfaces schema incompatibility through the registry client', async () => {
    const client = createRegistryClient(async () => ({
      ...item('sidebar'),
      schemaVersion: 2,
    }))

    await expect(client.getItem('sidebar', 'default')).rejects.toThrow(
      'Incompatible registry item "sidebar" schema version 2; this CLI supports version 1. Please update the CLI or use a compatible registry.',
    )
  })

  it('rejects payload names that differ from a named request', async () => {
    const client = createRegistryClient(async () => item('different-name'))

    await expect(client.getItem('requested-name', 'default')).rejects.toThrow(
      'requested "requested-name" but received "different-name"',
    )
  })

  it('enforces named identities for custom registry clients', async () => {
    const client = {
      async getIndex() {
        return []
      },
      async getItem() {
        return item('different-name')
      },
    }

    await expect(
      resolveRegistryGraph(['requested-name'], 'default', client),
    ).rejects.toThrow(
      'requested "requested-name" but received "different-name"',
    )
  })

  it('normalizes URL-backed dependencies to their payload names', async () => {
    const dependencyUrl = 'https://registry.example/dependency.json'
    const client = createRegistryClient(async (resource) => {
      if (resource === 'styles/default/root.json') {
        return item('root', [dependencyUrl])
      }
      if (resource === dependencyUrl) return item('normalized-dependency')
      throw new Error(`Unexpected registry resource: ${resource}`)
    })

    const graph = await resolveRegistryGraph(['root'], 'default', client)

    expect(graph.dependencies).toEqual({
      'normalized-dependency': [],
      root: ['normalized-dependency'],
    })
    expect(graph.transitive).toEqual(['normalized-dependency'])
    expect(graph.transitiveReferences).toEqual([dependencyUrl])
  })

  it('deduplicates dependency edges after identity normalization', async () => {
    const dependencyUrl = 'https://registry.example/dependency.json'
    const client = createRegistryClient(async (resource) => {
      if (resource === 'styles/default/root.json') {
        return item('root', [dependencyUrl, dependencyUrl])
      }
      if (resource === dependencyUrl) {
        return item('normalized-dependency')
      }
      throw new Error(`Unexpected registry resource: ${resource}`)
    })

    const graph = await resolveRegistryGraph(['root'], 'default', client)

    expect(graph.dependencies.root).toEqual(['normalized-dependency'])
  })
})

describe('absolute registry dependency graphs', () => {
  const rootUrl =
    'https://pro.registry.example/r/styles/default/pro-dashboard.json'
  const layoutUrl =
    'https://pro.registry.example/r/styles/default/pro-layout.json'
  const widgetUrl =
    'https://pro.registry.example/r/styles/default/pro-widget.json'

  it('resolves nested named dependencies beside their absolute owner', async () => {
    const resources: string[] = []
    const client = createRegistryClient(async (resource) => {
      resources.push(resource)
      if (resource === rootUrl) return item('pro-dashboard', ['pro-layout'])
      if (resource === layoutUrl) return item('pro-layout', ['pro-widget'])
      if (resource === widgetUrl) return item('pro-widget')
      throw new Error(`Unexpected registry resource: ${resource}`)
    })

    const graph = await resolveRegistryGraph([rootUrl], 'default', client)

    expect(resources).toEqual([rootUrl, layoutUrl, widgetUrl])
    expect(graph.requested).toEqual(['pro-dashboard'])
    expect(graph.requestedReferences).toEqual([rootUrl])
    expect(graph.transitive).toEqual(['pro-widget', 'pro-layout'])
    expect(graph.dependencies).toEqual({
      'pro-dashboard': ['pro-layout'],
      'pro-layout': ['pro-widget'],
      'pro-widget': [],
    })
  })

  it('deduplicates sibling URLs while keeping canonical dependency names', async () => {
    const resources: string[] = []
    const client = createRegistryClient(async (resource) => {
      resources.push(resource)
      if (resource === rootUrl) {
        return item('pro-dashboard', ['pro-layout', 'pro-layout', layoutUrl])
      }
      if (resource === layoutUrl) return item('pro-layout')
      throw new Error(`Unexpected registry resource: ${resource}`)
    })

    const graph = await resolveRegistryGraph([rootUrl], 'default', client)

    expect(resources).toEqual([rootUrl, layoutUrl])
    expect(graph.dependencies['pro-dashboard']).toEqual(['pro-layout'])
    expect(graph.items.map((entry) => entry.name)).toEqual([
      'pro-layout',
      'pro-dashboard',
    ])
  })

  it('detects cycles through sibling dependency URLs', async () => {
    const client = createRegistryClient(async (resource) => {
      if (resource === rootUrl) return item('pro-dashboard', ['pro-layout'])
      if (resource === layoutUrl) return item('pro-layout', ['pro-dashboard'])
      throw new Error(`Unexpected registry resource: ${resource}`)
    })

    await expect(
      resolveRegistryGraph([rootUrl], 'default', client),
    ).rejects.toThrow(
      'Registry dependency cycle detected: pro-dashboard -> pro-layout -> pro-dashboard',
    )
  })

  it('preserves ordinary named-root resolution', async () => {
    const resources: string[] = []
    const client = createRegistryClient(async (resource) => {
      resources.push(resource)
      if (resource === 'styles/default/public-root.json') {
        return item('public-root', ['public-child'])
      }
      if (resource === 'styles/default/public-child.json') {
        return item('public-child')
      }
      throw new Error(`Unexpected registry resource: ${resource}`)
    })

    const graph = await resolveRegistryGraph(['public-root'], 'default', client)

    expect(resources).toEqual([
      'styles/default/public-root.json',
      'styles/default/public-child.json',
    ])
    expect(graph.dependencies).toEqual({
      'public-child': [],
      'public-root': ['public-child'],
    })
  })
})
