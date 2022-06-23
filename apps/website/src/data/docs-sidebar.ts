import { RouteItem } from '@/docs/utils/get-route-context'

import { FiBox, FiHelpCircle, FiBookOpen } from 'react-icons/fi'

const sidebar = {
  routes: [
    {
      title: 'Getting Started',
      icon: FiBookOpen,
      heading: true,
      open: true,
      routes: [
        {
          title: 'Introduction',
          path: '/docs/introduction',
        },
        {
          title: 'Design Principles',
          path: '/docs/principles',
        },
        {
          title: 'Changelog',
          path: '/changelog',
        },
        {
          title: 'Quickstarts',
          path: '/docs/getting-started',
          open: true,
          routes: [
            {
              title: 'Overview',
              path: '/docs/getting-started',
            },
            {
              title: 'Create React App',
              path: '/docs/installation/cra-guide',
            },
            {
              title: 'Next JS',
              path: '/docs/installation/nextjs-guide',
            },
            {
              title: 'Blitz JS',
              path: '/docs/installation/blitzjs-guide',
            },
            {
              title: 'RedwoodJS',
              path: '/docs/installation/redwoodjs-guide',
            },
            {
              title: 'Remix',
              path: '/docs/installation/remix-guide',
            },
            {
              title: 'Vite',
              path: '/docs/installation/vite-guide',
            },
          ],
        },
        {
          title: 'Theming',
          path: '/docs/theming',
          open: true,
          routes: [
            {
              title: 'Saas UI Theme',
              path: '/docs/theming/saas-ui-theme',
            },
            {
              title: 'Chakra UI Theme',
              path: '/docs/theming/chakra-ui-theme',
            },
            {
              title: 'Customize Theme',
              path: '/docs/theming/customize-theme',
            },
          ],
        },
        {
          title: 'Integrations',
          path: '/docs/integrations',
          open: true,
          routes: [
            {
              title: 'Clerk',
              path: '/docs/integrations/clerk',
            },
            {
              title: 'Supabase',
              path: '/docs/integrations/supabase',
            },
            {
              title: 'Magic.link',
              path: '/docs/integrations/magic',
            },
          ],
        },
      ],
    },
    {
      title: 'Components',
      icon: FiBox,
      heading: true,
      open: true,
      routes: [
        {
          title: 'Authentication',
          path: '/docs/auth',
          open: true,
          routes: [
            {
              title: 'AuthProvider',
              path: '/docs/auth/auth-provider',
            },
            {
              title: 'Auth',
              path: '/docs/auth/auth',
            },
          ],
        },
        {
          title: 'Layout',
          path: '/docs/layout',
          open: true,
          routes: [
            {
              title: 'Card',
              path: '/docs/layout/card',
            },
            {
              title: 'App Shell',
              path: '/docs/layout/app-shell',
              pro: true,
            },
            {
              title: 'Page',
              path: '/docs/layout/page',
              pro: true,
            },
            {
              title: 'Section',
              path: '/docs/layout/section',
              pro: true,
            },
          ],
        },
        {
          title: 'Navigation',
          path: '/docs/navigation',
          open: true,
          // sort: true,
          routes: [
            {
              title: 'Hotkeys',
              path: '/docs/navigation/hotkeys',
            },
            {
              title: 'Stepper',
              path: '/docs/navigation/stepper',
            },
            {
              title: 'Sidebar',
              path: '/docs/navigation/sidebar',
              pro: true,
            },
          ],
        },
        {
          title: 'Web3',
          path: '/docs/web3',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Address',
              path: '/docs/web3/address',
            },
          ],
        },
        {
          title: 'Forms',
          path: '/docs/form',
          sort: false,
          open: true,
          routes: [
            {
              title: 'Form',
              path: '/docs/forms/form',
            },
            {
              title: 'StepForm',
              path: '/docs/forms/step-form',
            },
            {
              title: 'FormLayout',
              path: '/docs/forms/form-layout',
            },
            {
              title: 'AutoForm',
              path: '/docs/forms/auto-form',
            },
            {
              title: 'Field',
              path: '/docs/forms/field',
            },
            {
              title: 'ArrayField',
              path: '/docs/forms/array-field',
            },
            {
              title: 'ObjectField',
              path: '/docs/forms/object-field',
            },
            {
              title: 'Select',
              path: '/docs/forms/select',
            },
            {
              title: 'PasswordInput',
              path: '/docs/forms/password-input',
            },
            {
              title: 'SearchInput',
              path: '/docs/forms/search-input',
            },
          ],
        },
        {
          title: 'Data Display',
          path: '/docs/data-display',
          open: true,
          routes: [
            {
              title: 'DataTable',
              path: '/docs/data-display/data-table',
            },
            {
              title: 'Divider',
              path: '/docs/data-display/divider',
            },
            {
              title: 'EmptyState',
              path: '/docs/data-display/empty-state',
            },
            {
              title: 'List',
              path: '/docs/data-display/list',
            },
            {
              title: 'Property',
              path: '/docs/data-display/property',
            },
            {
              title: 'Persona',
              path: '/docs/data-display/persona',
            },
          ],
        },
        {
          title: 'Advanced Data',
          path: '/docs/advanced-data',
          open: true,
          sort: true,
          routes: [
            {
              title: 'DataGrid',
              path: '/docs/advanced-data/data-grid',
              pro: true,
            },
            {
              title: 'Filters',
              path: '/docs/advanced-data/filters',
              pro: true,
            },
          ],
        },
        {
          title: 'Feedback',
          path: '/docs/feedback',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Banner',
              path: '/docs/feedback/banner',
            },
            {
              title: 'NProgress',
              path: '/docs/feedback/nprogress',
            },
            {
              title: 'Snackbar',
              path: '/docs/feedback/snackbar',
            },
            {
              title: 'Loader',
              path: '/docs/feedback/loader',
            },
          ],
        },
        {
          title: 'Overlay',
          path: '/docs/overlay',
          open: true,
          sort: false,
          routes: [
            {
              title: 'Modals manager',
              path: '/docs/overlay/modals-manager',
            },
            {
              title: 'MenuDialog',
              path: '/docs/overlay/menu-dialog',
            },
            {
              title: 'FormDialog',
              path: '/docs/overlay/form-dialog',
            },
          ],
        },
        {
          title: 'Engagement',
          path: '/docs/engagement',
          open: true,
          routes: [
            {
              title: 'Benefits Modal',
              path: '/docs/engagement/benefits-modal',
              pro: true,
            },
            {
              title: 'Tour',
              path: '/docs/engagement/tour',
              pro: true,
            },
          ],
        },
        {
          title: 'Utilities',
          path: '/docs/utilities',
          open: true,
          routes: [
            {
              title: 'Feature Flags',
              path: '/docs/utils/feature-flags',
              pro: true,
            },
            {
              title: 'ResizeBox',
              path: '/docs/utils/resize-box',
              pro: true,
            },
          ],
        },
        {
          title: 'Hooks',
          path: '/docs/hooks',
          open: true,
          sort: true,
          routes: [
            {
              title: 'useCollapse',
              path: '/docs/hooks/use-collapse',
            },
            {
              title: 'useLocalStorage',
              path: '/docs/hooks/use-local-storage',
            },
          ],
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
