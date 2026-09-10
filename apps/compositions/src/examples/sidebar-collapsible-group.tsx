'use client'

import { Collapsible, Icon } from '@chakra-ui/react'
import { IconButton } from 'compositions/ui/icon-button'
import { Sidebar } from 'compositions/ui/sidebar'
import {
  LuChevronRight,
  LuFolder,
  LuHouse,
  LuInbox,
  LuPlus,
} from 'react-icons/lu'

export const SidebarCollapsibleGroup = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Root width="240px" minHeight="400px">
        <Sidebar.Body>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.NavItem>
                <Sidebar.NavButton active>
                  <LuHouse /> Dashboard
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuInbox /> Inbox
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Collapsible.Root asChild defaultOpen>
            <Sidebar.Group>
              <Sidebar.GroupHeader>
                <Collapsible.Trigger asChild>
                  <Sidebar.GroupTitle>
                    Projects
                    <Icon
                      ms="1"
                      transition="transform"
                      _groupOpen={{ transform: 'rotate(90deg)' }}
                    >
                      <LuChevronRight />
                    </Icon>
                  </Sidebar.GroupTitle>
                </Collapsible.Trigger>
                <Sidebar.GroupEndElement>
                  <IconButton
                    variant="ghost"
                    aria-label="Create project"
                    size="xs"
                    opacity="0"
                    _groupHover={{ opacity: 0.6, _hover: { opacity: 1 } }}
                  >
                    <LuPlus />
                  </IconButton>
                </Sidebar.GroupEndElement>
              </Sidebar.GroupHeader>
              <Collapsible.Content>
                <Sidebar.GroupContent>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <LuFolder /> Website redesign
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <LuFolder /> Mobile app
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <LuFolder /> Q3 marketing
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                </Sidebar.GroupContent>
              </Collapsible.Content>
            </Sidebar.Group>
          </Collapsible.Root>
        </Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}
