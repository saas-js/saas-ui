'use client'

import { Spacer } from '@chakra-ui/react'
import { SaasUILogo } from '@saas-ui/assets'
import { AppShell } from 'compositions/ui/app-shell'
import { IconButton } from 'compositions/ui/icon-button'
import { Menu } from 'compositions/ui/menu'
import { Navbar } from 'compositions/ui/navbar'
import { Page } from 'compositions/ui/page'
import { Persona } from 'compositions/ui/persona'
import { Sidebar } from 'compositions/ui/sidebar'
import { FiHome, FiSettings, FiUsers } from 'react-icons/fi'

export const AppShellBasic = () => {
  return (
    <Sidebar.Provider>
      <AppShell
        height="480px"
        header={
          <Navbar.Root borderBottomWidth="1px" borderColor="border.subtle">
            <Navbar.Content>
              <Navbar.Brand>
                <SaasUILogo width="80px" />
              </Navbar.Brand>
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
            </Navbar.Content>
          </Navbar.Root>
        }
        sidebar={
          <Sidebar.Root width="240px">
            <Sidebar.Body>
              <Sidebar.Group>
                <Sidebar.GroupContent>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton active>
                      <FiHome /> Home
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <FiUsers /> Contacts
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <FiSettings /> Settings
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            </Sidebar.Body>
          </Sidebar.Root>
        }
      >
        <Page.Root>
          <Page.Header title="Home" />
          <Page.Body textStyle="sm">Your application content</Page.Body>
        </Page.Root>
      </AppShell>
    </Sidebar.Provider>
  )
}
