/**
 * Content for the long-form keyword landing pages.
 *
 * These are deliberately kept separate from the product pages at `/` and
 * `/nextjs`. Those are short brand and conversion pages; these answer the
 * research query (what is in the box, why not just generate it, why this
 * framework) so the two do not compete for the same result.
 *
 * Framework-specific copy lives here rather than in the components, because
 * hardcoding it is how /nextjs ended up telling visitors it was built on
 * TanStack Start.
 */

export interface SeoLandingContent {
  slug: string
  framework: string
  title: string
  description: string
  h1: string
  intro: string
  docsHref: string
  productHref: string
  /** Why this framework, for the SaaS use case specifically. */
  whyFramework: { title: string; body: string }[]
  stack: { layer: string; choice: string; note: string }[]
  included: {
    title: string
    body: string
    /** Product mockup shown with the item, from the homepage feature tiles. */
    stage?: 'workspaces' | 'billing' | 'ui' | 'api'
  }[]
  generateVsKit: { area: string; generated: string; withKit: string }[]
  faq: { q: string; a: string }[]
}

const sharedStack = [
  {
    layer: 'Database',
    choice: 'PostgreSQL + Drizzle ORM',
    note: 'Typed schema, migrations and seeding. Run it locally, on Supabase, or on Neon.',
  },
  {
    layer: 'Authentication',
    choice: 'Better Auth',
    note: 'Email and password, social login, magic links, 2FA, passkeys, SSO and email verification.',
  },
  {
    layer: 'Billing',
    choice: 'Stripe',
    note: 'Subscriptions, tiered, metered and usage-based pricing, entitlements and grandfathering.',
  },
  {
    layer: 'API',
    choice: 'tRPC',
    note: 'End-to-end type safety, React Query integration, permissions and roles.',
  },
  {
    layer: 'UI',
    choice: 'Chakra UI + Saas UI',
    note: 'A themeable token system with pre-built components and Storybook stories.',
  },
  {
    layer: 'Email',
    choice: 'React Email + Resend',
    note: 'Transactional templates you can edit, or bring your own SMTP provider.',
  },
  {
    layer: 'Testing',
    choice: 'Playwright + Vitest',
    note: 'End-to-end and unit tests, running in GitHub Actions.',
  },
]

const sharedIncluded: SeoLandingContent['included'] = [
  {
    title: 'Multi-tenant workspaces',
    stage: 'workspaces',
    body: 'Users create workspaces, invite teammates and manage roles. Scope filters run in the data layer, so every query is tenant-scoped by default. You do not have to remember it in each new route.',
  },
  {
    title: 'Billing that matches your pricing',
    stage: 'billing',
    body: 'Subscriptions, tiered plans, metered and usage-based pricing, entitlements. Your pricing config syncs to Stripe, so you maintain it in one place.',
  },
  {
    title: 'An admin and dashboard shell',
    stage: 'ui',
    body: 'Navigation, data tables, filters, forms and empty states. The parts that take a week to build properly and drift out of sync when you do not.',
  },
  {
    title: 'Types strict enough for agents',
    stage: 'api',
    body: 'Full type coverage and one set of patterns give an agent something to conform to. The tests catch it when it does not.',
  },
]

const sharedGenerateVsKit = [
  {
    area: 'Auth',
    generated: 'A working email and password flow.',
    withKit:
      'Social login, magic links, 2FA, passkeys, SSO, email verification, session handling. Tenant scoping runs in the data layer.',
  },
  {
    area: 'Billing',
    generated: 'A Stripe checkout link.',
    withKit:
      'Subscriptions, tiered, metered and usage-based pricing, entitlements, grandfathering, webhooks. This is where billing bugs cost you money.',
  },
  {
    area: 'Multi-tenancy',
    generated: 'A workspaces table and a foreign key.',
    withKit:
      'Actor-based access control and scope filters on every query. Tenant isolation holds even when someone forgets.',
  },
  {
    area: 'Conventions',
    generated: 'Whatever it picked this session.',
    withKit: 'One set of patterns. Your tenth feature looks like your first.',
  },
  {
    area: 'Knowing it works',
    generated: 'Code that looks right.',
    withKit: 'Types and end-to-end tests in CI that fail when it is not.',
  },
]

const sharedFaq = [
  {
    q: 'Is this a subscription?',
    a: 'No. One-time purchase, lifetime access to the repo and its updates. $200 for an individual licence, $400 for a team of up to 10 developers. Unlimited projects either way.',
  },
  {
    q: 'Can I use it for client work?',
    a: 'Yes. Both licences cover unlimited self-hosted projects, including work you deliver to clients.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'No. It is a digital download, so we do not offer refunds. Read through the docs and try the open source packages first to check it is a good fit.',
  },
  {
    q: 'How do updates work?',
    a: 'Every release includes migration docs, so your agents can apply upstream improvements to your codebase. It is a starting point, not a dependency, so you choose what to take and when.',
  },
]

