'use client'

import { Box, Stack, Text } from '@chakra-ui/react'
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

const KITS = [
  {
    title: 'TanStack Start kit',
    href: '/',
    mark: '/img/frameworks/tanstack.svg',
  },
  {
    title: 'Next.js kit',
    href: '/nextjs',
    mark: '/img/frameworks/nextjs.svg',
    invert: true,
  },
]

// Mirrors PACKAGE_IDS in lib/saas-js/packages.ts. Kept local so the nav does
// not pull that module's descriptions and code samples into the client bundle.
const PACKAGES = [
  { name: 'Drizzle CRUD', href: '/packages/drizzle-crud' },
  { name: 'Conditions', href: '/packages/conditions' },
  { name: 'Slingshot', href: '/packages/slingshot' },
  { name: 'Better Auth React Query', href: '/packages/better-auth-react-query' },
  { name: 'Iconx', href: '/packages/iconx' },
  { name: 'All packages', href: '/packages' },
]

const PACKAGE_COLUMNS = 2
const PACKAGE_ROWS = Math.ceil(PACKAGES.length / PACKAGE_COLUMNS)
// Two grid rows per package row, so the two kits can each span exactly half
// the column whatever the package count is.
const MENU_ROWS = PACKAGE_ROWS * 2

const GroupLabel = ({
  children,
  ...rest
}: { children: React.ReactNode } & React.ComponentProps<typeof Box>) => (
  <Box as="li" role="presentation" px="3" pb="1" {...rest}>
    <Text fontSize="2xs" fontWeight="medium" color="fg.muted">
      {children}
    </Text>
  </Box>
)

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
                  width: '720px',
                  maxWidth: '92vw',
                  gridTemplateColumns: `1fr 1px repeat(${PACKAGE_COLUMNS}, 1fr)`,
                  gridTemplateRows: `auto repeat(${MENU_ROWS}, auto)`,
                },
              }}
            >
              <GroupLabel gridColumn={{ md: 1 }} gridRow={{ md: 1 }}>
                Starter kits
              </GroupLabel>
              <GroupLabel
                gridColumn={{ md: `3 / span ${PACKAGE_COLUMNS}` }}
                gridRow={{ md: 1 }}
              >
                Open Source
              </GroupLabel>

              <Box
                as="li"
                role="presentation"
                aria-hidden
                bg="border"
                display={{ base: 'none', md: 'block' }}
                gridColumn={{ md: 2 }}
                gridRow={{ md: '1 / -1' }}
              />

              {KITS.map((kit, i) => (
                <ListItem
                  key={kit.href}
                  title={kit.title}
                  href={kit.href}
                  align="center"
                  icon={<Mark src={kit.mark} invert={kit.invert} />}
                  gridColumn={{ md: 1 }}
                  // Every item is placed explicitly. Auto placement walks past
                  // the spanning kits and offsets the whole package block.
                  gridRow={{
                    md: `${i * (MENU_ROWS / 2) + 2} / span ${MENU_ROWS / 2}`,
                  }}
                />
              ))}

              {PACKAGES.map((pkg, i) => (
                <ListItem
                  key={pkg.href}
                  title={pkg.name}
                  href={pkg.href}
                  gridColumn={{ md: (i % PACKAGE_COLUMNS) + 3 }}
                  gridRow={{
                    md: `${Math.floor(i / PACKAGE_COLUMNS) * 2 + 2} / span 2`,
                  }}
                />
              ))}
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
