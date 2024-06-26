import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Getting started',
      path: '/docs/pro',
      open: true,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/pro',
        },
      ],
    },
    {
      title: 'Installation',
      path: '/docs/pro/installation',
      open: true,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/pro/installation/private-npm/overview',
        },
        {
          title: 'Private NPM registry',
          path: '/docs/pro/installation/private-npm/overview',
          heading: true,
          open: true,
          routes: [
            {
              title: 'NPM',
              path: '/docs/pro/installation/private-npm/npm',
            },
            {
              title: 'Yarn',
              path: '/docs/pro/installation/private-npm/yarn',
            },
            {
              title: 'PNPM',
              path: '/docs/pro/installation/private-npm/pnpm',
            },
            {
              title: 'Dependabot',
              path: '/docs/pro/installation/dependabot',
            },
          ],
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
