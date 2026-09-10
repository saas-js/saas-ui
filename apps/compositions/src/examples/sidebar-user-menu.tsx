'use client'

import { Box, Spacer } from '@chakra-ui/react'
import { SaasUILogo } from '@saas-ui/assets'
import { Menu } from 'compositions/ui/menu'
import { Persona } from 'compositions/ui/persona'
import { Sidebar } from 'compositions/ui/sidebar'
import { LuChevronsUpDown, LuHouse, LuInbox, LuUsers } from 'react-icons/lu'

export const SidebarUserMenu = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Root width="240px" minHeight="400px">
        <Sidebar.Header ps="4">
          <SaasUILogo width="80px" />
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
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuUsers /> Contacts
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.NavItem size="lg">
                <Menu.Root positioning={{ placement: 'top-start' }}>
                  <Menu.Trigger asChild>
                    <Sidebar.NavButton>
                      <Persona.Root presence="online">
                        <Persona.Avatar size="xs" src="/showcase-avatar.jpg" />
                      </Persona.Root>
                      <Box flex="1" textAlign="start">
                        Renata Alink
                        <Box textStyle="xs" color="fg.muted">
                          hello@saas-ui.dev
                        </Box>
                      </Box>
                      <Spacer />
                      <LuChevronsUpDown />
                    </Sidebar.NavButton>
                  </Menu.Trigger>
                  <Menu.Content>
                    <Menu.Item value="profile">Profile</Menu.Item>
                    <Menu.Item value="settings">Workspace settings</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item value="signout">Sign out</Menu.Item>
                  </Menu.Content>
                </Menu.Root>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Footer>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}
