'use client'

import { Text } from '@chakra-ui/react'
import { EmptyState } from 'compositions/ui/empty-state'
import { Page } from 'compositions/ui/page'
import { SplitPage } from 'compositions/ui/split-page'
import { LuInbox } from 'react-icons/lu'

export const SplitPageBasic = () => {
  return (
    <SplitPage height="320px" borderWidth="1px" rounded="l3">
      <Page.Root borderRightWidth="1px" width="40%" maxW="240px">
        <Page.Header title="Inbox" />
        <Page.Body p="4">
          <Text textStyle="sm">Select an item</Text>
        </Page.Body>
      </Page.Root>
      <EmptyState
        icon={<LuInbox />}
        title="Inbox zero"
        description="Nothing to do here"
      />
    </SplitPage>
  )
}
