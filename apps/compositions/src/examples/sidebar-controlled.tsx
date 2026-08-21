'use client'

import { useState } from 'react'

import { AppShell } from 'compositions/ui/app-shell'
import { Button } from 'compositions/ui/button'
import { Page } from 'compositions/ui/page'
import { Sidebar } from 'compositions/ui/sidebar'
import { LuHouse, LuInbox, LuUsers } from 'react-icons/lu'

export const SidebarControlled = () => {
  const [open, setOpen] = useState(true)

  return (
    <Sidebar.Provider open={open} onOpenChange={({ open }) => setOpen(open)}>
      <AppShell
        height="400px"
        overflow="hidden"
        sidebar={
          <Sidebar.Root width="240px">
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
          <Page.Header title="Dashboard" />
          <Page.Body>
            <Button variant="outline" onClick={() => setOpen(!open)}>
              {open ? 'Close' : 'Open'} sidebar
            </Button>
          </Page.Body>
        </Page.Root>
      </AppShell>
    </Sidebar.Provider>
  )
}
