'use client'

import { Badge, Box, HStack, Stack, Text } from '@chakra-ui/react'
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

const KITS: Array<{
  title: string
  href: string
  mark: string
  invert?: boolean
  soon?: boolean
}> = [
  {
    title: 'TanStack Start kit',
    href: '/',
    mark: '/img/frameworks/tanstack.svg',
  },
  {
    title: 'TanStack Start kit v2',
    href: '/',
    mark: '/img/frameworks/tanstack.svg',
    soon: true,
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
  { name: 'Drizzle Secrets', href: '/packages/drizzle-secrets' },
  { name: 'Conditions', href: '/packages/conditions' },
  { name: 'Slingshot', href: '/packages/slingshot' },
  {
    name: 'Better Auth React Query',
    href: '/packages/better-auth-react-query',
  },
  { name: 'Iconx', href: '/packages/iconx' },
  { name: 'All packages', href: '/packages' },
]

const PACKAGE_COLUMNS = 2
const PACKAGE_ROWS = Math.ceil(PACKAGES.length / PACKAGE_COLUMNS)
// Kits and packages share one grid: each kit spans PACKAGE_ROWS rows and
// each package row spans KITS.length rows, so both columns fill the same
// height whatever the counts are.
const MENU_ROWS = PACKAGE_ROWS * KITS.length

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
                  gridTemplateColumns: `1.3fr 1px repeat(${PACKAGE_COLUMNS}, 1fr)`,
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
                  key={kit.title}
                  title={
                    kit.soon ? (
                      <HStack gap="2">
                        {kit.title}
                        <Badge size="sm" variant="surface">
                          Soon
                        </Badge>
                      </HStack>
                    ) : (
                      kit.title
                    )
                  }
                  href={kit.href}
                  disabled={kit.soon}
                  align="center"
                  icon={<Mark src={kit.mark} invert={kit.invert} />}
                  gridColumn={{ md: 1 }}
                  // Every item is placed explicitly. Auto placement walks past
                  // the spanning kits and offsets the whole package block.
                  gridRow={{
                    md: `${i * PACKAGE_ROWS + 2} / span ${PACKAGE_ROWS}`,
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
                    md: `${Math.floor(i / PACKAGE_COLUMNS) * KITS.length + 2} / span ${KITS.length}`,
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
