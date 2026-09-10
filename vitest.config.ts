import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'apps/website'),
      '@saas-ui/test-utils': path.resolve(
        import.meta.dirname,
        'tooling/test-utils/src/index.ts',
      ),
      '#commands': path.resolve(
        import.meta.dirname,
        'packages/saas-ui-cli/src/commands',
      ),
      '#constants': path.resolve(
        import.meta.dirname,
        'packages/saas-ui-cli/src/constants.ts',
      ),
      '#context': path.resolve(
        import.meta.dirname,
        'packages/saas-ui-cli/src/context.ts',
      ),
      '#utils': path.resolve(
        import.meta.dirname,
        'packages/saas-ui-cli/src/utils',
      ),
    },
    conditions: ['sui'],
  },
  test: {
    setupFiles: 'vitest.setup.ts',
    include: [
      'packages/saas-ui-*/**/*.test.{ts,tsx}',
      'apps/website/app/r/**/*.test.ts',
      'apps/website/proxy.test.ts',
      'apps/website/components/ui/**/*.test.{ts,tsx}',
      'apps/website/lib/**/*.test.ts',
      'apps/website/registry/**/*.test.{ts,tsx}',
    ],
    globals: true,
    environment: 'jsdom',
  },
})
