'use client'

import { SaasUIIcon } from '@saas-ui/assets'
import { IconButton, Menu, Persona, Sidebar, Spacer } from '@saas-ui/react'
import { TbHome, TbUsers } from 'react-icons/tb'

export const SidebarBasic = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Root width="240px" minHeight="400px">
        <Sidebar.Header ps="4">
          <SaasUIIcon width="24px" color="fg" />
          <Spacer />
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton variant="ghost" size="sm" aria-label="User menu">
                <Persona.Root presence="online">
                  <Persona.Avatar size="xs" src="/avatars/1.png" />
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
                <Sidebar.NavButton>
                  <TbHome /> Home
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <TbUsers /> Contacts
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}
