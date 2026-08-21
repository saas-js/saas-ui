'use client'

import { Collapsible, Icon, Spacer } from '@chakra-ui/react'
import { Sidebar } from 'compositions/ui/sidebar'
import { LuChevronRight, LuFolder, LuHouse, LuSettings } from 'react-icons/lu'

export const SidebarNested = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Root width="240px" minHeight="400px">
        <Sidebar.Body>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.NavItem>
                <Sidebar.NavButton>
                  <LuHouse /> Dashboard
                </Sidebar.NavButton>
              </Sidebar.NavItem>
              <Collapsible.Root defaultOpen>
                <Sidebar.NavItem>
                  <Collapsible.Trigger asChild>
                    <Sidebar.NavButton>
                      <LuFolder /> Projects
                      <Spacer />
                      <Icon
                        transition="transform"
                        _open={{ transform: 'rotate(90deg)' }}
                      >
                        <LuChevronRight />
                      </Icon>
                    </Sidebar.NavButton>
                  </Collapsible.Trigger>
                </Sidebar.NavItem>
                <Collapsible.Content>
                  <Sidebar.GroupContent
                    ms="3.5"
                    ps="2.5"
                    borderStartWidth="1px"
                  >
                    <Sidebar.NavItem>
                      <Sidebar.NavButton active>
                        Website redesign
                      </Sidebar.NavButton>
                    </Sidebar.NavItem>
                    <Sidebar.NavItem>
                      <Sidebar.NavButton>Mobile app</Sidebar.NavButton>
                    </Sidebar.NavItem>
                    <Sidebar.NavItem>
                      <Sidebar.NavButton>Q3 marketing</Sidebar.NavButton>
                    </Sidebar.NavItem>
                  </Sidebar.GroupContent>
                </Collapsible.Content>
              </Collapsible.Root>
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
