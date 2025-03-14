import path, { dirname, join } from 'path'

export default {
  stories: [
    '../../saas-ui-react/src/**/*.stories.tsx',
    '../../saas-ui-core/src/**/*.stories.tsx',
    '../../saas-ui-modals/stories/*.stories.tsx',
    '../../saas-ui-nprogress/stories/*.stories.tsx',
    '../../saas-ui-charts/stories/*.stories.tsx',
    '../../saas-ui-forms/stories/*.stories.tsx',
  ],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@storybook/addon-themes',
  ],

  features: {
    buildStoriesJson: true,
  },

  staticDirs: ['./static'],

  typescript: {
    reactDocgen: false,
  },

  // refs: (config, { configType }) => {
  //   const refs = {
  //     '@chakra-ui/react': {
  //       disable: true, // Make sure Chakra gets loaded last
  //     },
  //     chakra: {
  //       title: 'Chakra UI',
  //       url: 'https://storybook.chakra-ui.com',
  //     },
  //   }
  //   if (configType === 'DEVELOPMENT') {
  //     return {
  //       '@saas-ui/pro': {
  //         title: 'Saas UI Pro',
  //         url: 'http://localhost:6007',
  //       },
  //       ...refs,
  //     }
  //   }
  //   return {
  //     '@saas-ui/pro': {
  //       title: 'Saas UI Pro',
  //       url: 'https://storybook.saas-ui.pro',
  //     },
  //     ...refs,
  //   }
  // },

  framework: {
    name: '@storybook/react-vite',
  },

  docs: {
    autodocs: false,
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
