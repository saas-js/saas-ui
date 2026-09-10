'use client'

import { Button, Text } from '@chakra-ui/react'
import { Page } from 'compositions/ui/page'
import { SplitPage, useSplitPage } from 'compositions/ui/split-page'

const DetailPane = () => {
  const { onClose } = useSplitPage()

  return (
    <Page.Root>
      <Page.Header
        title="Elliot Alderson"
        description="Conversation detail"
        actions={
          <Button size="xs" variant="ghost" onClick={onClose}>
            Close
          </Button>
        }
      />
      <Page.Body>
        <Text textStyle="sm">Detail content</Text>
      </Page.Body>
    </Page.Root>
  )
}

const ListPane = () => {
  const { onOpen } = useSplitPage()

  return (
    <Page.Root borderRightWidth="1px" width="40%" maxW="240px">
      <Page.Header title="Inbox" />
      <Page.Body p="4">
        <Button size="sm" variant="outline" onClick={onOpen}>
          Open detail
        </Button>
      </Page.Body>
    </Page.Root>
  )
}

export const SplitPageResponsive = () => {
  return (
    <SplitPage
      defaultOpen={false}
      mobile
      height="320px"
      borderWidth="1px"
      rounded="l3"
    >
      <ListPane />
      <DetailPane />
    </SplitPage>
  )
}
