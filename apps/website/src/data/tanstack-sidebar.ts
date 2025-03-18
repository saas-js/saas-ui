import { RouteItem } from '@/docs/utils/get-route-context'

const sidebar = {
  routes: [
    {
      title: 'Overview',
      path: '/docs/tanstack-router-starter-kit',
    },
    {
      title: 'Tech stack',
      path: '/docs/tanstack-router-starter-kit/tech-stack',
    },
    {
      title: 'Project structure',
      path: '/docs/tanstack-router-starter-kit/project-structure',
    },
    {
      title: 'CLI commands',
      path: '/docs/tanstack-router-starter-kit/commands',
    },
    {
      title: 'Installation',
      path: '/docs/tanstack-router-starter-kit/installation',
      open: false,
      heading: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/tanstack-router-starter-kit/installation',
        },
        {
          title: 'Clone the repository',
          path: '/docs/tanstack-router-starter-kit/installation/clone-repository',
        },
        {
          title: 'Run the application',
          path: '/docs/tanstack-router-starter-kit/installation/run-application',
        },
        {
          title: 'Using PNPM',
          path: '/docs/tanstack-router-starter-kit/installation/using-pnpm',
        },
      ],
    },
    {
      title: 'Configuration',
      path: '/docs/tanstack-router-starter-kit/configuration',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Environment variables',
          path: '/docs/tanstack-router-starter-kit/configuration/environment-variables',
        },
      ],
    },
    {
      title: 'Authentication',
      path: '/docs/tanstack-router-starter-kit/authentication',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/tanstack-router-starter-kit/authentication',
        },
        {
          title: 'Better auth',
          path: '/docs/tanstack-router-starter-kit/authentication/better-auth',
        },
        {
          title: 'Supabase',
          path: '/docs/tanstack-router-starter-kit/authentication/supabase',
        },
        {
          title: 'Customize auth screens',
          path: '/docs/tanstack-router-starter-kit/authentication/customize-auth-screens',
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
          path: '/docs/tanstack-router-starter-kit/theming/configuration',
        },
        {
          title: 'Fonts',
          path: '/docs/tanstack-router-starter-kit/theming/fonts',
        },
        {
          title: 'Logo',
          path: '/docs/tanstack-router-starter-kit/theming/logo',
        },
      ],
    },
    {
      title: 'API',
      path: '/docs/tanstack-router-starter-kit/api',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/tanstack-router-starter-kit/api',
        },
        {
          title: 'Conventions',
          path: '/docs/tanstack-router-starter-kit/api/conventions',
        },
        {
          title: 'Define procedures',
          path: '/docs/tanstack-router-starter-kit/api/define-procedures',
        },
        {
          title: 'Router context',
          path: '/docs/tanstack-router-starter-kit/api/router-context',
        },
        {
          title: 'Calling procedures',
          path: '/docs/tanstack-router-starter-kit/api/calling-procedures',
        },
      ],
    },
    {
      title: 'API procedures',
      path: '/docs/tanstack-router-starter-kit/api-procedures',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Auth',
          path: '/docs/tanstack-router-starter-kit/api-procedures/auth',
        },
        {
          title: 'Billing',
          path: '/docs/tanstack-router-starter-kit/api-procedures/billing',
        },
        {
          title: 'Users',
          path: '/docs/tanstack-router-starter-kit/api-procedures/users',
        },
        {
          title: 'Workspace members',
          path: '/docs/tanstack-router-starter-kit/api-procedures/workspace-members',
        },
        {
          title: 'Workspaces',
          path: '/docs/tanstack-router-starter-kit/api-procedures/workspaces',
        },
        {
          title: 'Notifications',
          path: '/docs/tanstack-router-starter-kit/api-procedures/notifications',
        },
        {
          title: 'Tags',
          path: '/docs/tanstack-router-starter-kit/api-procedures/tags',
        },
        {
          title: 'Contacts',
          path: '/docs/tanstack-router-starter-kit/api-procedures/contacts',
        },
      ],
    },
    {
      title: 'Database',
      path: '/docs/tanstack-router-starter-kit/database',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/tanstack-router-starter-kit/database',
        },
        {
          title: 'Migrations',
          path: '/docs/tanstack-router-starter-kit/database/migrations',
        },
        {
          title: 'Schema',
          path: '/docs/tanstack-router-starter-kit/database/schema',
        },
        {
          title: 'Seed data',
          path: '/docs/tanstack-router-starter-kit/database/seed-data',
        },
        {
          title: 'Drizzle Studio',
          path: '/docs/tanstack-router-starter-kit/database/studio',
        },
      ],
    },
    {
      title: 'Development',
      path: '/docs/tanstack-router-starter-kit/development',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Updating dependencies',
          path: '/docs/tanstack-router-starter-kit/development/updating-dependencies',
        },
        {
          title: 'Adding pages',
          path: '/docs/tanstack-router-starter-kit/development/adding-pages',
        },
        {
          title: 'Forms and validation',
          path: '/docs/tanstack-router-starter-kit/development/forms-and-validation',
        },
        {
          title: 'Error handling',
          path: '/docs/tanstack-router-starter-kit/development/error-handling',
        },
      ],
    },
    {
      title: 'Billing',
      path: '/docs/tanstack-router-starter-kit/billing',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Overview',
          path: '/docs/tanstack-router-starter-kit/billing',
        },
        {
          title: 'Billing plans',
          path: '/docs/tanstack-router-starter-kit/billing/plans',
        },
        {
          title: 'Stripe',
          path: '/docs/tanstack-router-starter-kit/billing/stripe',
        },
        {
          title: 'Unit based usage',
          path: '/docs/tanstack-router-starter-kit/billing/unit-based-usage',
        },
        {
          title: 'Metered usage',
          path: '/docs/tanstack-router-starter-kit/billing/metered-based-usage',
        },
        {
          title: 'Webhooks',
          path: '/docs/tanstack-router-starter-kit/billing/webhooks',
        },
      ],
    },
    {
      title: 'Deployments',
      path: '/docs/tanstack-router-starter-kit/deployments',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Preparation',
          path: '/docs/tanstack-router-starter-kit/deployments/preparation',
        },
        {
          title: 'Deploy to Vercel',
          path: '/docs/tanstack-router-starter-kit/deployments/vercel',
        },
        {
          title: 'Deploy to Netlify',
          path: '/docs/tanstack-router-starter-kit/deployments/netlify',
        },
      ],
    },
    // {
    //   title: 'Troubleshooting',
    //   path: '/docs/tanstack-router-starter-kit/troubleshooting',
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
      path: '/docs/tanstack-router-starter-kit/contributing',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Report bugs or feature requests',
          path: '/docs/tanstack-router-starter-kit/contributing/bugs-and-feature-requests',
        },
        {
          title: 'Contribute to the project',
          path: '/docs/tanstack-router-starter-kit/contributing/contributing',
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
