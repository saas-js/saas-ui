import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['packages/saas-ui-*/tests/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
  },
})
