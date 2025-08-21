'use client'

import { SaasUILogo } from '@saas-ui/assets'
import {
  AppShell,
  Box,
  Button,
  Container,
  Drawer,
  Navbar,
  Skeleton,
  SkeletonText,
  Stack,
  useDisclosure,
} from '@saas-ui/react'
import { FiMenu, FiX } from 'react-icons/fi'

export const NavbarMobileNav = () => {
  const mobileNav = useDisclosure()

  const menuItems = ['Features', 'Customers', 'Integrations', 'Pricing']

  return (
    <AppShell
      header={
        <Navbar.Root position="sticky">
          <Navbar.Content maxW="4xl" display={{ base: 'none', sm: 'flex' }}>
            <Navbar.Brand>
              <SaasUILogo width="100px" />
            </Navbar.Brand>

            <Navbar.ItemGroup>
              <Navbar.Item>
                <Navbar.Link color="foreground" href="#">
                  Features
                </Navbar.Link>
              </Navbar.Item>
              <Navbar.Item>
                <Navbar.Link active href="#">
                  Customers
                </Navbar.Link>
              </Navbar.Item>
              <Navbar.Item>
                <Navbar.Link color="foreground" href="#">
                  Integrations
                </Navbar.Link>
              </Navbar.Item>
              <Navbar.Item>
                <Navbar.Link color="foreground" href="#">
                  Pricing
                </Navbar.Link>
              </Navbar.Item>
            </Navbar.ItemGroup>
            <Navbar.ItemGroup justifyContent="end" gap="2">
              <Navbar.Item>
                <Navbar.Link href="#">Login</Navbar.Link>
              </Navbar.Item>
              <Navbar.Item>
                <Button variant="glass" colorPalette="accent">
                  Sign Up
                </Button>
              </Navbar.Item>
              <Button
                aria-label={mobileNav.open ? 'Close menu' : 'Open menu'}
                display={{ base: 'inline-flex', sm: 'none' }}
                onClick={mobileNav.onToggle}
                variant="ghost"
              >
                {mobileNav.open ? <FiX /> : <FiMenu />}
              </Button>
            </Navbar.ItemGroup>
            <Drawer.Root {...mobileNav}>
              <Drawer.Backdrop />
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.CloseButton />
                </Drawer.Header>
                <Drawer.Body fontSize="md">
                  <Navbar.Content
                    flexDirection="column"
                    justifyContent="stretch"
                  >
                    {menuItems.map((item, index) => (
                      <Navbar.Item key={`${item}-${index}`} width="full">
                        <Navbar.Link
                          href="#"
                          width="full"
                          justifyContent="start"
                        >
                          {item}
                        </Navbar.Link>
                      </Navbar.Item>
                    ))}
                  </Navbar.Content>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Root>
          </Navbar.Content>
        </Navbar.Root>
      }
    >
      <Box as="main" flex="1" py="4">
        <Container maxW="4xl">
          <Stack gap="2" mb="14">
            <Skeleton width="100px" height="24px" variant="none" />
            <SkeletonText variant="none" />
          </Stack>
          <Stack direction="row" gap="8" mb="14">
            <Stack gap="2" flex="1">
              <Skeleton width="100px" height="20px" variant="none" />
              <SkeletonText variant="none" />
            </Stack>
            <Stack gap="2" flex="1">
              <Skeleton width="100px" height="20px" variant="none" />
              <SkeletonText variant="none" />
            </Stack>
          </Stack>
          <Stack direction="row" gap="8" mb="14">
            <Stack gap="2" flex="1">
              <Skeleton width="100px" height="20px" variant="none" />
              <SkeletonText variant="none" />
            </Stack>
            <Stack gap="2" flex="1">
              <Skeleton width="100px" height="20px" variant="none" />
              <SkeletonText variant="none" />
            </Stack>
          </Stack>
          <Stack direction="row" gap="8">
            <Stack gap="2" flex="1">
              <Skeleton width="100px" height="20px" variant="none" />
              <SkeletonText variant="none" />
            </Stack>
            <Stack gap="2" flex="1">
              <Skeleton width="100px" height="20px" variant="none" />
              <SkeletonText variant="none" />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </AppShell>
  )
}
