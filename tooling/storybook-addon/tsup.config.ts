import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  clean: true,
  external: ['@saas-ui/storybook-addon', '@saas-ui/react', '@saas-ui/core'],
  format: ['esm', 'cjs'],
})
