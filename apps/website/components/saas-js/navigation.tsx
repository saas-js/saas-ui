'use client'

import { HStack, Stack, Text } from '@saas-ui/react'
import { usePathname } from 'next/navigation'
import { LuChevronsUpDown } from 'react-icons/lu'

import { NextjsLogo } from '#components/logos/next'
import { TanstackLogo } from '#components/logos/tanstack'

import {
  List,
  ListItem,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  ViewportPosition,
} from '../navigation-menu'

const starterKits = [
  {
    id: 'tanstack',
    label: 'Tanstack Start',
    href: '/',
    Logo: TanstackLogo,
    isActive: (pathname: string) =>
      pathname === '/' ||
      pathname === '/tanstack-start' ||
      pathname.startsWith('/tanstack-start/'),
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    href: '/nextjs',
    Logo: NextjsLogo,
    isActive: (pathname: string) =>
      pathname === '/nextjs' || pathname.startsWith('/nextjs/'),
  },
] as const

function getActiveStarterKit(pathname: string) {
  return starterKits.find((kit) => kit.isActive(pathname)) ?? starterKits[0]
}

export const Navigation = () => {
  const pathname = usePathname()
  const activeStarter = getActiveStarterKit(pathname)
  const ActiveLogo = activeStarter.Logo

  return (
    <NavigationMenuRoot>
      <NavigationMenuList display={{ base: 'none', md: 'flex' }} gap="1px">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            border="1px solid"
            borderColor="border"
            gap="2"
          >
            <ActiveLogo /> {activeStarter.label} <LuChevronsUpDown />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <List
              css={{
                '@media only screen and (min-width: 600px)': {
                  width: '260px',
                  maxWidth: '80vw',
                  gridTemplateColumns: 'repeat(1, 1fr)',
                },
              }}
            >
              <Stack gap="0">
                <Text textStyle="xs" color="fg.muted" px="3" py="2">
                  Starter kits
                </Text>
                {starterKits.map((kit) => {
                  const Logo = kit.Logo
                  const isActive = kit.id === activeStarter.id

                  return (
                    <ListItem key={kit.id} href={kit.href}>
                      <HStack
                        as="span"
                        fontWeight={isActive ? 'semibold' : 'medium'}
                        textStyle="sm"
                        color={isActive ? 'fg' : 'fg'}
                      >
                        <Logo fontSize="lg" /> {kit.label}
                      </HStack>
                    </ListItem>
                  )
                })}
              </Stack>
            </List>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            sx={{
              display: {
                md: 'none',
                lg: 'flex',
              },
            }}
          >
            Resources
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <List
              css={{
                '@media only screen and (min-width: 600px)': {
                  width: '600px',
                  maxWidth: '80vw',
                  gap: '1px',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                },
              }}
            >
              <ListItem title="Changelog" href="/changelog">
                What&apos;s new in Saas.js
              </ListItem>
              <ListItem
                title="Roadmap"
                href="https://roadmap.saas-ui.dev"
                target="_blank"
              >
                See what&apos;s coming next.
              </ListItem>
              <ListItem title="Github" href="https://github.com/saas-js">
                Explore the code.
              </ListItem>
              <ListItem title="Blog" href="/blog">
                Read the latest posts.
              </ListItem>
              <ListItem title="Discord" href="/discord">
                Join our community.
              </ListItem>
              <ListItem title="X" href="https://x.com/saas_js" target="_blank">
                Follow us on X.
              </ListItem>
            </List>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/showcase">Showcase</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuIndicator></NavigationMenuIndicator>
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuRoot>
  )
}
