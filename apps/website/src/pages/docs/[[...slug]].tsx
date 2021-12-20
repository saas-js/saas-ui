import { allDocs } from '.contentlayer/data'
import type { Doc } from '.contentlayer/types'
import { MDXComponents } from '@/docs/components/mdx-components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Layout from 'src/layouts/'

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
  return {
    props: { doc, header: { position: 'sticky', borderBottomWidth: '1px' } },
  }
}
