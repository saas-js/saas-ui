import { describe, expect, it } from 'vitest'

import type { Config } from '#utils/get-config'
import {
  transformModuleSpecifier,
  updateImportAliases,
} from '#utils/transformers/transform-import'

const config = {
  aliases: {
    components: '@/components',
    hooks: '@/hooks',
    icons: '@/icons',
    lib: '@/lib',
    ui: '@/components/ui',
    utils: '@/lib/utils',
  },
} as Config

describe('registry import aliases', () => {
  it.each([
    [
      '@/registry/default/setup/provider/provider.tsx',
      '@/components/setup/provider/provider',
    ],
    [
      '#registry/default/setup/provider/provider.tsx',
      '@/components/setup/provider/provider',
    ],
    ['#registry/default/lib/use-link/use-link.tsx', '@/lib/use-link/use-link'],
    ['@/registry/default/lib/use-link/use-link.tsx', '@/lib/use-link/use-link'],
    [
      '#registry/default/ui/sidebar/sidebar.tsx',
      '@/components/ui/sidebar/sidebar',
    ],
    [
      '#registry/default/blocks/dashboard/dashboard.tsx',
      '@/components/blocks/dashboard/dashboard',
    ],
    ['#hooks/use-open-state.ts', '@/hooks/use-open-state'],
  ])('rewrites %s to %s', (source, expected) => {
    expect(transformModuleSpecifier(source, config)).toBe(expected)
  })

  it('uses the same fallback for both registry alias forms', () => {
    expect(
      updateImportAliases('#registry/default/setup/provider', config),
    ).toBe('@/components/setup/provider')
    expect(
      updateImportAliases('@/registry/default/setup/provider', config),
    ).toBe('@/components/setup/provider')
  })
})
