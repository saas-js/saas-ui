const { withContentlayer } = require('next-contentlayer2')
const path = require('node:path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const webpack = require('webpack')

/**
 * @type {import('next').NextConfig}
 */
let config = {
  optimizeFonts: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
  transpilePackages: [
    '@saas-ui/core',
    '@saas-ui/forms',
    '@saas-ui/react',
    '@saas-ui/modals',
    '@saas-ui/hotkeys',
    '@saas-ui/use-hotkeys',
    '@saas-ui/data-table',
    '@saas-ui/theme',
    '@saas-ui/date-picker',
    '@saas-ui-pro/react',
    '@saas-ui-pro/react/theme',
  ],
  async redirects() {
    return [
      {
        source: '/nextjs-boilerplate',
        destination: '/nextjs-starter-kit',
        permanent: true,
      },
      {
        source: '/docs/pro/project-structure',
        destination: '/docs/nextjs-starter-kit/project-structure',
        permanent: true,
      },
      {
        source: '/docs/pro/installation/overview',
        destination: '/docs/nextjs-starter-kit/installation',
        permanent: true,
      },
      {
        source: '/docs/pro/installation/clone-repository',
        destination: '/docs/nextjs-starter-kit/installation/clone-repository',
        permanent: true,
      },
      {
        source: '/docs/pro/installation/run-application',
        destination: '/docs/nextjs-starter-kit/installation/run-application',
        permanent: true,
      },
      {
        source: '/docs/pro/authentication/:path*',
        destination: '/docs/nextjs-starter-kit/authentication/:path*',
        permanent: true,
      },
      {
        source: '/docs/pro/deployments/:path*',
        destination: '/docs/nextjs-starter-kit/deployments/:path*',
        permanent: true,
      },
      {
        source: '/docs/pro/theming/:path*',
        destination: '/docs/nextjs-starter-kit/theming/:path*',
        permanent: true,
      },
    ]
  },
  webpack: (config, { defaultLoaders }) => {
    const fileLoaderRule = config.module.rules.find((rule) => {
      return new RegExp(rule.test).test('.svg')
    })

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    config.resolve = {
      ...config.resolve,
    }

    config.module.rules.push({
      test: /node_modules\/@saas-ui(?:-pro)?\/.*\.tsx?/,
      use: [defaultLoaders.babel],
    })

    config.plugins = config.plugins.concat([
      new webpack.NormalModuleReplacementPlugin(
        /\@saas-ui(?:-pro)?\/([a-z0-9-\/]+)$/,
        (resource) => {
          if (
            !resource.request.match(/^@saas-ui\/(props-docs)$/) &&
            !resource.request.match('/src')
          ) {
            resource.request = resource.request + '/src'
          }
        }
      ),
    ])

    return config
  },
}

// if (process.env.NODE_ENV !== 'production') {
// config = withContentlayer(config)
// }

module.exports = withBundleAnalyzer(config)
