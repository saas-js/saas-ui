import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'es2019',
  dts: true,
  clean: true,
  sourcemap: true,
  format: ['esm', 'cjs'],
  treeshake: 'smallest',
})
