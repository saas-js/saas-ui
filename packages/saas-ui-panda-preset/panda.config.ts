import { defineConfig } from '@pandacss/dev'
import saasUiPreset from 'src'

export default defineConfig({
  presets: [saasUiPreset],
  preflight: true,
  include: [],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: 'styled-system',
  jsxFramework: 'react',
  jsxStyleProps: 'all',
  outExtension: 'js',
})
