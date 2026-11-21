import propTypes from '@/lib/generated/prop-types.json'
import { colorPalettes } from 'compositions/lib/color-palettes'
import { kebabCase } from 'scule'

import { deepMerge } from '../deep-merge'
import { replaceTokenDocs } from './tokens'

/**
 * Shared renderer for the llms.txt family on saas-ui.dev and saas-js.com.
 *
 * Both sites build these files from the same fumadocs `source` that renders
 * the docs, so page URLs, titles and ordering always match what people see.
 * Raw MDX (with `<ExampleTabs>` already inlined by content-collections) is
 * turned into plain markdown here.
 */

export interface LlmsPage {
  url: string
  slugs: string[]
  data: {
    title: string
    description?: string
    llm?: string
  }
}

interface PageTreeNode {
  type: 'page' | 'folder' | 'separator'
  url?: string
  index?: { url: string }
  children?: PageTreeNode[]
}

interface DocsSource<P extends LlmsPage> {
  getPages: () => P[]
  pageTree: { children: PageTreeNode[] }
}

/**
 * The pages people can reach from the sidebar, in sidebar order. Pages left
 * out of every meta.json (hidden or work-in-progress) are not published.
 */
export function getOrderedPages<P extends LlmsPage>(source: DocsSource<P>) {
  const order: string[] = []
  const walk = (nodes: PageTreeNode[]) => {
    for (const node of nodes) {
      if (node.type === 'page' && node.url) order.push(node.url)
      if (node.type === 'folder') {
        if (node.index) order.push(node.index.url)
        walk(node.children ?? [])
      }
    }
  }
  walk(source.pageTree.children)

  const byUrl = new Map(source.getPages().map((page) => [page.url, page]))
  return Array.from(new Set(order))
    .map((url) => byUrl.get(url))
    .filter((page): page is P => !!page)
}

export function isUnder(page: LlmsPage, prefix: string) {
  return page.url === prefix || page.url.startsWith(`${prefix}/`)
}

///////////////////////////////////////////////////////////////////////
// MDX → markdown

type PropInfo = {
  type: string
  isRequired?: boolean
  defaultValue?: string
  description?: string
}

const propGroups = propTypes as Record<string, Record<string, any>>

function getComponentTypes(component: string) {
  const name = kebabCase(component)
  return deepMerge(
    {},
    propGroups.ark?.[name] ?? {},
    propGroups.recipe?.[name] ?? {},
    propGroups.component?.[name] ?? {},
    propGroups.static?.[name] ?? {},
  )
}

const cell = (value: string) =>
  value.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()

export function propTableToMarkdown(component: string, part?: string) {
  const types = getComponentTypes(component)
  const entry = part ? types[part] : types
  const props = entry?.props as Record<string, PropInfo> | undefined
  if (!props || Object.keys(props).length === 0) return ''

  const rows = Object.entries(props)
    .sort(([, a], [, b]) => {
      if (a.isRequired !== b.isRequired) return a.isRequired ? -1 : 1
      if (!!a.defaultValue !== !!b.defaultValue) return a.defaultValue ? -1 : 1
      return 0
    })
    .map(([name, prop]) => {
      const defaultValue = prop.defaultValue
        ? `\`${cell(String(prop.defaultValue)).replaceAll('"', "'")}\``
        : '-'
      return `| \`${name}\`${prop.isRequired ? ' (required)' : ''} | ${defaultValue} | \`${cell(prop.type).replaceAll('"', "'")}\` | ${cell(prop.description ?? '')} |`
    })

  return [
    '| Prop | Default | Type | Description |',
    '| --- | --- | --- | --- |',
    ...rows,
  ].join('\n')
}

const attr = (attrs: string, name: string) =>
  attrs.match(new RegExp(`${name}="([^"]*)"`))?.[1]

const colorPaletteImport =
  /import { colorPalettes } from "compositions\/lib\/color-palettes"\n/g
const decorativeBoxImport =
  /import { DecorativeBox } from "compositions\/lib\/decorative-box"\n/g
const boxImport =
  /import\s+{\s*(?:.*,\s*)?Box(?:\s*,\s*.*)?}\s+from\s+["']@chakra-ui\/react["']/g

/** Inline helpers that only exist in the docs app, so examples run as-is. */
function cleanupExampleImports(content: string) {
  if (content.includes('lib/color-palettes')) {
    content = content
      .replace(colorPaletteImport, '')
      .replace(/colorPalettes/g, JSON.stringify(colorPalettes))
  }
  if (content.includes('lib/decorative-box')) {
    content = content.replace(
      decorativeBoxImport,
      content.match(boxImport) ? '' : 'import { Box } from "@chakra-ui/react"\n',
    )
    content = content.replace(/DecorativeBox/g, 'Box')
  }
  return content
}

/** Turn root-relative markdown links into absolute ones. */
function absolutizeLinks(content: string, baseUrl: string) {
  return content.replace(/\]\((\/[^)\s]*)\)/g, `](${baseUrl}$1)`)
}

