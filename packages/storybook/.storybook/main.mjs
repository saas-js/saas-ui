import path from 'path'
import { mergeConfig } from 'vite'
const toPath = (_path) => path.join(process.cwd(), _path)
export default {
  stories: [
    '../../saas-ui-auth/stories/*.stories.tsx',
    '../../saas-ui-charts/stories/*.stories.tsx',
    '../../saas-ui-command-bar/stories/*.stories.tsx',
    '../../saas-ui-forms/stories/*.stories.tsx',
    '../../saas-ui-forms/**/*.stories.tsx',
    '../../saas-ui-core/src/**/*.stories.tsx',
    '../../saas-ui-data-table/stories/*.stories.tsx',
    '../../saas-ui-date-picker/stories/*.stories.tsx',
    '../../saas-ui-hotkeys/stories/*.stories.tsx',
    '../../saas-ui-hotkeys/stories/*.stories.tsx',
    '../../saas-ui-modals/stories/*.stories.tsx',
    '../../saas-ui-nprogress/stories/*.stories.tsx',
    '../../saas-ui-theme/stories/*.stories.tsx',
    '../../saas-ui-theme-glass/stories/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@saas-ui/storybook-addon',
  ],
  features: {
    buildStoriesJson: true,
  },
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
      '@saas-ui/pro': {
        title: 'Saas UI Pro',
        url: 'https://storybook.saas-ui.pro',
      },
      ...refs,
    }
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add storybook-specific dependencies to pre-optimization
      // optimizeDeps: {
      //   include: ['storybook-addon-designs'],
      // },
      resolve: {
        alias: [
          {
            find: /(\@saas-ui\/[a-z-\/]+)$/,
            replacement: '$1/src',
          },
        ],
      },
    })
  },
  framework: {
    name: '@storybook/react-vite',
  },
  docs: {
    autodocs: true,
  },
}
