import { describe, expect, it } from 'vitest'

import {
  RegistryAllSelectionError,
  selectAllRegistryItems,
} from '#utils/registry/select-items'
import type { RegistryIndexItem } from '#utils/registry/schema'

function entry(
  name: string,
  options: Partial<RegistryIndexItem> = {},
): RegistryIndexItem {
  return {
    schemaVersion: 1,
    name,
    type: 'registry:ui',
    ...options,
  }
}

describe('selectAllRegistryItems', () => {
  it.each([
    {
      name: 'chooses one explicit default and keeps nonexclusive items',
      index: [
        entry('provider-no-color-mode', {
          type: 'registry:setup',
          meta: { exclusiveGroup: 'provider' },
        }),
        entry('sidebar'),
        entry('provider', {
          type: 'registry:setup',
          meta: { exclusiveGroup: 'provider', exclusiveDefault: true },
        }),
        entry('private-block', { private: true, type: 'registry:block' }),
        entry('example', { type: 'registry:example' }),
      ],
      expected: ['provider', 'sidebar'],
    },
    {
      name: 'returns deterministic output for shuffled index entries',
      index: [
        entry('zeta'),
        entry('variant-b', {
          meta: { exclusiveGroup: 'variant' },
        }),
        entry('alpha'),
        entry('variant-a', {
          meta: { exclusiveDefault: true, exclusiveGroup: 'variant' },
        }),
      ],
      expected: ['alpha', 'variant-a', 'zeta'],
    },
    {
      name: 'keeps every public installable item without exclusive metadata',
      index: [
        entry('hook', { type: 'registry:hook' }),
        entry('component'),
        entry('icon', { type: 'registry:icon' }),
        entry('private', { private: true }),
        entry('legacy-style', { type: 'registry:style' }),
      ],
      expected: ['component', 'hook', 'icon'],
    },
    {
      name: 'auto-selects a singleton public installable exclusive group',
      index: [
        entry('provider', {
          type: 'registry:setup',
          meta: { exclusiveGroup: 'provider' },
        }),
      ],
      expected: ['provider'],
    },
    {
      name: 'selects the only public installable alternative after filtering',
      index: [
        entry('provider', {
          type: 'registry:setup',
          meta: { exclusiveGroup: 'provider' },
        }),
        entry('private-provider', {
          private: true,
          type: 'registry:setup',
          meta: { exclusiveGroup: 'provider', exclusiveDefault: true },
        }),
        entry('provider-example', {
          type: 'registry:example',
          meta: { exclusiveGroup: 'provider', exclusiveDefault: true },
        }),
      ],
      expected: ['provider'],
    },
  ])('$name', ({ index, expected }) => {
    expect(selectAllRegistryItems(index)).toEqual(expected)
  })

  it.each([
    {
      name: 'rejects an ambiguous group without a default',
      index: [
        entry('provider', { meta: { exclusiveGroup: 'provider' } }),
        entry('provider-no-color-mode', {
          meta: { exclusiveGroup: 'provider' },
        }),
      ],
      message: 'Exclusive group "provider" has no public installable item',
    },
    {
      name: 'rejects multiple defaults in one group',
      index: [
        entry('provider', {
          meta: { exclusiveDefault: true, exclusiveGroup: 'provider' },
        }),
        entry('provider-no-color-mode', {
          meta: { exclusiveDefault: true, exclusiveGroup: 'provider' },
        }),
      ],
      message: 'Exclusive group "provider" has multiple defaults',
    },
    {
      name: 'rejects a default marker without a group',
      index: [entry('provider', { meta: { exclusiveDefault: true } })],
      message: 'sets meta.exclusiveDefault without meta.exclusiveGroup',
    },
    {
      name: 'rejects a false default marker without a group',
      index: [entry('provider', { meta: { exclusiveDefault: false } })],
      message: 'sets meta.exclusiveDefault without meta.exclusiveGroup',
    },
    {
      name: 'rejects a malformed group on a singleton item',
      index: [
        entry('provider', {
          meta: { exclusiveGroup: 42 } as unknown as RegistryIndexItem['meta'],
        }),
      ],
      message: 'has an invalid meta.exclusiveGroup value',
    },
    {
      name: 'rejects an empty group on a singleton item',
      index: [entry('provider', { meta: { exclusiveGroup: '' } })],
      message: 'has an invalid meta.exclusiveGroup value',
    },
    {
      name: 'rejects a non-normalized group on a singleton item',
      index: [entry('provider', { meta: { exclusiveGroup: ' provider ' } })],
      message: 'has an invalid meta.exclusiveGroup value',
    },
    {
      name: 'rejects a malformed default on a singleton item',
      index: [
        entry('provider', {
          meta: {
            exclusiveDefault: 'yes',
            exclusiveGroup: 'provider',
          } as unknown as RegistryIndexItem['meta'],
        }),
      ],
      message: 'has a non-boolean meta.exclusiveDefault value',
    },
  ])('$name', ({ index, message }) => {
    expect(() => selectAllRegistryItems(index)).toThrow(message)
    expect(() => selectAllRegistryItems(index)).toThrow(
      RegistryAllSelectionError,
    )
  })
})
