import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@saas-ui/registry/compiler': path.resolve(
        import.meta.dirname,
        '../../packages/saas-ui-registry/src/compiler/index.ts',
      ),
    },
    conditions: ['sui'],
  },
  test: {
    environment: 'node',
    include: ['tooling/registry/**/*.test.ts'],
    // Several tests compile the full public registry in-process; the compile
    // scales with registry size, so give it headroom beyond vitest's 5s
    // default.
    testTimeout: 30_000,
  },
})
