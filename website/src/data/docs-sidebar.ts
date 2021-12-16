import { RouteItem } from '@/docs/utils/get-route-context'

export default {
  routes: [
    {
      title: 'Getting Started',
      heading: true,
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
          title: 'Changelog',
          path: '/changelog',
        },
        {
          title: 'Layout',
          path: '/docs/layout',
          open: true,
          routes: [
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
              title: 'Card',
              // path: '/docs/layout/card',
              soon: true,
            },
          ],
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
              title: 'Palette',
              path: '/docs/theming/palette',
            },
          ],
        },
        {
          title: 'Forms',
          path: '/docs/form',
          sort: true,
          open: true,
          routes: [
            {
              title: 'Form',
              soon: true,
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
              title: 'EmptyState',
              soon: true,
            },
            {
              title: 'Property',
              soon: true,
            },
          ],
        },
        {
          title: 'Feedback & Engagement',
          path: '/docs/feedback',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Snackbar',
              // path: '/docs/feedback/snackbar',
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
              title: 'Text',
              // path: '/docs/typography/text',
              soon: true,
            },
            {
              title: 'Heading',
              // path: '/docs/typography/heading',
              soon: true,
            },
          ],
        },
        {
          title: 'Overlay',
          path: '/docs/overlay',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Confirm Dialog',
              // path: '/docs/overlay/confirm-dialog',
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
              title: 'Breadcrumb',
              // path: '/docs/navigation/breadcrumb',
              soon: true,
            },
            {
              title: 'Link',
              // path: '/docs/navigation/link',
              soon: true,
            },
            {
              title: 'Hotkeys',
              soon: true,
            },
          ],
        },
        {
          title: 'Media and icons',
          path: '/docs/media-and-icons',
          sort: true,
          open: true,
          routes: [
            {
              title: 'Avatar',
              soon: true,
            },
            {
              title: 'Persona',
              // path: '/docs/media-and-icons/person',
              soon: true,
            },
          ],
        },
        {
          title: 'Others',
          path: '/docs/components',
          open: true,
          sort: true,
          routes: [
            {
              title: 'Transitions',
              // path: '/docs/components/transitions',
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
              title: 'useLink',
              // path: '/docs/hooks/use-boolean',
              soon: true,
            },
          ],
        },
      ],
    },
  ] as RouteItem[],
}
