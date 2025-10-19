import { defineConfig } from 'tsup'

export default defineConfig({
  format: 'esm',
  clean: true,
  sourcemap: true,
  external: ['@pandacss/dev'],
  dts: true,
})
