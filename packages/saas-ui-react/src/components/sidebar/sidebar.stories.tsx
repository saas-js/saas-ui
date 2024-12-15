import * as React from 'react'

import {
  Badge,
  Box,
  Breadcrumb,
  Collapsible,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  Portal,
  Skeleton as SkeletonPrimitive,
  type SkeletonProps,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SaasUIIcon } from '@saas-ui/assets'
import type { Meta, StoryObj } from '@storybook/react'
import { atom, useAtom } from 'jotai'
import {
  RiAddLine,
  RiArrowRightSFill,
  RiCloseLine,
  RiFolderFill,
  RiInbox2Fill,
  RiOrganizationChart,
  RiSearchLine,
  RiSideBarLine,
  RiSidebarFoldLine,
} from 'react-icons/ri'

import { AppShell } from '../app-shell/index.ts'
import { Sidebar } from './index.ts'

export interface SkeletonTextProps extends SkeletonProps {
  noOfLines?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    return (
      <SkeletonPrimitive ref={ref} variant="none" bg="bg.subtle" {...props} />
    )
  },
)

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
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

const modeAtom = atom<'flyout' | 'collapsible'>('collapsible')

function SidebarLayout(props: { children: React.ReactElement }) {
  const [mode, setMode] = useAtom(modeAtom)

  return (
    <Sidebar.Provider mode={mode}>
      <AppShell sidebar={props.children}>
        <Stack height="full" flex="1" borderLeftWidth="1px" boxShadow="sm">
          <HStack
            px="4"
            minH="12"
            alignItems="center"
            borderBottomWidth="1px"
            gap="2"
          >
            <Sidebar.Trigger asChild>
              <IconButton
                variant="ghost"
                aria-label="Toggle sidebar"
                _open={{
                  display: 'none',
                }}
                onClick={() =>
                  setMode(mode === 'flyout' ? 'collapsible' : mode)
                }
              >
                <RiSideBarLine />
              </IconButton>
            </Sidebar.Trigger>

            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link>Inbox</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.CurrentLink>Saas UI</Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </HStack>

          <Box flex="1" overflow="auto" px="4" py="4">
            <HStack gap="4">
              <Box flex="1">
                <Skeleton height="100px" />
                <SkeletonText noOfLines={6} />
              </Box>

              <Box flex="1">
                <Skeleton height="100px" />
                <SkeletonText noOfLines={6} />
              </Box>
            </HStack>
          </Box>
        </Stack>
      </AppShell>
    </Sidebar.Provider>
  )
}

export default {
  title: 'Components/Sidebar',
  parameters: { layout: 'fullscreen' },
  component: Sidebar.Root,
  decorators: [
    (Story) => (
      <SidebarLayout>
        <Story />
      </SidebarLayout>
    ),
  ],
} as Meta

function WorkspaceMenu() {
  return (
    <Sidebar.NavItem>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Sidebar.NavButton>
            <Flex
              boxSize="5"
              p="5px"
              rounded="full"
              bg="bg.inverted"
              alignItems="center"
              justifyContent="center"
            >
              <SaasUIIcon color="white" />
            </Flex>
            Saas.js
          </Sidebar.NavButton>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="account">Account</Menu.Item>
            <Menu.Item value="settings">Workspace settings</Menu.Item>
            <Menu.Separator />
            <Menu.Root>
              <Menu.TriggerItem>Switch workspace</Menu.TriggerItem>

              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="saasjs">Saas.js</Menu.Item>
                    <Menu.Item value="acme">ACME</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item value="create">Create new workspace</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Menu.Item value="signout">Sign out</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Sidebar.NavItem>
  )
}

type Story = StoryObj<typeof Sidebar.Root>

