import * as React from 'react'
import {
  Button,
  Stack,
  Container,
  MenuItem,
  MenuGroup,
  useDisclosure,
} from '@chakra-ui/react'

import { MenuDialog, MenuDialogList } from '../src/menu'

import { FiArchive, FiTag, FiUsers, FiSettings } from 'react-icons/fi'

export default {
  title: 'Components/Overlay/MenuDialog',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => {
  const disclosure = useDisclosure()

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open menu
      </Button>

      <MenuDialog {...disclosure}>
        <MenuDialogList title="Menu">
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuDialogList>
      </MenuDialog>
    </Stack>
  )
}

export const IconAndCommand = () => {
  const disclosure = useDisclosure()

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open menu
      </Button>

      <MenuDialog {...disclosure}>
        <MenuDialogList title="Commands">
          <MenuItem icon={<FiUsers />} command="A">
            Assign
          </MenuItem>
          <MenuItem icon={<FiTag />} command="L">
            Add label
          </MenuItem>
          <MenuItem icon={<FiArchive />} command="C">
            Close
          </MenuItem>
        </MenuDialogList>
      </MenuDialog>
    </Stack>
  )
}

export const Group = () => {
  const disclosure = useDisclosure()

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open menu
      </Button>

      <MenuDialog {...disclosure}>
        <MenuDialogList title="Groups">
          <MenuGroup title="Message">
            <MenuItem icon={<FiUsers />} command="A">
              Assign
            </MenuItem>
            <MenuItem icon={<FiTag />} command="L">
              Add label
            </MenuItem>
            <MenuItem icon={<FiArchive />} command="C">
              Close
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="Settings">
            <MenuItem icon={<FiSettings />}>Change theme</MenuItem>
          </MenuGroup>
        </MenuDialogList>
      </MenuDialog>
    </Stack>
  )
}

export const Overflow = () => {
  const disclosure = useDisclosure()

  const items: React.ReactElement[] = []
  for (let i = 0; i < 50; i++) {
    items.push(<MenuItem key={i}>Item {i}</MenuItem>)
  }

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open menu
      </Button>

      <MenuDialog {...disclosure}>
        <MenuDialogList title="Overflow">{items}</MenuDialogList>
      </MenuDialog>
    </Stack>
  )
}
