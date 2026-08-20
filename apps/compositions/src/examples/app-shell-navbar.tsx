'use client'

import { SaasUILogo } from '@saas-ui/assets'
import { AppShell } from 'compositions/ui/app-shell'
import { Navbar } from 'compositions/ui/navbar'
import { Page } from 'compositions/ui/page'
import { SearchInput } from 'compositions/ui/search-input'

export const AppShellNavbar = () => {
  return (
    <AppShell
      height="400px"
      header={
        <Navbar.Root borderBottomWidth="1px" borderColor="border.subtle">
          <Navbar.Content>
            <Navbar.Brand>
              <SaasUILogo width="80px" />
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
                <Navbar.Link href="#">Pricing</Navbar.Link>
              </Navbar.Item>
            </Navbar.ItemGroup>
            <Navbar.ItemGroup justifyContent="flex-end">
              <Navbar.Item>
                <SearchInput size="sm" />
              </Navbar.Item>
            </Navbar.ItemGroup>
          </Navbar.Content>
        </Navbar.Root>
      }
    >
      <Page.Root>
        <Page.Body textStyle="sm">Your application content</Page.Body>
      </Page.Root>
    </AppShell>
  )
}