export const Default: Story = {
  render: (props) => {
    const [mode, setMode] = useAtom(modeAtom)

    return (
      <>
        <Sidebar.FlyoutTrigger />
        <Sidebar.Root {...props}>
          <Sidebar.Header direction="row">
            <WorkspaceMenu />
            <Spacer />
            <IconButton variant="ghost" rounded="full">
              <RiSearchLine />
            </IconButton>
            {mode === 'collapsible' && (
              <Sidebar.Trigger asChild>
                <IconButton
                  variant="ghost"
                  aria-label="Toggle sidebar"
                  rounded="full"
                >
                  <RiSidebarFoldLine />
                </IconButton>
              </Sidebar.Trigger>
            )}
          </Sidebar.Header>
          <Sidebar.Body flex="1" overflowY="auto">
            <Sidebar.Group>
              <Sidebar.GroupContent>
                <Sidebar.NavItem>
                  <Sidebar.NavButton active>
                    <RiInbox2Fill />
                    Inbox
                    <Spacer />
                    <Badge bg="none" px="2">
                      12
                    </Badge>
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
                <Sidebar.NavItem>
                  <Sidebar.NavButton>
                    <RiFolderFill />
                    Projects
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
                <Sidebar.NavItem>
                  <Sidebar.NavButton>
                    <RiOrganizationChart />
                    Workflows
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
              </Sidebar.GroupContent>
            </Sidebar.Group>

            <Collapsible.Root asChild defaultOpen>
              <Sidebar.Group>
                <Sidebar.GroupHeader>
                  <Collapsible.Trigger asChild>
                    <Sidebar.GroupTitle>
                      Favourites{' '}
                      <Icon
                        ms="1"
                        transition="transform"
                        _groupOpen={{ transform: 'rotate(90deg)' }}
                      >
                        <RiArrowRightSFill />
                      </Icon>
                    </Sidebar.GroupTitle>
                  </Collapsible.Trigger>

                  <Sidebar.GroupEndElement>
                    <IconButton
                      variant="ghost"
                      aria-label="Add to favourites"
                      size="xs"
                      opacity="0"
                      _groupHover={{ opacity: 0.6, _hover: { opacity: 1 } }}
                    >
                      <RiAddLine />
                    </IconButton>
                  </Sidebar.GroupEndElement>
                </Sidebar.GroupHeader>
                <Collapsible.Content>
                  <Sidebar.GroupContent>
                    <Sidebar.NavItem>
                      <Sidebar.NavButton>
                        <Text>🌟</Text>
                        Chakra v3
                        <Spacer />
                        <Sidebar.NavButtonEndElement
                          opacity="0"
                          _parentHover={{
                            opacity: 0.6,
                            _hover: { opacity: 1 },
                          }}
                        >
                          <IconButton
                            variant="ghost"
                            aria-label="Remove from favourites"
                            title="Remove from favourites"
                            size="xs"
                          >
                            <RiCloseLine />
                          </IconButton>
                        </Sidebar.NavButtonEndElement>
                      </Sidebar.NavButton>
                    </Sidebar.NavItem>
                    <Sidebar.NavItem>
                      <Sidebar.NavButton>
                        <Text>🎨</Text>
                        Design systems
                        <Spacer />
                        <Sidebar.NavButtonEndElement
                          opacity="0"
                          _parentHover={{
                            opacity: 0.6,
                            _hover: { opacity: 1 },
                          }}
                        >
                          <IconButton
                            variant="ghost"
                            aria-label="Remove from favourites"
                            title="Remove from favourites"
                            size="xs"
                          >
                            <RiCloseLine />
                          </IconButton>
                        </Sidebar.NavButtonEndElement>
                      </Sidebar.NavButton>
                    </Sidebar.NavItem>
                  </Sidebar.GroupContent>
                </Collapsible.Content>
              </Sidebar.Group>
            </Collapsible.Root>
          </Sidebar.Body>
          <Sidebar.Footer></Sidebar.Footer>

          <Sidebar.Track
            onClick={() =>
              setMode(mode === 'flyout' ? 'collapsible' : 'flyout')
            }
          />
        </Sidebar.Root>
        <Sidebar.Backdrop />
      </>
    )
  },
}

// export const WithLinks = Template.bind({})
// WithLinks.args = {
//   children: (
//     <>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavItem isActive>Home</NavItem>
//         <NavItem>Users</NavItem>
//         <NavItem>Settings</NavItem>
//       </SidebarSection>
//     </>
//   ),
// }

