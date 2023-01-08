import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Overview',
      path: '/docs/components',
    },
    {
      title: 'Authentication',
      path: '/docs/components/auth',
      heading: true,
      open: true,
      routes: [
        {
          title: 'AuthProvider',
          path: '/docs/components/auth/auth-provider',
        },
        {
          title: 'Auth',
          path: '/docs/components/auth/auth',
        },
      ],
    },
    {
      title: 'Layout',
      path: '/docs/components/layout',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Card',
          path: '/docs/components/layout/card',
        },
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
      heading: true,
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
        {
          title: 'ToggleButton',
          path: '/docs/components/navigation/toggle-button',
        },
      ],
    },
    {
      title: 'Web3',
      path: '/docs/components/web3',
      heading: true,
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
      heading: true,
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
      heading: true,
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
      heading: true,
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
          title: 'List',
          path: '/docs/components/data-display/list',
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
          title: 'Timeline',
          path: '/docs/components/data-display/timeline',
          pro: true,
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
      heading: true,
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
      heading: true,
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
      heading: true,
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
      heading: true,
      open: true,
      routes: [
        {
          title: 'Beacon',
          path: '/docs/components/engagement/beacon',
          pro: true,
        },
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
      heading: true,
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
  ] as RouteItem[],
}

export default sidebar
