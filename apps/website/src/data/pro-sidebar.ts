import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Overview',
      path: '/docs/pro/overview',
    },
    {
      title: 'Upgrading to v1',
      path: '/docs/pro/upgrading-to-v1',
    },
    {
      title: 'Project structure',
      path: '/docs/pro/project-structure',
    },
    {
      title: 'Installation',
      path: '/docs/pro/installation',
      open: true,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/pro/installation/overview',
        },
        {
          title: 'NPM registry',
          path: '/docs/pro/installation/npm',
          heading: true,
          open: true,
          routes: [
            {
              title: 'NPM',
              path: '/docs/pro/installation/npm',
            },
            {
              title: 'Yarn',
              path: '/docs/pro/installation/yarn',
            },
            {
              title: 'Pnpm',
              path: '/docs/pro/installation/pnpm',
            },
          ],
        },
      ],
    },
    {
      title: 'Configuration',
      path: '/docs/pro/configuration',
      heading: true,
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
      heading: true,
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
      heading: true,
      open: true,
      routes: [
        {
          title: 'Vercel',
          path: '/docs/pro/deployments/vercel',
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