// export const WithFeatherIcons = Template.bind({})
// WithFeatherIcons.args = {
//   children: (
//     <>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavItem icon={<FiHome />} isActive>
//           Home
//         </NavItem>
//         <NavItem icon={<FiUsers />}>Users</NavItem>
//         <NavItem icon={<FiSettings />}>Settings</NavItem>
//       </SidebarSection>
//     </>
//   ),
// }

// export const WithFaIcons = Template.bind({})
// WithFaIcons.args = {
//   children: (
//     <>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavItem icon={<FaHome />} isActive>
//           Home
//         </NavItem>
//         <NavItem icon={<FaUsers />}>Users</NavItem>
//         <NavItem icon={<FaCog />}>Settings</NavItem>
//       </SidebarSection>
//     </>
//   ),
// }

// export const WithHorizontalNav = Template.bind({})
// WithHorizontalNav.args = {
//   children: (
//     <>
//       <SidebarSection ps="6" pe="4" direction="row">
//         <Logo width="24px" />
//         <Spacer />
//         <Menu>
//           <MenuButton as={IconButton} variant="ghost">
//             <PersonaAvatar presence="online" size="xs" />
//           </MenuButton>
//           <MenuList>
//             <MenuItem>Sign out</MenuItem>
//           </MenuList>
//         </Menu>
//       </SidebarSection>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavItem icon={<FiHome />} isActive>
//           Home
//         </NavItem>
//         <NavItem icon={<FiUsers />}>Users</NavItem>
//         <NavItem icon={<FiSettings />}>Settings</NavItem>
//       </SidebarSection>
//     </>
//   ),
// }

// export const WithCollapsibleGroup = Template.bind({})
// WithCollapsibleGroup.args = {
//   children: (
//     <>
//       <SidebarSection px="4" direction="row">
//         <Logo width="24px" />
//         <Spacer />
//         <Menu>
//           <MenuButton as={IconButton} variant="ghost">
//             <PersonaAvatar presence="online" size="xs" />
//           </MenuButton>
//           <MenuList>
//             <MenuItem>Sign out</MenuItem>
//           </MenuList>
//         </Menu>
//       </SidebarSection>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavGroup>
//           <NavItem icon={<FiHome />} isActive>
//             Home
//           </NavItem>
//           <NavItem icon={<FiUsers />}>Users</NavItem>
//           <NavItem icon={<FiSettings />}>Settings</NavItem>
//         </NavGroup>

//         <NavGroup title="Tags" isCollapsible>
//           <NavItem icon={<FiHash />}>Design system</NavItem>
//           <NavItem icon={<FiHash />}>Framework</NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             Chakra UI
//           </NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             React
//           </NavItem>
//         </NavGroup>
//       </SidebarSection>
//     </>
//   ),
// }

// const NavItemBadge = (props: BadgeProps) => (
//   <Badge bg="none" fontWeight="normal" rounded="md" ms="auto" {...props} />
// )

// export const WithBadge = Template.bind({})
// WithBadge.args = {
//   children: (
//     <>
//       <SidebarSection px="4" direction="row">
//         <Logo width="24px" />
//         <Spacer />
//         <Menu>
//           <MenuButton as={IconButton} variant="ghost">
//             <PersonaAvatar presence="online" size="xs" />
//           </MenuButton>
//           <MenuList>
//             <MenuItem>Sign out</MenuItem>
//           </MenuList>
//         </Menu>
//       </SidebarSection>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavGroup>
//           <NavItem icon={<FiHome />} isActive>
//             Home
//           </NavItem>
//           <NavItem icon={<FiUsers />}>Users</NavItem>
//           <NavItem icon={<FiSettings />}>Settings</NavItem>
//         </NavGroup>

