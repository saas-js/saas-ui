import { defineConfig } from 'tsup'

import config from '../../tsup.config'

export default defineConfig({
  ...config,
  dts: false,
  entry: ['src/index.ts', 'src/components/**/*.tsx'],
  external: [
    '@saas-ui/react-panda/styled-system',
    '@saas-ui/panda-preset',
    '@saas-ui/core',
  ],
})
