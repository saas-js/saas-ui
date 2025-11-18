import { REGISTRY_URL } from '#constants'
import type { Config } from '#utils/get-config'
import { expandEnvVars } from '#utils/registry/env'
import { RegistryNotConfiguredError } from '#utils/registry/errors'
import { parseRegistryAndItemFromString } from '#utils/registry/parser'
import { isUrl } from '#utils/registry/utils'

const NAME_PLACEHOLDER = '{name}'
const STYLE_PLACEHOLDER = '{style}'
const ENV_VAR_PATTERN = /\${(\w+)}/g

export interface RegistryConfigItem {
  url: string
  headers?: Record<string, string>
  params?: Record<string, string>
}

export function buildUrlAndHeadersForRegistryItem(
  name: string,
  config?: Config,
): { url: string; headers: Record<string, string> } | null {
  const { registry, item } = parseRegistryAndItemFromString(name)

  if (!registry || !item) {
    return null
  }

  const registries = config?.registries || {}
  const registryConfig = registries[registry]
  if (!registryConfig) {
    throw new RegistryNotConfiguredError(registry)
  }

  const url = buildUrlFromRegistryConfig(item, registryConfig, config)
  if (!url) {
    throw new RegistryNotConfiguredError(registry)
  }

  return {
    url,
    headers: buildHeadersFromRegistryConfig(registryConfig),
  }
}

export function buildUrlFromRegistryConfig(
  item: string,
  registryConfig: string | RegistryConfigItem | undefined,
  config?: Config,
): string | null {
  if (!registryConfig) {
    return null
  }

  if (typeof registryConfig === 'string') {
    let url = registryConfig.replace(NAME_PLACEHOLDER, item)
    if (config?.style && url.includes(STYLE_PLACEHOLDER)) {
      url = url.replace(STYLE_PLACEHOLDER, config.style)
    }
    return expandEnvVars(url)
  }

  let baseUrl = registryConfig.url.replace(NAME_PLACEHOLDER, item)
  if (config?.style && baseUrl.includes(STYLE_PLACEHOLDER)) {
    baseUrl = baseUrl.replace(STYLE_PLACEHOLDER, config.style)
  }
  baseUrl = expandEnvVars(baseUrl)

  if (!registryConfig.params) {
    return baseUrl
  }

  return appendQueryParams(baseUrl, registryConfig.params)
}

export function buildHeadersFromRegistryConfig(
  config: string | RegistryConfigItem,
): Record<string, string> {
  if (typeof config === 'string' || !config.headers) {
    return {}
  }

  const headers: Record<string, string> = {}

  for (const [key, value] of Object.entries(config.headers)) {
    const expandedValue = expandEnvVars(value)

    if (shouldIncludeHeader(value, expandedValue)) {
      headers[key] = expandedValue
    }
  }

  return headers
}

function appendQueryParams(
  baseUrl: string,
  params: Record<string, string>,
): string {
  const urlParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    const expandedValue = expandEnvVars(value)
    if (expandedValue) {
      urlParams.append(key, expandedValue)
    }
  }

  const queryString = urlParams.toString()
  if (!queryString) {
    return baseUrl
  }

  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}${queryString}`
}

function shouldIncludeHeader(
  originalValue: string,
  expandedValue: string,
): boolean {
  const trimmedExpanded = expandedValue.trim()

  if (!trimmedExpanded) {
    return false
  }

  if (originalValue.includes('${')) {
    const envVars = originalValue.match(ENV_VAR_PATTERN)
    if (envVars) {
      const templateWithoutVars = originalValue
        .replace(ENV_VAR_PATTERN, '')
        .trim()
      return trimmedExpanded !== templateWithoutVars
    }
  }

  return true
}

export function resolveRegistryUrl(pathOrUrl: string): string {
  if (isUrl(pathOrUrl)) {
    const url = new URL(pathOrUrl)
    if (url.pathname.match(/\/chat\/b\//) && !url.pathname.endsWith('/json')) {
      url.pathname = `${url.pathname}/json`
    }

    return url.toString()
  }

  return `${REGISTRY_URL}/${pathOrUrl}`
}