//         <NavGroup title="Tags" isCollapsible>
//           <NavItem icon={<FiHash />}>
//             <Text>Design System</Text>
//             <NavItemBadge>1</NavItemBadge>
//           </NavItem>
//           <NavItem icon={<FiHash />}>Framework</NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             <Text>Chakra UI</Text>
//             <NavItemBadge>32</NavItemBadge>
//           </NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             <Text>React</Text>
//             <NavItemBadge>100</NavItemBadge>
//           </NavItem>
//         </NavGroup>
//       </SidebarSection>
//     </>
//   ),
// }

// export const WithSubtleLinks = Template.bind({})
// WithSubtleLinks.args = {
//   children: (
//     <>
//       <SidebarSection px="4" direction="row">
//         <Logo width="24px" />
//         <Spacer />
//         <Menu>
//           <MenuButton as={IconButton} variant="ghost">
//             <PersonaAvatar presence="online" size="xs" />
//           </MenuButton>
//           <MenuList>
//             <MenuItem>Sign out</MenuItem>
//           </MenuList>
//         </Menu>
//       </SidebarSection>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavGroup>
//           <NavItem variant="subtle" icon={<FiHome />} isActive>
//             Home
//           </NavItem>
//           <NavItem variant="subtle" icon={<FiUsers />}>
//             Users
//           </NavItem>
//           <NavItem variant="subtle" icon={<FiSettings />}>
//             Settings
//           </NavItem>
//         </NavGroup>

//         <NavGroup title="Tags" isCollapsible>
//           <NavItem icon={<FiHash />}>Design system</NavItem>
//           <NavItem icon={<FiHash />}>Framework</NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             Chakra UI
//           </NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             React
//           </NavItem>
//         </NavGroup>
//       </SidebarSection>
//     </>
//   ),
// }

// export const WithSolidLinks = Template.bind({})
// WithSolidLinks.args = {
//   children: (
//     <>
//       <SidebarSection px="4" direction="row">
//         <Logo width="24px" />
//         <Spacer />
//         <Menu>
//           <MenuButton as={IconButton} variant="ghost">
//             <PersonaAvatar presence="online" size="xs" />
//           </MenuButton>
//           <MenuList>
//             <MenuItem>Sign out</MenuItem>
//           </MenuList>
//         </Menu>
//       </SidebarSection>
//       <SidebarSection flex="1" overflowY="auto">
//         <NavGroup>
//           <NavItem icon={<FiHome />} isActive>
//             Home
//           </NavItem>
//           <NavItem icon={<FiUsers />}>Users</NavItem>
//           <NavItem icon={<FiSettings />}>Settings</NavItem>
//         </NavGroup>

//         <NavGroup title="Tags" isCollapsible>
//           <NavItem icon={<FiHash />}>Design system</NavItem>
//           <NavItem icon={<FiHash />}>Framework</NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             Chakra UI
//           </NavItem>
//           <NavItem inset={5} icon={<FiHash />}>
//             React
//           </NavItem>
//         </NavGroup>
//       </SidebarSection>
//     </>
//   ),
// }

// export const VariantCompact = Template.bind({})
// VariantCompact.args = {
//   variant: 'compact',
//   children: (
//     <>
//       <SidebarSection alignItems="center">
//         <Logo width="24px" color="primary.500" />
//       </SidebarSection>
//       <SidebarSection>
//         <Nav>
//           <NavItem icon={<FiHome size="1.2em" />} isActive>
//             Home
//           </NavItem>
//           <NavItem icon={<FiUsers size="1.2em" />}>Users</NavItem>
//           <NavItem icon={<FiSettings size="1.2em" />}>Settings</NavItem>
//         </Nav>
//       </SidebarSection>
//     </>
//   ),
// }

// export const VariantCompactColor = Template.bind({})
// VariantCompactColor.args = {
//   variant: 'compact',
//   colorScheme: 'purple',
//   children: (
//     <>
//       <SidebarSection alignItems="center" px="2">
//         <Logo width="24px" color="white" />
//       </SidebarSection>
//       <SidebarSection px="3">
//         <Nav>
//           <NavItem icon={<FiHome size="1.2em" color="white" />} isActive>
//             Home
//           </NavItem>
//           <NavItem icon={<FiUsers size="1.2em" color="white" />}>Users</NavItem>
//           <NavItem icon={<FiSettings size="1.2em" color="white" />}>
//             Settings
//           </NavItem>
//         </Nav>
//       </SidebarSection>
//     </>
//   ),
// }

