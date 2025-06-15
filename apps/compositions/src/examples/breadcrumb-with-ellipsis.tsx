'use client'

import { Breadcrumb } from '@saas-ui/react'

export const BreadcrumbWithEllipsis = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
      <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      <Breadcrumb.Ellipsis />
      <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
    </Breadcrumb.Root>
  )
}
