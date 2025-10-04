import { HStack, Stack, Text } from '@saas-ui/react'

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

export const Navigation = () => {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        <HStack display={{ base: 'none', md: 'flex' }} gap="1px">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <List
                css={{
                  '@media only screen and (min-width: 600px)': {
                    width: '768px',
                    maxWidth: '80vw',

                    gridTemplateColumns: 'repeat(3, 1fr)',
                  },
                }}
              >
                <Stack gap="0">
                  <Text textStyle="xs" color="fg.muted" px="3" py="2">
                    Starter kits
                  </Text>
                  <ListItem title="Next.js" href="/starter-kits/nextjs">
                    Next.js and tRPC
                  </ListItem>
                  <ListItem
                    title="Tanstack Start"
                    href="/starter-kits/tanstack-start"
                  >
                    Tanstack Start and tRPC
                  </ListItem>
                </Stack>
              </List>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
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
                <ListItem
                  title="X"
                  href="https://x.com/saas_js"
                  target="_blank"
                >
                  Follow us on X.
                </ListItem>
              </List>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/showcase">Showcase</NavigationMenuLink>
          </NavigationMenuItem>
        </HStack>
        <NavigationMenuIndicator></NavigationMenuIndicator>
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuRoot>
  )
}
