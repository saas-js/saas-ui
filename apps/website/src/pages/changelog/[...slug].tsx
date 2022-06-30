import { allChangelogs, Changelog } from '.contentlayer/generated'
import { MDXComponents } from '@/docs/components/mdx-components'
import Layout from 'src/layouts'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'

export default function Page({ doc }: { doc: Changelog }) {
  const Component = useMDXComponent(doc.body.code)

  return (
    <Layout frontMatter={doc.frontMatter}>
      <Component components={MDXComponents as any} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = allChangelogs
    .map((t: Changelog) => t._raw.flattenedPath.replace('changelog/', ''))
    .map((id: string) => ({ params: { slug: id.split('/') } }))
  return { paths: docs, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params =
    (Array.isArray(ctx.params?.slug) ? ctx.params?.slug : [ctx.params?.slug]) ??
    []
  const doc = allChangelogs.find((doc: Changelog) =>
    doc._id.endsWith(`${params.join('/')}.mdx`)
  )

  return {
    props: {
      header: { position: 'sticky', borderBottomWidth: '1px' },
      footer: false,
      doc,
    },
  }
}
