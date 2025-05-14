import { EditPageButton } from '@/components/edit-page-button'
import { MDXContent } from '@/components/mdx-content'
import { MDXPagination } from '@/components/mdx-pagination'
import { PageHeader } from '@/components/page-header'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Toc } from '@/components/toc'
import { Box, Show, Stack } from '@chakra-ui/react'
import { allPros } from 'content-collections'
import { getTableOfContents } from 'fumadocs-core/server'
import { notFound } from 'next/navigation'

import { docsConfig } from '../docs.config'
import { SidebarEnd } from '../sidebar'

interface Props {
  params: { slug: string[] }
}

export default async function Page(props: Props) {
  const params = await props.params

  const page = allPros.find((doc) => {
    return doc.slug === params.slug.join('/')
  })

  if (!page) {
    return notFound()
  }

  const toc = await getTableOfContents(page.content)

  return (
    <>
      <Stack
        flex="1"
        width="full"
        px={{ md: '12' }}
        pt="10"
        pb="16"
        overflow="auto"
        minHeight="var(--content-height)"
      >
        <PageHeader
          title={page.title}
          description={page.description}
          links={page.links}
        />
        <Box>
          <MDXContent code={page.code} />
          <MDXPagination />
        </Box>
      </Stack>

      <Show when={!page.hideToc}>
        <SidebarEnd visibility={toc?.length === 0 ? 'hidden' : undefined}>
          <Toc items={toc} />
          <Stack borderTopWidth="1px" pt="4" align="start">
            <EditPageButton href={`${docsConfig.editUrl}/${page.slug}.mdx`} />
            <ScrollToTop />
          </Stack>
        </SidebarEnd>
      </Show>
    </>
  )
}

export const generateMetadata = async (props: Props) => {
  const params = await props.params

  const page = getPageBySlug(params.slug)

  const category = page?.slug
    .replace('docs/', '')
    .split('/')
    .slice(0, -1)
    .join(' > ')
    ?.replace('-', ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: page?.title,
    description: page?.description,
    openGraph: {
      images: `/og?title=${page?.title}&category=${category}`,
    },
  }
}

export function generateStaticParams() {
  const paths = allPros.map((item) => {
    return {
      slug: item.slug.split('/'),
    }
  })

  return paths
}

function getPageBySlug(slug: string[]) {
  return allPros.find((doc) => {
    return doc.slug === slug.join('/')
  })
}
