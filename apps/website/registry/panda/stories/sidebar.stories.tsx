import { HStack } from '@saas-ui/panda-preset/jsx'
import type { Meta, StoryObj } from '@storybook/react'
import 'react-icons'
import { IoMdMenu } from 'react-icons/io'
import {
  RiAddLine,
  RiCloseLine,
  RiFolderFill,
  RiInbox2Fill,
  RiOrganizationChart,
  RiSearchLine,
  RiSidebarFoldLine,
} from 'react-icons/ri'
import { Badge, Button, ButtonProps, Sidebar, Text } from 'src/components'

export default {
  title: 'Components/Sidebar',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

type Story = StoryObj<typeof Sidebar.Root>

function IconButton(props: ButtonProps) {
  return (
    <Button
      p="0!"
      aspectRatio="square"
      w="fit-content"
      variant="ghost"
      {...props}
    />
  )
}

export const Default: Story = {
  render: (props) => {
    return (
      <Sidebar.Provider>
        <Sidebar.Trigger>
          <Button
            display={{ base: 'flex', md: 'none' }}
            p={'0!'}
            aspectRatio={'square'}
            w={'fit-content'}
            variant={'ghost'}
          >
            <IoMdMenu />
          </Button>
        </Sidebar.Trigger>
        <Sidebar.Root {...props}>
          <Sidebar.Header
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text>Sidebar</Text>
            {/* <WorkspaceMenu /> */}
            {/* <Spacer /> */}
            <HStack>
              <Button
                p="0!"
                aspectRatio="square"
                w="fit-content"
                variant="ghost"
                rounded="full"
              >
                <RiSearchLine />
              </Button>
              <Sidebar.Trigger asChild>
                <Button
                  display={{ base: 'flex', md: 'none' }}
                  variant="ghost"
                  aria-label="Toggle sidebar"
                  p="0!"
                  aspectRatio="square"
                  w="fit-content"
                  rounded="full"
                >
                  <RiSidebarFoldLine />
                </Button>
              </Sidebar.Trigger>
            </HStack>
          </Sidebar.Header>
          <Sidebar.Body flex="1" overflowY="auto">
            <Sidebar.Group>
              <Sidebar.GroupContent>
                <Sidebar.NavItem>
                  <Sidebar.NavButton justifyContent="space-between" active>
                    <HStack>
                      <RiInbox2Fill />
                      Inbox
                    </HStack>
                    <Badge px="2">12</Badge>
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

            <Sidebar.Group>
              <Sidebar.GroupHeader>
                <Sidebar.GroupTitle>Favorites</Sidebar.GroupTitle>

                <Sidebar.GroupEndElement>
                  <IconButton
                    variant="ghost"
                    aria-label="Add to favorites"
                    size="xs"
                    opacity="0"
                    _groupHover={{ opacity: 0.6, _hover: { opacity: 1 } }}
                  >
                    <RiAddLine />
                  </IconButton>
                </Sidebar.GroupEndElement>
              </Sidebar.GroupHeader>
              <Sidebar.GroupContent>
                <Sidebar.NavItem>
                  <Sidebar.NavButton justifyContent="space-between">
                    🌟 Chakra v3
                    {/* <Spacer /> */}
                    {/* <Sidebar.NavButtonEndElement
                          opacity="0"
                          _parentHover={{
                            opacity: 0.6,
                            _hover: { opacity: 1 },
                          }}
                        > */}
                    <IconButton
                      variant="ghost"
                      aria-label="Remove from favorites"
                      title="Remove from favorites"
                      size="xs"
                    >
                      <RiCloseLine />
                    </IconButton>
                    {/* </Sidebar.NavButtonEndElement> */}
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
                <Sidebar.NavItem>
                  <Sidebar.NavButton justifyContent="space-between">
                    🎨 Design systems
                    {/* <Spacer /> */}
                    {/* <Sidebar.NavButtonEndElement
                          opacity="0"
                          _parentHover={{
                            opacity: 0.6,
                            _hover: { opacity: 1 },
                          }}
                        > */}
                    <IconButton
                      variant="ghost"
                      aria-label="Remove from favorites"
                      title="Remove from favorites"
                      size="xs"
                    >
                      <RiCloseLine />
                    </IconButton>
                    {/* </Sidebar.NavButtonEndElement> */}
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Body>
          <Sidebar.Footer></Sidebar.Footer>

          {/* <Sidebar.Track
            onClick={() =>
              setMode(mode === 'flyout' ? 'collapsible' : 'flyout')
            }
          >
            <Button>Track</Button>
          </Sidebar.Track> */}
        </Sidebar.Root>
        <Sidebar.Backdrop />
      </Sidebar.Provider>
    )
  },
}
