'use client'

import { Badge, Spacer } from '@chakra-ui/react'
import { Sidebar } from 'compositions/ui/sidebar'
import {
  LuChartPie,
  LuCreditCard,
  LuHouse,
  LuInbox,
  LuPlug,
  LuUsers,
} from 'react-icons/lu'

export const SidebarGrouped = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Root width="240px" minHeight="400px">
        <Sidebar.Body>
          <Sidebar.Group>
            <Sidebar.GroupHeader>
              <Sidebar.GroupTitle>Workspace</Sidebar.GroupTitle>
            </Sidebar.GroupHeader>
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
                  <LuChartPie /> Reports
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupHeader>
              <Sidebar.GroupTitle>Settings</Sidebar.GroupTitle>
            </Sidebar.GroupHeader>
            <Sidebar.GroupContent>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuUsers /> Members
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuCreditCard /> Billing
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuPlug /> Integrations
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}