// export const VariantCompactResponsive = Template.bind({})
// VariantCompactResponsive.args = {
//   variant: { base: 'compact' },
//   toggleBreakpoint: false,
//   colorScheme: 'purple',
//   children: (
//     <>
//       <SidebarSection alignItems="center">
//         <Logo width="24px" color="white" />
//       </SidebarSection>
//       <SidebarSection>
//         <NavGroup>
//           <NavItem
//             icon={<FiHome size="1.2em" color="whiteAlpha.800" />}
//             color="white"
//             size="sm"
//             isActive
//           >
//             Home
//           </NavItem>
//           <NavItem
//             icon={<FiUsers size="1.2em" color="whiteAlpha.800" />}
//             color="white"
//             size="sm"
//           >
//             Users
//           </NavItem>
//           <NavItem
//             icon={<FiSettings size="1.2em" color="whiteAlpha.800" />}
//             color="white"
//             size="sm"
//           >
//             Settings
//           </NavItem>
//         </NavGroup>
//       </SidebarSection>
//     </>
//   ),
// }

// export const VariantCompactNavGroup = Template.bind({})
// VariantCompactNavGroup.args = {
//   variant: 'compact',
//   colorScheme: 'purple',
//   children: (
//     <>
//       <SidebarSection alignItems="center">
//         <Logo width="24px" color="white" />
//       </SidebarSection>
//       <SidebarSection>
//         <NavGroup title="Users">
//           <NavItem
//             icon={<FiHome size="1.2em" color="whiteAlpha.800" />}
//             color="white"
//             size="sm"
//             isActive
//           >
//             Home
//           </NavItem>
//           <NavItem
//             icon={<FiUsers size="1.2em" color="whiteAlpha.800" />}
//             color="white"
//             size="sm"
//           >
//             Users
//           </NavItem>
//           <NavItem
//             icon={<FiSettings size="1.2em" color="whiteAlpha.800" />}
//             color="white"
//             size="sm"
//           >
//             Settings
//           </NavItem>
//         </NavGroup>
//       </SidebarSection>
//     </>
//   ),
// }

// export const DoubleSidebar = () => {
//   const disclosure = useDisclosure({
//     defaultIsOpen: true,
//   })

//   return (
//     <AppShell
//       sidebar={
//         <Flex alignItems="stretch" overflow="hidden" height="full">
//           <DarkMode>
//             <Sidebar
//               variant="compact"
//               colorScheme="purple"
//               border="0"
//               zIndex="3"
//               position="relative"
//             >
//               <SidebarSection alignItems="center">
//                 <Logo width="24px" color="white" mb="1" />
//               </SidebarSection>

//               <SidebarSection flex="1">
//                 <NavGroup>
//                   <NavItem
//                     icon={<FiUsers size="1.2em" />}
//                     isActive
//                     onClick={(e) => {
//                       e.preventDefault()
//                       disclosure.onToggle()
//                     }}
//                   >
//                     Users
//                   </NavItem>
//                   <NavItem
//                     icon={<FiSettings size="1.2em" />}
//                     onClick={(e) => {
//                       e.preventDefault()
//                       disclosure.onClose()
//                     }}
//                   >
//                     Settings
//                   </NavItem>
//                 </NavGroup>

//                 <Spacer />

//                 <Menu>
//                   <MenuButton as={Button} variant="ghost" px="0">
//                     <PersonaAvatar presence="online" size="xs" />
//                   </MenuButton>
//                   <MenuList>
//                     <MenuItem>Sign out</MenuItem>
//                   </MenuList>
//                 </Menu>
//               </SidebarSection>
//             </Sidebar>
//           </DarkMode>
//           <Flex position="relative">
//             <Sidebar
//               isOpen={disclosure.isOpen}
//               onClose={disclosure.onClose}
//               onOpen={disclosure.onOpen}
//               toggleBreakpoint={false}
//               zIndex={2}
//               height="100%"
//             >
//               <SidebarSection px="5" direction="row">
//                 <Heading size="sm" py="2">
//                   Users
//                 </Heading>
//                 <Spacer />
//               </SidebarSection>

