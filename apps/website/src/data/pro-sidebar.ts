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
      title: 'Packages',
      path: '/pro/packages',
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
    {
      title: 'Next.js starterkit',
      path: '/pro/nextjs-starterkit',
      open: true,
      heading: true,
      routes: [
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
              title: 'Clone the repository',
              path: '/docs/pro/installation/clone-repository',
            },
            {
              title: 'Run the application',
              path: '/docs/pro/installation/run-application',
            },
          ],
        },
        {
          title: 'Authentication',
          path: '/docs/pro/authentication',
          heading: true,
          open: true,
          routes: [
            {
              title: 'Overview',
              path: '/docs/pro/authentication',
            },
            {
              title: 'Supabase',
              path: '/docs/pro/authentication/supabase',
            },
            {
              title: 'Clerk',
              path: '/docs/pro/authentication/clerk',
            },
            {
              title: 'Magic',
              path: '/docs/pro/authentication/magic',
            },
            {
              title: 'Auth.js (NextAuth)',
              path: '/docs/pro/authentication/authjs',
            },
            {
              title: 'Customize auth screens',
              path: '/docs/pro/authentication/customize-auth-screens',
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
      ],
    },
  ] as RouteItem[],
}

export default sidebar
