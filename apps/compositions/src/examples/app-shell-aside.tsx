'use client'

import { Text } from '@chakra-ui/react'
import { AppShell } from 'compositions/ui/app-shell'
import { Aside } from 'compositions/ui/aside'
import { Page } from 'compositions/ui/page'

export const AppShellAside = () => {
  return (
    <AppShell
      height="400px"
      aside={
        <Aside.Root
          defaultOpen
          width="240px"
          borderLeftWidth="1px"
          bg="bg.panel"
        >
          <Aside.Header>
            <Aside.Title>Details</Aside.Title>
          </Aside.Header>
          <Aside.Body>
            <Text textStyle="sm">Contact details</Text>
          </Aside.Body>
        </Aside.Root>
      }
    >
      <Page.Root>
        <Page.Header title="Contacts" />
        <Page.Body textStyle="sm">Your application content</Page.Body>
      </Page.Root>
    </AppShell>
  )
}
