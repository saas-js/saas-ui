import React, { type HTMLProps, forwardRef } from 'react'

import {
  Box,
  Button,
  Container,
  Drawer,
  HStack,
  Menu,
  Skeleton as SkeletonPrimitive,
  type SkeletonProps,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { SaasUIIcon } from '@saas-ui/assets'
import { Meta, StoryObj } from '@storybook/react'
import { LuMenu as FiMenu, LuX as FiX, LuX } from 'react-icons/lu'

import { AppShell } from '../app-shell'
import { Persona } from '../persona'
import { SearchInput } from '../search-input'
import { Navbar } from './index.ts'

export default {
  title: 'Components/Navbar',
  parameters: {
    layout: 'fullscreen',
  },
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
} as Meta

type Story = StoryObj<typeof Navbar.Root>

const AppLogo = () => <SaasUIIcon width="28px" height="28px" />

export interface SkeletonTextProps extends SkeletonProps {
  noOfLines?: number
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    return (
      <SkeletonPrimitive ref={ref} variant="none" bg="bg.subtle" {...props} />
    )
  },
)

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, ...rest } = props
    return (
      <Stack gap={gap} width="full" ref={ref}>
        {Array.from({ length: noOfLines }).map((_, index) => (
          <SkeletonPrimitive
            height="4"
            key={index}
            _last={{ maxW: '80%' }}
            variant="none"
            bg="bg.subtle"
            {...rest}
          />
        ))}
      </Stack>
    )
  },
)

const App = React.forwardRef(({ children, navbar }: any, ref: any) => {
  return (
    <AppShell header={navbar}>
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
          <Stack gap="4" mb="14">
            <Skeleton width="100px" height="24px" />
          </Stack>
          <Stack direction="row" gap="8" mb="14">
            <Stack gap="4" flex="1">
              <Skeleton width="100px" height="20px" />
              <SkeletonText />
            </Stack>
            <Stack gap="4" flex="1">
              <Skeleton width="100px" height="20px" />
              <SkeletonText />
            </Stack>
          </Stack>
          <Stack direction="row" gap="8">
            <Stack gap="4" flex="1">
              <Skeleton width="100px" height="20px" />
              <SkeletonText />
            </Stack>
            <Stack gap="4" flex="1">
              <Skeleton width="100px" height="20px" />
              <SkeletonText />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </AppShell>
  )
})

App.displayName = 'App'

const Template: Story['render'] = (args) => {
  const parentRef = React.useRef(null)

  return (
    <App ref={parentRef}>
      <Navbar.Root {...args} parentRef={parentRef}>
        <Navbar.Content>
          <Navbar.Brand>
            <AppLogo />
          </Navbar.Brand>
          <HStack display={{ base: 'hidden', md: 'flex' }}>
            <Navbar.Item>
              <Navbar.Link active href="#">
                Features
              </Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Navbar.Link href="#">Customers</Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Navbar.Link href="#">Integrations</Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Navbar.Link href="#">Pricing</Navbar.Link>
            </Navbar.Item>
          </HStack>
          <HStack justifyContent="end" gap="2">
            <Navbar.Item>
              <Navbar.Link href="#">Login</Navbar.Link>
            </Navbar.Item>
            <Button variant="solid">Sign Up</Button>
          </HStack>
        </Navbar.Content>
      </Navbar.Root>
    </App>
  )
}

export const Default: Story = {
  render: Template,
}

// const WithMenuTemplate = (args: Navbar.RootProps) => {
//   const parentRef = React.useRef(null)
//   const mobileNav = useDisclosure()
//   const menuItems = ['Features', 'Customers', 'Integrations', 'Pricing']

//   return (
//     <App ref={parentRef}>
//       <Navbar.Root parentRef={parentRef} position="sticky" {...args}>
//         <Navbar.Content>
//           <Navbar.Brand>
//             <AppLogo />
//           </Navbar.Brand>

//           <HStack display={{ base: 'none', sm: 'flex' }}>
//             <Navbar.Item asChild>
//               <Link href="#">Features</Link>
//             </Navbar.Item>
//             <Navbar.Item active asChild>
//               <Link href="#">Customers</Link>
//             </Navbar.Item>
//             <Navbar.Item asChild>
//               <Link href="#">Integrations</Link>
//             </Navbar.Item>
//             <Navbar.Item asChild>
//               <Link href="#">Pricing</Link>
//             </Navbar.Item>
//           </HStack>

//           <HStack justifyContent="end" gap="2">
//             <Navbar.Item asChild>
//               <Link href="#">Login</Link>
//             </Navbar.Item>

//             <Button variant="solid" asChild>
//               <Link href="#">Sign Up</Link>
//             </Button>

//             <Button
//               aria-label={mobileNav.open ? 'Close menu' : 'Open menu'}
//               display={{ base: 'inline-flex', sm: 'none' }}
//               onClick={mobileNav.onToggle}
//               variant="ghost"
//             >
//               {mobileNav.open ? <FiX /> : <FiMenu />}
//             </Button>
//           </HStack>
//         </Navbar.Content>

//         <Drawer.Root open={mobileNav.open} onOpenChange={mobileNav.onToggle}>
//           <Drawer.Backdrop />
//           <Drawer.Content>
//             <Drawer.Header>
//               <Drawer.CloseTrigger>
//                 <Button variant="ghost">
//                   <LuX />
//                 </Button>
//               </Drawer.CloseTrigger>
//             </Drawer.Header>
//             <Drawer.Body fontSize="md">
//               <Stack direction="column" gap="4">
//                 {menuItems.map((item, index) => (
//                   <Navbar.Item key={`${item}-${index}`} width="full" asChild>
//                     <Link href="#">{item}</Link>
//                   </Navbar.Item>
//                 ))}
//               </Stack>
//             </Drawer.Body>
//           </Drawer.Content>
//         </Drawer.Root>
//       </Navbar.Root>
//     </App>
//   )
// }

