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
                <Stack
                  gap="0"
                  borderRightWidth="1px"
                  borderColor="border.subtle"
                  pr="2"
                >
                  <Text textStyle="xs" color="fg.muted" px="3" py="2">
                    Community
                  </Text>

                  <ListItem title="Components" href="/">
                    Open source React components and design system.
                  </ListItem>
                </Stack>
                <Stack gap="0">
                  <Text textStyle="xs" color="fg.muted" px="3" py="2">
                    Pro
                  </Text>
                  <ListItem title="Figma" href="/pro/figma">
                    Premium Figma UI kit.
                  </ListItem>
                  <ListItem title="Blocks" href="/pro/blocks">
                    Pre-built React components.
                  </ListItem>
                </Stack>
                <Stack gap="0">
                  <Text textStyle="xs" color="fg.muted" px="3" py="2">
                    Starter kits
                  </Text>
                  <ListItem title="Next.js" href="/pro/starterkits/nextjs">
                    Next.js and tRPC
                  </ListItem>
                  <ListItem
                    title="Tanstack Start"
                    href="/pro/starterkits/tanstack-start"
                  >
                    Tanstack Start and tRPC
                  </ListItem>
                </Stack>
              </List>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/pro/pricing">Pricing</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/pro/docs">Docs</NavigationMenuLink>
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
                  What&apos;s new in Saas UI.
                </ListItem>
                <ListItem
                  title="Roadmap"
                  href="https://roadmap.saas-ui.dev"
                  target="_blank"
                >
                  See what&apos;s coming next.
                </ListItem>
                <ListItem
                  title="Github"
                  href="https://github.com/saas-js/saas-ui"
                >
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
