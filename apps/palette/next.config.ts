import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'

const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url))

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: workspaceRoot,
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    // Resolve workspace packages to source through their `sui` export.
    config.resolve.conditionNames = ['sui', '...']
    return config
  },
  turbopack: {
    root: workspaceRoot,
    resolveAlias: {
      '@saas-ui/appearance': '../../packages/saas-ui-appearance/src/index.ts',
      '@saas-ui/chakra-preset':
        '../../packages/saas-ui-chakra-preset/src/index.ts',
    },
  },
}

export default nextConfig
