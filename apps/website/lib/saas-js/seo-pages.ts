/**
 * Content for the long-form keyword landing pages.
 *
 * These are deliberately kept separate from the product pages at `/` and
 * `/nextjs`. Those are short brand and conversion pages; these answer the
 * research query — what is in the box, what would it cost to build, why this
 * framework — so the two do not compete for the same result.
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
  buildVsBuy: { task: string; scratch: string; withKit: string }[]
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
    note: 'End-to-end and unit setup wired into GitHub Actions from the first commit.',
  },
]

const sharedIncluded = [
  {
    title: 'Multi-tenant workspaces',
    body: 'Users create workspaces, invite teammates and manage roles. Role-based access control and scope filters run through the data layer, so tenant isolation is enforced in the query rather than remembered in each route.',
  },
  {
    title: 'Billing that matches your pricing',
    body: 'Subscriptions, tiered plans, metered and usage-based pricing, and entitlements. Your pricing configuration syncs to Stripe automatically instead of being maintained twice.',
  },
  {
    title: 'An admin and dashboard shell',
    body: 'Navigation, data tables, filters, forms and empty states already assembled — the parts that are tedious to build well and easy to build inconsistently.',
  },
  {
    title: 'Types strict enough for agents',
    body: 'Consistent patterns and full type coverage give an AI agent the constraints it needs to change code safely. Tests provide the back-pressure that catches it when it does not.',
  },
]

const sharedFaq = [
  {
    q: 'Is this a subscription?',
    a: 'No. It is a one-time purchase with lifetime access to the repository and its updates. Individual licences are $200 and team licences $400 for up to 10 developers and unlimited projects.',
  },
  {
    q: 'Can I use it for client work?',
    a: 'Yes. Both licences cover unlimited self-hosted projects, including work you deliver to clients.',
  },
  {
    q: 'Do I have to use every part of it?',
    a: 'No. The pieces are separable — the packages behind the kit, such as Drizzle CRUD and the Better Auth React Query bindings, are open source and usable on their own.',
  },
  {
    q: 'How do updates work?',
    a: 'You pull them from the repository. Because the kit is a starting point rather than a dependency you install, you choose what to take and when.',
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
      'Everything a SaaS needs before it has a single customer — auth, billing, workspaces, a typed API and a dashboard shell — assembled on TanStack Start and ready to build on.',
    docsHref: '/docs/starter-kits/tanstack-start',
    productHref: '/',
    whyFramework: [
      {
        title: 'Type-safe routing end to end',
        body: 'Routes, params and loaders are typed, so a rename surfaces at build time rather than in production. For dashboard-heavy products with deeply nested views, that matters more than it does for content sites.',
      },
      {
        title: 'Caching built into the router',
        body: 'TanStack Start builds on TanStack Query, so loaders, caching and invalidation are one system rather than two that need reconciling.',
      },
      {
        title: 'SSR where it helps, not everywhere',
        body: 'You can render on the server where it earns something and stay on the client where it does not, without opting into a whole-app rendering model.',
      },
    ],
    stack: sharedStack,
    included: sharedIncluded,
    buildVsBuy: [
      {
        task: 'Auth with social, magic links, 2FA and SSO',
        scratch: '2–4 weeks',
        withKit: 'Configured',
      },
      {
        task: 'Stripe subscriptions, tiers and usage billing',
        scratch: '2–3 weeks',
        withKit: 'Configured',
      },
      {
        task: 'Multi-tenant workspaces with roles',
        scratch: '2–4 weeks',
        withKit: 'Configured',
      },
      {
        task: 'Transactional email templates',
        scratch: '3–5 days',
        withKit: 'Included',
      },
      {
        task: 'Dashboard shell, tables, forms and filters',
        scratch: '2–4 weeks',
        withKit: 'Included',
      },
      {
        task: 'E2E and unit test setup in CI',
        scratch: '3–5 days',
        withKit: 'Included',
      },
    ],
    faq: [
      {
        q: 'Is TanStack Start ready for production?',
        a: 'It is younger than Next.js, and that is the honest trade. What you get for it is a router and cache that were designed together, and typed routing that holds up as a dashboard grows. If your product is mostly marketing pages, the trade is not worth it. If it is an application, it usually is.',
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
      'Everything a SaaS needs before it has a single customer — auth, billing, workspaces, a typed API and a dashboard shell — assembled on the Next.js App Router and ready to build on.',
    docsHref: '/docs/starter-kits/nextjs',
    productHref: '/nextjs',
    whyFramework: [
      {
        title: 'The framework your team already knows',
        body: 'Hiring, documentation and answers to obscure questions are all easier on Next.js. For a team that has to onboard people, that is a real operational advantage.',
      },
      {
        title: 'Server components and streaming',
        body: 'The App Router lets you keep data fetching on the server and stream the parts of a page that are slow, without shipping the query layer to the browser.',
      },
      {
        title: 'Deploy anywhere',
        body: 'Vercel is the smooth path, but the kit ships with Netlify and self-hosted configurations so the choice stays yours.',
      },
    ],
    stack: sharedStack,
    included: sharedIncluded,
    buildVsBuy: [
      {
        task: 'Auth with social, magic links, 2FA and SSO',
        scratch: '2–4 weeks',
        withKit: 'Configured',
      },
      {
        task: 'Stripe subscriptions, tiers and usage billing',
        scratch: '2–3 weeks',
        withKit: 'Configured',
      },
      {
        task: 'Multi-tenant workspaces with roles',
        scratch: '2–4 weeks',
        withKit: 'Configured',
      },
      {
        task: 'Transactional email templates',
        scratch: '3–5 days',
        withKit: 'Included',
      },
      {
        task: 'Dashboard shell, tables, forms and filters',
        scratch: '2–4 weeks',
        withKit: 'Included',
      },
      {
        task: 'E2E and unit test setup in CI',
        scratch: '3–5 days',
        withKit: 'Included',
      },
    ],
    faq: [
      {
        q: 'Which Next.js version does it use?',
        a: 'The App Router, with server components and streaming. The kit is kept current with the framework rather than pinned to the version it shipped on.',
      },
      ...sharedFaq,
    ],
  },
}

export const seoLandingSlugs = Object.keys(seoLandingPages)
