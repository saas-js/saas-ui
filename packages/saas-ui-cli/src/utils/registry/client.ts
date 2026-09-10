import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

import { REGISTRY_URL } from '#constants'
import { readConfig } from '#utils/auth'
import type { RegistryRequestOptions } from '#utils/registry/namespaces'
import {
  type RegistryIndexItem,
  type RegistryItem,
  parseRegistryIndex,
  parseRegistryItem,
} from '#utils/registry/schema'

export interface RegistryClient {
  getIndex(): Promise<RegistryIndexItem[]>
  getItem(
    reference: string,
    style: string,
    request?: RegistryRequestOptions,
  ): Promise<RegistryItem>
  getJson?(resource: string): Promise<unknown>
}

export type RegistryJsonFetcher = (
  resource: string,
  request?: RegistryRequestOptions,
) => Promise<unknown>
export type RegistryHttpFetcher = (
  url: string,
  init?: Parameters<typeof fetch>[1],
) => ReturnType<typeof fetch>

export interface HttpRegistryClientOptions {
  baseUrl?: string
  /**
   * Overrides the registry origin that may receive saved credentials. The
   * origin must use HTTPS. By default, credentials are scoped to `baseUrl`.
   */
  trustedAuthOrigin?: string
  fetch?: RegistryHttpFetcher
  readAuthConfig?: typeof readConfig
}

export function isRegistryUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function resolveRegistryResource(
  resource: string,
  baseUrl = REGISTRY_URL,
) {
  if (isRegistryUrl(resource)) return resource
  return `${baseUrl.replace(/\/$/, '')}/${resource.replace(/^\//, '')}`
}

function displayRegistryResource(resource: string) {
  try {
    const url = new URL(resource)
    url.username = ''
    url.password = ''
    url.search = ''
    url.hash = ''
    return url.toString()
  } catch {
    return resource
  }
}

export function createRegistryClient(
  fetchJson: RegistryJsonFetcher,
): RegistryClient {
  return {
    async getIndex() {
      return parseRegistryIndex(await fetchJson('index.json'), 'registry index')
    },
    async getItem(reference, style, request) {
      const resource = isRegistryUrl(reference)
        ? reference
        : `styles/${style}/${reference}.json`
      const item = parseRegistryItem(
        await fetchJson(resource, request),
        `registry item "${reference}"`,
      )
      if (!isRegistryUrl(reference) && item.name !== reference) {
        throw new Error(
          `Registry item name mismatch: requested "${reference}" but received "${item.name}".`,
        )
      }
      return item
    },
    getJson: fetchJson,
  }
}

function trustedHttpsOrigin(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.origin : undefined
  } catch {
    return undefined
  }
}

export function createHttpRegistryClient(
  options: HttpRegistryClientOptions = {},
) {
  const agent = process.env.https_proxy
    ? new HttpsProxyAgent(process.env.https_proxy)
    : undefined
  const baseUrl = options.baseUrl ?? REGISTRY_URL
  const authOrigin = trustedHttpsOrigin(options.trustedAuthOrigin ?? baseUrl)
  const fetchResource: RegistryHttpFetcher = options.fetch ?? fetch
  const readAuthConfig = options.readAuthConfig ?? readConfig

  return createRegistryClient(async (resource, request) => {
    const url = resolveRegistryResource(resource, baseUrl)
    const displayResource = request?.label ?? displayRegistryResource(url)
    const target = new URL(url)
    const headers = new Headers()
    if (
      authOrigin &&
      target.protocol === 'https:' &&
      target.origin === authOrigin
    ) {
      const config = await readAuthConfig()
      if (config?.token) headers.set('Authorization', `Bearer ${config.token}`)
    }

    for (const [name, value] of Object.entries(request?.headers ?? {})) {
      headers.set(name, value)
    }

    let response
    try {
      response = await fetchResource(url, { agent, headers })
    } catch {
      throw new Error(
        `Failed to fetch registry resource ${displayResource}: Network request failed`,
      )
    }
    if (!response.ok) {
      const messages: Record<number, string> = {
        400: 'Bad request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not found',
        500: 'Internal server error',
      }
      let detail = response.statusText || messages[response.status]
      if (!request?.label) {
        try {
          const payload = (await response.json()) as { error?: unknown }
          if (typeof payload?.error === 'string') detail = payload.error
        } catch {
          // A failed registry response may have an empty/non-JSON body.
        }
      }
      throw new Error(
        `Failed to fetch registry resource ${displayResource}: ${detail ?? response.status}`,
      )
    }
    return response.json()
  })
}

let defaultClient: RegistryClient | undefined

export function getDefaultRegistryClient() {
  defaultClient ??= createHttpRegistryClient()
  return defaultClient
}
