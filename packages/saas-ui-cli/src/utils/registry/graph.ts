import type { RegistryItem } from '#utils/registry/schema'

import { type RegistryClient, isRegistryUrl } from './client'
import {
  type RegistryConfigs,
  parseNamespacedRegistryReference,
  qualifyRegistryDependencyReference,
  resolveNamespacedRegistryReference,
} from './namespaces'

export interface ResolvedRegistryGraph {
  requested: string[]
  requestedReferences: string[]
  items: RegistryItem[]
  itemReferences: string[]
  transitive: string[]
  transitiveReferences: string[]
  dependencies: Record<string, string[]>
  dependenciesByReference: Record<string, string[]>
}

export class RegistryItemFetchError extends Error {
  readonly reference: string
  readonly owner?: string
  readonly requestedRoot: boolean

  constructor(
    reference: string,
    owner: string | undefined,
    requestedRoot: boolean,
    cause: unknown,
  ) {
    const relationship = owner
      ? `dependency "${reference}" required by "${owner}"`
      : `requested item "${reference}"`
    super(
      `Unable to resolve registry ${relationship}: ${cause instanceof Error ? cause.message : String(cause)}`,
      { cause },
    )
    this.name = 'RegistryItemFetchError'
    this.reference = reference
    this.owner = owner
    this.requestedRoot = requestedRoot
  }
}

function assertDependencyReference(reference: string, owner?: string) {
  if (
    isRegistryUrl(reference) ||
    parseNamespacedRegistryReference(reference) ||
    /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/.test(reference)
  ) {
    return
  }
  throw new Error(
    `Invalid registry dependency "${reference}"${owner ? ` declared by "${owner}"` : ''}. Dependencies must be item names, @namespace/item references, or absolute HTTP(S) URLs.`,
  )
}

function resolveDependencyReference(
  reference: string,
  ownerReference?: string,
) {
  const qualified = qualifyRegistryDependencyReference(
    reference,
    ownerReference,
  )
  if (
    isRegistryUrl(qualified) ||
    parseNamespacedRegistryReference(qualified) ||
    !ownerReference
  ) {
    return qualified
  }

  const ownerUrl = new URL(ownerReference)
  return new URL(`${encodeURIComponent(qualified)}.json`, ownerUrl).toString()
}

export async function resolveRegistryGraph(
  requested: readonly string[],
  style: string,
  client: RegistryClient,
  registries: RegistryConfigs = {},
): Promise<ResolvedRegistryGraph> {
  const roots = Array.from(new Set(requested)).sort()
  if (!roots.length) throw new Error('At least one registry item is required.')

  const result: RegistryItem[] = []
  const itemReferences: string[] = []
  const states = new Map<string, 'visiting' | 'visited'>()
  const itemsByReference = new Map<string, RegistryItem>()
  const dependenciesByName = new Map<string, string[]>()
  const dependenciesByReference = new Map<string, string[]>()
  const stack: Array<{ reference: string; name?: string }> = []

  async function visit(
    reference: string,
    owner?: string,
    ownerReference?: string,
  ): Promise<{ item: RegistryItem; reference: string }> {
    assertDependencyReference(reference, owner)
    const resolvedReference = resolveDependencyReference(
      reference,
      ownerReference,
    )
    const resolved = resolveNamespacedRegistryReference(
      resolvedReference,
      style,
      registries,
    )
    const key = resolved.reference
    const state = states.get(key)
    if (state === 'visited') {
      return { item: itemsByReference.get(key)!, reference: key }
    }
    if (state === 'visiting') {
      const start = stack.findIndex((entry) => entry.reference === key)
      const cycle = [
        ...stack.slice(start),
        { reference: key, name: itemsByReference.get(key)?.name },
      ]
        .map((entry) => entry.name ?? entry.reference)
        .join(' -> ')
      throw new Error(`Registry dependency cycle detected: ${cycle}`)
    }

    states.set(key, 'visiting')
    let item = itemsByReference.get(key)
    if (!item) {
      try {
        item = await client.getItem(resolved.resource, style, resolved.request)
      } catch (error) {
        if (error instanceof RegistryItemFetchError) throw error
        throw new RegistryItemFetchError(key, owner, owner === undefined, error)
      }
    }
    const namespaced = parseNamespacedRegistryReference(key)
    const expectedName = namespaced
      ? namespaced.name
      : !isRegistryUrl(key)
        ? reference
        : undefined
    if (expectedName && item.name !== expectedName) {
      throw new Error(
        `Registry item name mismatch: requested "${expectedName}" but received "${item.name}".`,
      )
    }
    itemsByReference.set(key, item)

    stack.push({ reference: key, name: item.name })

    const resolvedDependencies = new Set<string>()
    const resolvedDependencyReferences = new Set<string>()
    for (const dependency of item.registryDependencies ?? []) {
      const resolvedDependency = await visit(
        dependency,
        item.name,
        isRegistryUrl(key) || namespaced ? key : undefined,
      )
      resolvedDependencies.add(resolvedDependency.item.name)
      resolvedDependencyReferences.add(resolvedDependency.reference)
    }
    dependenciesByName.set(item.name, [...resolvedDependencies])
    dependenciesByReference.set(key, [...resolvedDependencyReferences])

    stack.pop()
    states.set(key, 'visited')
    result.push(item)
    itemReferences.push(key)
    return { item, reference: key }
  }

  for (const reference of roots) await visit(reference)

  const requestedReferences = roots.map(
    (reference) =>
      resolveNamespacedRegistryReference(reference, style, registries)
        .reference,
  )
  const requestedNames = requestedReferences.map((key) => {
    return itemsByReference.get(key)?.name ?? key
  })
  const rootNames = new Set(requestedNames)
  const rootReferences = new Set(requestedReferences)
  return {
    requested: requestedNames,
    requestedReferences,
    items: result,
    itemReferences,
    dependencies: Object.fromEntries(dependenciesByName),
    dependenciesByReference: Object.fromEntries(dependenciesByReference),
    transitive: result
      .map((item) => item.name)
      .filter((name) => !rootNames.has(name)),
    transitiveReferences: itemReferences.filter(
      (reference) => !rootReferences.has(reference),
    ),
  }
}
