import { defineConfig } from 'tsup'

import config from '../../../tsup.config'

export default defineConfig({
  ...config,
  outDir: './dist/zod',
  experimentalDts: false,
  dts: true,
  external: [
    'zod',
    'react-hook-form',
    '@saas-ui/forms',
    '@hookform/resolvers/zod',
  ],
  clean: false,
})