/**
 * Apply `fn` only outside fenced code blocks, so JSX inside code samples
 * (e.g. a `<Card>` in an example) is left untouched. Fences may be indented.
 */
function outsideCode(content: string, fn: (text: string) => string) {
  return content
    .split(/(^[ \t]*```[\s\S]*?^[ \t]*```)/m)
    .map((part, i) => (i % 2 === 1 ? part : fn(part)))
    .join('')
}

const CALLOUT_TITLES: Record<string, string> = {
  info: 'Note',
  note: 'Note',
  callout: 'Note',
  warning: 'Warning',
  danger: 'Danger',
  tip: 'Tip',
  success: 'Success',
}

const LAYOUT_DIRECTIVES = new Set(['steps', 'card-group', 'code-group', 'card'])

/**
 * `:::info` / `:::steps` / `:::code-group` are still raw in the `llm` field.
 * Callouts become a labeled note; layout directives keep their body, including
 * any fenced samples they wrap.
 */
function replaceDirectives(content: string) {
  const lines = content.split('\n')
  const out: string[] = []
  let inFence = false
  let directive: {
    name: string
    label?: string
    raw: string[]
    body: string[]
  } | null = null

  const emit = (close: string | null) => {
    if (!directive) return
    const title = CALLOUT_TITLES[directive.name]
    const body = directive.body.join('\n').trim()
    if (title) {
      const label = directive.label?.trim() || title
      out.push(body ? `**${label}:** ${body}` : `**${label}:**`)
    } else if (LAYOUT_DIRECTIVES.has(directive.name)) {
      if (body) out.push(body)
    } else {
      out.push(...directive.raw, ...directive.body)
      if (close !== null) out.push(close)
    }
    directive = null
  }

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      if (directive) directive.body.push(line)
      else out.push(line)
      continue
    }

    if (!inFence && !directive) {
      const open = line.match(/^:::([a-z][\w-]*)(?:\[([^\]]*)\])?[^\n]*$/)
      if (open) {
        directive = { name: open[1], label: open[2], raw: [line], body: [] }
        continue
      }
    }

    if (!inFence && directive && /^:::\s*$/.test(line)) {
      emit(line)
      continue
    }

    if (directive) directive.body.push(line)
    else out.push(line)
  }

  if (directive) emit(null)
  return out.join('\n')
}

/**
 * `<TypeTable type={{ name: { type, description, default } }} />` → table.
 * The prop is a plain object literal written in our own MDX.
 */
