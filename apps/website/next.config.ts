import { withContentCollections } from '@content-collections/next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import type { NextConfig } from 'next'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url))

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
  outputFileTracingRoot: workspaceRoot,
  outputFileTracingIncludes: {
    '/*': [
      './public/types/**/*',
      './public/fonts/**/*',
      '../compositions/src/examples/**/*',
    ],
  },
  async redirects() {
    const packageRedirects = [
      'drizzle-crud',
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
      {
        source: '/drizzle-orm-pagination',
        destination: '/packages/drizzle-crud/docs/reference/core-operations',
        permanent: true,
      },
      {
        source: '/drizzle-soft-delete',
        destination: '/packages/drizzle-crud/docs/reference/core-operations',
        permanent: true,
      },
      {
        source: '/drizzle-crud-generator',
        destination: '/packages/drizzle-crud/docs/getting-started/basic-usage',
        permanent: true,
      },
      {
        source: '/drizzle-filtering',
        destination: '/packages/drizzle-crud/docs/advanced/filtering',
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
    root: workspaceRoot,
    resolveAlias: {
      '@saas-ui/assets': '../../packages/saas-ui-assets/src/index.ts',
      '@saas-ui/charts': '../../packages/saas-ui-charts/src/index.ts',
      '@saas-ui/chakra-preset':
        '../../packages/saas-ui-chakra-preset/src/index.ts',
      '@saas-ui/hooks': '../../packages/saas-ui-hooks/src/index.ts',
    },
  },
} satisfies NextConfig

export default Promise.resolve(withContentCollections(nextConfig)).then(
  (config) => {
    execSync('node scripts/generate-mdx-modules.mjs', {
      cwd: fileURLToPath(new URL('.', import.meta.url)),
      stdio: 'inherit',
    })
    return config
  },
)

// Only for `next dev`. The helper starts wrangler/miniflare; `next build`
// (Vercel and `cf:build`) must not do that.
if (process.argv.includes('dev')) {
  initOpenNextCloudflareForDev()
}
