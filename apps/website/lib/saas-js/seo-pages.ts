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
  included: { title: string; body: string }[]
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
    choice: 'Chakra UI + Panda CSS',
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

const sharedIncluded = [
  {
    title: 'Multi-tenant workspaces',
    body: 'Users create workspaces, invite teammates and manage roles. Scope filters run in the data layer, so every query is tenant-scoped by default. You do not have to remember it in each new route.',
  },
  {
    title: 'Billing that matches your pricing',
    body: 'Subscriptions, tiered plans, metered and usage-based pricing, entitlements. Your pricing config syncs to Stripe, so you maintain it in one place.',
  },
  {
    title: 'An admin and dashboard shell',
    body: 'Navigation, data tables, filters, forms and empty states. The parts that take a week to build properly and drift out of sync when you do not.',
  },
  {
    title: 'Types strict enough for agents',
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
    withKit:
      'One set of patterns. Your tenth feature looks like your first.',
  },
  {
    area: 'Knowing it works',
    generated: 'Code that looks right.',
    withKit:
      'Types and end-to-end tests in CI that fail when it is not.',
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
    q: 'Do I have to use every part of it?',
    a: 'No. The packages behind it, like Drizzle CRUD and the Better Auth React Query bindings, are open source and work on their own.',
  },
  {
    q: 'How do updates work?',
    a: 'You pull them from the repo. It is a starting point, not a dependency, so you take what you want when you want it.',
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
      'Auth, billing, workspaces, a typed API and a dashboard shell, already wired together on TanStack Start. Clone it and start building the part that is actually yours.',
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
        a: 'It is younger than Next.js. What you get for that is a router and cache built together, and typed routing that holds up as a dashboard grows. Building mostly marketing pages? Use Next.js. Building an application? TanStack Start is the better fit.',
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
      'Auth, billing, workspaces, a typed API and a dashboard shell, already wired together on the Next.js App Router. Clone it and start building the part that is actually yours.',
    docsHref: '/docs/starter-kits/nextjs',
    productHref: '/nextjs',
    whyFramework: [
      {
        title: 'The framework your team already knows',
        body: 'Every obscure question has already been asked and answered somewhere. If you are hiring, that is worth more than any single feature.',
      },
      {
        title: 'Server components and streaming',
        body: 'Keep data fetching on the server and stream the slow parts of a page. The query layer never ships to the browser.',
      },
      {
        title: 'Deploy anywhere',
        body: 'Vercel is the easy path. Netlify and self-hosted configs ship with the kit if you need them.',
      },
    ],
    stack: sharedStack,
    included: sharedIncluded,
    generateVsKit: sharedGenerateVsKit,
    faq: [
      {
        q: 'Which Next.js version does it use?',
        a: 'The App Router, with server components and streaming. The kit tracks the framework instead of pinning to whatever version it shipped on.',
      },
      ...sharedFaq,
    ],
  },
}

export const seoLandingSlugs = Object.keys(seoLandingPages)
