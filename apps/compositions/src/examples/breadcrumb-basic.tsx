'use client'

import { Breadcrumb } from '@saas-ui/react'

export const BreadcrumbBasic = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
      <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
    </Breadcrumb.Root>
  )
}
