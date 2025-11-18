import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'
import { promises as fs } from 'node:fs'
import { z } from 'zod'

import { resolveRegistryUrl } from '#utils/registry/builder'
import { getRegistryHeadersFromContext } from '#utils/registry/context'
import {
  RegistryFetchError,
  RegistryForbiddenError,
  RegistryLocalFileError,
  RegistryNotFoundError,
  RegistryUnauthorizedError,
} from '#utils/registry/errors'
import { registryItemSchema } from '#utils/registry/schema'

import { RegistryParseError } from './errors'

const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined

const registryCache = new Map<string, Promise<any>>()

export function clearRegistryCache() {
  registryCache.clear()
}

export async function fetchRegistry(
  paths: Array<string>,
  options: { useCache?: boolean } = {},
) {
  options = {
    useCache: true,
    ...options,
  }

  const results = await Promise.all(
    paths.map(async (path) => {
      const url = resolveRegistryUrl(path)

      if (options.useCache && registryCache.has(url)) {
        return registryCache.get(url)
      }

      const fetchPromise = (async () => {
        const headers = getRegistryHeadersFromContext(url)

        const response = await fetch(url, {
          agent,
          headers: {
            ...headers,
          },
        })

        if (!response.ok) {
          let messageFromServer = undefined

          if (
            response.headers.get('content-type')?.includes('application/json')
          ) {
            const json = await response.json()
            const parsed = z
              .object({
                // RFC 7807
                detail: z.string().optional(),
                title: z.string().optional(),
                message: z.string().optional(),
                error: z.string().optional(),
              })
              .safeParse(json)

            if (parsed.success) {
              messageFromServer = parsed.data.detail || parsed.data.message

              if (parsed.data.error) {
                messageFromServer = `[${parsed.data.error}] ${messageFromServer}`
              }
            }
          }

          if (response.status === 401) {
            throw new RegistryUnauthorizedError(url, messageFromServer)
          }

          if (response.status === 404) {
            throw new RegistryNotFoundError(url, messageFromServer)
          }

          if (response.status === 403) {
            throw new RegistryForbiddenError(url, messageFromServer)
          }

          throw new RegistryFetchError(
            url,
            response.status,
            undefined,
            messageFromServer,
          )
        }

        return response.json()
      })()

      if (options.useCache) {
        registryCache.set(url, fetchPromise)
      }

      return fetchPromise
    }),
  )

  return results
}

export async function fetchRegistryLocal(filePath: string) {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(content)
    try {
      return registryItemSchema.parse(json)
    } catch (error) {
      throw new RegistryParseError(filePath, error)
    }
  } catch (error) {
    if (error instanceof RegistryParseError) {
      throw error
    }
    throw new RegistryLocalFileError(filePath, error)
  }
}
