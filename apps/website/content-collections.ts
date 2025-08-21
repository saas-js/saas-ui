import { defineCollection, defineConfig } from '@content-collections/core'
import { type Options, compileMDX } from '@content-collections/mdx'
import {
  createDocSchema,
  createMetaSchema,
  transformMDX,
} from '@fumadocs/content-collections/configuration'
import rehypeShiki from '@shikijs/rehype'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { rehypeToc, remarkHeading, structure } from 'fumadocs-core/mdx-plugins'
import { remarkStructure } from 'fumadocs-core/mdx-plugins'
import fs from 'node:fs'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { bundledLanguages, getSingletonHighlighter } from 'shiki'

import { docsConfig } from './app/docs/docs.config'
import { remarkCallout } from './lib/remark-callout'
import { remarkCard } from './lib/remark-card'
import { remarkCodeTitle } from './lib/remark-code-title'
import { remarkCodeGroup } from './lib/remark-codegroup'
import { remarkSteps } from './lib/remark-steps'
import { indigoDarkTheme } from './lib/shiki-theme-indigo-dark'
import { indigoLightTheme } from './lib/shiki-theme-indigo-light'

const highlighter = await getSingletonHighlighter({
  themes: [],
  langs: Object.keys(bundledLanguages),
})

await highlighter.loadTheme(indigoLightTheme)
await highlighter.loadTheme(indigoDarkTheme)

const cwd = process.cwd()

const mdxConfig = {
  remarkPlugins: [
    remarkDirective,
    remarkGfm,
    remarkCallout,
    remarkCodeTitle,
    remarkCodeGroup,
    remarkSteps,
    remarkCard,
    remarkHeading,
    remarkStructure,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeShikiFromHighlighter,
      highlighter,
      {
        transformers: [
          transformerNotationDiff(),
          transformerNotationFocus(),
          transformerNotationHighlight(),
          transformerNotationWordHighlight(),
          transformerMetaHighlight(),
          transformerMetaWordHighlight(),
        ],
        themes: {
          light: 'indigo-light',
          dark: 'indigo-dark',
        },
      },
    ],
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: ['subheading-anchor'],
        },
      },
    ],
    rehypeToc,
  ],
} satisfies Options

const slugify = (str: string) => {
  return str
    .replace(/.*\/content\//, '')
    .replace(/\.mdx$/, '')
    .replace(cwd, '')
}

const docs = defineCollection({
  name: 'Docs',
  directory: 'content/docs',
  include: ['**/*.mdx'],
  schema: (z) => {
    return {
      ...createDocSchema(z),
      hideToc: z.boolean().optional(),
      links: z
        .object({
          source: z.string().optional(),
          storybook: z.string().optional(),
          recipe: z.string().optional(),
          ark: z.string().optional(),
          pro: z.string().optional(),
        })
        .optional(),
      structuredData: z.any().optional(),
    }
  },
  // schema: (z) => ({
  //   title: z.string(),
  //   description: z.string(),
  //   metadata: z.record(z.string()).optional(),
  //   content: z.string(),
  //   status: z.string().optional(),
  //   toc: z.array(z.string()).optional(),
  //   code: z.string().optional(),
  //   llm: z
  //     .custom()
  //     .transform(async (data: any) => replaceExampleTabs(data?.content ?? '')),
  //   hideToc: z.boolean().optional(),
  //   composition: z.boolean().optional(),
  //   links: z
  //     .object({
  //       source: z.string().optional(),
  //       storybook: z.string().optional(),
  //       recipe: z.string().optional(),
  //       ark: z.string().optional(),
  //       pro: z.string().optional(),
  //     })
  //     .optional(),
  // }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig)

    const links = doc.links || {}
    return {
      ...doc,
      code,
      slug: slugify(doc._meta.path),
      links: {
        ...links,
        source: links.source
          ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/react/src/${links.source}`
          : undefined,
        storybook: links.storybook
          ? `${docsConfig.storybookUrl}/?path=/story/${links.storybook}`
          : undefined,
        recipe: links.recipe
          ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/react/src/theme/recipes/${links.recipe}.ts`
          : undefined,
        pro: links.pro ? `/pro/pricing` : undefined,
      },
      category: doc._meta.path
        .replace(/.*\/content\//, '')
        .replace(/\/[^/]*$/, '')
        .replace(cwd, ''),
      structuredData: structure(doc.content) as any,
    }
  },
})

const metas = defineCollection({
  name: 'meta',
  directory: 'content/docs',
  include: '**/meta.json',
  parser: 'json',
  schema: createMetaSchema,
})

const blogs = defineCollection({
  name: 'Blog',
  directory: 'content/blog',
  include: ['**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    type: z.enum(['announcement', 'article']).default('article'),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    authors: z.array(z.string()),
    publishedAt: z.string(),
    toc: z.array(z.string()).optional(),
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig)
    return {
      ...doc,
      code,
      slug: slugify(doc._meta.path),
    }
  },
})

const changelog = defineCollection({
  name: 'Changelog',
  directory: 'content/changelog',
  include: ['**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    version: z.string().optional(),
    packages: z.array(z.string()).optional(),
    products: z.array(z.string()).optional(),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    authors: z.array(z.string()),
    publishedAt: z.string(),
    toc: z.array(z.string()).optional(),
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig)
    return {
      ...doc,
      code,
      slug: slugify(doc._meta.path),
    }
  },
})

export default defineConfig({
  root: cwd,
  collections: [docs, metas, blogs, changelog],
})

function replaceExampleTabs(text: string) {
  const matches = text.matchAll(/<ExampleTabs name="([^"]+)" \/>/g)

  if (!matches) return text

  for (const match of matches) {
    const name = match[1]

    const example = fs.readFileSync(
      `../compositions/src/examples/${name}.tsx`,
      'utf-8',
    )

    text = text.replace(
      `<ExampleTabs name="${name}" \/>`,
      `\`\`\`tsx\n${example}\n\`\`\``,
    )
  }

  return text
}
