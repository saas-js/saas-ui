import { Container, Stack } from '@chakra-ui/react'
import { LuHome, LuMoreHorizontal } from 'react-icons/lu'

import { Menu } from '../menu'
import { Sidebar } from './index.ts'

export default {
  title: 'Components/SidebarNavItem',
  component: Sidebar.NavItem,
  decorators: [
    (Story: React.ComponentType) => (
      <Container maxW="xs">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => {
  return (
    <Sidebar.NavItem>
      <Sidebar.NavButton>Home</Sidebar.NavButton>
    </Sidebar.NavItem>
  )
}

export const Sizes = () => {
  return (
    <Stack gap="4">
      <Sidebar.NavItem size="sm">
        <Sidebar.NavButton>Home</Sidebar.NavButton>
      </Sidebar.NavItem>
      <Sidebar.NavItem size="md">
        <Sidebar.NavButton>Home</Sidebar.NavButton>
      </Sidebar.NavItem>
      <Sidebar.NavItem size="lg">
        <Sidebar.NavButton>Home</Sidebar.NavButton>
      </Sidebar.NavItem>
    </Stack>
  )
}

export const Active = () => {
  return (
    <Sidebar.NavItem>
      <Sidebar.NavButton active>Home</Sidebar.NavButton>
    </Sidebar.NavItem>
  )
}

export const WithIcon = () => {
  return (
    <Sidebar.NavItem>
      <Sidebar.NavButton>
        <LuHome />
        Home
      </Sidebar.NavButton>
    </Sidebar.NavItem>
  )
}

export const WithEndElement = () => {
  return (
    <Sidebar.NavItem>
      <Sidebar.NavButton>
        Home
        <Sidebar.NavButtonEndElement>
          <Menu.Root>
            <Menu.Button variant="ghost" size="xs">
              <LuMoreHorizontal />
            </Menu.Button>
            <Menu.Content>
              <Menu.Item value="1">Item 1</Menu.Item>
              <Menu.Item value="2">Item 2</Menu.Item>
              <Menu.Item value="3">Item 3</Menu.Item>
            </Menu.Content>
          </Menu.Root>
        </Sidebar.NavButtonEndElement>
      </Sidebar.NavButton>
    </Sidebar.NavItem>
  )
}
