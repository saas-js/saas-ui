import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return [
      {
        source: '/docs/getting-started',
        destination: '/docs/getting-started/introduction',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      resourceQuery: /raw/,
      type: 'asset/source',
    })

    config.resolve.mainFields = [
      'sui',
      'sui-pro',
      'source',
      'module',
      'main',
      ...config.resolve.mainFields,
    ]

    return config
  },
} satisfies NextConfig

export default withContentCollections(nextConfig)
