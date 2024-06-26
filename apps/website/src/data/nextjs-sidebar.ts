import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Overview',
      path: '/docs/nextjs-starterkit',
    },
    {
      title: 'Tech stack',
      path: '/docs/nextjs-starterkit/tech-stack',
    },
    {
      title: 'Project structure',
      path: '/docs/nextjs-starterkit/project-structure',
    },
    {
      title: 'CLI commands',
      path: '/docs/nextjs-starterkit/commands',
    },
    {
      title: 'Installation',
      path: '/docs/nextjs-starterkit/installation',
      open: true,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starterkit/installation',
        },
        {
          title: 'Clone the repository',
          path: '/docs/nextjs-starterkit/installation/clone-repository',
        },
        {
          title: 'Run the application',
          path: '/docs/nextjs-starterkit/installation/run-application',
        },
      ],
    },
    {
      title: 'Configuration',
      path: '/docs/nextjs-starterkit/configuration',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Environment variables',
          path: '/docs/nextjs-starterkit/configuration/environment-variables',
        },
      ],
    },
    {
      title: 'Authentication',
      path: '/docs/nextjs-starterkit/authentication',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starterkit/authentication',
        },
        {
          title: 'Supabase',
          path: '/docs/nextjs-starterkit/authentication/supabase',
        },
        {
          title: 'Clerk',
          path: '/docs/nextjs-starterkit/authentication/clerk',
        },
        {
          title: 'Magic',
          path: '/docs/nextjs-starterkit/authentication/magic',
        },
        {
          title: 'Auth.js (NextAuth)',
          path: '/docs/nextjs-starterkit/authentication/authjs',
        },
        {
          title: 'Customize auth screens',
          path: '/docs/nextjs-starterkit/authentication/customize-auth-screens',
        },
      ],
    },
    {
      title: 'Theming',
      path: '/docs/theming',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Configuration',
          path: '/docs/theming/configuration',
        },
        {
          title: 'Color schemes',
          path: '/docs/theming/color-schemes',
        },
        {
          title: 'Fonts',
          path: '/docs/theming/fonts',
        },
      ],
    },
    {
      title: 'API',
      path: '/docs/nextjs-starterkit/api',
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
      path: '/docs/nextjs-starterkit/development',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Getting started',
          path: '/docs/nextjs-starterkit/development',
        },
      ],
    },
    {
      title: 'Billing',
      path: '/docs/nextjs-starterkit/billing',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starterkit/billing',
        },
        {
          title: 'Billing plans',
          path: '/docs/nextjs-starterkit/billing/plans',
        },
        {
          title: 'Stripe',
          path: '/docs/nextjs-starterkit/billing/stripe',
        },
        {
          title: 'Seat based billing',
          path: '/docs/nextjs-starterkit/billing/seat-based-billing',
        },
        {
          title: 'Metered billing',
          path: '/docs/nextjs-starterkit/billing/metered-billing',
        },
      ],
    },
    {
      title: 'Deployments',
      path: '/docs/deployments',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Production builds',
          path: '/docs/nextjs-starterkit/deploymentsduction-build',
        },
        {
          title: 'Checklist',
          path: '/docs/nextjs-starterkit/deployments/checklist',
        },
        {
          title: 'Deploy to Vercel',
          path: '/docs/deployments/vercel',
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
