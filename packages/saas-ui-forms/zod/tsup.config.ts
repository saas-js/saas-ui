import { defineConfig } from 'tsup'
import config from '../../../tsup.config'

export default defineConfig({
  ...config,
  outDir: './dist/zod',
  external: [
    'zod',
    'react-hook-form',
    '@saas-ui/forms',
    '@saas-ui/modals',
    '@hookform/resolvers/zod',
    '@chakra-ui/utils',
  ],
  clean: false,
})
