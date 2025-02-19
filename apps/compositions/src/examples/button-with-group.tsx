'use client'

import { Button, ButtonGroup, IconButton } from '@saas-ui/react'
import { LuChevronDown } from 'react-icons/lu'

export const ButtonWithGroup = () => {
  return (
    <ButtonGroup attached>
      <Button variant="outline" size="sm">
        Button
      </Button>
      <IconButton variant="outline" size="sm">
        <LuChevronDown />
      </IconButton>
    </ButtonGroup>
  )
}
