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
  output: 'export',
  optimizeFonts: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    externalDir: true,
    esmExternals: 'loose',
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
    '@saas-ui-pro/feature-flags',
    '@saas-ui-pro/kanban',
  ],
  // X-Robots-Tag and redirects cannot be set here with `output: 'export'`.
  // They are applied by Cloudflare via public/_headers and public/_redirects.
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
      conditionNames: [
        'sui',
        'browser',
        'node',
        'development',
        'production',
        'import',
        'require',
      ],
    }

    config.module.rules.push({
      test: /node_modules\/@saas-ui(?:-pro)?\/.*\.tsx?/,
      use: [defaultLoaders.babel],
    })

    // config.plugins = config.plugins.concat([
    //   new webpack.NormalModuleReplacementPlugin(
    //     /\@saas-ui(?:-pro)?\/([a-z0-9-\/]+)$/,
    //     (resource) => {
    //       if (
    //         !resource.request.match(/^@saas-ui\/(props-docs)$/) &&
    //         !resource.request.match('/src')
    //       ) {
    //         resource.request = resource.request + '/src'
    //       }
    //     }
    //   ),
    // ])

    return config
  },
}

// if (process.env.NODE_ENV !== 'production') {
// config = withContentlayer(config)
// }

module.exports = withBundleAnalyzer(config)
