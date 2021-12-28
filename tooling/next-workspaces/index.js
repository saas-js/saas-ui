const path = require('path')

module.exports =
  ({ workspaces = [], basePath = '../' }) =>
  (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack: (config, options) => {
        if (workspaces && workspaces.length) {
          config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            include: workspaces.map((workspace) =>
              path.resolve(basePath, workspace)
            ),
            exclude: /node_modules/,
            use: options.defaultLoaders.babel,
          })
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }
        return config
      },
    })
  }
