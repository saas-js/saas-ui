const path = require('path')
const webpack = require('webpack')
const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: ['../packages/**/stories/*.stories.tsx'],
  addons: [
    'storybook-addon-performance/register',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-storysource',
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
      plugins: config.plugins.concat([
        new webpack.NormalModuleReplacementPlugin(
          /\@saas-ui\/[a-z]+$/,
          (resource) => {
            resource.request = resource.request + '/src/index'
          }
        ),
      ]),
    }
  },
}
