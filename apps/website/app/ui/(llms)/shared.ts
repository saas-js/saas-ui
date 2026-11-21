import {
  type LlmsPage,
  getOrderedPages,
  isUnder,
  pageLink,
  renderIndex,
  renderPages,
  textResponse,
} from '@/lib/llms'
import { source } from '@/lib/source'

/**
 * llms.txt files for saas-ui.dev.
 *
 * These live under `app/ui` because proxy.ts rewrites every saas-ui.dev
 * request into `/ui/*` — at the app root they 404 on saas-ui.dev and were
 * served on saas-js.com instead.
 */
export const BASE_URL = 'https://saas-ui.dev'

export const getPages = () => getOrderedPages<LlmsPage>(source as any)

export interface Bundle {
  file: string
  title: string
  description: string
  filter: (page: LlmsPage) => boolean
}

const MIGRATION_URLS = [
  '/docs/getting-started/migration',
  '/docs/getting-started/migrating-from-next',
]

export const bundles = {
  full: {
    file: 'llms-full.txt',
    title: 'Complete documentation',
    description:
      'All Saas UI v3 documentation: getting started, components, charts, styling, theming and Pro.',
    filter: () => true,
  },
  gettingStarted: {
    file: 'llms-getting-started.txt',
    title: 'Getting started',
    description:
      'Installation, the CLI, framework guides (Next.js, Vite, React Router, TanStack, Storybook) and migration.',
    filter: (page) => isUnder(page, '/docs/getting-started'),
  },
  components: {
    file: 'llms-components.txt',
    title: 'Components',
    description: 'Every Saas UI v3 component, with examples and props.',
    filter: (page) => isUnder(page, '/docs/components'),
  },
  charts: {
    file: 'llms-charts.txt',
    title: 'Charts',
    description: 'The `@saas-ui/charts` package: area, bar, line, pie and more.',
    filter: (page) => isUnder(page, '/docs/charts'),
  },
  styling: {
    file: 'llms-styling.txt',
    title: 'Styling',
    description:
      'Style props, conditional and responsive styles, dark mode and CSS variables.',
    filter: (page) => isUnder(page, '/docs/styling'),
  },
  theming: {
    file: 'llms-theming.txt',
    title: 'Theming',
    description:
      'Themes, appearance, the color system, design tokens, semantic tokens and recipes.',
    filter: (page) => isUnder(page, '/docs/theming'),
  },
  pro: {
    file: 'llms-pro.txt',
    title: 'Pro',
    description: 'Saas UI Pro components such as the data grid and kanban.',
    filter: (page) => isUnder(page, '/docs/pro'),
  },
  migration: {
    file: 'llms-v3-migration.txt',
    title: 'Migrating to v3',
    description:
      'Migrating from Chakra UI v2 / Saas UI v2, and from `@saas-ui/react@next` to rc.',
    filter: (page) => MIGRATION_URLS.includes(page.url),
  },
} satisfies Record<string, Bundle>

export function bundleResponse(bundle: Bundle) {
  const pages = getPages().filter(bundle.filter)
  return textResponse(
    renderPages(pages, BASE_URL, {
      system: `${bundle.title} — Saas UI v3 documentation. ${bundle.description}`,
    }),
  )
}

///////////////////////////////////////////////////////////////////////
// Per-component files: /llms-component/<id>.txt and <id>-full.txt

const COMPONENT_ROOTS = ['/docs/components', '/docs/charts', '/docs/pro/components']

/** Pages that document a single component, keyed by the last URL segment. */
export function getComponentPages() {
  const map = new Map<string, LlmsPage>()
  for (const page of getPages()) {
    const root = COMPONENT_ROOTS.find((r) => page.url.startsWith(`${r}/`))
    if (!root) continue
    const id = page.url.slice(root.length + 1)
    if (id.includes('/') || id === 'overview' || map.has(id)) continue
    map.set(id, page)
  }
  return map
}

export function componentFileUrl(id: string, full = false) {
  return `${BASE_URL}/llms-component/${id}${full ? '-full' : ''}.txt`
}

/** The llmstxt.org index served at /llms.txt and as the homepage markdown. */
export function renderLlmsTxt() {
  const pages = getPages()
  const components = getComponentPages()
  const componentIds = new Map(
    Array.from(components, ([id, page]) => [page.url, id]),
  )

  // Component pages link to their markdown file; everything else to the page.
  const link = (page: LlmsPage) => {
    const id = componentIds.get(page.url)
    return id
      ? { ...pageLink(page, BASE_URL), url: componentFileUrl(id) }
      : pageLink(page, BASE_URL)
  }

  const section = (title: string, bundle: Bundle) => ({
    title,
    description: `All pages in one file: ${BASE_URL}/${bundle.file}`,
    links: pages.filter(bundle.filter).map(link),
  })

  return renderIndex({
    title: 'Saas UI',
    summary:
      'Saas UI v3 is an open-source design system for building B2B SaaS applications with a native, high-quality feel. It is built on Chakra UI v3 and Ark UI.',
    details: [
      'Notes for using these docs:',
      '',
      '- Set up a project with `npx @saas-ui/cli@rc init`. The CLI installs Chakra UI, Emotion and `@saas-ui/chakra-preset`, and adds Saas UI compositions to your project as editable source files.',
      '- Chakra primitives are imported from `@chakra-ui/react`; installed compositions are imported from your project (for example `#components/ui/...`).',
      '- Wrap the app in the generated `Provider` with `defaultSystem` from `@saas-ui/chakra-preset`.',
      '- Charts come from `@saas-ui/charts`.',
      `- Per-component docs are at ${BASE_URL}/llms-component/<name>.txt (props and usage) and <name>-full.txt (with all examples). A JSON list is at ${BASE_URL}/llms-component.`,
    ].join('\n'),
    sections: [
      {
        title: 'Documentation sets',
        links: Object.values(bundles).map((bundle: Bundle) => ({
          title: bundle.title,
          url: `${BASE_URL}/${bundle.file}`,
          description: bundle.description,
        })),
      },
      section('Getting started', bundles.gettingStarted),
      section('Components', bundles.components),
      section('Charts', bundles.charts),
      section('Styling', bundles.styling),
      section('Theming', bundles.theming),
      section('Pro', bundles.pro),
      {
        title: 'Optional',
        links: [
          {
            title: 'Saas JS',
            url: 'https://www.saas-js.com/llms.txt',
            description:
              'Open-source TypeScript packages and SaaS starter kits from the same team.',
          },
        ],
      },
    ],
  })
}
