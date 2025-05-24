'use client'

import { useState } from 'react'

import { ActionBar, Button, Checkbox } from '@saas-ui/react'
import { LuShare, LuTrash2 } from 'react-icons/lu'

export const ActionBarBasic = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Checkbox onCheckedChange={(e) => setChecked(!!e.checked)}>
        Show Action bar
      </Checkbox>
      <ActionBar.Root open={checked}>
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
        </ActionBar.Content>
      </ActionBar.Root>
    </>
  )
}
