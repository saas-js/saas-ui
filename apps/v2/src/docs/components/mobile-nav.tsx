import {
  Box,
  BoxProps,
  Button,
  Center,
  CenterProps,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import useRouteChanged from '@/hooks/use-route-changed'
import { getRoutes } from '@/layouts/mdx'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'
import Logo from '@/components/layout/logo'
import { SidebarContent } from './sidebar/sidebar'

import headerNav from '@/data/header-nav'

interface NavLinkProps extends CenterProps {
  label: string
  href: string
  isActive?: boolean
}

function NavLink({ href, children, label, isActive, ...rest }: NavLinkProps) {
  const { pathname } = useRouter()
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.200')

  const [, group] = href.split('/')
  isActive = isActive ?? pathname.includes(group)

  return (
    <GridItem as={NextLink} href={href}>
      <Flex
        data-active={isActive ? 'true' : undefined}
        flex="1"
        px="3"
        py="2"
        rounded="md"
        transition="0.2s all"
        fontWeight="medium"
        color="blackAlpha.800"
        w="full"
        _hover={{
          bg: bgActiveHoverColor,
          color: 'black',
        }}
        _active={{
          color: 'black',
          fontWeight: 'semibold',
        }}
        _dark={{
          color: 'whiteAlpha.800',
          _hover: {
            color: 'white',
          },
          _active: {
            color: 'white',
          },
        }}
        {...rest}
      >
        {label}
      </Flex>
    </GridItem>
  )
}

interface MobileNavContentProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose } = props
  const closeBtnRef = React.useRef<HTMLButtonElement>(null)
  const { pathname, asPath } = useRouter()
  const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')

  useRouteChanged(onClose)

  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  const [shadow, setShadow] = React.useState<string>()

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <Flex
            direction="column"
            w="100vw"
            bg={bgColor}
            h="100vh"
            overflow="auto"
            position="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            pb="8"
            backdropFilter="blur(5px)"
          >
            <Box>
              <Flex justify="space-between" px="8" pt="4" pb="4">
                <Logo />
                <HStack spacing="5">
                  <CloseButton ref={closeBtnRef} onClick={onClose} />
                </HStack>
              </Flex>
              <Grid
                px="6"
                pb="6"
                pt="2"
                shadow={shadow}
                templateColumns="repeat(1, 1fr)"
                gap="1px"
              >
                {headerNav.map(
                  ({ href, id, title, colorScheme, ...props }, i) => {
                    return (
                      <NavLink
                        href={href || `/#${id}`}
                        key={i}
                        {...(props as any)}
                      >
                        {title}
                      </NavLink>
                    )
                  }
                )}
              </Grid>
            </Box>

            <ScrollView
              onScroll={(scrolled) => {
                setShadow(scrolled ? 'md' : undefined)
              }}
            >
              {pathname.match('docs') ? (
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(asPath)}
                />
              ) : null}
            </ScrollView>
          </Flex>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props
  const [y, setY] = React.useState(0)
  const elRef = React.useRef<any>()
  const { scrollY } = useScroll({
    container: elRef,
  })

  React.useEffect(() => {
    const unsub = scrollY.on('change', () => setY(scrollY.get()))
    return () => unsub()
  }, [scrollY])

  useUpdateEffect(() => {
    onScroll?.(y > 5 ? true : false)
  }, [y])

  return (
    <Box
      ref={elRef}
      flex="1"
      id="routes"
      overflow="auto"
      px="6"
      pb="6"
      {...rest}
    />
  )
}

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: 'flex', lg: 'none' }}
        fontSize="20px"
        color={useColorModeValue('gray.800', 'inherit')}
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props}
        aria-label="Open menu"
      />
    )
  }
)

MobileNavButton.displayName = 'MobileNavButton'
