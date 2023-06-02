import fs from 'fs'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { allDocs, Doc } from '.contentlayer/generated'
import { MDXComponents } from '@/docs/components/mdx-components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from '@/hooks/next-contentlayer'
import Layout from 'src/layouts/'
import {
  getComponentTabsData,
  getDocByType,
  getDocDoc,
  TabsData,
} from '@/docs/utils/contentlayer-utils'
import { uniq } from '@/docs/utils/js-utils'

import generateRss from '@/utils/generate-rss'
import ComponentDocsLayout from '@/layouts/components'

const MdxPage = ({ doc }: { doc: Doc }) => {
  const Component = useMDXComponent(doc?.body.code)
  return <Component components={MDXComponents as any} />
}

export default function Page({
  doc,
  tabsData,
}: {
  doc: Doc
  tabsData: TabsData
}) {
  const content = doc && <MdxPage doc={doc} />
  if (doc?.slug.startsWith('/docs/components')) {
    return (
      <ComponentDocsLayout frontmatter={doc?.frontMatter} tabsData={tabsData}>
        {content}
      </ComponentDocsLayout>
    )
  }

  return <Layout frontMatter={doc?.frontMatter}>{content}</Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = uniq(
  //   allDocs.flatMap((doc) => [doc?.slug, `/${doc._raw.sourceFileDir}`])
  // )
  const paths = allDocs.map((doc) => doc.slug)
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const tabsData = getComponentTabsData([ctx.params.slug])
  const doc = getDocDoc([ctx.params.slug])

  const params =
    (Array.isArray(ctx.params?.slug) ? ctx.params?.slug : [ctx.params?.slug]) ??
    []

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    const rss = generateRss(
      [
        {
          slug: '/docs/components',
          description:
            'Professionally crafted Chakra UI components that help you build intuitive React apps with speed.',
          title: 'Professionally crafted Chakra UI components',
        },
      ].concat(allDocs as any),
      'docs.xml'
    )
    fs.writeFileSync('./public/docs.xml', rss)
  }

  if (!doc) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      doc,
      tabsData,
      header: { position: 'sticky', borderBottomWidth: '1px' },
      footer: false,
    },
  }
}
