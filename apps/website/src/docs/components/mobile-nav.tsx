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
import { AnimatePresence, motion, useElementScroll } from 'framer-motion'
import useRouteChanged from '@/hooks/use-route-changed'
import { getRoutes } from '@/layouts/mdx'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'
import Logo from '@/components/layout/logo'
import { SidebarContent } from './sidebar/sidebar'
import { t } from '@/docs/utils/i18n'

import headerNav from '@/data/header-nav'

interface NavLinkProps extends CenterProps {
  label: string
  href?: string
  isActive?: boolean
}

function NavLink({ href, children, label, isActive, ...rest }: NavLinkProps) {
  const { pathname } = useRouter()
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')

  const [, group] = href.split('/')
  isActive = isActive ?? pathname.includes(group)

  return (
    <GridItem as={NextLink} href={href}>
      <Center
        flex="1"
        minH="40px"
        as="button"
        rounded="md"
        transition="0.2s all"
        fontWeight={isActive ? 'semibold' : 'medium'}
        borderColor={isActive ? 'purple.400' : undefined}
        borderWidth="1px"
        color={isActive ? 'white' : undefined}
        _hover={{
          bg: isActive ? 'purple.500' : bgActiveHoverColor,
        }}
        {...rest}
      >
        {label}
      </Center>
    </GridItem>
  )
}

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose } = props
  const closeBtnRef = React.useRef<HTMLButtonElement>()
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
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction="column"
              w="100%"
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
                  templateColumns="repeat(2, 1fr)"
                  gap="2"
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
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(asPath)}
                />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props
  const [y, setY] = React.useState(0)
  const elRef = React.useRef<any>()
  const { scrollY } = useElementScroll(elRef)
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
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
        display={{ base: 'flex', md: 'none' }}
        aria-label="Open menu"
        fontSize="20px"
        color={useColorModeValue('gray.800', 'inherit')}
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props}
      />
    )
  }
)

MobileNavButton.displayName = 'MobileNavButton'
