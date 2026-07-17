import { HStack, Stack, Text } from '@chakra-ui/react'
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

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <NavigationMenuRoot>
      <NavigationMenuList display={{ base: 'none', md: 'flex' }} gap="1px">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            border="1px solid"
            borderColor="border"
            gap="2"
          >
            <TanstackLogo /> Tanstack Start <LuChevronsUpDown />
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
                <ListItem
                  href="/"
                  title={
                    <HStack
                      as="span"
                      fontWeight="medium"
                      textStyle="sm"
                      color="fg"
                    >
                      <TanstackLogo fontSize="lg" /> Tanstack Start
                    </HStack>
                  }
                />
                <ListItem
                  href="/nextjs"
                  title={
                    <HStack
                      as="span"
                      fontWeight="medium"
                      textStyle="sm"
                      color="fg"
                    >
                      <NextjsLogo fontSize="lg" /> Next.js
                    </HStack>
                  }
                />
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
