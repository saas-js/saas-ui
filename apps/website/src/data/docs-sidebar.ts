import { RouteItem } from '@/docs/utils/get-route-context'

import {
  FiBox,
  FiHelpCircle,
  FiBookOpen,
  FiCircle,
  FiClock,
  FiStar,
  FiAnchor,
} from 'react-icons/fi'

const sidebar = {
  routes: [
    {
      title: 'Introduction',
      path: '/docs',
      icon: FiBookOpen,
    },
    {
      title: 'Changelog',
      icon: FiClock,
      path: '/changelog',
    },
    {
      title: 'Core',
      icon: FiCircle,
      heading: true,
      path: '/docs/core',
      routes: [
        {
          title: 'Overview',
          path: '/docs',
        },
        {
          title: 'Design Principles',
          path: '/docs/core/principles',
        },

        {
          title: 'Quickstarts',
          path: '/docs/core/quickstarts',
          open: true,
          routes: [
            {
              title: 'Overview',
              path: '/docs/core/quickstarts',
            },
            {
              title: 'Next JS',
              path: '/docs/core/installation/nextjs-guide',
            },
            {
              title: 'Vite',
              path: '/docs/core/installation/vite-guide',
            },
            {
              title: 'Blitz JS',
              path: '/docs/core/installation/blitzjs-guide',
            },
            {
              title: 'RedwoodJS',
              path: '/docs/core/installation/redwoodjs-guide',
            },
            {
              title: 'Remix',
              path: '/docs/core/installation/remix-guide',
            },

            {
              title: 'Create React App',
              path: '/docs/core/installation/cra-guide',
            },
          ],
        },
        {
          title: 'Theming',
          path: '/docs/core/theming',
          open: true,
          routes: [
            {
              title: 'Saas UI Theme',
              path: '/docs/core/theming/saas-ui-theme',
            },
            {
              title: 'Chakra UI Theme',
              path: '/docs/core/theming/chakra-ui-theme',
            },
            {
              title: 'Customize Theme',
              path: '/docs/core/theming/customize-theme',
            },
            {
              title: 'Fonts',
              path: '/docs/core/theming/fonts',
            },
          ],
        },
        {
          title: 'Integrations',
          path: '/docs/core/integrations',
          open: true,
          routes: [
            {
              title: 'Clerk',
              path: '/docs/core/integrations/clerk',
            },
            {
              title: 'Supabase',
              path: '/docs/core/integrations/supabase',
            },
            {
              title: 'Magic.link',
              path: '/docs/core/integrations/magic',
            },
          ],
        },
      ],
    },
    {
      title: 'Pro',
      path: '/docs/pro',
      icon: FiStar,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/pro/overview',
        },
        {
          title: 'Project structure',
          path: '/docs/pro/project-structure',
        },
        {
          title: 'Quickstarts',
          path: '/docs/pro/installation',
          open: true,
          routes: [
            {
              title: 'Overview',
              path: '/docs/pro/installation/overview',
            },
            {
              title: 'NPM registry',
              path: '/docs/pro/installation/npm',
            },
            {
              title: 'Next.js',
              path: '/docs/pro/installation/nextjs-guide',
            },
            {
              title: 'CRA',
              path: '/docs/pro/installation/cra-guide',
            },
          ],
        },
        {
          title: 'Configuration',
          path: '/docs/pro/configuration',
          open: true,
          routes: [
            {
              title: 'Authentication',
              path: '/docs/pro/configuration/authentication',
            },
          ],
        },
        {
          title: 'Theming',
          path: '/docs/pro/theming',
          open: true,
          routes: [
            {
              title: 'Configuration',
              path: '/docs/pro/theming/configuration',
            },
            {
              title: 'Color schemes',
              path: '/docs/pro/theming/color-schemes',
            },
            {
              title: 'Fonts',
              path: '/docs/pro/theming/fonts',
            },
          ],
        },
        {
          title: 'Deployments',
          path: '/docs/pro/deployments',
          open: true,
          routes: [
            {
              title: 'Vercel',
              path: '/docs/pro/deployments/vercel',
            },
          ],
        },
      ],
    },
    {
      title: 'Components',
      path: '/docs/components',
      icon: FiBox,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/components',
        },
        {
          title: 'Authentication',
          path: '/docs/components/authentication',
          open: true,
          routes: [
            {
              title: 'AuthProvider',
              path: '/docs/components/authentication/auth-provider',
            },
            {
              title: 'Auth',
              path: '/docs/components/authentication/auth',
            },
          ],
        },
        {
          title: 'Layout',
          path: '/docs/components/layout',
          open: true,
          routes: [
            {
              title: 'App Shell',
              path: '/docs/components/layout/app-shell',
            },
            {
              title: 'Sidebar',
              path: '/docs/components/layout/sidebar',
              beta: true,
            },
            {
              title: 'Page',
              path: '/docs/components/layout/page',
              pro: true,
            },
            {
              title: 'Section',
              path: '/docs/components/layout/section',
              pro: true,
            },
            {
              title: 'Toolbar',
              path: '/docs/components/layout/toolbar',
              pro: true,
            },
          ],
        },
        {
          title: 'Navigation',
          path: '/docs/components/navigation',
          open: true,
          routes: [
            {
              title: 'Hotkeys',
              path: '/docs/components/navigation/hotkeys',
            },
            {
              title: 'Stepper',
              path: '/docs/components/navigation/stepper',
            },
          ],
        },
        {
          title: 'Web3',
          path: '/docs/components/web3',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Address',
              path: '/docs/components/web3/address',
            },
          ],
        },
        {
          title: 'Forms',
          path: '/docs/components/form',
          sort: false,
          open: true,
          routes: [
            {
              title: 'Form',
              path: '/docs/components/forms/form',
            },
            {
              title: 'StepForm',
              path: '/docs/components/forms/step-form',
            },
            {
              title: 'FormLayout',
              path: '/docs/components/forms/form-layout',
            },
            {
              title: 'AutoForm',
              path: '/docs/components/forms/auto-form',
            },
            {
              title: 'Field',
              path: '/docs/components/forms/field',
            },
            {
              title: 'ArrayField',
              path: '/docs/components/forms/array-field',
            },
            {
              title: 'ObjectField',
              path: '/docs/components/forms/object-field',
            },
            {
              title: 'Select',
              path: '/docs/components/forms/select',
            },
            {
              title: 'PasswordInput',
              path: '/docs/components/forms/password-input',
            },
            {
              title: 'SearchInput',
              path: '/docs/components/forms/search-input',
            },
          ],
        },
        {
          title: 'Date & Time',
          path: '/docs/components/date-time',
          open: true,
          routes: [
            {
              title: 'DatePicker',
              path: '/docs/components/date-time/date-picker',
              beta: true,
            },
            {
              title: 'DateRangePicker',
              path: '/docs/components/date-time/date-range-picker',
              beta: true,
            },
            {
              title: 'DateInput',
              path: '/docs/components/date-time/date-input',
              beta: true,
            },
            {
              title: 'DateRangeInput',
              path: '/docs/components/date-time/date-range-input',
              beta: true,
            },
            {
              title: 'DatePickerStatic',
              path: '/docs/components/date-time/date-picker-static',
              beta: true,
            },
            {
              title: 'DatePickerModal',
              path: '/docs/components/date-time/date-picker-modal',
              beta: true,
            },
          ],
        },
        {
          title: 'Data Display',
          path: '/docs/components/data-display',
          open: true,
          routes: [
            {
              title: 'DataTable',
              path: '/docs/components/data-display/data-table',
            },
            {
              title: 'Divider',
              path: '/docs/components/data-display/divider',
            },
            {
              title: 'EmptyState',
              path: '/docs/components/data-display/empty-state',
            },
            {
              title: 'StructuredList',
              path: '/docs/components/data-display/structured-list',
            },
            {
              title: 'Property',
              path: '/docs/components/data-display/property',
            },
            {
              title: 'Persona',
              path: '/docs/components/data-display/persona',
            },
            {
              title: 'Command',
              path: '/docs/components/data-display/command',
              pro: true,
            },
          ],
        },
        {
          title: 'Advanced Data',
          path: '/docs/components/advanced-data',
          open: true,
          routes: [
            {
              title: 'DataGrid',
              path: '/docs/components/advanced-data/data-grid',
              pro: true,
            },
            {
              title: 'BulkActions',
              path: '/docs/components/advanced-data/bulk-actions',
              pro: true,
            },
            {
              title: 'Filters',
              path: '/docs/components/advanced-data/filters',
              pro: true,
            },
          ],
        },
        {
          title: 'Feedback',
          path: '/docs/components/feedback',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Banner',
              path: '/docs/components/feedback/banner',
            },
            {
              title: 'NProgress',
              path: '/docs/components/feedback/nprogress',
            },
            {
              title: 'Snackbar',
              path: '/docs/components/feedback/snackbar',
            },
            {
              title: 'Loader',
              path: '/docs/components/feedback/loader',
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
              path: '/docs/components/overlay/modals-manager',
            },
            {
              title: 'MenuDialog',
              path: '/docs/components/overlay/menu-dialog',
            },
            {
              title: 'FormDialog',
              path: '/docs/components/overlay/form-dialog',
            },
            {
              title: 'ResponsiveMenu',
              path: '/docs/components/overlay/responsive-menu',
              pro: true,
            },
          ],
        },
        {
          title: 'Engagement',
          path: '/docs/components/engagement',
          open: true,
          routes: [
            {
              title: 'Benefits Modal',
              path: '/docs/components/engagement/benefits-modal',
              pro: true,
            },
            {
              title: 'Tour',
              path: '/docs/components/engagement/tour',
              pro: true,
            },
          ],
        },
        {
          title: 'Utilities',
          path: '/docs/components/utils',
          open: true,
          routes: [
            {
              title: 'ErrorBoundary',
              path: '/docs/components/utils/error-boundary',
            },
            {
              title: 'Feature Flags',
              path: '/docs/components/utils/feature-flags',
              pro: true,
            },
            {
              title: 'ResizeBox',
              path: '/docs/components/utils/resize-box',
              pro: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Hooks',
      path: '/docs/hooks',
      icon: FiAnchor,
      heading: true,
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
  ] as RouteItem[],
}

export default sidebar
