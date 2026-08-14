import type { RegistryConfig } from '#utils/get-config'

export type RegistryConfigs = Readonly<Record<string, RegistryConfig>>

export interface RegistryRequestOptions {
  headers?: Record<string, string>
  /** Safe identifier used in errors instead of a credential-bearing URL. */
  label?: string
}

export interface ResolvedRegistryReference {
  /** Stable reference persisted in components.json. */
  reference: string
  /** URL or built-in item name passed to the registry client. */
  resource: string
  request?: RegistryRequestOptions
}

const namespacedReferencePattern = /^(@[a-z0-9][a-z0-9_-]*)\/(.+)$/i
const environmentPattern = /\$\{([A-Z_][A-Z0-9_]*)(?::-([^}]*))?\}/gi

export function parseNamespacedRegistryReference(reference: string) {
  const match = namespacedReferencePattern.exec(reference)
  if (!match) return null
  const namespace = match[1]!
  const name = match[2]!
  if (!/^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/i.test(name)) {
    throw new Error(
      `Invalid namespaced registry item "${reference}". Use @namespace/resource-name.`,
    )
  }
  return { namespace, name }
}

export function registryReferenceItemName(reference: string) {
  return parseNamespacedRegistryReference(reference)?.name
}

export function qualifyRegistryDependencyReference(
  reference: string,
  ownerReference?: string,
) {
  if (
    !ownerReference ||
    parseNamespacedRegistryReference(reference) ||
    isHttpRegistryReference(reference)
  ) {
    return reference
  }
  const owner = parseNamespacedRegistryReference(ownerReference)
  return owner ? `${owner.namespace}/${reference}` : reference
}

export function isHttpRegistryReference(reference: string) {
  try {
    const url = new URL(reference)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function expandEnvironment(value: string, subject: string) {
  return value.replace(
    environmentPattern,
    (_match, variable: string, fallback: string | undefined) => {
      const resolved = process.env[variable] ?? fallback
      if (resolved === undefined) {
        throw new Error(
          `Registry configuration ${subject} requires environment variable ${variable}.`,
        )
      }
      return resolved
    },
  )
}

function registryDefinition(namespace: string, registries: RegistryConfigs) {
  const definition = registries[namespace]
  if (!definition) {
    throw new Error(
      `Unknown registry namespace "${namespace}". Configure it in components.json under "registries".`,
    )
  }
  return typeof definition === 'string' ? { url: definition } : definition
}

export function resolveNamespacedRegistryReference(
  reference: string,
  style: string,
  registries: RegistryConfigs = {},
): ResolvedRegistryReference {
  const parsed = parseNamespacedRegistryReference(reference)
  if (!parsed) {
    return {
      reference: isHttpRegistryReference(reference)
        ? new URL(reference).toString()
        : reference,
      resource: reference,
    }
  }

  const definition = registryDefinition(parsed.namespace, registries)
  const template = expandEnvironment(
    definition.url,
    `URL for ${parsed.namespace}`,
  )
  const expanded = template
    .replaceAll('{name}', encodeURIComponent(parsed.name))
    .replaceAll('{style}', encodeURIComponent(style))
  let url: URL
  try {
    url = new URL(expanded)
  } catch {
    throw new Error(
      `Registry namespace "${parsed.namespace}" resolved to an invalid URL.`,
    )
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(
      `Registry namespace "${parsed.namespace}" must resolve to an HTTP(S) URL.`,
    )
  }
  if (
    url.protocol === 'http:' &&
    Object.keys(definition.headers ?? {}).length
  ) {
    throw new Error(
      `Registry namespace "${parsed.namespace}" cannot send authentication headers over HTTP. Use HTTPS.`,
    )
  }

  for (const [name, value] of Object.entries(definition.params ?? {})) {
    url.searchParams.set(
      expandEnvironment(name, `parameter name for ${parsed.namespace}`),
      expandEnvironment(value, `parameter "${name}" for ${parsed.namespace}`),
    )
  }
  const headers = Object.fromEntries(
    Object.entries(definition.headers ?? {}).map(([name, value]) => [
      expandEnvironment(name, `header name for ${parsed.namespace}`),
      expandEnvironment(value, `header "${name}" for ${parsed.namespace}`),
    ]),
  )

  return {
    reference,
    resource: url.toString(),
    request: {
      label: reference,
      ...(Object.keys(headers).length ? { headers } : {}),
    },
  }
}
