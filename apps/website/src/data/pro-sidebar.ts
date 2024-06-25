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
          title: 'Overview',
          path: '/docs/pro/nextjs-starterkit',
        },
        {
          title: 'Tech stack',
          path: '/docs/pro/nextjs-starterkit/tech-stack',
        },
        {
          title: 'Project structure',
          path: '/docs/pro/nextjs-starterkit/project-structure',
        },
        {
          title: 'CLI commands',
          path: '/docs/pro/nextjs-starterkit/commands',
        },
        {
          title: 'Installation',
          path: '/docs/pro/nextjs-starterkit/installation',
          open: true,
          heading: true,
          routes: [
            {
              title: 'Overview',
              path: '/docs/pro/nextjs-starterkit/installation',
            },
            {
              title: 'Clone the repository',
              path: '/docs/pro/nextjs-starterkit/installation/clone-repository',
            },
            {
              title: 'Run the application',
              path: '/docs/pro/nextjs-starterkit/installation/run-application',
            },
          ],
        },
        {
          title: 'Configuration',
          path: '/docs/pro/nextjs-starterkit/configuration',
          heading: true,
          open: true,
          routes: [
            {
              title: 'Environment variables',
              path: '/docs/pro/nextjs-starterkit/configuration/environment-variables',
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
          title: 'API',
          path: '/docs/pro/nextjs-starterkit/api',
          heading: true,
          open: true,
          routes: [
            {
              title: 'Fetching data',
            },
            {
              title: 'Endpoints',
            },
          ],
        },
        {
          title: 'Development',
          path: '/docs/pro/nextjs-starterkit/development',
          heading: true,
          open: true,
          routes: [
            {
              title: 'Getting started',
              path: '/docs/pro/nextjs-starterkit/development',
            },
          ],
        },
        {
          title: 'Billing',
          path: '/docs/pro/nextjs-starterkit/billing',
          heading: true,
          open: true,
          routes: [
            {
              title: 'Overview',
              path: '/docs/pro/nextjs-starterkit/billing',
            },
            {
              title: 'Billing plans',
              path: '/docs/pro/nextjs-starterkit/billing/plans',
            },
            {
              title: 'Stripe',
              path: '/docs/pro/nextjs-starterkit/billing/stripe',
            },
            {
              title: 'Seat based billing',
              path: '/docs/pro/nextjs-starterkit/billing/seat-based-billing',
            },
            {
              title: 'Metered billing',
              path: '/docs/pro/nextjs-starterkit/billing/metered-billing',
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
              title: 'Production builds',
              path: '/docs/pro/nextjs-starterkit/deployments/production-build',
            },
            {
              title: 'Checklist',
              path: '/docs/pro/nextjs-starterkit/deployments/checklist',
            },
            {
              title: 'Deploy to Vercel',
              path: '/docs/pro/deployments/vercel',
            },
          ],
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
