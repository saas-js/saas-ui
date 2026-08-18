export const SITE_URL = 'https://saas-js.com'

export const PACKAGE_IDS = [
  'drizzle-crud',
  'slingshot',
  'better-auth-react-query',
  'iconx',
] as const

export type PackageId = (typeof PACKAGE_IDS)[number]

export type PackageGroupId = 'data' | 'files' | 'auth' | 'ui'

export interface SjsPackage {
  id: PackageId
  name: string
  npm: string
  tagline: string
  install: string
  github: string
  npmUrl: string
  usedInStarterKit: boolean
  group: PackageGroupId
  features: string[]
  sample: {
    language: 'ts' | 'tsx' | 'bash'
    code: string
  }
}

export const packageGroups: { id: PackageGroupId; label: string }[] = [
  { id: 'data', label: 'Data' },
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
    install: 'npm install drizzle-crud',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/drizzle-crud',
    usedInStarterKit: true,
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
    id: 'slingshot',
    name: 'Slingshot',
    npm: '@saas-js/slingshot',
    tagline: 'Direct-to-S3 file uploads for any JavaScript runtime.',
    install: 'npm install @saas-js/slingshot @saas-js/slingshot-react',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/@saas-js/slingshot',
    usedInStarterKit: true,
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
    install: 'npm install better-auth-react-query',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/better-auth-react-query',
    usedInStarterKit: true,
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
    tagline: '200,000+ Iconify icons, generated as type-safe React components.',
    install: 'npm install iconx',
    github: 'https://github.com/saas-js/saas-js',
    npmUrl: 'https://www.npmjs.com/package/iconx',
    usedInStarterKit: true,
    group: 'ui',
    features: [
      'Generate React components from 200,000+ Iconify icons',
      'You own the output — no runtime icon CDN',
      'Tree-shakes to the icons you actually import',
      'Works with React Server Components',
      'CLI and MCP server for adding icons',
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

export interface KeywordPage {
  packageId: PackageId
  slug: string
  path: string
  title: string
  description: string
}

export const keywordPages: KeywordPage[] = [
  {
    packageId: 'iconx',
    slug: 'react-icons-alternative',
    path: '/react-icons-alternative',
    title: 'A react-icons alternative that actually tree-shakes',
    description:
      'Why react-icons, icon fonts, and Iconify web components fall short — and how Iconx generates type-safe React icons from Iconify.',
  },
  {
    packageId: 'drizzle-crud',
    slug: 'pagination',
    path: '/drizzle-orm-pagination',
    title: 'Drizzle ORM pagination without the boilerplate',
    description:
      'Paginate Drizzle queries with limit, offset, and total counts generated from your schema.',
  },
  {
    packageId: 'drizzle-crud',
    slug: 'soft-delete',
    path: '/drizzle-soft-delete',
    title: 'Soft deletes in Drizzle ORM',
    description:
      'Add soft delete, restore, and permanent delete to Drizzle tables from a single schema field.',
  },
  {
    packageId: 'drizzle-crud',
    slug: 'generator',
    path: '/drizzle-crud-generator',
    title: 'A CRUD generator for Drizzle ORM',
    description:
      'Generate type-safe create, read, update, and delete operations from your Drizzle schema.',
  },
  {
    packageId: 'drizzle-crud',
    slug: 'filtering',
    path: '/drizzle-filtering',
    title: 'Filtering Drizzle ORM queries',
    description:
      'JSON-serializable filters, operators, and OR/AND logic on top of Drizzle.',
  },
  {
    packageId: 'slingshot',
    slug: 's3-direct-upload',
    path: '/s3-direct-upload-react',
    title: 'Direct S3 uploads in React',
    description:
      'Presigned, direct-to-S3 file uploads for React — without proxying bytes through your server.',
  },
]

export function getKeywordPage(packageId: string, slug: string) {
  return keywordPages.find(
    (page) => page.packageId === packageId && page.slug === slug,
  )
}
