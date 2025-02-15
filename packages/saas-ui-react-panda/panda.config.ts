import { defineConfig } from '@pandacss/dev'
import saasUiPreset from '@saas-ui/panda-preset'

export default defineConfig({
  presets: [saasUiPreset],
  jsxFramework: 'react',
  outExtension: 'js',
  jsxStyleProps: 'all',
  // maybe move to @saas-ui/styled-system?
  importMap: '@saas-ui/react-panda/styled-system',
  preflight: true,
  // I think we need a separate config for the stories?
  include: ['./src/**/*.{js,jsx,ts,tsx}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  staticCss: {
    extend: {},
  },
  outdir: 'styled-system',
})
