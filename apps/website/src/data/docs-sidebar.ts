import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Getting Started',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Introduction',
          path: '/docs/introduction',
        },
        {
          title: 'Installation',
          path: '/docs/getting-started',
        },
        {
          title: 'Design Principles',
          path: '/docs/principles',
        },
        {
          title: 'Theming',
          path: '/docs/theming',
          open: true,
          routes: [
            {
              title: 'Default Theme',
              path: '/docs/theming/theme',
            },
            {
              title: 'Saas UI Theme',
              path: '/docs/theming/saas-ui-theme',
            },
            {
              title: 'Palette',
              path: '/docs/theming/palette',
            },
          ],
        },
      ],
    },
    {
      title: 'Components',
      heading: true,
      open: true,
      routes: [
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
              title: 'PageShell',
              // path: '/docs/layout/page',
              soon: true,
            },
            {
              title: 'Sidebar',
              // path: '/docs/layout/page',
              soon: true,
            },
            {
              title: 'Navbar',
              // path: '/docs/layout/page',
              soon: true,
            },
            {
              title: 'Page',
              // path: '/docs/layout/page',
              soon: true,
            },
            {
              title: 'Section',
              // path: '/docs/layout/section',
              soon: true,
            },
            {
              title: 'ResizeBox',
              // path: '/docs/layout/section',
              soon: true,
            },
          ],
        },
        {
          title: 'Navigation',
          path: '/docs/navigation',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Hotkeys',
              path: '/docs/navigation/hotkeys',
            },
            {
              title: 'CommandMenu',
              // path: '/docs/navigation/hotkeys',
              soon: true,
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
              title: 'WalletModal',
              // path: '/docs/navigation/wallet-modal',
              soon: true,
            },
            {
              title: 'Address',
              // path: '/docs/navigation/hotkeys',
              soon: true,
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
              // path: '/docs/forms/step-form',
              soon: true,
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
            {
              title: 'Chips',
              soon: true,
            },
            {
              title: 'Button',
              path: '/docs/forms/button',
            },
          ],
        },
        {
          title: 'Data Display',
          path: '/docs/data-display',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Divider',
              path: '/docs/data-display/divider',
            },
            {
              title: 'EmptyState',
              path: '/docs/data-display/empty-state',
            },
            {
              title: 'HoverCard',
              soon: true,
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
          title: 'Feedback',
          path: '/docs/feedback',
          open: true,
          sort: true,
          routes: [
            {
              title: 'NProgress',
              path: '/docs/feedback/nprogress',
            },
            {
              title: 'Snackbar',
              path: '/docs/feedback/snackbar',
            },
            {
              title: 'Loading',
              path: '/docs/feedback/loading',
            },
            {
              title: 'AppLoader',
              // path: '/docs/feedback/app-loader',
              soon: true,
            },
          ],
        },
        {
          title: 'Engagement',
          path: '/docs/engagement',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Onboarding',
              // path: '/docs/feedback/nprogress',
              soon: true,
            },
            {
              title: 'Tour',
              // path: '/docs/feedback/snackbar',
              soon: true,
            },
            {
              title: 'InlineTip',
              // path: '/docs/feedback/loading',
              soon: true,
            },
            {
              title: 'Feedback',
              // path: '/docs/feedback/app-loader',
              soon: true,
            },
            {
              title: 'Changelog',
              // path: '/docs/feedback/app-loader',
              soon: true,
            },
            {
              title: 'NotifyCenter',
              // path: '/docs/feedback/app-loader',
              soon: true,
            },
          ],
        },
        {
          title: 'Typography',
          path: '/docs/typography',
          open: true,
          routes: [
            {
              title: 'Heading',
              path: '/docs/typography/heading',
            },
            {
              title: 'Text',
              path: '/docs/typography/text',
            },
            {
              title: 'Br',
              path: '/docs/typography/br',
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
              // path: '/docs/overlay/confirm-dialog',
              soon: true,
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
