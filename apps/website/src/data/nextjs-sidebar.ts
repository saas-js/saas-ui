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
          path: '/docs/nextjs-starterkit/theming/configuration',
        },
        {
          title: 'Color schemes',
          path: '/docs/nextjs-starterkit/theming/color-schemes',
        },
        {
          title: 'Fonts',
          path: '/docs/nextjs-starterkit/theming/fonts',
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
          title: 'Overview',
          path: '/docs/nextjs-starterkit/api',
        },
        {
          title: 'Conventions',
          path: '/docs/nextjs-starterkit/api/conventions',
        },
        {
          title: 'Define procedures',
          path: '/docs/nextjs-starterkit/api/define-procedures',
        },
        {
          title: 'Router context',
          path: '/docs/nextjs-starterkit/api/router-context',
        },
        {
          title: 'Call procedures',
          path: '/docs/nextjs-starterkit/api/call-procedures',
        },
      ],
    },
    {
      title: 'API procedures',
      path: '/docs/nextjs-starterkit/api-procedures',
      heading: true,
      open: false,
      routes: [
        {
          title: 'Auth',
          path: '/docs/nextjs-starterkit/api-procedures/auth',
        },
        {
          title: 'Billing',
          path: '/docs/nextjs-starterkit/api-procedures/billing',
        },
        {
          title: 'Users',
          path: '/docs/nextjs-starterkit/api-procedures/users',
        },
        {
          title: 'Workspace members',
          path: '/docs/nextjs-starterkit/api-procedures/workspace-members',
        },
        {
          title: 'Workspaces',
          path: '/docs/nextjs-starterkit/api-procedures/workspaces',
        },
        {
          title: 'Notifications',
          path: '/docs/nextjs-starterkit/api-procedures/notifications',
        },
        {
          title: 'Tags',
          path: '/docs/nextjs-starterkit/api-procedures/tags',
        },
        {
          title: 'Contacts',
          path: '/docs/nextjs-starterkit/api-procedures/contacts',
        },
      ],
    },
    {
      title: 'Database',
      path: '/docs/nextjs-starterkit/database',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Overview',
          path: '/docs/nextjs-starterkit/database',
        },
        {
          title: 'Migrations',
          path: '/docs/nextjs-starterkit/database/migrations',
        },
        {
          title: 'Schema',
          path: '/docs/nextjs-starterkit/database/schema',
        },
        {
          title: 'Seed data',
          path: '/docs/nextjs-starterkit/database/seed-data',
        },
        {
          title: 'Drizzle Studio',
          path: '/docs/nextjs-starterkit/database/studio',
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
        {
          title: 'Adding new pages',
          path: '/docs/nextjs-starterkit/development/add-new-pages',
        },
        {
          title: 'Adding new features',
          path: '/docs/nextjs-starterkit/development/add-new-features',
        },
        {
          title: 'Forms and validation',
        },
        {
          title: 'Error handling',
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
      path: '/docs/nextjs-starterkit/deployments',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Production builds',
          path: '/docs/nextjs-starterkit/deployments/production-build',
        },
        {
          title: 'Checklist',
          path: '/docs/nextjs-starterkit/deployments/checklist',
        },
        {
          title: 'Deploy to Vercel',
          path: '/docs/nextjs-starterkit/deployments/vercel',
        },
      ],
    },
    {
      title: 'Troubleshooting',
      path: '/docs/nextjs-starterkit/troubleshooting',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Common issues',
        },
        {
          title: 'Community support',
        },
      ],
    },
    {
      title: 'Contributing',
      path: '/docs/nextjs-starterkit/contributing',
      heading: true,
      open: true,
      routes: [
        {
          title: 'Report bugs or feature requests',
        },
        {
          title: 'Contribute to the project',
        },
      ],
    },
  ] as RouteItem[],
}

export default sidebar
