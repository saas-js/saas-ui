'use client'

import { Spacer, Text } from '@chakra-ui/react'
import { IconButton } from 'compositions/ui/icon-button'
import { Sidebar } from 'compositions/ui/sidebar'
import { LuHouse, LuInbox, LuX } from 'react-icons/lu'

const favourites = [
  { emoji: '🚀', label: 'Product launch' },
  { emoji: '🎨', label: 'Design system' },
  { emoji: '📈', label: 'Growth experiments' },
]

export const SidebarHoverActions = () => {
  return (
    <Sidebar.Provider>
      <Sidebar.Root width="240px" minHeight="400px">
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
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupHeader>
              <Sidebar.GroupTitle>Favourites</Sidebar.GroupTitle>
            </Sidebar.GroupHeader>
            <Sidebar.GroupContent>
              {favourites.map((item) => (
                <Sidebar.NavItem key={item.label}>
                  <Sidebar.NavButton>
                    <Text>{item.emoji}</Text>
                    {item.label}
                    <Spacer />
                    <Sidebar.NavButtonEndElement
                      opacity="0"
                      _parentHover={{ opacity: 0.6, _hover: { opacity: 1 } }}
                    >
                      <IconButton
                        variant="ghost"
                        aria-label="Remove from favourites"
                        size="xs"
                      >
                        <LuX />
                      </IconButton>
                    </Sidebar.NavButtonEndElement>
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
              ))}
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}
