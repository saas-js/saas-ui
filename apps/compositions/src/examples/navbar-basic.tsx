'use client'

import { SaasUILogo } from '@saas-ui/assets'
import { AppShell, Button, Navbar } from '@saas-ui/react'

export const NavbarBasic = () => {
  return (
    <AppShell
      height="80px"
      header={
        <Navbar.Root>
          <Navbar.Content maxW="4xl">
            <Navbar.Brand>
              <SaasUILogo width="100px" />
            </Navbar.Brand>
            <Navbar.ItemGroup>
              <Navbar.Item>
                <Navbar.Link active aria-current="page" href="#">
                  Home
                </Navbar.Link>
              </Navbar.Item>
              <Navbar.Item>
                <Navbar.Link href="#">About</Navbar.Link>
              </Navbar.Item>
              <Navbar.Item>
                <Navbar.Link href="#">Contact</Navbar.Link>
              </Navbar.Item>
            </Navbar.ItemGroup>
            <Navbar.ItemGroup justifyContent="flex-end" gap="2">
              <Navbar.Item>
                <Button size="sm" variant="ghost">
                  Login
                </Button>
              </Navbar.Item>
              <Navbar.Item>
                <Button size="sm" variant="glass" colorPalette="accent">
                  Sign up
                </Button>
              </Navbar.Item>
            </Navbar.ItemGroup>
          </Navbar.Content>
        </Navbar.Root>
      }
    />
  )
}
