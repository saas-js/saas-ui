import { defineConfig } from 'tsup'
import config from '../../../tsup.config'

export default defineConfig({
  ...config,
  outDir: './dist/yup',
  external: [
    'yup',
    'react-hook-form',
    '@saas-ui/forms',
    '@hookform/resolvers/yup',
  ],
  clean: false,
})
