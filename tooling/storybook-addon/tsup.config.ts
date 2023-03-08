import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  clean: true,
  external: [
    '@saas-ui/storybook-addon',
    '@saas-ui/react',
    '@saas-ui/core',
    '@saas-ui/theme',
    '@saas-ui/theme-glass',
  ],
  format: ['esm', 'cjs'],
})
