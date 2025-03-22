import glob from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'tsup'

import config from '../../tsup.config'

function removeDirective(fileName: string) {
  const file = path.resolve(__dirname, 'dist', fileName)
  return fs.promises.writeFile(
    file,
    fs.readFileSync(file, 'utf-8').replace("'use client'\n", ''),
  )
}

// Get all component entry files
const componentEntries = glob.sync('src/components/**/index.ts')

// Split into chunks of 5
const chunks: string[][] = []
for (let i = 0; i < componentEntries.length; i += 5) {
  chunks.push(componentEntries.slice(i, i + 5))
}

// Create config for main files
const mainConfig = {
  ...config,
  entry: ['src/index.ts', 'src/preset.ts', 'src/theme/tokens/colors.ts'],
  tsconfig: './tsconfig.json',
  sourcemap: false,
  external: ['@chakra-ui/react', '@saas-ui/core'],
  async onSuccess() {
    await Promise.all([
      removeDirective('index.cjs'),
      removeDirective('index.js'),
    ])
  },
  dts: {
    resolve: true,
  },
}

// Create configs for component chunks
const chunkConfigs = chunks.map((entries, i) => {
  return {
    ...config,
    entry: entries,
    tsconfig: './tsconfig.json',
    sourcemap: false,
    external: ['@chakra-ui/react', '@saas-ui/core'],
    dts: {
      resolve: true,
    },
  }
})

export default defineConfig([mainConfig, ...chunkConfigs])
