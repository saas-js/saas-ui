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
          title: 'Auth0',
          path: '/docs/guides/auth/auth0',
        },
        {
          title: 'Clerk',
          path: '/docs/guides/auth/clerk',
        },
        {
          title: 'Supabase',
          path: '/docs/guides/auth/supabase',
        },
        {
          title: 'Magic.link',
          path: '/docs/guides/auth/magic',
        },
        {
          title: 'Custom auth service',
          path: '/docs/guides/auth/custom-auth-service',
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
