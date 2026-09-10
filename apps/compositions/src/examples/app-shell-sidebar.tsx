'use client'

import { Spacer } from '@chakra-ui/react'
import { SaasUILogo } from '@saas-ui/assets'
import { AppShell } from 'compositions/ui/app-shell'
import { IconButton } from 'compositions/ui/icon-button'
import { Menu } from 'compositions/ui/menu'
import { Page } from 'compositions/ui/page'
import { Persona } from 'compositions/ui/persona'
import { Sidebar } from 'compositions/ui/sidebar'
import { FiHome, FiUsers } from 'react-icons/fi'

export const AppShellSidebar = () => {
  return (
    <Sidebar.Provider>
      <AppShell
        height="400px"
        sidebar={
          <Sidebar.Root width="240px">
            <Sidebar.Header ps="4">
              <SaasUILogo width="80px" />
              <Spacer />
              <Menu.Root>
                <Menu.Trigger asChild>
                  <IconButton variant="ghost" size="sm" aria-label="User menu">
                    <Persona.Root presence="online">
                      <Persona.Avatar size="xs" src="/showcase-avatar.jpg" />
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
                      <FiHome /> Home
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton active>
                      <FiUsers /> Contacts
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            </Sidebar.Body>
          </Sidebar.Root>
        }
      >
        <Page.Root>
          <Page.Header title="Contacts" />
          <Page.Body textStyle="sm">Your application content</Page.Body>
        </Page.Root>
      </AppShell>
    </Sidebar.Provider>
  )
}
