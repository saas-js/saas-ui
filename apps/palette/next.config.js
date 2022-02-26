const withWorkspaces = require('@saas-ui/next-workspaces')
const webpack = require('webpack')

module.exports = withWorkspaces({
  basePath: '../../',
  workspaces: ['packages'],
})({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.plugins = config.plugins.concat([
      new webpack.NormalModuleReplacementPlugin(
        /@saas-ui\/(?!props-docs)([a-z0-9-]+)$/,
        (resource) => {
          resource.request = resource.request + '/src'
        }
      ),
    ])

    return config
  },
})
