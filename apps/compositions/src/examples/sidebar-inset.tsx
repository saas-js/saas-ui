'use client'

import { AppShell } from 'compositions/ui/app-shell'
import { Page } from 'compositions/ui/page'
import { Sidebar } from 'compositions/ui/sidebar'
import { LuChartPie, LuHouse, LuInbox } from 'react-icons/lu'

export const SidebarInset = () => {
  return (
    <Sidebar.Provider variant="inset">
      <AppShell
        height="400px"
        overflow="hidden"
        bg="sidebar.bg"
        sidebar={
          <Sidebar.Root>
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
                      <LuChartPie /> Reports
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            </Sidebar.Body>
          </Sidebar.Root>
        }
      >
        <Sidebar.Inset>
          <Page.Root>
            <Page.Header title="Dashboard" />
            <Page.Body textStyle="sm">
              The content area is rendered as an inset panel.
            </Page.Body>
          </Page.Root>
        </Sidebar.Inset>
      </AppShell>
    </Sidebar.Provider>
  )
}
