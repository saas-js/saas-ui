'use client'

import { Text } from '@chakra-ui/react'
import { Page } from 'compositions/ui/page'
import { SplitPage } from 'compositions/ui/split-page'

export const SplitPageWithContent = () => {
  return (
    <SplitPage height="320px" borderWidth="1px" rounded="l3">
      <Page.Root borderRightWidth="1px" width="40%" maxW="240px">
        <Page.Header title="Inbox" />
        <Page.Body p="4">
          <Text textStyle="sm">Elliot Alderson</Text>
        </Page.Body>
      </Page.Root>
      <Page.Root>
        <Page.Header
          title="Elliot Alderson"
          description="A bug is never just a mistake"
        />
        <Page.Body>
          <Text textStyle="sm">
            Detail content for the selected conversation.
          </Text>
        </Page.Body>
      </Page.Root>
    </SplitPage>
  )
}
