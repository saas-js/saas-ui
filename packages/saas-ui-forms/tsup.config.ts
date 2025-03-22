import { defineConfig } from 'tsup'

import config from '../../tsup.config'

export default defineConfig({
  ...config,
  dts: true,
  experimentalDts: false,
})
