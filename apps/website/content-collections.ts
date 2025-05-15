import { defineCollection, defineConfig } from '@content-collections/core'
import { type Options, compileMDX } from '@content-collections/mdx'
import rehypeShiki from '@shikijs/rehype'
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { rehypeToc, remarkHeading } from 'fumadocs-core/mdx-plugins'
import fs from 'node:fs'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'

import { docsConfig } from './app/docs/docs.config'
import { docsConfig as proConfig } from './app/pro/docs/docs.config'
import { remarkCallout } from './lib/remark-callout'
import { remarkCard } from './lib/remark-card'
import { remarkCodeTitle } from './lib/remark-code-title'
import { remarkCodeGroup } from './lib/remark-codegroup'
import { remarkSteps } from './lib/remark-steps'

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
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeShiki,
      {
        transformers: [
          transformerNotationDiff(),
          transformerNotationFocus(),
          transformerNotationHighlight(),
          transformerNotationWordHighlight(),
          transformerMetaHighlight(),
          transformerMetaWordHighlight(),
        ],
        theme: 'plastic',
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
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    status: z.string().optional(),
    toc: z.array(z.string()).optional(),
    code: z.string().optional(),
    llm: z
      .custom()
      .transform(async (data: any) => replaceExampleTabs(data?.content ?? '')),
    hideToc: z.boolean().optional(),
    composition: z.boolean().optional(),
    links: z
      .object({
        source: z.string().optional(),
        storybook: z.string().optional(),
        recipe: z.string().optional(),
        ark: z.string().optional(),
      })
      .optional(),
  }),
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
      },
      category: doc._meta.path
        .replace(/.*\/content\//, '')
        .replace(/\/[^/]*$/, '')
        .replace(cwd, ''),
    }
  },
})

const proDocs = defineCollection({
  name: 'Pro',
  directory: 'content/pro-docs',
  include: ['**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    status: z.string().optional(),
    toc: z.array(z.string()).optional(),
    code: z.string().optional(),
    llm: z
      .custom()
      .transform(async (data: any) => replaceExampleTabs(data?.content ?? '')),
    hideToc: z.boolean().optional(),
    composition: z.boolean().optional(),
    links: z
      .object({
        source: z.string().optional(),
        storybook: z.string().optional(),
        recipe: z.string().optional(),
        ark: z.string().optional(),
      })
      .optional(),
  }),
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
          ? `${proConfig.repoUrl}/tree/${proConfig.repoBranch}/packages/react/src/${links.source}`
          : undefined,
        storybook: links.storybook
          ? `${proConfig.storybookUrl}/?path=/story/${links.storybook}`
          : undefined,
        recipe: links.recipe
          ? `${proConfig.repoUrl}/tree/${proConfig.repoBranch}/packages/react/src/theme/recipes/${links.recipe}.ts`
          : undefined,
      },
      category: doc._meta.path
        .replace(/.*\/content\//, '')
        .replace(/\/[^/]*$/, '')
        .replace(cwd, ''),
    }
  },
})

const notes = defineCollection({
  name: 'Notes',
  directory: 'content/notes',
  include: ['**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    code: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig)
    return {
      ...doc,
      code,
    }
  },
})

const showcases = defineCollection({
  name: 'Showcases',
  directory: 'content/showcases.json',
  include: ['**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    image: z.string(),
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig)
    return {
      ...doc,
      code,
    }
  },
})

const blogs = defineCollection({
  name: 'Blog',
  directory: 'content/blog',
  include: ['**/*.mdx'],
  schema: (z) => ({
    title: z.string(),
    type: z.enum(['release', 'announcement', 'article']).default('article'),
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
  collections: [docs, proDocs, showcases, notes, blogs],
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
