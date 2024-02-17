import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useCurrentUser } from '@saas-ui/auth'
import {
  NavGroup,
  NavItem,
  PersonaAvatar,
  Sidebar,
  SidebarSection,
} from '@saas-ui/react'
import { Link } from '@tanstack/react-router'

export const AppSidebar = () => {
  const user = useCurrentUser()

  return (
    <Sidebar>
      <SidebarSection flexDirection="row" justifyContent="space-between">
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={
              <PersonaAvatar name={user?.name ?? user?.email} size="xs" />
            }
          >
            {user?.name ?? user?.email}
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/logout">
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection>
        <NavGroup>
          <NavItem href="/">Home</NavItem>
        </NavGroup>
      </SidebarSection>
    </Sidebar>
  )
}
