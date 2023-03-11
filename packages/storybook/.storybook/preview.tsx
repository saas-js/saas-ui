import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
}

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}
