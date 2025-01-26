import { defineConfig } from '@pandacss/dev'
import saasUiPreset from '@saas-ui/panda'

export default defineConfig({
  presets: [saasUiPreset],
  jsxFramework: 'react',
  outExtension: 'js',
  jsxStyleProps: 'all',
  importMap: '@saas-ui/panda',
  preflight: true,
  include: ['./app/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: 'styled-system',
})
