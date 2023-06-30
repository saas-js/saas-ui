import { defineConfig } from 'tsup'
import config from '../../../tsup.config'

export default defineConfig({
  ...config,
  outDir: './dist/zod',
  external: [
    'zod',
    'react-hook-form',
    '@saas-ui/forms',
    '@hookform/resolvers/zod',
    '@chakra-ui/utils',
  ],
  clean: false,
})
