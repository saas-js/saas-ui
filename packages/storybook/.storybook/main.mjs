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
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-docs")
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
    name: getAbsolutePath("@storybook/react-vite"),
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
