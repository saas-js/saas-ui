'use client'

import { Button, ButtonGroup, Text } from '@chakra-ui/react'
import { Page } from 'compositions/ui/page'

export const PageWithActions = () => {
  return (
    <Page.Root height="320px" borderWidth="1px" rounded="l3">
      <Page.Header
        title="Users"
        description="Manage your team members"
        actions={
          <ButtonGroup justifyContent="flex-end">
            <Button variant="glass" colorPalette="accent" size="sm">
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
