import { EditPageButton } from '@/components/edit-page-button'
import { MDXContent } from '@/components/mdx-content'
import { DocsPagination } from '@/components/saas-js/docs-pagination'
import { PageHeader } from '@/components/page-header'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Toc } from '@/components/toc'
import { Box, Show, Stack } from '@chakra-ui/react'
import { getTableOfContents } from 'fumadocs-core/content/toc'
import { notFound } from 'next/navigation'

import { docsConfig } from '@/app/(saas-js)/docs/docs.config'
import { source } from '@/app/(saas-js)/docs/lib/source'
import { SidebarEnd } from '@/app/(saas-js)/docs/sidebar'
import { createSjsMetadata } from '@/lib/saas-js/metadata'

export async function SjsDocsPage({ slug }: { slug: string[] }) {
  const page = source.getPage(slug)

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
          <DocsPagination tree={source.pageTree} url={page.url} />
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

export function getSjsDocsMetadata(slug: string[] | undefined) {
  const page = source.getPage(slug)

  if (!page) notFound()

  return createSjsMetadata({
    title: page.data.title,
    description: page.data.description ?? docsConfig.description,
    path: page.url,
    ogLabel: 'Documentation',
  })
}
