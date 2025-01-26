import { defineConfig } from '@pandacss/dev'
import saasUiPreset from '@saas-ui/panda'

export default defineConfig({
  presets: [saasUiPreset],
  jsxFramework: 'react',
  outExtension: 'js',
  jsxStyleProps: 'all',
  importMap: '@saas-ui/panda',
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  staticCss: {
    extend: {},
  },
  outdir: 'styled-system',
})
