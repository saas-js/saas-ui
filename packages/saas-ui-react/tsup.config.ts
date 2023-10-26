import { defineConfig } from 'tsup'
import config from '../../tsup.config'
import fs from 'node:fs'
import path from 'node:path'

function removeDirective(fileName: string) {
  const file = path.resolve(__dirname, 'dist', fileName)
  return fs.promises.writeFile(
    file,
    fs.readFileSync(file, 'utf-8').replace("'use client'\n", '')
  )
}

export default defineConfig({
  ...config,
  async onSuccess() {
    await Promise.all([
      removeDirective('index.mjs'),
      removeDirective('index.js'),
    ])
  },
})
