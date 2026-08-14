import { defineRegistryItem } from '../src/compiler/index.js'

defineRegistryItem({
  description: 'Provider setup',
  meta: {
    exclusiveGroup: 'provider',
    exclusiveDefault: true,
    conflicts: ['provider-no-color-mode'],
  },
})

defineRegistryItem({
  // @ts-expect-error Item type is inferred from the source directory.
  type: 'registry:setup',
})

defineRegistryItem({
  meta: {
    // @ts-expect-error Exclusivity metadata does not accept arbitrary keys.
    analyticsLabel: 'provider',
  },
})

defineRegistryItem({
  meta: {
    // @ts-expect-error The exclusive default is a boolean.
    exclusiveDefault: 'yes',
  },
})
