import * as React from 'react'
import PageContainer from '@/docs/components/page-container'
import dynamic from 'next/dynamic'

const MDXLayout = dynamic(() => import('@/layouts/mdx'))

export default function DefaultLayout({ children, frontMatter }) {
  const slug = frontMatter?.slug

  const layoutMap = {
    guides: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    docs: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    changelog: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    faq: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    default: (
      <PageContainer frontmatter={frontMatter}>{children}</PageContainer>
    ),
  }

  const layout = Object.entries(layoutMap).find(([path]) => {
    return slug?.startsWith(`/${path}`)
  })

  if (!layout) return layoutMap.default

  return layout[1]
}
