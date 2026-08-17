'use client'

import { Text } from '@chakra-ui/react'
import { Page } from 'compositions/ui/page'

export const PageSettings = () => {
  return (
    <Page.Root variant="settings" height="320px" borderWidth="1px" rounded="l3">
      <Page.Header
        title="Settings"
        description="Manage your workspace preferences"
      />
      <Page.Body>
        <Text textStyle="sm">Settings content goes here.</Text>
      </Page.Body>
    </Page.Root>
  )
}
