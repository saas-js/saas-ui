'use client'

import { HStack } from '@chakra-ui/react'
import { AppShell } from 'compositions/ui/app-shell'
import { IconButton } from 'compositions/ui/icon-button'
import { Page } from 'compositions/ui/page'
import { Sidebar } from 'compositions/ui/sidebar'
import { LuHouse, LuInbox, LuPanelLeft, LuUsers } from 'react-icons/lu'

export const SidebarToggle = () => {
  return (
    <Sidebar.Provider>
      <AppShell
        height="400px"
        overflow="hidden"
        sidebar={
          <Sidebar.Root width="240px">
            <Sidebar.Header ps="4" direction="row" alignItems="center">
              <HStack flex="1" fontWeight="medium" textStyle="sm">
                Acme Inc
              </HStack>
              <Sidebar.Trigger asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="Close sidebar"
                >
                  <LuPanelLeft />
                </IconButton>
              </Sidebar.Trigger>
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
          </Sidebar.Root>
        }
      >
        <Page.Root>
          <Page.Header
            title="Dashboard"
            nav={
              <Sidebar.Trigger asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="Open sidebar"
                  _open={{ display: 'none' }}
                >
                  <LuPanelLeft />
                </IconButton>
              </Sidebar.Trigger>
            }
          />
          <Page.Body textStyle="sm">
            Use the toggle in the sidebar header to collapse the sidebar, and
            the one in the page header to open it again.
          </Page.Body>
        </Page.Root>
      </AppShell>
    </Sidebar.Provider>
  )
}
