import { defineConfig } from 'tsup'
import config from '../../tsup.config'

export default defineConfig({
  ...config,
  entry: ['src/index.ts', 'src/zod/index.ts', 'src/yup/index.ts'],
})
