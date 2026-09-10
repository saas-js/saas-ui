'use client'

import { Page } from 'compositions/ui/page'
import { Text } from '@chakra-ui/react'

export const PageBasic = () => {
  return (
    <Page.Root height="320px" borderWidth="1px" rounded="l3">
      <Page.Header title="Users" />
      <Page.Body>
        <Text textStyle="sm">Page content goes here.</Text>
      </Page.Body>
    </Page.Root>
  )
}
