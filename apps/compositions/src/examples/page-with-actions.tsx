'use client'

import { ButtonGroup, Text } from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'
import { Page } from 'compositions/ui/page'

export const PageWithActions = () => {
  return (
    <Page.Root height="320px" borderWidth="1px" rounded="l3">
      <Page.Header
        title="Users"
        actions={
          <ButtonGroup justifyContent="flex-end">
            <Button variant="outline" size="xs">
              Export
            </Button>
            <Button variant="glass" colorPalette="accent" size="xs">
              Invite
            </Button>
          </ButtonGroup>
        }
      />
      <Page.Body>
        <Text textStyle="sm">Page content goes here.</Text>
      </Page.Body>
    </Page.Root>
  )
}