function replaceTypeTables(text: string) {
  let out = ''
  let rest = text
  for (;;) {
    const start = rest.search(/<TypeTable\s+type=\{/)
    if (start === -1) return out + rest
    const open = rest.indexOf('{', start) + 1
    let depth = 1
    let i = open
    while (i < rest.length && depth > 0) {
      if (rest[i] === '{') depth++
      if (rest[i] === '}') depth--
      i++
    }
    const close = rest.indexOf('/>', i)
    if (close === -1) return out + rest
    let table = ''
    try {
      const type = new Function(`return (${rest.slice(open, i - 1)})`)() as Record<
        string,
        { type?: string; description?: string; default?: unknown }
      >
      table = [
        '| Name | Type | Default | Description |',
        '| --- | --- | --- | --- |',
        ...Object.entries(type).map(
          ([name, t]) =>
            `| \`${name}\` | \`${cell(String(t.type ?? ''))}\` | ${t.default === undefined ? '-' : `\`${cell(String(t.default))}\``} | ${cell(t.description ?? '')} |`,
        ),
      ].join('\n')
    } catch {}
    out += rest.slice(0, start) + table
    rest = rest.slice(close + 2)
  }
}

/** Self-closing link components (`<QuickLink>`, `<ResourceCard>`) → list items. */
function replaceLinkCards(text: string) {
  return text.replace(
    /<(QuickLink|ResourceCard)\s([\s\S]*?)\/>/g,
    (_, _name, attrs: string) => {
      const title = attr(attrs, 'title')
      const href = attr(attrs, 'href') ?? attr(attrs, 'url')
      const description = attr(attrs, 'description')
      if (!title || !href) return ''
      return `- [${title}](${href})${description ? `: ${description}` : ''}`
    },
  )
}

/** Docs-only components that are pure layout or live demos. */
const layoutTags =
  /^[ \t]*<\/?(?:Tabs|Steps|Step|SimpleGrid)(?:\s[^>]*)?>[ \t]*$|<ConditionsChakraExample\s*\/>|<ComponentGrid\s*\/>/gm

export function mdxToMarkdown(content: string, baseUrl: string) {
  content = replaceDirectives(content)
  content = outsideCode(content, (text) =>
    absolutizeLinks(
      replaceLinkCards(replaceTypeTables(replaceTokenDocs(text)))
        .replace(/<PropTable([^>]*?)\/>/g, (_, attrs: string) => {
          const component = attr(attrs, 'component')
          return component
            ? propTableToMarkdown(component, attr(attrs, 'part'))
            : ''
        })
        .replace(
          /<Card\s+([^>]*?)\/?>(?:([\s\S]*?)<\/Card>)?/g,
          (_, attrs: string, body?: string) => {
            const title = attr(attrs, 'title')
            const href = attr(attrs, 'href')
            if (!title) return body ?? ''
            const text = body?.trim()
              ? `: ${body.trim().replace(/\s+/g, ' ')}`
              : ''
            return href ? `- [${title}](${href})${text}` : `- ${title}${text}`
          },
        )
        .replace(/^[ \t]*<\/?Tab(?:\s[^>]*)?>[ \t]*$/gm, (line: string) => {
          const value = line.match(/value="([^"]+)"/)
          return value ? `**${value[1]}**` : ''
        })
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
        .replace(/<(?:Info|Callout)(?:\s[^>]*)?>/g, '**Note:**')
        .replace(/<\/(?:Info|Callout)>/g, '')
        .replace(layoutTags, '')
        .replace(/^import\s.+from\s+['"].+['"];?$/gm, ''),
      baseUrl,
    ),
  )

  return cleanupExampleImports(content)
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Drop the examples and setup sections for the compact per-component file. */
export function minifyComponentDoc(content: string) {
  const sectionRange = (start: string, end: string) => {
    const from = content.indexOf(start)
    const to = content.indexOf(end, from)
    if (from !== -1 && to !== -1) {
      content = content.slice(0, from) + content.slice(to)
    }
  }
  sectionRange('\n## Examples', '\n## Props')
  sectionRange('\n## Setup', '\n## Usage')
  return content.replace(/\n:::.+?[\r\n]+([\s\S]*?)[\r\n]+:::\n/g, '\n')
}

///////////////////////////////////////////////////////////////////////
// Output

export function renderPage(
  page: LlmsPage,
  baseUrl: string,
  options: { minify?: boolean } = {},
) {
  let body = page.data.llm ? mdxToMarkdown(page.data.llm, baseUrl) : ''
  if (options.minify) body = minifyComponentDoc(body)

  return [
    `# ${page.data.title}`,
    `URL: ${baseUrl}${page.url}`,
    page.data.description ? `> ${page.data.description}` : '',
    body,
  ]
    .filter(Boolean)
    .join('\n\n')
}

export function renderPages(
  pages: LlmsPage[],
  baseUrl: string,
  options: { system?: string; minify?: boolean } = {},
) {
  const parts = pages.map((page) => renderPage(page, baseUrl, options))
  if (options.system) parts.unshift(`<SYSTEM>${options.system}</SYSTEM>`)
  return `${parts.join('\n\n---\n\n')}\n`
}

export interface LlmsLink {
  title: string
  url: string
  description?: string
}

export interface LlmsSection {
  title: string
  description?: string
  links: LlmsLink[]
}

/** An llms.txt index, following https://llmstxt.org. */
export function renderIndex(index: {
  title: string
  summary: string
  details?: string
  sections: LlmsSection[]
}) {
  const link = (l: LlmsLink) =>
    `- [${l.title}](${l.url})${l.description ? `: ${l.description}` : ''}`

  const sections = index.sections
    .filter((section) => section.links.length > 0)
    .map((section) =>
      [
        `## ${section.title}`,
        section.description,
        section.links.map(link).join('\n'),
      ]
        .filter(Boolean)
        .join('\n\n'),
    )

  return `${[
    `# ${index.title}`,
    `> ${index.summary}`,
    index.details,
    ...sections,
  ]
    .filter(Boolean)
    .join('\n\n')}\n`
}

export function pageLink(page: LlmsPage, baseUrl: string): LlmsLink {
  return {
    title: page.data.title,
    url: `${baseUrl}${page.url}`,
    description: page.data.description,
  }
}

export function textResponse(content: string) {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

/** Rough token count for `x-markdown-tokens` (about 4 characters per token). */
export function estimateMarkdownTokens(content: string) {
  return Math.max(1, Math.ceil(content.length / 4))
}

export function markdownResponse(content: string) {
  const body = content.endsWith('\n') ? content : `${content}\n`
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'x-markdown-tokens': String(estimateMarkdownTokens(body)),
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
