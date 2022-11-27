import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
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
      heading: true,
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
