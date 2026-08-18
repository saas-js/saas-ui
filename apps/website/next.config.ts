import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
  async redirects() {
    const packageRedirects = [
      'drizzle-crud',
      'iconx',
      'slingshot',
      'better-auth-react-query',
    ].flatMap((pkg) => [
      {
        source: `/docs/${pkg}`,
        destination: `/packages/${pkg}/docs`,
        permanent: true,
      },
      {
        source: `/docs/${pkg}/:path*`,
        destination: `/packages/${pkg}/docs/:path*`,
        permanent: true,
      },
    ])

    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/4PmJGFcAjX',
        permanent: false,
      },
      {
        source: '/docs/getting-started',
        destination: '/docs/getting-started/introduction',
        permanent: true,
      },
      {
        source: '/docs/iconify-cli',
        destination: '/packages/iconx/docs',
        permanent: true,
      },
      ...packageRedirects,
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
  turbopack: {
    resolveAlias: {
      '@saas-ui/assets': '../../packages/saas-ui-assets/src/index.ts',
      '@saas-ui/chakra-preset':
        '../../packages/saas-ui-chakra-preset/src/index.ts',
      '@saas-ui/hooks': '../../packages/saas-ui-hooks/src/index.ts',
    },
  },
} satisfies NextConfig

export default withContentCollections(nextConfig)
