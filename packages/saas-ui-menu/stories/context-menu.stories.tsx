import {
  Container,
  Center,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Stack,
} from '@chakra-ui/react'
import * as React from 'react'

import { useSnackbar } from '@saas-ui/snackbar'

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

export const Basic = (props) => {
  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger>
        <Center height="200px" borderWidth="1px">
          Right click here
        </Center>
      </ContextMenuTrigger>
      <ContextMenuList>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Delete</MenuItem>
      </ContextMenuList>
    </ContextMenu>
  )
}

export const OnClose = () => {
  const snackbar = useSnackbar()
  return (
    <ContextMenu onClose={() => snackbar.success('Menu closed')}>
      <ContextMenuTrigger>
        <Center height="200px" borderWidth="1px">
          Right click here
        </Center>
      </ContextMenuTrigger>
      <ContextMenuList>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Delete</MenuItem>
      </ContextMenuList>
    </ContextMenu>
  )
}

export const MenuOptionGroups = () => {
  return (
    <ContextMenu closeOnSelect={false}>
      <ContextMenuTrigger>
        <Center height="200px" borderWidth="1px">
          Right click here
        </Center>
      </ContextMenuTrigger>
      <ContextMenuList>
        <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Country" type="checkbox">
          <MenuItemOption value="email">Email</MenuItemOption>
          <MenuItemOption value="phone">Phone</MenuItemOption>
          <MenuItemOption value="country">Country</MenuItemOption>
        </MenuOptionGroup>
      </ContextMenuList>
    </ContextMenu>
  )
}

export const WithLazyRender = (props) => {
  return (
    <ContextMenu isLazy {...props}>
      <ContextMenuTrigger>
        <Center height="200px" borderWidth="1px">
          Right click here
        </Center>
      </ContextMenuTrigger>
      <ContextMenuList>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Delete</MenuItem>
      </ContextMenuList>
    </ContextMenu>
  )
}

export const WithMultipleMenus = (props) => {
  return (
    <Stack>
      <ContextMenu {...props}>
        <ContextMenuTrigger>
          <Center height="200px" borderWidth="1px">
            Right click here
          </Center>
        </ContextMenuTrigger>
        <ContextMenuList>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Delete</MenuItem>
        </ContextMenuList>
      </ContextMenu>
      <ContextMenu {...props}>
        <ContextMenuTrigger>
          <Center height="200px" borderWidth="1px">
            Right click here
          </Center>
        </ContextMenuTrigger>
        <ContextMenuList>
          <MenuItem>Edit 2</MenuItem>
          <MenuItem>Copy 2</MenuItem>
          <MenuItem>Delete 2</MenuItem>
        </ContextMenuList>
      </ContextMenu>
    </Stack>
  )
}
