import { allChangelogs } from '.contentlayer/data'
import { Changelog } from '.contentlayer/types'
import { MDXComponents } from '@/docs/components/mdx-components'
import Layout from 'src/layouts'
import { GetStaticProps } from 'next'
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { doc: allChangelogs[0] },
  }
}
