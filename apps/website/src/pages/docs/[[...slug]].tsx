import fs from 'fs'
import { allDocs, Doc } from '.contentlayer/generated'
import { MDXComponents } from '@/docs/components/mdx-components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Layout from 'src/layouts/'

import generateRss from '@/utils/generate-rss'

export default function Page({ doc }: { doc: Doc }) {
  const Component = useMDXComponent(doc.body.code)

  return (
    <Layout frontMatter={doc.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = allDocs
    .map((t: Doc) => t._raw.flattenedPath.replace('docs/', ''))
    .map((id: string) => ({ params: { slug: id.split('/') } }))
  return { paths: docs, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params =
    (Array.isArray(ctx.params?.slug) ? ctx.params?.slug : [ctx.params?.slug]) ??
    []
  const doc = allDocs.find((doc: Doc) =>
    doc._id.endsWith(`${params.join('/')}.mdx`)
  )

  if (process.env.NODE_ENV === 'production') {
    const rss = generateRss(
      [
        {
          slug: '/docs/components',
          description:
            'Professionally crafted Chakra UI components that help you build intuitive React apps with speed.',
          title: 'Professionally crafted Chakra UI components',
        },
      ].concat(allDocs),
      'docs.xml'
    )
    fs.writeFileSync('./public/docs.xml', rss)
  }

  return {
    props: {
      doc,
      header: { position: 'sticky', borderBottomWidth: '1px' },
      footer: false,
    },
  }
}
