'use client'

import { useState } from 'react'

import { ActionBar, Button, Checkbox } from '@saas-ui/react'
import { LuShare, LuTrash2 } from 'react-icons/lu'

export const ActionBarWithCloseTrigger = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Checkbox
        checked={checked}
        onCheckedChange={(e) => setChecked(!!e.checked)}
      >
        Show Action bar
      </Checkbox>
      <ActionBar.Root
        open={checked}
        onOpenChange={(e) => setChecked(e.open)}
        closeOnInteractOutside={false}
      >
        <ActionBar.Content>
          <ActionBar.SelectionTrigger>2 selected</ActionBar.SelectionTrigger>
          <ActionBar.Separator />
          <Button variant="outline" size="sm">
            <LuTrash2 />
            Delete
          </Button>
          <Button variant="outline" size="sm">
            <LuShare />
            Share
          </Button>
          <ActionBar.CloseButton />
        </ActionBar.Content>
      </ActionBar.Root>
    </>
  )
}
