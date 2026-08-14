'use client'

import { Breadcrumb } from 'compositions/ui/breadcrumb'

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