// const WithUserMenuTemplate = (args: Navbar.RootProps) => {
//   return (
//     <App>
//       <Navbar.Root {...args}>
//         <Navbar.Content>
//           <Navbar.Brand>
//             <AppLogo />
//           </Navbar.Brand>

//           <HStack display={{ base: 'hidden', sm: 'flex' }}>
//             <Navbar.Item asChild active>
//               <Link href="#">Inbox</Link>
//             </Navbar.Item>
//             <Navbar.Item asChild>
//               <Link href="#">Contacts</Link>
//             </Navbar.Item>
//             <Navbar.Item asChild>
//               <Link href="#">Tasks</Link>
//             </Navbar.Item>
//           </HStack>

//           <Box>
//             <Menu.Root>
//               <Menu.Trigger>
//                 <Persona.Avatar
//                   src="/showcase-avatar.jpg"
//                   name="Beatriz"
//                   size="xs"
//                 >
//                   <Persona.PresenceBadge presence="online" />
//                 </Persona.Avatar>
//               </Menu.Trigger>
//               <Menu.Content>
//                 <Menu.ItemGroup title="beatriz@saas-ui.dev">
//                   <Menu.Item value="profile" asChild>
//                     <Link href="#">Profile</Link>
//                   </Menu.Item>
//                   <Menu.Item value="settings" asChild>
//                     <Link href="#">Settings</Link>
//                   </Menu.Item>
//                   <Menu.Item value="help" asChild>
//                     <Link href="#">Help & feedback</Link>
//                   </Menu.Item>
//                 </Menu.ItemGroup>
//                 <Menu.Separator />
//                 <Menu.Item value="logout" asChild>
//                   <Link href="#">Log out</Link>
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Root>
//           </Box>
//         </Navbar.Content>
//       </Navbar.Root>
//     </App>
//   )
// }

// const WithSearchInputTemplate = (args: Navbar.RootProps) => {
//   return (
//     <App>
//       <Navbar.Root {...args}>
//         <Navbar.Content>
//           <Navbar.Brand>
//             <AppLogo />
//           </Navbar.Brand>

//           <HStack display={{ base: 'hidden', sm: 'flex' }} gap="1">
//             <Navbar.Item asChild>
//               <Link href="#">Inbox</Link>
//             </Navbar.Item>
//             <Navbar.Item active asChild>
//               <Link href="#">Contacts</Link>
//             </Navbar.Item>
//             <Navbar.Item asChild>
//               <Link href="#">Tasks</Link>
//             </Navbar.Item>
//           </HStack>

//           <HStack gap="4">
//             <Box width="180px">
//               <SearchInput size="sm" />
//             </Box>
//             <Menu.Root>
//               <Menu.Trigger>
//                 <Persona.Avatar
//                   src="/showcase-avatar.jpg"
//                   name="Beatriz"
//                   size="xs"
//                 >
//                   <Persona.PresenceBadge presence="online" />
//                 </Persona.Avatar>
//               </Menu.Trigger>
//               <Menu.Content>
//                 <Menu.ItemGroup title="beatriz@saas-ui.dev">
//                   <Menu.Item value="profile" asChild>
//                     <Link href="#">Profile</Link>
//                   </Menu.Item>
//                   <Menu.Item value="settings" asChild>
//                     <Link href="#">Settings</Link>
//                   </Menu.Item>
//                   <Menu.Item value="help" asChild>
//                     <Link href="#">Help & feedback</Link>
//                   </Menu.Item>
//                 </Menu.ItemGroup>
//                 <Menu.Separator />
//                 <Menu.Item value="logout" asChild>
//                   <Link href="#">Log out</Link>
//                 </Menu.Item>
//               </Menu.Content>
//             </Menu.Root>
//           </HStack>
//         </Navbar.Content>
//       </Navbar.Root>
//     </App>
//   )
// }

// export const Static: Story = {
//   render: Template,

//   args: {
//     position: 'static',
//   },
// }

// export const Sticky: Story = {
//   render: Template,

//   args: {
//     position: 'sticky',
//   },
// }

// export const Border: Story = {
//   render: Template,

//   args: {
//     position: 'sticky',
//     borderBottomWidth: '1px',
//   },
// }

// export const BlurredBg: Story = {
//   render: Template,

//   args: {
//     position: 'sticky',
//     borderBottomWidth: '1px',
//     background: 'transparent',
//     backdropFilter: 'blur(4px)',
//   },
// }

// export const Shadow: Story = {
//   render: Template,

//   args: {
//     position: 'sticky',
//     background: 'transparent',
//     backdropFilter: 'blur(4px)',
//     css: {
//       '&:not([data-at-top])': {
//         borderBottomWidth: '1px',
//         boxShadow: 'lg',
//       },
//     },
//   },
// }

// export const HideOnScroll: Story = {
//   render: Template,

//   args: {
//     position: 'sticky',
//     shouldHideOnScroll: true,
//   },
// }

// export const WithMenu: Story = {
//   render: WithMenuTemplate,
// }

// export const WithUserMenu: Story = {
//   render: WithUserMenuTemplate,
// }

// export const WithSearchInput: Story = {
//   render: WithSearchInputTemplate,
// }
