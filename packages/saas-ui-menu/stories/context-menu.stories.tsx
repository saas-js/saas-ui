import { Container, Center } from '@chakra-ui/layout'
import * as React from 'react'

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuList,
  MenuItem,
} from '../src'

export default {
  title: 'Components/Overlay/ContextMenu',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Center height="200px" borderWidth="1px">
          Right click here
        </Center>
      </ContextMenuTrigger>
      <ContextMenuList>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </ContextMenuList>
    </ContextMenu>
  )
}
