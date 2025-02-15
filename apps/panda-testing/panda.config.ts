import { defineConfig } from '@pandacss/dev'
import saasUiPreset from '@saas-ui/panda-preset'

export default defineConfig({
  presets: [saasUiPreset],
  jsxFramework: 'react',
  outExtension: 'js',
  jsxStyleProps: 'all',
  // importMap: '@saas-ui/react-panda/styled-system',
  preflight: true,
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    '../../packages/saas-ui-react-panda/dist/panda.buildinfo.json',
  ],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: 'styled-system',
})
