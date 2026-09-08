const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const webpack = require('webpack')

let config = {
  optimizeFonts: true,
  reactStrictMode: true,
  typescript: {
    // turn of untill v2
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
  compiler: {},
  // v1.saas-ui.dev is an archive: still served so anyone on v1 can read their
  // docs, but kept out of search so it cannot compete with saas-ui.dev.
  // `follow` is deliberate — links out to the current site stay crawlable.
  // Set as a header rather than a meta tag so non-HTML responses are covered too.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
      },
    ]
  },
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