//               <SidebarSection flex="1" overflowY="auto">
//                 <NavGroup>
//                   <NavItem icon={<FiHome />} isActive>
//                     All users
//                   </NavItem>
//                   <NavItem icon={<FiStar />}>Favourite users</NavItem>
//                 </NavGroup>
//                 <NavGroup title="Tags" isCollapsible>
//                   <NavItem icon={<FiHash />}>Design system</NavItem>
//                   <NavItem icon={<FiHash />}>Framework</NavItem>
//                   <NavItem inset={5} icon={<FiHash />}>
//                     Chakra UI
//                   </NavItem>
//                   <NavItem inset={5} icon={<FiHash />}>
//                     React
//                   </NavItem>
//                 </NavGroup>
//               </SidebarSection>
//               <SidebarOverlay zIndex="1" />
//             </Sidebar>
//           </Flex>
//         </Flex>
//       }
//     >
//       <Box />
//     </AppShell>
//   )
// }

// export function CustomToggle() {
//   const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
//     defaultIsOpen: true,
//   })

//   return (
//     <>
//       <Sidebar
//         isOpen={isOpen}
//         onOpen={onOpen}
//         onClose={onClose}
//         toggleBreakpoint={false}
//         spacing="2"
//         height="100vh"
//       >
//         <SidebarSection direction="row">
//           <Box h="8">
//             <IconButton
//               onClick={onToggle}
//               position="fixed"
//               left="3"
//               zIndex="modal"
//               aria-label={isOpen ? 'Close' : 'Open'}
//               icon={isOpen ? <FiSquare /> : <FiSidebar />}
//             />
//           </Box>
//         </SidebarSection>

//         <SidebarSection flex="1" overflowY="auto">
//           <NavGroup>
//             <NavItem icon={<FiHome />} isActive>
//               All users
//             </NavItem>
//             <NavItem icon={<FiStar />}>Favourite users</NavItem>
//           </NavGroup>
//           <NavGroup title="Tags" isCollapsible>
//             <NavItem icon={<FiHash />}>Design system</NavItem>
//             <NavItem icon={<FiHash />}>Framework</NavItem>
//             <NavItem inset={5} icon={<FiHash />}>
//               Chakra UI
//             </NavItem>
//             <NavItem inset={5} icon={<FiHash />}>
//               React
//             </NavItem>
//           </NavGroup>
//         </SidebarSection>
//         <SidebarOverlay zIndex="1" />
//       </Sidebar>
//     </>
//   )
// }

// export function ToggleVariant() {
//   const { isOpen, onToggle } = useDisclosure({
//     defaultIsOpen: true,
//   })

//   return (
//     <AppShell
//       sidebar={
//         <Sidebar
//           toggleBreakpoint={false}
//           variant={isOpen ? 'default' : 'compact'}
//           transition="width"
//           transitionDuration="normal"
//           width={isOpen ? '280px' : '14'}
//           minWidth="auto"
//         >
//           <SidebarSection direction={isOpen ? 'row' : 'column'} height="32px">
//             <Logo width="24px" mb="1" display={isOpen ? 'block' : 'none'} />
//             <Spacer />
//             <IconButton
//               onClick={onToggle}
//               variant="ghost"
//               size="sm"
//               icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
//               aria-label="Toggle Sidebar"
//             />
//           </SidebarSection>

//           <SidebarSection flex="1" overflowY="auto" overflowX="hidden">
//             <NavGroup>
//               <NavItem icon={<FiHome size="1.1em" />} isActive>
//                 All users
//               </NavItem>
//               <NavItem icon={<FiStar size="1.1em" />}>Favourite users</NavItem>
//             </NavGroup>
//           </SidebarSection>
//           <SidebarOverlay zIndex="1" />
//         </Sidebar>
//       }
//     >
//       <Box />
//     </AppShell>
//   )
// }
