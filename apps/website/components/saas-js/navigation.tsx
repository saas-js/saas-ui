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
                  width: '320px',
                  maxWidth: '80vw',
                  gap: '1px',
                  gridTemplateColumns: '1fr',
                },
              }}
            >
              <ListItem
                title="TanStack Start kit"
                href="/"
                icon={<Mark src="/img/frameworks/tanstack.svg" />}
              />
              <ListItem
                title="Next.js kit"
                href="/nextjs"
                icon={<Mark src="/img/frameworks/nextjs.svg" invert />}
              />
              <ListItem
                title="Packages"
                href="/packages"
                // spacer keeps the label aligned with the two that have marks
                icon={<Box width="20px" flexShrink="0" />}
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
