import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Overview',
      path: '/docs/core/overview',
    },
    {
      title: 'Design Principles',
      path: '/docs/core/principles',
    },

    {
      title: 'Quickstarts',
      path: '/docs/core/installation',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/core/getting-started',
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
      heading: true,
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
      heading: true,
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
  ] as RouteItem[],
}

export default sidebar
