'use client'

import { Breadcrumb } from '@saas-ui/react'
import { LiaSlashSolid } from 'react-icons/lia'

export const BreadcrumbWithSeparator = () => {
  return (
    <Breadcrumb.Root separator={<LiaSlashSolid />}>
      <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
      <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
    </Breadcrumb.Root>
  )
}
