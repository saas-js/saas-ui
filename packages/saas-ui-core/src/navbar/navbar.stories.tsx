import React from 'react'
import { Meta } from '@storybook/react'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  MenuGroup,
  MenuDivider,
  Box,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'

import { AppShell } from '../app-shell'
import { PersonaAvatar } from '../persona'
import { SearchInput } from '../search-input'

import { FiMenu, FiX } from 'react-icons/fi'

import SaasUILogo from '../sidebar/saas-ui-glyph'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
  NavbarProps,
} from '.'

export default {
  title: 'Components/Layout/Navbar',
  component: Navbar,
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: ['static', 'fixed'],
    },
    maxWidth: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
  decorators: [(Story) => <Story />],
} as Meta<typeof Navbar>

const AppLogo = () => <SaasUILogo width="28px" height="28px" />

const App = React.forwardRef(({ children, navbar }: any, ref: any) => {
  return (
    <AppShell navbar={navbar} fontSize="md">
      <Box ref={ref} height="100%" width="100%" overflowY="auto">
        {children}
        <Container
          maxW="container.xl"
          pt="8"
          px="8"
          display="flex"
          flexDirection="column"
          margin="0 auto"
        >
          <Stack spacing="4" mb="14">
            <Skeleton width="100px" height="24px" speed={0} />
            <SkeletonText speed={0} />
          </Stack>
          <Stack direction="row" spacing="8" mb="14">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="8">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </AppShell>
  )
})

App.displayName = 'App'

const Template = (args: NavbarProps) => {
  const parentRef = React.useRef(null)

  return (
    <App ref={parentRef}>
      <Navbar {...args} parentRef={parentRef}>
        <NavbarBrand>
          <AppLogo />
        </NavbarBrand>
        <NavbarContent display={{ base: 'hidden', md: 'flex' }}>
          <NavbarItem>
            <NavbarLink href="#">Features</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink isActive href="#">
              Customers
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Integrations
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Pricing
            </NavbarLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justifyContent="end" spacing="2">
          <NavbarItem>
            <NavbarLink href="#">Login</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <Button variant="primary">Sign Up</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </App>
  )
}

const WithMenuTemplate = (args: NavbarProps) => {
  const parentRef = React.useRef(null)

  const mobileNav = useDisclosure()

  const menuItems = ['Features', 'Customers', 'Integrations', 'Pricing']

  return (
    <App ref={parentRef}>
      <Navbar parentRef={parentRef} position="sticky" {...args}>
        <NavbarBrand>
          <AppLogo />
        </NavbarBrand>

        <NavbarContent display={{ base: 'none', sm: 'flex' }}>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Features
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink isActive href="#">
              Customers
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Integrations
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Pricing
            </NavbarLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justifyContent="end" spacing="2">
          <NavbarItem>
            <NavbarLink href="#">Login</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <Button variant="primary">Sign Up</Button>
          </NavbarItem>
          <Button
            aria-label={mobileNav.isOpen ? 'Close menu' : 'Open menu'}
            display={{ base: 'inline-flex', sm: 'none' }}
            onClick={mobileNav.onToggle}
            variant="ghost"
          >
            {mobileNav.isOpen ? <FiX /> : <FiMenu />}
          </Button>
        </NavbarContent>
        <Drawer {...mobileNav}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody fontSize="md">
              <NavbarContent flexDirection="column" justifyContent="stretch">
                {menuItems.map((item, index) => (
                  <NavbarItem key={`${item}-${index}`} width="full">
                    <NavbarLink href="#" width="full" justifyContent="start">
                      {item}
                    </NavbarLink>
                  </NavbarItem>
                ))}
              </NavbarContent>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Navbar>
    </App>
  )
}

const WithUserMenuTemplate = (args: NavbarProps) => {
  return (
    <App>
      <Navbar {...args}>
        <NavbarBrand>
          <AppLogo />
        </NavbarBrand>
        <NavbarContent display={{ base: 'hidden', sm: 'flex' }}>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Inbox
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink isActive color="secondary" href="#">
              Contacts
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Tasks
            </NavbarLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justifyContent="end">
          <Menu>
            <MenuButton>
              <PersonaAvatar
                src="/showcase-avatar.jpg"
                name="Beatriz"
                size="xs"
                presence="online"
              />
            </MenuButton>
            <MenuList>
              <MenuGroup title="beatriz@saas-ui.dev">
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Help &amp; feedback</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        </NavbarContent>
      </Navbar>
    </App>
  )
}

const WithSearchInputTemplate = (args: NavbarProps) => {
  return (
    <App>
      <Navbar {...args}>
        <NavbarBrand>
          <AppLogo />
        </NavbarBrand>
        <NavbarContent display={{ base: 'hidden', sm: 'flex' }}>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Inbox
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink isActive color="secondary" href="#">
              Contacts
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink color="foreground" href="#">
              Tasks
            </NavbarLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justifyContent="end" spacing="4">
          <Box width="180px">
            <SearchInput size="sm" />
          </Box>
          <Menu>
            <MenuButton>
              <PersonaAvatar
                src="/showcase-avatar.jpg"
                name="Beatriz"
                size="xs"
                presence="online"
              />
            </MenuButton>
            <MenuList>
              <MenuGroup title="beatriz@saas-ui.dev">
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Help &amp; feedback</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        </NavbarContent>
      </Navbar>
    </App>
  )
}

export const Static = {
  render: Template,

  args: {
    position: 'static',
  },
}

export const Sticky = {
  render: Template,

  args: {
    position: 'sticky',
  },
}

export const Border = {
  render: Template,

  args: {
    position: 'sticky',
    borderBottomWidth: '1px',
  },
}

export const BlurredBg = {
  render: Template,

  args: {
    position: 'sticky',
    borderBottomWidth: '1px',
    background: 'transparent',
    backdropFilter: 'blur(4px)',
  },
}

export const Shadow = {
  render: Template,

  args: {
    position: 'sticky',
    borderBottomWidth: '1px',
    background: 'transparent',
    backdropFilter: 'blur(4px)',
    boxShadow: 'lg',
  },
}

export const HideOnScroll = {
  render: Template,

  args: {
    position: 'sticky',
    shouldHideOnScroll: true,
  },
}

export const WithMenu = {
  render: WithMenuTemplate,
}

export const WithUserMenu = {
  render: WithUserMenuTemplate,
}

export const WithSearchInput = {
  render: WithSearchInputTemplate,
}
