const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const webpack = require('webpack')

let config = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
    modern: true,
    externalDir: true,
  },
  compiler: {},
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: false,
      },
    ]
  },
  webpack: (config, { defaultLoaders }) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
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

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    })

    config.resolve = {
      ...config.resolve,
    }

    // config.module.rules.push({
    //   test: /node_modules\/@saas-ui\/(pro|charts|billing|features|onboarding|router)\/.*\.tsx?/,
    //   use: [defaultLoaders.babel],
    // })

    config.plugins = config.plugins.concat([
      new webpack.NormalModuleReplacementPlugin(
        /\@saas-ui\/([a-z0-9-\/]+)$/,
        (resource) => {
          if (!resource.request.match(/^@saas-ui\/(props-docs)$/)) {
            resource.request = resource.request + '/src'
          }
        }
      ),
    ])

    return config
  },
}

const isNextDev = process.argv.includes('dev')

if (isNextDev) {
  config = withContentlayer(config)
}

module.exports = withBundleAnalyzer(config)
