'use client'

import { SaasUILogo } from '@saas-ui/assets'
import { AppShell, Navbar, Page, SearchInput, Spacer } from '@saas-ui/react'

export const AppShellNavbar = () => {
  return (
    <AppShell
      height="400px"
      header={
        <Navbar.Root borderBottomWidth="1px" borderColor="border.subtle">
          <Navbar.Content as="div">
            <Navbar.Brand>
              <SaasUILogo width="80px" />
            </Navbar.Brand>

            <Navbar.Item>
              <Navbar.Link href="#">Home</Navbar.Link>
              <Navbar.Link href="#">About</Navbar.Link>
              <Navbar.Link href="#">Pricing</Navbar.Link>
            </Navbar.Item>
            <Spacer />
            <Navbar.Item>
              <SearchInput size="sm" />
            </Navbar.Item>
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
