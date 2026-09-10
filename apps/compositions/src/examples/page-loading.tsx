'use client'

import { Text } from '@chakra-ui/react'
import { Page } from 'compositions/ui/page'

export const PageLoading = () => {
  return (
    <Page.Root loading height="320px" borderWidth="1px" rounded="l3">
      <Page.Header title="Users" />
      <Page.Body>
        <Text textStyle="sm">This content is hidden while loading.</Text>
      </Page.Body>
    </Page.Root>
  )
}
