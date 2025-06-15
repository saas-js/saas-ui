'use client'

import { useState } from 'react'

import { ActionBar, Button, Checkbox, Dialog } from '@saas-ui/react'
import { LuSquarePlus, LuTrash2 } from 'react-icons/lu'

export const ActionBarWithDialog = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Checkbox onCheckedChange={(e) => setChecked(!!e.checked)}>
        Check to select projects
      </Checkbox>
      <ActionBar.Root open={checked}>
        <ActionBar.Content>
          <ActionBar.SelectionTrigger>4 selected</ActionBar.SelectionTrigger>

          <ActionBar.Separator />

          <Button variant="outline" size="sm">
            <LuSquarePlus />
            Add to collection
          </Button>

          <Dialog.Root placement="center">
            <Dialog.Trigger asChild>
              <Button variant="surface" colorPalette="red" size="sm">
                <LuTrash2 />
                Delete projects
              </Button>
            </Dialog.Trigger>

            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete projects</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Dialog.Description>
                  Are you sure you want to delete 4 projects?
                </Dialog.Description>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline">Cancel</Button>
                <Button colorPalette="red">Delete</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </ActionBar.Content>
      </ActionBar.Root>
    </>
  )
}
