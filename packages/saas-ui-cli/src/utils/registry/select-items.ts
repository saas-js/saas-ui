import {
  type RegistryIndexItem,
  isRegistryItemTypeInstallable,
  registryItemNameSchema,
} from '#utils/registry/schema'

export class RegistryAllSelectionError extends Error {
  constructor(readonly issues: string[]) {
    super(
      `Cannot select all registry items:\n${issues
        .map((issue) => `- ${issue}`)
        .join('\n')}`,
    )
    this.name = 'RegistryAllSelectionError'
  }
}

interface ExclusiveSelectionEntry {
  name: string
  isDefault: boolean
}

/**
 * Selects every public installable item. Singleton exclusive groups are
 * unambiguous; groups with multiple alternatives must define one default.
 */
export function selectAllRegistryItems(index: readonly RegistryIndexItem[]) {
  const selected: string[] = []
  const groups = new Map<string, ExclusiveSelectionEntry[]>()
  const issues: string[] = []
  const entries = index
    .filter(
      (entry) => !entry.private && isRegistryItemTypeInstallable(entry.type),
    )
    .sort((left, right) => left.name.localeCompare(right.name))

  for (const entry of entries) {
    const groupPresent = Object.hasOwn(entry.meta ?? {}, 'exclusiveGroup')
    const defaultPresent = Object.hasOwn(entry.meta ?? {}, 'exclusiveDefault')
    const groupValue = entry.meta?.exclusiveGroup
    const defaultValue = entry.meta?.exclusiveDefault
    const parsedGroup = registryItemNameSchema.safeParse(groupValue)
    if (
      groupPresent &&
      (typeof groupValue !== 'string' ||
        !parsedGroup.success ||
        parsedGroup.data !== groupValue)
    ) {
      issues.push(
        `Item "${entry.name}" has an invalid meta.exclusiveGroup value. ` +
          'It must be a non-empty normalized URL-safe string.',
      )
      continue
    }
    if (defaultPresent && typeof defaultValue !== 'boolean') {
      issues.push(
        `Item "${entry.name}" has a non-boolean meta.exclusiveDefault value.`,
      )
      continue
    }
    if (!groupPresent) {
      if (defaultPresent) {
        issues.push(
          `Item "${entry.name}" sets meta.exclusiveDefault without ` +
            'meta.exclusiveGroup.',
        )
      } else {
        selected.push(entry.name)
      }
      continue
    }

    const group = groups.get(groupValue as string) ?? []
    group.push({ name: entry.name, isDefault: defaultValue === true })
    groups.set(groupValue as string, group)
  }

  for (const [groupName, alternatives] of [...groups].sort(
    ([left], [right]) => left.localeCompare(right),
  )) {
    const defaults = alternatives.filter((entry) => entry.isDefault)
    if (alternatives.length === 1) {
      selected.push(alternatives[0]!.name)
      continue
    }
    if (defaults.length === 0) {
      issues.push(
        `Exclusive group "${groupName}" has no public installable item ` +
          `marked meta.exclusiveDefault. Alternatives: ${alternatives
            .map((entry) => entry.name)
            .join(', ')}.`,
      )
      continue
    }
    if (defaults.length > 1) {
      issues.push(
        `Exclusive group "${groupName}" has multiple defaults: ${defaults
          .map((entry) => entry.name)
          .join(', ')}.`,
      )
      continue
    }
    selected.push(defaults[0]!.name)
  }

  if (issues.length) throw new RegistryAllSelectionError(issues)
  return selected.sort()
}
