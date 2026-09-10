'use client'

import { Box } from '@chakra-ui/react'
import { Sidebar } from 'compositions/ui/sidebar'
import { LuHouse, LuInbox, LuUsers } from 'react-icons/lu'

export const SidebarFlyout = () => {
  return (
    <Box
      position="relative"
      height="400px"
      overflow="hidden"
      // Contains the flyout within the example, not needed in your app
      transform="translateZ(0)"
    >
      <Sidebar.Provider mode="flyout">
        <Sidebar.FlyoutTrigger />
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
                    <LuUsers /> Contacts
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Body>
        </Sidebar.Root>
        <Sidebar.Backdrop />
        <Box p="8" textStyle="sm" color="fg.muted">
          Move your cursor to the left edge to open the sidebar. It closes again
          when you move away.
        </Box>
      </Sidebar.Provider>
    </Box>
  )
}
