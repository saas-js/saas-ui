'use client'

import { useState } from 'react'

import { Button, Menu } from '@saas-ui/react'
import { HiFilter } from 'react-icons/hi'

export const MenuWithCheckboxItems = () => {
  const [values, setValues] = useState({
    open: false,
    closed: false,
  })
  return (
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiFilter /> Status
        </Button>
      </Menu.Trigger>
      <Menu.Content minW="10rem">
        <Menu.CheckboxItem
          checked={values.open}
          onCheckedChange={(checked) => setValues({ ...values, open: checked })}
          value="open"
          startElement={<Menu.ItemIndicator />}
        >
          Open
        </Menu.CheckboxItem>
        <Menu.CheckboxItem
          checked={values.closed}
          onCheckedChange={(checked) =>
            setValues({ ...values, closed: checked })
          }
          value="closed"
          startElement={<Menu.ItemIndicator />}
        >
          Closed
        </Menu.CheckboxItem>
      </Menu.Content>
    </Menu.Root>
  )
}
