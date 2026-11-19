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
      'drizzle-secrets',
      'conditions',
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
        // The homepage is the TanStack Start kit, so /tanstack-start was a
        // second page targeting the same query on the same domain. Two pages
        // competing for one term is what split the starter-kit rankings in the
        // first place — consolidate onto the stronger URL.
        source: '/tanstack-start',
        destination: '/',
        permanent: true,
        // Config redirects run on every host. Without this, saas-ui.dev
        // /tanstack-start went to saas-ui.dev's own homepage; proxy.ts
        // handles that host instead.
        missing: [{ type: 'host', value: '.*saas-ui.*' }],
      },
      {
        source: '/docs/getting-started',
        destination: '/docs/getting-started/introduction',
        permanent: true,
      },
      {
        source: '/docs/charts',
        destination: '/docs/charts/overview',
        permanent: true,
      },
      {
        source: '/docs/iconify-cli',
        destination: '/packages/iconx/docs',
        permanent: true,
      },
      ...packageRedirects,
      // Drizzle CRUD was retired from the site; keep its old URLs (and the
      // legacy /docs/drizzle-crud paths) landing somewhere useful.
      {
        source: '/packages/drizzle-crud/docs/advanced/filtering',
        destination: '/packages/conditions/docs/integrations/drizzle',
        permanent: true,
      },
      {
        source: '/docs/drizzle-crud/advanced/filtering',
        destination: '/packages/conditions/docs/integrations/drizzle',
        permanent: true,
      },
      {
        source: '/packages/drizzle-crud/:path*',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/docs/drizzle-crud/:path*',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/drizzle-orm-pagination',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/drizzle-soft-delete',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/drizzle-crud-generator',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/drizzle-filtering',
        destination: '/packages/conditions/docs/integrations/drizzle',
        permanent: true,
      },
      {
        source: '/react-icons-alternative',
        destination: '/packages/iconx/docs',
        permanent: true,
      },
      {
        source: '/s3-direct-upload-react',
        destination: '/packages/slingshot/docs/getting-started/basic-usage',
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
    // Prefer the workspace `sui` export condition so packages resolve to
    // source. `'...'` keeps webpack's default conditions.
    config.resolve.conditionNames = ['sui', 'sui-pro', '...']

    return config
  },
  turbopack: {
    resolveAlias: {
      '@saas-ui/assets': '../../packages/saas-ui-assets/src/index.ts',
      '@saas-ui/charts': '../../packages/saas-ui-charts/src/index.ts',
      '@saas-ui/chakra-preset':
        '../../packages/saas-ui-chakra-preset/src/index.ts',
      '@saas-ui/hooks': '../../packages/saas-ui-hooks/src/index.ts',
    },
  },
} satisfies NextConfig

export default withContentCollections(nextConfig)
