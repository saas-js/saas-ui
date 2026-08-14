import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '#commands': path.join(root, 'src/commands'),
      '#constants': path.join(root, 'src/constants.ts'),
      '#context': path.join(root, 'src/context.ts'),
      '#utils': path.join(root, 'src/utils'),
    },
    conditions: ['sui'],
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
})
