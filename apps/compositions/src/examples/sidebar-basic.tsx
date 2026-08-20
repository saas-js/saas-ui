'use client'

import { Badge, Spacer } from '@chakra-ui/react'
import { SaasUIIcon } from '@saas-ui/assets'
import { IconButton } from 'compositions/ui/icon-button'
import { Menu } from 'compositions/ui/menu'
import { Persona } from 'compositions/ui/persona'
import { Sidebar } from 'compositions/ui/sidebar'
import {
  LuFolder,
  LuHouse,
  LuInbox,
  LuSettings,
  LuUsers,
} from 'react-icons/lu'

export const SidebarBasic = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Root width="240px" minHeight="480px">
        <Sidebar.Header ps="4">
          <SaasUIIcon width="24px" color="fg" />
          <Spacer />
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton variant="ghost" size="sm" aria-label="User menu">
                <Persona.Root presence="online">
                  <Persona.Avatar size="xs" src="/img/avatars/1.png" />
                </Persona.Root>
              </IconButton>
            </Menu.Trigger>
            <Menu.Content>
              <Menu.Item value="signout">Sign out</Menu.Item>
            </Menu.Content>
          </Menu.Root>
        </Sidebar.Header>
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
                  <Spacer />
                  <Badge variant="subtle">12</Badge>
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuUsers /> Contacts
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupHeader>
              <Sidebar.GroupTitle>Projects</Sidebar.GroupTitle>
            </Sidebar.GroupHeader>
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
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Spacer />
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuSettings /> Settings
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}
