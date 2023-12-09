import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import docsConfig from './src/data/docs-config'
import { getTableOfContents } from './src/docs/utils/mdx-utils'
import { rehypeMdxCodeMeta } from './src/docs/utils/rehype-code-meta'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  editUrl: {
    type: 'string',
    resolve: (doc) => `${docsConfig.repo.editUrl}/${doc._id}`,
  },
}

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  bodyType: 'mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
    author: { type: 'string' },
    avatar: { type: 'string' },
    status: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    ...computedFields,
    frontMatter: {
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        date: doc.date,
        author: doc.author,
        avatar: doc.avatar,
        slug: `/${doc._raw.flattenedPath}`,
        headings: getTableOfContents(doc.body.raw),
      }),
    },
  },
}))

const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'docs/**/*.mdx',
  bodyType: 'mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string' },
    package: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string' },
    version: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
    id: { type: 'string' },
    scope: {
      type: 'enum',
      options: ['usage', 'theming', 'props'],
      default: 'usage',
    },
    category: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    frontMatter: {
      type: 'json',
      resolve: (doc) => ({
        id: doc.id,
        scope: doc.scope,
        title: doc.title,
        package: doc.package,
        description: doc.description,
        image: doc.image,
        version: doc.version,
        slug: `/${doc._raw.flattenedPath}`,
        headings: getTableOfContents(doc.body.raw),
      }),
    },
  },
}))

const Changelog = defineDocumentType(() => ({
  name: 'Changelog',
  filePathPattern: 'changelog/*.mdx',
  bodyType: 'mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    ...computedFields,
    frontMatter: {
      type: 'json',
      resolve: (doc) => {
        return {
          title: doc.title,
          slug: `/${doc._raw.flattenedPath}`,
        }
      },
    },
  },
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'src/pages',

  documentTypes: [Blog, Doc, Changelog],
  mdx: {
    rehypePlugins: [rehypeMdxCodeMeta],
    remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji],
  },
})

export default contentLayerConfig
