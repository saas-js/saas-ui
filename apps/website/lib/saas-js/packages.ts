export const SITE_URL = 'https://saas-js.com'

export const PACKAGE_IDS = [
  'drizzle-secrets',
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
    id: 'drizzle-secrets',
    name: 'Drizzle Secrets',
    npm: 'drizzle-secrets',
    tagline: 'Encrypted columns for Drizzle, with masked reads by default.',
    headline: 'Encrypted columns for Drizzle.',
    description: [
      "SaaS apps end up storing other people's credentials: OAuth refresh tokens, API keys, webhook secrets. They belong encrypted at rest, and they should never show up in a log line, an API response, or a JSON dump of a row.",
      'Drizzle Secrets is a column type. Declare a column with secret() and values are encrypted with AES-256-GCM on write. Reads return a masked value by default, or a SecretValue wrapper that only gives up the plaintext through an explicit expose() call.',
      'Every ciphertext carries the ID of the key that encrypted it, so you can add a new key, keep decrypting with the old ones, and rotate rows when you are ready. Plaintext rows already in the table are still readable, so you can turn on encryption without a big-bang migration.',
    ],
    mark: 'DS',
    logo: '/img/frameworks/drizzle.svg',
    install: 'npm install drizzle-secrets',
    github:
      'https://github.com/saas-js/saas-js/tree/main/packages/drizzle-secrets',
    npmUrl: 'https://www.npmjs.com/package/drizzle-secrets',
    group: 'data',
    features: [
      'Encrypted Postgres columns with AES-256-GCM',
      'Masked reads by default (••••1234), configurable per column',
      'SecretValue wrapper that stays masked in logs, JSON, and template strings',
      'Key IDs in every ciphertext for zero-downtime rotation',
      'Reads existing plaintext rows, so you can adopt it incrementally',
      'CLI to generate keys and encrypt or decrypt values',
    ],
    sample: {
      language: 'ts',
      code: `const secret = createDrizzleSecret(process.env.ENCRYPTION_KEY!)

export const integrations = pgTable('integrations', {
  id: text('id').primaryKey(),
  apiKey: secret('api_key'), // reads as '••••1234'
  refreshToken: secret('refresh_token', { mode: 'decrypt' }),
})

const [row] = await db.select().from(integrations)
console.log(row.refreshToken) // SecretValue(••••9f2c)
const token = expose(row.refreshToken)`,
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
    packageId: 'drizzle-secrets',
    path: packageDocsPath('drizzle-secrets', [
      'getting-started',
      'basic-usage',
    ]),
    title: 'Basic usage',
  },
  {
    packageId: 'drizzle-secrets',
    path: packageDocsPath('drizzle-secrets', ['guides', 'read-modes']),
    title: 'Read modes',
  },
  {
    packageId: 'drizzle-secrets',
    path: packageDocsPath('drizzle-secrets', ['guides', 'key-rotation']),
    title: 'Key rotation',
  },
  {
    packageId: 'drizzle-secrets',
    path: packageDocsPath('drizzle-secrets', ['reference', 'cli']),
    title: 'CLI',
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
