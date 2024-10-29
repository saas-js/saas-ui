import PageContainer from '@/docs/components/page-container'
import Pagination from '@/docs/components/pagination'
import Sidebar from '@/docs/components/sidebar/sidebar'
import docsSidebar from '@/data/docs-sidebar'
import coreSidebar from '@/data/core-sidebar'
import proSidebar from '@/data/pro-sidebar'
import nextjsSidebar from '@/data/nextjs-sidebar'
import guidesSidebar from '@/data/guides-sidebar'
import * as React from 'react'
import {
  findRouteByPath,
  removeFromLast,
} from '@/docs/utils/find-route-by-path'
import { getRouteContext } from '@/docs/utils/get-route-context'

export function getRoutes(slug: string) {
  // for home page, use docs sidebar
  if (slug === '/') return docsSidebar.routes

  if (slug === '/docs') return coreSidebar.routes

  const configMap = {
    '/docs/core': coreSidebar,
    '/docs/components': coreSidebar,
    '/docs/hooks': coreSidebar,
    '/docs/guides': guidesSidebar,
    '/docs/pro': proSidebar,
    '/docs/nextjs-starter-kit': nextjsSidebar,
    '/blog': { routes: [] },
  }

  const [, sidebar] =
    Object.entries(configMap).find(([path]) => slug.startsWith(path)) ?? []

  return sidebar?.routes ?? []
}

interface MDXLayoutProps {
  frontmatter: any
  children: React.ReactNode
}

export default function MDXLayout(props: MDXLayoutProps) {
  const { frontmatter, children } = props
  const routes = getRoutes(frontmatter.slug)

  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <PageContainer
      frontmatter={frontmatter}
      sidebar={routes?.length && <Sidebar routes={routes} />}
      pagination={
        <Pagination
          next={routeContext.nextRoute}
          previous={routeContext.prevRoute}
        />
      }
    >
      {children}
    </PageContainer>
  )
}
