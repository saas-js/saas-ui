'use client'

import { Stack } from '@chakra-ui/react'
import { Breadcrumb } from '@saas-ui/react'

export const BreadcrumbWithVariants = () => {
  return (
    <Stack>
      <Breadcrumb.Root variant="plain">
        <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
      </Breadcrumb.Root>

      <Breadcrumb.Root variant="underline">
        <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
      </Breadcrumb.Root>
    </Stack>
  )
}
