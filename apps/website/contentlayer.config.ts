import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import siteConfig from './src/data/site-config'
import { getTableOfContents } from './src/docs/utils/mdx-utils'
import { rehypeMdxCodeMeta } from './src/docs/utils/rehype-code-meta'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  editUrl: {
    type: 'string',
    resolve: (doc) => `${siteConfig.repo.editUrl}/${doc._id}`,
  },
}

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
    author: { type: 'string' },
    avatar: { type: 'string' },
    status: { type: 'string' },
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
  fields: {
    title: { type: 'string', required: true },
    package: { type: 'string' },
    description: { type: 'string', required: true },
    image: { type: 'string' },
    version: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    frontMatter: {
      type: 'json',
      resolve: (doc) => ({
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
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    slug: { type: 'string' },
  },
  computedFields: {
    frontMatter: {
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        slug: '/changelog',
      }),
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
