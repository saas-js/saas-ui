'use client'

import { Box, Stack } from '@chakra-ui/react'
import Image from 'next/image'

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

const PACKAGES = [
  { name: 'Drizzle CRUD', href: '/packages/drizzle-crud' },
  { name: 'Conditions', href: '/packages/conditions' },
  { name: 'Slingshot', href: '/packages/slingshot' },
  { name: 'Better Auth React Query', href: '/packages/better-auth-react-query' },
  { name: 'Iconx', href: '/packages/iconx' },
]

// The TanStack mark is a colour tile that reads on either theme. The Next.js
// mark is solid black on transparent, so it needs inverting on dark panels.
const Mark = ({ src, invert }: { src: string; invert?: boolean }) => (
  <Box
    display="flex"
    flexShrink="0"
    {...(invert ? { _dark: { filter: 'invert(1)' } } : {})}
  >
    <Image src={src} alt="" width={20} height={20} />
  </Box>
)

export const Navigation = () => {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList display={{ base: 'none', md: 'flex' }} gap="1px">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>

          <NavigationMenuContent>
            <List
              css={{
                '@media only screen and (min-width: 600px)': {
                  width: '560px',
                  maxWidth: '90vw',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  // One row per package. The two kits span half each, so the
                  // starter-kit column matches the packages column in height.
                  gridTemplateRows: `repeat(${PACKAGES.length + 1}, 1fr)`,
                },
              }}
            >
              <ListItem
                title="TanStack Start kit"
                align="center"
                href="/"
                icon={<Mark src="/img/frameworks/tanstack.svg" />}
                gridColumn={{ md: 1 }}
                gridRow={{ md: `span ${(PACKAGES.length + 1) / 2}` }}
              />
              <ListItem
                title="Next.js kit"
                align="center"
                href="/nextjs"
                icon={<Mark src="/img/frameworks/nextjs.svg" invert />}
                gridColumn={{ md: 1 }}
                gridRow={{ md: `span ${(PACKAGES.length + 1) / 2}` }}
              />

              {PACKAGES.map((pkg) => (
                <ListItem
                  key={pkg.href}
                  title={pkg.name}
                  href={pkg.href}
                  gridColumn={{ md: 2 }}
                />
              ))}
              <ListItem
                title="All packages"
                href="/packages"
                gridColumn={{ md: 2 }}
              />
            </List>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
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
                What&apos;s new in SaaS.js
              </ListItem>
              <ListItem title="GitHub" href="https://github.com/saas-js">
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
        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuIndicator />
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuRoot>
  )
}
