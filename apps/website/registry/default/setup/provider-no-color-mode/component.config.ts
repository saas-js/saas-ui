export default {
  description: 'Chakra provider without a color-mode runtime dependency',
  targets: {
    'provider-no-color-mode.tsx': 'components/setup/provider/provider.tsx',
  },
  meta: {
    exclusiveGroup: 'provider',
    conflicts: ['provider'],
  },
}
