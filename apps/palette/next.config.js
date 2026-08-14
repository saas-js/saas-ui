const withWorkspaces = require('@saas-ui/next-workspaces')

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

    return config
  },
})
