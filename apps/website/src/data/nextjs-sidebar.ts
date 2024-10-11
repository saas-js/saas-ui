import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Overview',
      path: '/docs/nextjs-starter-kit',
    },
    {
      title: 'Tech stack',
      path: '/docs/nextjs-starter-kit/tech-stack',
    },
    {
      title: 'Project structure',
      path: '/docs/nextjs-starter-kit/project-structure',
    },
    {
      title: 'CLI commands',
      path: '/docs/nextjs-starter-kit/commands',
    },
    {
      title: 'Installation',
      path: '/docs/nextjs-starter-kit/installation',
      open: false,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starter-kit/installation',
        },
        {
          title: 'Clone the repository',
          path: '/docs/nextjs-starter-kit/installation/clone-repository',
        },
        {
          title: 'Run the application',
          path: '/docs/nextjs-starter-kit/installation/run-application',
        },
        {
          title: 'Using PNPM',
          path: '/docs/nextjs-starter-kit/installation/using-pnpm',
        },
      ],
    },
    {
      title: 'Configuration',
      path: '/docs/nextjs-starter-kit/configuration',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Environment variables',
          path: '/docs/nextjs-starter-kit/configuration/environment-variables',
        },
      ],
    },
    {
      title: 'Authentication',
      path: '/docs/nextjs-starter-kit/authentication',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starter-kit/authentication',
        },
        {
          title: 'Auth.js (NextAuth)',
          path: '/docs/nextjs-starter-kit/authentication/authjs',
        },
        {
          title: 'Supabase',
          path: '/docs/nextjs-starter-kit/authentication/supabase',
        },
        // {
        //   title: 'Clerk',
        //   path: '/docs/nextjs-starter-kit/authentication/clerk',
        // },
        {
          title: 'Customize auth screens',
          path: '/docs/nextjs-starter-kit/authentication/customize-auth-screens',
        },
      ],
    },
    {
      title: 'Theming',
      path: '/docs/theming',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Configuration',
          path: '/docs/nextjs-starter-kit/theming/configuration',
        },
        {
          title: 'Fonts',
          path: '/docs/nextjs-starter-kit/theming/fonts',
        },
        {
          title: 'Logo',
          path: '/docs/nextjs-starter-kit/theming/logo',
        },
      ],
    },
    {
      title: 'API',
      path: '/docs/nextjs-starter-kit/api',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starter-kit/api',
        },
        {
          title: 'Conventions',
          path: '/docs/nextjs-starter-kit/api/conventions',
        },
        {
          title: 'Define procedures',
          path: '/docs/nextjs-starter-kit/api/define-procedures',
        },
        {
          title: 'Router context',
          path: '/docs/nextjs-starter-kit/api/router-context',
        },
        {
          title: 'Calling procedures',
          path: '/docs/nextjs-starter-kit/api/calling-procedures',
        },
      ],
    },
    {
      title: 'API procedures',
      path: '/docs/nextjs-starter-kit/api-procedures',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Auth',
          path: '/docs/nextjs-starter-kit/api-procedures/auth',
        },
        {
          title: 'Billing',
          path: '/docs/nextjs-starter-kit/api-procedures/billing',
        },
        {
          title: 'Users',
          path: '/docs/nextjs-starter-kit/api-procedures/users',
        },
        {
          title: 'Workspace members',
          path: '/docs/nextjs-starter-kit/api-procedures/workspace-members',
        },
        {
          title: 'Workspaces',
          path: '/docs/nextjs-starter-kit/api-procedures/workspaces',
        },
        {
          title: 'Notifications',
          path: '/docs/nextjs-starter-kit/api-procedures/notifications',
        },
        {
          title: 'Tags',
          path: '/docs/nextjs-starter-kit/api-procedures/tags',
        },
        {
          title: 'Contacts',
          path: '/docs/nextjs-starter-kit/api-procedures/contacts',
        },
      ],
    },
    {
      title: 'Database',
      path: '/docs/nextjs-starter-kit/database',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starter-kit/database',
        },
        {
          title: 'Migrations',
          path: '/docs/nextjs-starter-kit/database/migrations',
        },
        {
          title: 'Schema',
          path: '/docs/nextjs-starter-kit/database/schema',
        },
        {
          title: 'Seed data',
          path: '/docs/nextjs-starter-kit/database/seed-data',
        },
        {
          title: 'Drizzle Studio',
          path: '/docs/nextjs-starter-kit/database/studio',
        },
      ],
    },
    {
      title: 'Development',
      path: '/docs/nextjs-starter-kit/development',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Updating dependencies',
          path: '/docs/nextjs-starter-kit/development/updating-dependencies',
        },
        {
          title: 'Adding pages',
          path: '/docs/nextjs-starter-kit/development/adding-pages',
        },
        {
          title: 'Forms and validation',
          path: '/docs/nextjs-starter-kit/development/forms-and-validation',
        },
        {
          title: 'Error handling',
          path: '/docs/nextjs-starter-kit/development/error-handling',
        },
      ],
    },
    {
      title: 'Billing',
      path: '/docs/nextjs-starter-kit/billing',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starter-kit/billing',
        },
        {
          title: 'Billing plans',
          path: '/docs/nextjs-starter-kit/billing/plans',
        },
        {
          title: 'Stripe',
          path: '/docs/nextjs-starter-kit/billing/stripe',
        },
        {
          title: 'Unit based usage',
          path: '/docs/nextjs-starter-kit/billing/unit-based-usage',
        },
        {
          title: 'Metered usage',
          path: '/docs/nextjs-starter-kit/billing/metered-based-usage',
        },
        {
          title: 'Webhooks',
          path: '/docs/nextjs-starter-kit/billing/webhooks',
        },
      ],
    },
    {
      title: 'Deployments',
      path: '/docs/nextjs-starter-kit/deployments',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Preparation',
          path: '/docs/nextjs-starter-kit/deployments/preparation',
        },
        {
          title: 'Deploy to Vercel',
          path: '/docs/nextjs-starter-kit/deployments/vercel',
        },
        {
          title: 'Deploy to Netlify',
          path: '/docs/nextjs-starter-kit/deployments/netlify',
        },
      ],
    },
    // {
    //   title: 'Troubleshooting',
    //   path: '/docs/nextjs-starter-kit/troubleshooting',
    //   heading: true,
    //   open: false,
    //   routes: [
    //     {
    //       title: 'Common issues',
    //     },
    //     {
    //       title: 'Community support',
    //     },
    //   ],
    // },
    {
      title: 'Contributing',
      path: '/docs/nextjs-starter-kit/contributing',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Report bugs or feature requests',
          path: '/docs/nextjs-starter-kit/contributing/bugs-and-feature-requests',
        },
        {
          title: 'Contribute to the project',
          path: '/docs/nextjs-starter-kit/contributing/contributing',
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
