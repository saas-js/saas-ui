/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // optimizePackageImports: ['@chakra-ui/react'],
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
  // transpilePackages: ['@saas-ui/react'],
}

export default nextConfig
