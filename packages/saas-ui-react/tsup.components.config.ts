import glob from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'tsup'

import config from '../../tsup.config'

// Get all component entry files
const componentEntries = glob.sync('src/components/**/index.ts')

const chunkSize = 1
const chunks: string[][] = []
for (let i = 0; i < componentEntries.length; i += chunkSize) {
  chunks.push(componentEntries.slice(i, i + chunkSize))
}

// Create configs for component chunks
const chunkConfigs = chunks.map((entries, i) => {
  return {
    entry: entries,
    outDir: './dist/types',
    tsconfig: './tsconfig.json',
    formats: ['esm'],
    sourcemap: false,
    dts: true,
  }
})

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/preset.ts', 'src/colors.ts'],
    external: ['./components/*'],
    outDir: './dist/types',
    tsconfig: './tsconfig.json',
    format: ['esm'],
    clean: false,
    sourcemap: false,
    dts: true,
  },
  ...chunkConfigs,
])
