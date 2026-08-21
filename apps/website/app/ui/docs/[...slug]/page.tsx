import { EditPageButton } from '@/components/edit-page-button'
import { MDXContent } from '@/components/mdx-content'
import { MDXPagination } from '@/components/mdx-pagination'
import { PageHeader } from '@/components/page-header'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Toc } from '@/components/toc'
import { source } from '@/lib/source'
import { Box, Show, Stack } from '@chakra-ui/react'
import { getTableOfContents } from 'fumadocs-core/content/toc'
import { notFound } from 'next/navigation'

import { docsConfig } from '../docs.config'
import { SidebarEnd } from '../sidebar'

interface Props {
  params: { slug: string[] }
}

export default async function Page(props: Props) {
  const params = await props.params

  const page = source.getPage(params.slug)

  if (!page) {
    return notFound()
  }

  const toc = await getTableOfContents(page.data.content)

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
          title={page.data.title}
          description={page.data.description}
          links={page.data.links}
        />
        <Box fontSize="md">
          <MDXContent code={page.data.code} />
          <MDXPagination />
        </Box>
      </Stack>

      <Show when={!page.data.hideToc}>
        <SidebarEnd visibility={toc?.length === 0 ? 'hidden' : undefined}>
          <Toc items={toc} />
          <Stack borderTopWidth="1px" pt="4" align="start">
            <EditPageButton
              href={`${docsConfig.editUrl}/${page.data.slug}.mdx`}
            />
            <ScrollToTop />
          </Stack>
        </SidebarEnd>
      </Show>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const ogSearchParams = new URLSearchParams({
    site: 'sui',
    title: page.data.title,
    label: 'Documentation',
  })
  if (page.data.description) {
    ogSearchParams.set('description', page.data.description)
  }
  const ogImage = `/og?${ogSearchParams.toString()}`

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  return source.generateParams()
}
