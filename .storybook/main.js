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
    '@storybook/addon-viewport',
  ],
  staticDirs: ['./static'],
  typescript: {
    reactDocgen: false,
  },
  refs: (config, { configType }) => {
    const refs = {
      '@chakra-ui/react': {
        disable: true, // Make sure Chakra gets loaded last
      },
      chakra: {
        title: 'Chakra UI',
        url: 'https://storybook.chakra-ui.com',
      },
    }

    if (configType === 'DEVELOPMENT') {
      return {
        '@saas-ui/pro': {
          title: 'Saas UI Pro',
          url: 'http://localhost:6007',
        },
        ...refs,
      }
    }
    return {
      // '@saas-ui/pro': {
      //   title: 'Saas UI Pro',
      //   url: 'https://pro-storybook.saas-ui.dev',
      // },
      ...refs,
    }
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
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
          /\@saas-ui\/[a-z-\/]+$/,
          (resource) => {
            resource.request = resource.request + '/src/index'
          }
        ),
      ]),
    }
  },
}
