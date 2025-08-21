'use client'

import { SaasUILogo } from '@saas-ui/assets'
import {
  AppShell,
  Box,
  Button,
  Container,
  Navbar,
  Skeleton,
  SkeletonText,
  Stack,
} from '@saas-ui/react'

export const NavbarBorderBottom = () => {
  return (
    <AppShell
      height="400px"
      header={
        <Navbar.Root position="sticky" borderBottomWidth="1px">
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
                <Button>Login</Button>
              </Navbar.Item>
              <Navbar.Item>
                <Button variant="primary">Sign up</Button>
              </Navbar.Item>
            </Navbar.ItemGroup>
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
