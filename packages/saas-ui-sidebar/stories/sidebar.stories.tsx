import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { FiHome, FiUsers, FiSettings, FiHash } from 'react-icons/fi'

import { FaHome, FaUsers, FaCog, FaHashtag } from 'react-icons/fa'

// import { AppShell } from '@saas-ui/app-shell'

import {
  Sidebar,
  SidebarProps,
  SidebarDivider,
  SidebarNav,
  SidebarNavGroup,
  SidebarOverflow,
  SidebarToggleButton,
  SidebarOverlay,
} from '../src'
import { MenuItem, PersonaAvatar } from '@saas-ui/react'
import { SidebarItem } from '../src'

import { Logo } from './saas-ui'

export default {
  title: 'Components/Navigation/Sidebar',
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
      <SidebarNav>
        <SidebarItem label="Home" />
        <SidebarItem label="Users" />
        <SidebarItem label="Settings" />
      </SidebarNav>
    </>
  ),
}

export const WithFeatherIcons = Template.bind({})
WithFeatherIcons.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarNav>
        <SidebarItem label="Home" icon={<FiHome />} />
        <SidebarItem label="Users" icon={<FiUsers />} />
        <SidebarItem label="Settings" icon={<FiSettings />} />
      </SidebarNav>
    </>
  ),
}

export const WithFaIcons = Template.bind({})
WithFaIcons.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarNav>
        <SidebarItem label="Home" icon={<FaHome />} />
        <SidebarItem label="Users" icon={<FaUsers />} />
        <SidebarItem label="Settings" icon={<FaCog />} />
      </SidebarNav>
    </>
  ),
}

export const WithHorizontalNav = Template.bind({})
WithHorizontalNav.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarNav direction="row" ps="6">
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
      </SidebarNav>
      <SidebarNav>
        <SidebarItem label="Home" icon={<FiHome />} />
        <SidebarItem label="Users" icon={<FiUsers />} />
        <SidebarItem label="Settings" icon={<FiSettings />} />
      </SidebarNav>
    </>
  ),
}

export const WithCollapsibleGroup = Template.bind({})
WithCollapsibleGroup.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarNav direction="row" ps="6">
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
      </SidebarNav>
      <SidebarOverflow>
        <SidebarNav>
          <SidebarNavGroup>
            <SidebarItem label="Home" icon={<FiHome />} isActive />
            <SidebarItem label="Users" icon={<FiUsers />} />
            <SidebarItem label="Settings" icon={<FiSettings />} />
          </SidebarNavGroup>

          <SidebarNavGroup title="Tags" isCollapsible>
            <SidebarItem label="Design system" icon={<FiHash />} />
            <SidebarItem label="Framework" icon={<FiHash />} />
            <SidebarItem label="Chakra UI" inset={5} icon={<FiHash />} />
            <SidebarItem label="React" inset={5} icon={<FiHash />} />
          </SidebarNavGroup>
        </SidebarNav>
      </SidebarOverflow>
    </>
  ),
}

export const VariantCondensed = Template.bind({})
VariantCondensed.args = {
  variant: 'condensed',
  children: (
    <>
      <SidebarNav>
        <Logo width="24px" color="primary.500" />
      </SidebarNav>
      <SidebarNav>
        <SidebarItem
          label="Home"
          icon={<FiHome size="1.2em" />}
          size="md"
          isActive
        />
        <SidebarItem label="Users" icon={<FiUsers size="1.2em" />} size="md" />
        <SidebarItem
          label="Settings"
          icon={<FiSettings size="1.2em" />}
          size="md"
        />
      </SidebarNav>
    </>
  ),
}

export const VariantCondensedColor = Template.bind({})
VariantCondensedColor.args = {
  variant: 'condensed',
  colorScheme: 'purple',
  children: (
    <>
      <SidebarNav>
        <Logo width="24px" color="white" />
      </SidebarNav>
      <SidebarNav>
        <SidebarItem
          label="Home"
          icon={<FiHome size="1.2em" color="white" />}
          size="md"
          isActive
        />
        <SidebarItem
          label="Users"
          icon={<FiUsers size="1.2em" color="white" />}
          size="md"
        />
        <SidebarItem
          label="Settings"
          icon={<FiSettings size="1.2em" color="white" />}
          size="md"
        />
      </SidebarNav>
    </>
  ),
}

export const DoubleSidebar = () => {
  const disclosure = useDisclosure()

  return (
    <Flex alignItems="stretch" overflow="hidden">
      <Sidebar
        variant="condensed"
        colorScheme="purple"
        border="0"
        zIndex="3"
        position="relative"
      >
        <SidebarNav py="1">
          <Logo width="24px" color="white" />
        </SidebarNav>
        <SidebarOverflow>
          <SidebarNav>
            <SidebarItem
              label="Users"
              icon={<FiUsers size="1.2em" color="white" />}
              size="md"
              isActive
              onClick={(e) => {
                e.preventDefault()
                disclosure.onToggle()
              }}
            />
            <SidebarItem
              label="Settings"
              icon={<FiSettings size="1.2em" color="white" />}
              size="md"
              onClick={(e) => {
                e.preventDefault()
                disclosure.onClose()
              }}
            />
          </SidebarNav>
        </SidebarOverflow>
        <Spacer />
        <SidebarNav>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <PersonaAvatar presence="online" size="xs" />
            </MenuButton>
            <MenuList>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </SidebarNav>
      </Sidebar>
      <Sidebar
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        onOpen={disclosure.onOpen}
        zIndex={2}
        marginLeft={[16, 0]}
      >
        <SidebarNav direction="row">
          <Heading size="sm" py="2">
            Users
          </Heading>
          <Spacer />
        </SidebarNav>
        <SidebarOverflow>
          <SidebarNav>
            <SidebarNavGroup>
              <SidebarItem label="Overview" icon={<FiUsers />} isActive />
            </SidebarNavGroup>

            <SidebarNavGroup title="Tags" isCollapsible>
              <SidebarItem label="Design system" icon={<FiHash />} />
              <SidebarItem label="Framework" icon={<FiHash />} />
              <SidebarItem label="Chakra UI" inset={5} icon={<FiHash />} />
              <SidebarItem label="React" inset={5} icon={<FiHash />} />
            </SidebarNavGroup>
          </SidebarNav>
        </SidebarOverflow>
        <SidebarOverlay zIndex="1" />
      </Sidebar>
    </Flex>
  )
}
