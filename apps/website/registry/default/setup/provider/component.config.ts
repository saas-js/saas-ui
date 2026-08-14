export default {
  description:
    'Chakra provider configured with the Saas UI preset and color mode',
  targets: {
    'provider.tsx': 'components/setup/provider/provider.tsx',
  },
  meta: {
    exclusiveGroup: 'provider',
    exclusiveDefault: true,
    conflicts: ['provider-no-color-mode'],
  },
}
