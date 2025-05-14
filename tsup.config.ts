import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2022',
  experimentalDts: true,
  clean: true,
  sourcemap: true,
  format: ['esm', 'cjs'],
  banner: {
    js: "'use client'",
  },
})
