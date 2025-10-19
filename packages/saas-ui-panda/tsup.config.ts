import { Options, defineConfig } from 'tsup'

import config from '../../tsup.config'

export default defineConfig({
  // it's showing error else
  ...(config as unknown as Options),
  external: ['@pandacss/dev'],
})
