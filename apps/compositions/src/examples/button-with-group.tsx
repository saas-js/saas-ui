'use client';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { IconButton } from 'compositions/ui/icon-button'
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
