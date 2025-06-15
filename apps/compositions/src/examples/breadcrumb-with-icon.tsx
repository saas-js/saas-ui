'use client'

import { Breadcrumb } from '@saas-ui/react'
import { LuHouse, LuShirt } from 'react-icons/lu'

export const BreadcrumbWithIcon = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.Link href="#">
        <LuHouse /> Home
      </Breadcrumb.Link>
      <Breadcrumb.Link href="#">
        <LuShirt /> Men Wear
      </Breadcrumb.Link>
      <Breadcrumb.CurrentLink>Trousers</Breadcrumb.CurrentLink>
    </Breadcrumb.Root>
  )
}
