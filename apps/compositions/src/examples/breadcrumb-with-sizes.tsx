'use client'

import { Stack } from '@chakra-ui/react'
import { Breadcrumb } from '@saas-ui/react'

export const BreadcrumbWithSizes = () => {
  return (
    <Stack>
      <Breadcrumb.Root size="sm">
        <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
      </Breadcrumb.Root>

      <Breadcrumb.Root size="md">
        <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
      </Breadcrumb.Root>

      <Breadcrumb.Root size="lg">
        <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
      </Breadcrumb.Root>
    </Stack>
  )
}
