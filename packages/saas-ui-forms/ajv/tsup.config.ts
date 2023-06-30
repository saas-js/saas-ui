import { defineConfig } from 'tsup'
import config from '../../../tsup.config'

export default defineConfig({
  ...config,
  outDir: './dist/ajv',
  external: [
    'ajv',
    'react-hook-form',
    '@saas-ui/forms',
    '@hookform/resolvers/ajv',
    '@chakra-ui/utils',
  ],
  clean: false,
})
