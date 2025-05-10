// const isDev = process.argv.indexOf('dev') !== -1
// const isBuild = process.argv.indexOf('build') !== -1
// if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
//   process.env.VELITE_STARTED = '1'
//   import('velite').then((m) => m.build({ watch: isDev, clean: !isDev }))
// }
import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started/introduction',
        permanent: true,
      },
      {
        source: '/docs/getting-started',
        destination: '/docs/getting-started/introduction',
        permanent: true,
      },
    ]
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     resourceQuery: /raw/,
  //     type: 'asset/source',
  //   })

  //   config.resolve.mainFields = [
  //     'sui',
  //     'sui-pro',
  //     'source',
  //     'module',
  //     'main',
  //     ...config.resolve.mainFields,
  //   ]

  //   return config
  // },
} satisfies NextConfig

export default withContentCollections(nextConfig)
