import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Overview',
      path: '/docs/guides',
    },
    {
      title: 'Auth',
      path: '/docs/guides/auth',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Custom auth service',
          path: '/docs/guides/auth/custom-auth-service',
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