export const seoLandingPages: Record<string, SeoLandingContent> = {
  'tanstack-start-saas-boilerplate': {
    slug: 'tanstack-start-saas-boilerplate',
    framework: 'TanStack Start',
    title: 'TanStack Start SaaS Boilerplate',
    description:
      'A production-ready TanStack Start SaaS boilerplate with authentication, Stripe billing, multi-tenant workspaces and a typed tRPC API. One-time purchase, lifetime access.',
    h1: 'TanStack Start SaaS boilerplate',
    intro:
      'Everything a SaaS needs before it has a single customer: auth, billing, workspaces, a typed API and a dashboard shell, assembled on TanStack Start and ready to build on.',
    docsHref: '/docs/starter-kits/tanstack-start',
    productHref: '/',
    whyFramework: [
      {
        title: 'Search params are typed state',
        body: 'A dashboard is filters, sorting, pagination and date ranges. Router validates and types search params, so your filter state and your URL are the same object. Rename a filter and the build fails.',
      },
      {
        title: 'Isomorphic functions',
        body: 'createIsomorphicFn takes a .server() and a .client() branch, and each one is stripped from the other bundle. Analytics, logging and config live in shared code. createServerOnlyFn keeps secrets out of the client build entirely, so there is nothing to guard at runtime.',
      },
      {
        title: 'Nested routing that matches how a SaaS is shaped',
        body: 'Workspace, project, settings: that is a tree, not a list of pages. Each level loads its own data and the router knows what depends on what. Opening a settings tab does not refetch the workspace.',
      },
      {
        title: 'Deploy where the deal requires',
        body: 'Universal deployment across providers and runtimes. When an enterprise customer wants it self-hosted, that is a config change.',
      },
      {
        title: 'SSR on the pages that need it',
        body: 'Full-document SSR and streaming for marketing and onboarding. The authenticated app stays client-side, where it belongs.',
      },
      {
        title: 'Vite underneath',
        body: 'The same dev server and plugins you already use. No framework-specific bundler to learn.',
      },
    ],
    stack: sharedStack,
    included: sharedIncluded,
    generateVsKit: sharedGenerateVsKit,
    faq: [
      {
        q: 'Is TanStack Start ready for production?',
        a: 'Yes. It has over 14 million weekly downloads, and every app built on Lovable runs on it. Compared to Next.js you get simpler, explicit APIs, end-to-end type safety and a faster development loop.',
      },
      ...sharedFaq,
    ],
  },

  'nextjs-saas-boilerplate': {
    slug: 'nextjs-saas-boilerplate',
    framework: 'Next.js',
    title: 'Next.js SaaS Boilerplate',
    description:
      'A production-ready Next.js SaaS boilerplate with authentication, Stripe billing, multi-tenant workspaces and a typed tRPC API. One-time purchase, lifetime access.',
    h1: 'Next.js SaaS boilerplate',
    intro:
      'Everything a SaaS needs before it has a single customer: auth, billing, workspaces, a typed API and a dashboard shell, assembled on the Next.js App Router and ready to build on.',
    docsHref: '/docs/starter-kits/nextjs',
    productHref: '/nextjs',
    whyFramework: [
      {
        title: 'Prefetch on the server, hydrate on the client',
        body: 'Server components prefetch the same tRPC queries the client uses and hand the data over on hydration. Pages render with data on first paint, and there is still only one API to maintain.',
      },
      {
        title: 'The ecosystem targets it first',
        body: 'Auth providers, analytics, CMSes and payment SDKs ship a Next.js adapter before anything else. Whatever you add next, there is a documented path.',
      },
      {
        title: 'Your team already knows it',
        body: 'Most React developers have shipped a Next.js app, and coding agents know its APIs well. New people, and new agents, are productive on day one.',
      },
      {
        title: 'Fast tooling with Turbopack',
        body: 'The dev server runs on Turbopack, so it starts quickly and changes show up almost instantly. That tight loop matters even more when an agent is making a dozen edits a minute.',
      },
      {
        title: 'SEO built in',
        body: 'The Metadata API sets titles, descriptions and Open Graph tags per route. Your marketing pages and your app live in one project, with no extra SEO libraries.',
      },
      {
        title: 'Backed by Vercel',
        body: 'Vercel funds the framework and employs members of the React core team, so it is not going anywhere. Deploy there and you get preview deployments for every pull request out of the box.',
      },
    ],
    stack: sharedStack,
    included: sharedIncluded,
    generateVsKit: sharedGenerateVsKit,
    faq: [
      {
        q: 'Which Next.js version does it use?',
        a: 'Next.js 16 with the App Router, server components and streaming. The kit tracks new releases, with migration docs when something changes.',
      },
      {
        q: 'Should I choose Next.js or TanStack Start?',
        a: 'Pick the framework your team knows. Choose Next.js for its ecosystem and familiarity. Choose TanStack Start for simpler, explicit APIs, end-to-end type safety and a faster development loop.',
      },
      ...sharedFaq,
    ],
  },
}

export const seoLandingSlugs = Object.keys(seoLandingPages)
