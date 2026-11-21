import { source } from '@/app/(saas-js)/docs/lib/source'
import {
  type LlmsPage,
  getOrderedPages,
  pageLink,
  renderIndex,
  renderPages,
  textResponse,
} from '@/lib/llms'
import { getPackage } from '@/lib/saas-js/packages'

/** llms.txt files for saas-js.com. The apex 308s to www. */
export const BASE_URL = 'https://www.saas-js.com'

export const getPages = () => getOrderedPages<LlmsPage>(source as any)

export interface DocGroup {
  /** Package id (`conditions`) or starter kit (`starter-kits/nextjs`). */
  key: string
  kind: 'package' | 'starter-kit'
  title: string
  description?: string
  /** Where the bundled markdown for this group is served. */
  file: string
  pages: LlmsPage[]
}

const STARTER_KIT_TITLES: Record<string, string> = {
  nextjs: 'Next.js starter kit',
  'tanstack-start': 'TanStack Start starter kit',
}

export const starterKitFile = (kit: string) => `llms-${kit}-starter-kit.txt`

/** Docs pages grouped by package / starter kit, in sidebar order. */
export function getDocGroups() {
  const groups = new Map<string, DocGroup>()

  for (const page of getPages()) {
    const [first, second] = page.slugs
    const isKit = first === 'starter-kits' && !!second
    const key = isKit ? `${first}/${second}` : first
    if (!key) continue

    let group = groups.get(key)
    if (!group) {
      const pkg = getPackage(first)
      group = isKit
        ? {
            key,
            kind: 'starter-kit',
            title: STARTER_KIT_TITLES[second] ?? second,
            file: starterKitFile(second),
            pages: [],
          }
        : {
            key,
            kind: 'package',
            title: pkg ? `${pkg.name} (\`${pkg.npm}\`)` : first,
            description: pkg?.tagline,
            file: `packages/${first}/llms.txt`,
            pages: [],
          }
      groups.set(key, group)
    }

    // The group's index page supplies the title/description when there is
    // no package metadata for it.
    if (page.slugs.join('/') === key && !group.description) {
      group.description = page.data.description
      if (group.kind === 'package' && !getPackage(first)) {
        group.title = page.data.title
      }
    }

    group.pages.push(page)
  }

  return Array.from(groups.values())
}

/** The llmstxt.org index served at /llms.txt and as the homepage markdown. */
export function renderLlmsTxt() {
  const groups = getDocGroups()
  const packages = groups.filter((g) => g.kind === 'package')
  const kits = groups.filter((g) => g.kind === 'starter-kit')

  return renderIndex({
    title: 'Saas JS',
    summary:
      'Saas JS builds open-source TypeScript packages for SaaS products and production-ready SaaS starter kits for Next.js and TanStack Start.',
    details: [
      'Notes for using these docs:',
      '',
      '- Each package and starter kit has a single markdown file with all of its pages, listed under "Documentation sets".',
      `- The complete documentation is at ${BASE_URL}/llms-full.txt.`,
      '- The UI components used by the starter kits are documented separately at https://saas-ui.dev/llms.txt.',
    ].join('\n'),
    sections: [
      {
        title: 'Documentation sets',
        links: [
          {
            title: 'Complete documentation',
            url: `${BASE_URL}/llms-full.txt`,
            description: 'All Saas JS package and starter kit documentation.',
          },
          ...groups.map((group) => ({
            title: group.title,
            url: `${BASE_URL}/${group.file}`,
            description: group.description,
          })),
        ],
      },
      ...packages.map((group) => ({
        title: group.title,
        description: group.description,
        links: group.pages.map((page) => pageLink(page, BASE_URL)),
      })),
      ...kits.map((group) => ({
        title: group.title,
        description: group.description,
        links: group.pages.map((page) => pageLink(page, BASE_URL)),
      })),
      {
        title: 'Optional',
        links: [
          {
            title: 'Saas UI',
            url: 'https://saas-ui.dev/llms.txt',
            description:
              'The Saas UI design system and React component library used by the starter kits.',
          },
        ],
      },
    ],
  })
}

/** Markdown for /docs, which is a hub page rather than a fumadocs document. */
export function renderDocsHub() {
  const lines = [
    '# Documentation',
    '',
    'Guides and documentation for Saas JS starter kits and packages.',
    '',
    `The machine-readable documentation index is at ${BASE_URL}/llms.txt.`,
    '',
  ]

  for (const group of getDocGroups()) {
    lines.push(`## ${group.title}`, '')
    if (group.description) lines.push(group.description, '')
    for (const page of group.pages) {
      lines.push(`- [${page.data.title}](${BASE_URL}${page.url})`)
    }
    lines.push('')
  }

  return `${lines.join('\n').trim()}\n`
}

export function groupResponse(key: string) {
  const group = getDocGroups().find((g) => g.key === key)
  if (!group) return new Response('Not found', { status: 404 })

  return textResponse(
    renderPages(group.pages, BASE_URL, {
      system: `Documentation for ${group.title.replace(/`/g, '')} by Saas JS.${group.description ? ` ${group.description}` : ''}`,
    }),
  )
}
