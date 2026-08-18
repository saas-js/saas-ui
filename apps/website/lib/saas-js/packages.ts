export const SITE_URL = 'https://saas-js.com'

export const PACKAGE_IDS = [
  'drizzle-crud',
  'conditions',
  'slingshot',
  'better-auth-react-query',
  'iconx',
] as const

export type PackageId = (typeof PACKAGE_IDS)[number]

export type PackageGroupId = 'data' | 'logic' | 'files' | 'auth' | 'ui'

export interface SjsPackage {
  id: PackageId
  name: string
  npm: string
  tagline: string
  headline: string
  description: string | readonly string[]
  install: string
  github: string
  npmUrl: string
  group: PackageGroupId
  mark: string
  logo?: string
  logoFramed?: boolean
  features: string[]
  sample: {
    language: 'ts' | 'tsx' | 'bash'
    code: string
  }
}

export const packageGroups: { id: PackageGroupId; label: string }[] = [
  { id: 'data', label: 'Data' },
  { id: 'logic', label: 'Logic' },
  { id: 'files', label: 'Files' },
  { id: 'auth', label: 'Auth' },
  { id: 'ui', label: 'UI' },
]

export const packages: SjsPackage[] = [
  {
    id: 'drizzle-crud',
    name: 'Drizzle CRUD',
    npm: 'drizzle-crud',
    tagline: 'Type-safe CRUD operations, generated from your Drizzle schema.',
    headline: 'CRUD from your Drizzle schema.',
    description: [
      'Most SaaS tables need the same work: create, read, update, delete, then list with search, filters, and pagination. That usually means a new query helper per feature — and soft deletes, validation, and access control get copied into every route.',
      'Drizzle CRUD generates those operations from the tables you already have. Pass a Drizzle schema and you get typed create, findById, list, update, and delete, plus filter operators, full-text search, pagination, soft delete, and restore on one API.',
      'Validation stays on Standard Schema (Zod and others) so inputs match the table. Actor-based access control and scope filters keep multi-tenant queries honest. Lifecycle hooks and bulk operations put the business rules next to the table instead of in every caller.',
    ],
    mark: 'DC',
    logo: '/img/frameworks/drizzle.svg',
    install: 'npm install drizzle-crud',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/drizzle-crud',
    group: 'data',
    features: [
      'CRUD operations generated from your Drizzle schema',
      'Filtering, pagination, and full-text search',
      'Soft deletes with restore',
      'Actor-based access control and scope filters',
      'Standard Schema validation (Zod and others)',
      'Lifecycle hooks and bulk operations',
    ],
    sample: {
      language: 'ts',
      code: `const users = createCrud(usersTable, {
  searchFields: ['name', 'email'],
  allowedFilters: ['isActive'],
  softDelete: { field: 'deletedAt' },
})

const page = await users.list({
  search: 'ada',
  filters: { isActive: true },
  page: 1,
  limit: 20,
})`,
    },
  },
  {
    id: 'conditions',
    name: 'Conditions',
    npm: '@saas-js/conditions',
    tagline:
      'A headless condition expression engine for filters and rule builders.',
    headline: 'Conditions for filters and rule builders.',
    description: [
      'Define fields once, then validate, evaluate, and serialize the same AND/OR expression tree on the server and in the UI. The core package has no React or DOM code — it owns the condition model, not the controls.',
      'Headless React bindings add drafts and filter-chip orchestration. Adapters turn the same query into a TanStack Table global filter, a Drizzle where clause, or a Zero (ZQL) expression.',
    ],
    mark: 'C',
    install: 'npm install @saas-js/conditions',
    github: 'https://github.com/saas-js/saas-js/tree/main/packages/conditions',
    npmUrl: 'https://www.npmjs.com/package/@saas-js/conditions',
    group: 'logic',
    features: [
      'Typed condition definitions for filters, segments, and rule builders',
      'Versioned AND/OR expression trees with immutable mutations',
      'Runtime validation and inference through Standard Schema',
      'Framework-neutral state powered by TanStack Store',
      'Evaluation, filtering, parsing, and serialization',
      'Headless React UI, plus TanStack Table, Drizzle, and Zero adapters',
    ],
    sample: {
      language: 'ts',
      code: `const contacts = defineConditions({
  fields: {
    status: {
      type: 'enum',
      schema: z.enum(['lead', 'customer', 'churned']),
      operators: ['equals', 'not', 'in'],
    },
    arr: {
      type: 'number',
      schema: z.coerce.number().min(0),
      operators: ['gte', 'lte', 'between'],
    },
  },
})

const query = contacts.parse(saved.query)
contacts.evaluate(query, { status: 'customer', arr: 84_000 })
db.select().from(table).where(
  conditionsToDrizzle(contacts, query, { columns }),
)`,
    },
  },
  {
    id: 'slingshot',
    name: 'Slingshot',
    npm: '@saas-js/slingshot',
    tagline: 'Direct-to-S3 file uploads for any JavaScript runtime.',
    headline: 'Direct S3 uploads for any runtime.',
    description:
      'Authorize and key files on the server, then let the browser send bytes straight to S3-compatible storage. Works on any JavaScript server runtime, with a composable React upload UI when you need one.',
    mark: 'S',
    install: 'npm install @saas-js/slingshot @saas-js/slingshot-react',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/@saas-js/slingshot',
    group: 'files',
    features: [
      'Presigned uploads straight to S3-compatible storage',
      'Works on any JavaScript server runtime',
      'Composable React upload UI',
      'Authorize and key files on the server',
      'Progress, validation, and drag-and-drop',
    ],
    sample: {
      language: 'ts',
      code: `const slingshot = createSlingshotServer({
  profile: 'avatar',
  adapter: s3({ bucket: process.env.AWS_BUCKET }),
  authorize: ({ req, meta }) => checkAccess(req, meta.userId),
  key: ({ meta }) => \`users/\${meta.userId}/avatar\`,
})

export const POST = handle(slingshot)`,
    },
  },
  {
    id: 'better-auth-react-query',
    name: 'Better Auth React Query',
    npm: 'better-auth-react-query',
    tagline: 'React Query bindings for Better Auth.',
    headline: 'Better Auth, as TanStack Query.',
    description:
      'Wrap your Better Auth client once. Methods that get or list become queries; everything else becomes a mutation, with typed query keys for cache invalidation.',
    mark: 'BA',
    logo: '/img/frameworks/better-auth.svg',
    logoFramed: true,
    install: 'npm install better-auth-react-query',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/better-auth-react-query',
    group: 'auth',
    features: [
      'Wraps your Better Auth client in TanStack Query',
      'get/list methods become queries automatically',
      'Everything else becomes a mutation',
      'Typed query keys for cache invalidation',
      'Full TypeScript inference from your auth client',
    ],
    sample: {
      language: 'tsx',
      code: `const auth = createAuthQueryClient(authClient)

function Profile() {
  const { data: session } = useQuery(
    auth.getSession.queryOptions(),
  )

  return <div>Welcome, {session?.user.name}</div>
}`,
    },
  },
  {
    id: 'iconx',
    name: 'Iconx',
    npm: 'iconx',
    tagline:
      'An agent-friendly CLI to manage and install icons in React projects.',
    headline: 'Icons for React, installed by the CLI — or by your agent.',
    description: [
      'Iconx is a CLI for adding, searching, and managing icons in a React project. Agents can run the same commands — or the MCP server — instead of pasting SVGs or pulling in a heavy icon package.',
      'Each icon is generated as a type-safe React component in your repo. No runtime CDN, unused icons tree-shake away, and it works with React Server Components. The catalog is Iconify: 200,000+ icons across 150+ sets.',
    ],
    mark: 'Ix',
    install: 'npm install iconx',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/iconx',
    group: 'ui',
    features: [
      'Agent-friendly CLI to add, search, and list icons',
      'MCP server so agents can install icons without leaving the editor',
      'Type-safe React components you own — no runtime CDN',
      '200,000+ Iconify icons across 150+ sets',
      'Tree-shakes; works with React Server Components',
    ],
    sample: {
      language: 'tsx',
      code: `npx iconx init
npx iconx add --set lucide home user settings

import { HomeIcon } from './components/icons/home-icon'

<HomeIcon size="24px" />`,
    },
  },
]

