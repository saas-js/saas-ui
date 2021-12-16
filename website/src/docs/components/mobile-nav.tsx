import {
  Box,
  BoxProps,
  Center,
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
import useRouteChanged from 'hooks/use-route-changed'
import { getRoutes } from '@/layouts/mdx'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'
import Logo from './logo'
import { SidebarContent } from './sidebar/sidebar'
import SponsorButton from './sponsor-button'
import { t } from 'utils/i18n'

function NavLink({ href, children }) {
  const { pathname } = useRouter()
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')

  const [, group] = href.split('/')
  const isActive = pathname.includes(group)

  return (
    <GridItem as={NextLink} href={href}>
      <Center
        flex="1"
        minH="40px"
        as="button"
        rounded="md"
        transition="0.2s all"
        fontWeight={isActive ? 'semibold' : 'medium'}
        bg={isActive ? 'teal.400' : undefined}
        borderWidth={isActive ? undefined : '1px'}
        color={isActive ? 'white' : undefined}
        _hover={{
          bg: isActive ? 'teal.500' : bgActiveHoverColor,
        }}
      >
        {children}
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
  const { pathname } = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')

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
              pos="absolute"
              top="0"
              left="0"
              zIndex={20}
              pb="8"
            >
              <Box>
                <Flex justify="space-between" px="6" pt="5" pb="4">
                  <Logo sx={{ rect: { fill: 'teal.300' } }} />
                  <HStack spacing="5">
                    <SponsorButton display="flex" />
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
                  <NavLink href="/docs/getting-started">
                    {t('component.mobile-nav.docs')}
                  </NavLink>
                  <NavLink href="/guides/integrations/with-cra">
                    {t('component.mobile-nav.guides')}
                  </NavLink>
                  <NavLink href="/resources">
                    {t('component.mobile-nav.resources')}
                  </NavLink>
                  <NavLink href="/showcase">
                    {t('component.mobile-nav.showcase')}
                  </NavLink>
                  <NavLink href="/faq">{t('component.mobile-nav.faq')}</NavLink>
                  <NavLink href="/team">
                    {t('component.mobile-nav.team')}
                  </NavLink>
                </Grid>
              </Box>

              <ScrollView
                onScroll={(scrolled) => {
                  setShadow(scrolled ? 'md' : undefined)
                }}
              >
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(pathname)}
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
