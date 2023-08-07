import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import {
  Badge,
  BadgeProps,
  Box,
  Button,
  DarkMode,
  Flex,
  Heading,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Square,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import {
  FiHome,
  FiUsers,
  FiSettings,
  FiHash,
  FiStar,
  FiChevronsLeft,
  FiChevronsRight,
  FiToggleLeft,
  FiSidebar,
  FiSquare,
} from 'react-icons/fi'

import { FaHome, FaUsers, FaCog, FaHashtag } from 'react-icons/fa'

import {
  Sidebar,
  SidebarProps,
  Nav,
  NavGroup,
  NavItem,
  SidebarSection,
  SidebarToggleButton,
  SidebarOverlay,
} from './'
import { PersonaAvatar } from '../persona'

import { Logo } from './saas-ui'
import { AppShell } from '../app-shell'

export default {
  title: 'Components/Layout/Sidebar',
  parameters: { layout: 'fullscreen' },
} as Meta

const Template: StoryFn<SidebarProps> = (args) => (
  <AppShell sidebar={<Sidebar {...args} />} height="$100vh">
    <Box px="4" py="3">
      <SidebarToggleButton />
    </Box>
  </AppShell>
)

export const Basic = Template.bind({})
Basic.args = {
  children: (
    <>
      <SidebarSection flex="1" overflowY="auto">
        <NavItem aria-current="page">Home</NavItem>
        <NavItem>Users</NavItem>
        <NavItem>Settings</NavItem>
      </SidebarSection>
    </>
  ),
}

export const WithLinks = Template.bind({})
WithLinks.args = {
  children: (
    <>
      <SidebarSection flex="1" overflowY="auto">
        <NavItem isActive>Home</NavItem>
        <NavItem>Users</NavItem>
        <NavItem>Settings</NavItem>
      </SidebarSection>
    </>
  ),
}

export const WithFeatherIcons = Template.bind({})
WithFeatherIcons.args = {
  children: (
    <>
      <SidebarSection flex="1" overflowY="auto">
        <NavItem icon={<FiHome />} isActive>
          Home
        </NavItem>
        <NavItem icon={<FiUsers />}>Users</NavItem>
        <NavItem icon={<FiSettings />}>Settings</NavItem>
      </SidebarSection>
    </>
  ),
}

export const WithFaIcons = Template.bind({})
WithFaIcons.args = {
  children: (
    <>
      <SidebarSection flex="1" overflowY="auto">
        <NavItem icon={<FaHome />} isActive>
          Home
        </NavItem>
        <NavItem icon={<FaUsers />}>Users</NavItem>
        <NavItem icon={<FaCog />}>Settings</NavItem>
      </SidebarSection>
    </>
  ),
}

export const WithHorizontalNav = Template.bind({})
WithHorizontalNav.args = {
  children: (
    <>
      <SidebarSection ps="6" pe="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavItem icon={<FiHome />} isActive>
          Home
        </NavItem>
        <NavItem icon={<FiUsers />}>Users</NavItem>
        <NavItem icon={<FiSettings />}>Settings</NavItem>
      </SidebarSection>
    </>
  ),
}

export const WithCollapsibleGroup = Template.bind({})
WithCollapsibleGroup.args = {
  children: (
    <>
      <SidebarSection px="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem icon={<FiHome />} isActive>
            Home
          </NavItem>
          <NavItem icon={<FiUsers />}>Users</NavItem>
          <NavItem icon={<FiSettings />}>Settings</NavItem>
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem icon={<FiHash />}>Design system</NavItem>
          <NavItem icon={<FiHash />}>Framework</NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            Chakra UI
          </NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            React
          </NavItem>
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

const NavItemBadge = (props: BadgeProps) => (
  <Badge bg="none" fontWeight="normal" rounded="md" ms="auto" {...props} />
)

export const WithBadge = Template.bind({})
WithBadge.args = {
  children: (
    <>
      <SidebarSection px="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem icon={<FiHome />} isActive>
            Home
          </NavItem>
          <NavItem icon={<FiUsers />}>Users</NavItem>
          <NavItem icon={<FiSettings />}>Settings</NavItem>
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem icon={<FiHash />}>
            <Text>Design System</Text>
            <NavItemBadge>1</NavItemBadge>
          </NavItem>
          <NavItem icon={<FiHash />}>Framework</NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            <Text>Chakra UI</Text>
            <NavItemBadge>32</NavItemBadge>
          </NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            <Text>React</Text>
            <NavItemBadge>100</NavItemBadge>
          </NavItem>
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const WithSubtleLinks = Template.bind({})
WithSubtleLinks.args = {
  children: (
    <>
      <SidebarSection px="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem variant="subtle" icon={<FiHome />} isActive>
            Home
          </NavItem>
          <NavItem variant="subtle" icon={<FiUsers />}>
            Users
          </NavItem>
          <NavItem variant="subtle" icon={<FiSettings />}>
            Settings
          </NavItem>
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem icon={<FiHash />}>Design system</NavItem>
          <NavItem icon={<FiHash />}>Framework</NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            Chakra UI
          </NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            React
          </NavItem>
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const WithSolidLinks = Template.bind({})
WithSolidLinks.args = {
  children: (
    <>
      <SidebarSection px="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem icon={<FiHome />} isActive>
            Home
          </NavItem>
          <NavItem icon={<FiUsers />}>Users</NavItem>
          <NavItem icon={<FiSettings />}>Settings</NavItem>
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem icon={<FiHash />}>Design system</NavItem>
          <NavItem icon={<FiHash />}>Framework</NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            Chakra UI
          </NavItem>
          <NavItem inset={5} icon={<FiHash />}>
            React
          </NavItem>
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const VariantCondensed = Template.bind({})
VariantCondensed.args = {
  variant: 'compact',
  children: (
    <>
      <SidebarSection alignItems="center">
        <Logo width="24px" color="primary.500" />
      </SidebarSection>
      <SidebarSection>
        <Nav>
          <NavItem icon={<FiHome size="1.2em" />} isActive>
            Home
          </NavItem>
          <NavItem icon={<FiUsers size="1.2em" />}>Users</NavItem>
          <NavItem icon={<FiSettings size="1.2em" />}>Settings</NavItem>
        </Nav>
      </SidebarSection>
    </>
  ),
}

export const VariantCondensedColor = Template.bind({})
VariantCondensedColor.args = {
  variant: 'compact',
  colorScheme: 'purple',
  children: (
    <>
      <SidebarSection alignItems="center" px="2">
        <Logo width="24px" color="white" />
      </SidebarSection>
      <SidebarSection px="3">
        <Nav>
          <NavItem icon={<FiHome size="1.2em" color="white" />} isActive>
            Home
          </NavItem>
          <NavItem icon={<FiUsers size="1.2em" color="white" />}>Users</NavItem>
          <NavItem icon={<FiSettings size="1.2em" color="white" />}>
            Settings
          </NavItem>
        </Nav>
      </SidebarSection>
    </>
  ),
}

export const VariantCondensedResponsive = Template.bind({})
VariantCondensedResponsive.args = {
  variant: { base: 'compact' },
  toggleBreakpoint: false,
  colorScheme: 'purple',
  children: (
    <>
      <SidebarSection alignItems="center">
        <Logo width="24px" color="white" />
      </SidebarSection>
      <SidebarSection>
        <NavGroup>
          <NavItem
            icon={<FiHome size="1.2em" color="whiteAlpha.800" />}
            color="white"
            size="sm"
            isActive
          >
            Home
          </NavItem>
          <NavItem
            icon={<FiUsers size="1.2em" color="whiteAlpha.800" />}
            color="white"
            size="sm"
          >
            Users
          </NavItem>
          <NavItem
            icon={<FiSettings size="1.2em" color="whiteAlpha.800" />}
            color="white"
            size="sm"
          >
            Settings
          </NavItem>
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const VariantCondensedNavGroup = Template.bind({})
VariantCondensedNavGroup.args = {
  variant: 'compact',
  colorScheme: 'purple',
  children: (
    <>
      <SidebarSection alignItems="center">
        <Logo width="24px" color="white" />
      </SidebarSection>
      <SidebarSection>
        <NavGroup title="Users">
          <NavItem
            icon={<FiHome size="1.2em" color="whiteAlpha.800" />}
            color="white"
            size="sm"
            isActive
          >
            Home
          </NavItem>
          <NavItem
            icon={<FiUsers size="1.2em" color="whiteAlpha.800" />}
            color="white"
            size="sm"
          >
            Users
          </NavItem>
          <NavItem
            icon={<FiSettings size="1.2em" color="whiteAlpha.800" />}
            color="white"
            size="sm"
          >
            Settings
          </NavItem>
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const DoubleSidebar = () => {
  const disclosure = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <AppShell
      sidebar={
        <Flex alignItems="stretch" overflow="hidden" height="full">
          <DarkMode>
            <Sidebar
              variant="compact"
              colorScheme="purple"
              border="0"
              zIndex="3"
              position="relative"
            >
              <SidebarSection alignItems="center">
                <Logo width="24px" color="white" mb="1" />
              </SidebarSection>

              <SidebarSection flex="1">
                <NavGroup>
                  <NavItem
                    icon={<FiUsers size="1.2em" />}
                    isActive
                    onClick={(e) => {
                      e.preventDefault()
                      disclosure.onToggle()
                    }}
                  >
                    Users
                  </NavItem>
                  <NavItem
                    icon={<FiSettings size="1.2em" />}
                    onClick={(e) => {
                      e.preventDefault()
                      disclosure.onClose()
                    }}
                  >
                    Settings
                  </NavItem>
                </NavGroup>

                <Spacer />

                <Menu>
                  <MenuButton as={Button} variant="ghost" px="0">
                    <PersonaAvatar presence="online" size="xs" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Sign out</MenuItem>
                  </MenuList>
                </Menu>
              </SidebarSection>
            </Sidebar>
          </DarkMode>
          <Flex position="relative">
            <Sidebar
              isOpen={disclosure.isOpen}
              onClose={disclosure.onClose}
              onOpen={disclosure.onOpen}
              toggleBreakpoint={false}
              zIndex={2}
              height="100%"
            >
              <SidebarSection px="5" direction="row">
                <Heading size="sm" py="2">
                  Users
                </Heading>
                <Spacer />
              </SidebarSection>

              <SidebarSection flex="1" overflowY="auto">
                <NavGroup>
                  <NavItem icon={<FiHome />} isActive>
                    All users
                  </NavItem>
                  <NavItem icon={<FiStar />}>Favourite users</NavItem>
                </NavGroup>
                <NavGroup title="Tags" isCollapsible>
                  <NavItem icon={<FiHash />}>Design system</NavItem>
                  <NavItem icon={<FiHash />}>Framework</NavItem>
                  <NavItem inset={5} icon={<FiHash />}>
                    Chakra UI
                  </NavItem>
                  <NavItem inset={5} icon={<FiHash />}>
                    React
                  </NavItem>
                </NavGroup>
              </SidebarSection>
              <SidebarOverlay zIndex="1" />
            </Sidebar>
          </Flex>
        </Flex>
      }
    >
      <Box />
    </AppShell>
  )
}

export function CustomToggle() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        toggleBreakpoint={false}
        spacing="2"
        height="100vh"
      >
        <SidebarSection direction="row">
          <Box h="8">
            <IconButton
              onClick={onToggle}
              position="fixed"
              left="3"
              zIndex="modal"
              aria-label={isOpen ? 'Close' : 'Open'}
              icon={isOpen ? <FiSquare /> : <FiSidebar />}
            />
          </Box>
        </SidebarSection>

        <SidebarSection flex="1" overflowY="auto">
          <NavGroup>
            <NavItem icon={<FiHome />} isActive>
              All users
            </NavItem>
            <NavItem icon={<FiStar />}>Favourite users</NavItem>
          </NavGroup>
          <NavGroup title="Tags" isCollapsible>
            <NavItem icon={<FiHash />}>Design system</NavItem>
            <NavItem icon={<FiHash />}>Framework</NavItem>
            <NavItem inset={5} icon={<FiHash />}>
              Chakra UI
            </NavItem>
            <NavItem inset={5} icon={<FiHash />}>
              React
            </NavItem>
          </NavGroup>
        </SidebarSection>
        <SidebarOverlay zIndex="1" />
      </Sidebar>
    </>
  )
}

export function ToggleVariant() {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <AppShell
      sidebar={
        <Sidebar
          toggleBreakpoint={false}
          variant={isOpen ? 'default' : 'compact'}
          transition="width"
          transitionDuration="normal"
          width={isOpen ? '280px' : '14'}
          minWidth="auto"
        >
          <SidebarSection direction={isOpen ? 'row' : 'column'} height="32px">
            <Logo width="24px" mb="1" display={isOpen ? 'block' : 'none'} />
            <Spacer />
            <IconButton
              onClick={onToggle}
              variant="ghost"
              size="sm"
              icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
              aria-label="Toggle Sidebar"
            />
          </SidebarSection>

          <SidebarSection flex="1" overflowY="auto" overflowX="hidden">
            <NavGroup>
              <NavItem icon={<FiHome size="1.1em" />} isActive>
                All users
              </NavItem>
              <NavItem icon={<FiStar size="1.1em" />}>Favourite users</NavItem>
            </NavGroup>
          </SidebarSection>
          <SidebarOverlay zIndex="1" />
        </Sidebar>
      }
    >
      <Box />
    </AppShell>
  )
}