export const packagesById = Object.fromEntries(
  packages.map((pkg) => [pkg.id, pkg]),
) as Record<PackageId, SjsPackage>

export function isPackageId(value: string | undefined): value is PackageId {
  return !!value && PACKAGE_IDS.includes(value as PackageId)
}

export function getPackage(id: string) {
  return isPackageId(id) ? packagesById[id] : undefined
}

export function packageDocsPath(id: PackageId, rest: string[] = []) {
  const suffix = rest.length ? `/${rest.join('/')}` : ''
  return `/packages/${id}/docs${suffix}`
}

export function packagePath(id: PackageId) {
  return `/packages/${id}`
}

export interface PackageGuide {
  packageId: PackageId
  path: string
  title: string
}

export const packageGuides: PackageGuide[] = [
  {
    packageId: 'drizzle-crud',
    path: packageDocsPath('drizzle-crud', ['getting-started', 'basic-usage']),
    title: 'Basic Usage',
  },
  {
    packageId: 'drizzle-crud',
    path: packageDocsPath('drizzle-crud', ['reference', 'core-operations']),
    title: 'Core Operations',
  },
  {
    packageId: 'drizzle-crud',
    path: packageDocsPath('drizzle-crud', ['advanced', 'filtering']),
    title: 'Advanced Filtering',
  },
  {
    packageId: 'drizzle-crud',
    path: packageDocsPath('drizzle-crud', ['advanced', 'access-control']),
    title: 'Access Control',
  },
  {
    packageId: 'drizzle-crud',
    path: packageDocsPath('drizzle-crud', ['advanced', 'hooks']),
    title: 'Lifecycle Hooks',
  },
  {
    packageId: 'drizzle-crud',
    path: packageDocsPath('drizzle-crud', ['advanced', 'validation']),
    title: 'Validation',
  },
  {
    packageId: 'drizzle-crud',
    path: packageDocsPath('drizzle-crud', ['advanced', 'transactions']),
    title: 'Transactions',
  },
  {
    packageId: 'conditions',
    path: packageDocsPath('conditions', ['getting-started', 'basic-usage']),
    title: 'Basic usage',
  },
  {
    packageId: 'conditions',
    path: packageDocsPath('conditions', ['react']),
    title: 'React',
  },
  {
    packageId: 'conditions',
    path: packageDocsPath('conditions', ['react', 'chakra-ui']),
    title: 'Chakra UI',
  },
  {
    packageId: 'conditions',
    path: packageDocsPath('conditions', ['react', 'shadcn']),
    title: 'shadcn',
  },
  {
    packageId: 'conditions',
    path: packageDocsPath('conditions', ['integrations', 'tanstack-table']),
    title: 'TanStack Table',
  },
  {
    packageId: 'conditions',
    path: packageDocsPath('conditions', ['integrations', 'drizzle']),
    title: 'Drizzle',
  },
  {
    packageId: 'conditions',
    path: packageDocsPath('conditions', ['integrations', 'zero']),
    title: 'Zero Sync',
  },
  {
    packageId: 'iconx',
    path: packageDocsPath('iconx', ['getting-started', 'basic-usage']),
    title: 'Basic Usage',
  },
  {
    packageId: 'iconx',
    path: packageDocsPath('iconx', ['reference', 'cli']),
    title: 'CLI Reference',
  },
  {
    packageId: 'iconx',
    path: packageDocsPath('iconx', ['reference', 'configuration']),
    title: 'Configuration',
  },
  {
    packageId: 'iconx',
    path: packageDocsPath('iconx', ['reference', 'icon-sets']),
    title: 'Icon Sets',
  },
  {
    packageId: 'slingshot',
    path: packageDocsPath('slingshot', ['getting-started', 'basic-usage']),
    title: 'Basic usage',
  },
  {
    packageId: 'slingshot',
    path: packageDocsPath('slingshot', ['frameworks', 'nextjs']),
    title: 'Next.js',
  },
  {
    packageId: 'slingshot',
    path: packageDocsPath('slingshot', ['reference', 'react']),
    title: 'React',
  },
  {
    packageId: 'slingshot',
    path: packageDocsPath('slingshot', ['ui', 'shadcn']),
    title: 'Shadcn UI',
  },
]
