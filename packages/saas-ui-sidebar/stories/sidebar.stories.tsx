import * as React from 'react'
import { Story, Meta } from '@storybook/react'
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
  Spacer,
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
} from '../src'
import { MenuItem, PersonaAvatar } from '@saas-ui/react'

import { Logo } from './saas-ui'

export default {
  title: 'Components/Layout/Sidebar',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <HStack
        height="100vh"
        width="100vw"
        justifyItems="stretch"
        alignItems="stretch"
      >
        <Story />
      </HStack>
    ),
  ],
} as Meta

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const WithLinks = Template.bind({})
WithLinks.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection flex="1" overflowY="auto">
        <NavItem>Home</NavItem>
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
      <SidebarToggleButton />
      <SidebarSection flex="1" overflowY="auto">
        <NavItem icon={<FiHome />}>Home</NavItem>
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
      <SidebarToggleButton />
      <SidebarSection flex="1" overflowY="auto">
        <NavItem icon={<FaHome />}>Home</NavItem>
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
      <SidebarToggleButton />
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
        <NavItem icon={<FiHome />}>Home</NavItem>
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
      <SidebarToggleButton />
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
      <SidebarToggleButton />
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
      <SidebarToggleButton />
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
      <SidebarToggleButton />
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
  variant: 'condensed',
  width: '64px',
  children: (
    <>
      <Nav>
        <Logo width="24px" color="primary.500" />
      </Nav>
      <Nav>
        <NavItem icon={<FiHome size="1.2em" />} size="md" isActive>
          Home
        </NavItem>
        <NavItem>Users</NavItem>
        <NavItem icon={<FiSettings size="1.2em" />} size="md">
          Settings
        </NavItem>
      </Nav>
    </>
  ),
}

export const VariantCondensedColor = Template.bind({})
VariantCondensedColor.args = {
  variant: 'condensed',
  colorScheme: 'purple',
  width: '64px',
  children: (
    <>
      <Logo width="24px" color="white" />
      <NavGroup>
        <NavItem
          icon={<FiHome size="1.2em" color="white" />}
          size="md"
          isActive
        >
          Home
        </NavItem>
        <NavItem icon={<FiUsers size="1.2em" color="white" />} size="md">
          Users
        </NavItem>
        <NavItem icon={<FiSettings size="1.2em" color="white" />} size="md">
          Settings
        </NavItem>
      </NavGroup>
    </>
  ),
}

export const VariantCondensedResponsive = Template.bind({})
VariantCondensedResponsive.args = {
  variant: { base: 'condensed', lg: 'default' },
  breakpoints: { base: false },
  colorScheme: 'purple',
  children: (
    <>
      <SidebarSection>
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

export const DoubleSidebar = () => {
  const disclosure = useDisclosure()

  return (
    <Flex alignItems="stretch" overflow="hidden">
      <DarkMode>
        <Sidebar
          variant="condensed"
          colorScheme="purple"
          border="0"
          zIndex="3"
          position="relative"
        >
          <Logo width="24px" color="white" mb="1" />

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
            <MenuButton as={Button} variant="ghost">
              <PersonaAvatar presence="online" size="xs" />
            </MenuButton>
            <MenuList>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Sidebar>
      </DarkMode>
      <Sidebar
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        onOpen={disclosure.onOpen}
        zIndex={2}
        marginLeft={[16, 0]}
      >
        <SidebarSection ps="6" pe="4" direction="row">
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
  )
}

export function ToggleSidebar() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        breakpoints={{ base: true }}
      >
        <Box h="8">
          <Button onClick={onToggle} position="fixed" left="4" zIndex="modal">
            {isOpen ? 'Close' : 'Open'}
          </Button>
        </Box>

        <SidebarSection ps="6" pe="4" direction="row">
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
    </>
  )
}

export function ToggleVariant() {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  return (
    <>
      <Sidebar
        breakpoints={{ base: false }}
        variant={isOpen ? 'default' : 'condensed'}
        transition="width"
        transitionDuration="normal"
        width={isOpen ? '280px' : '48px'}
        minWidth="auto"
      >
        <SidebarSection direction={isOpen ? 'row' : 'column'}>
          <Logo
            width="24px"
            color="white"
            mb="1"
            display={isOpen ? 'block' : 'none'}
          />
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
            <NavItem icon={<FiHome />} isActive>
              All users
            </NavItem>
            <NavItem icon={<FiStar />}>Favourite users</NavItem>
          </NavGroup>
        </SidebarSection>
        <SidebarOverlay zIndex="1" />
      </Sidebar>
    </>
  )
}
