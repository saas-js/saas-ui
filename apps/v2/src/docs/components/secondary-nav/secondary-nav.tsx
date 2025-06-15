import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useBreakpointValue,
  Icon,
  HStack,
} from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { ResponsiveMenu, ResponsiveMenuList } from '@saas-ui-pro/react'
import Link from 'next/link'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FiArrowLeft, FiChevronDown } from 'react-icons/fi'

type SecondaryNavLinkProps = {
  href: string
  isActive?: boolean
  children: React.ReactNode
  label?: string | JSX.Element
}

const SecondaryNavLink = ({
  href,
  isActive,
  children,
}: SecondaryNavLinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button as="a" variant="nav-link" isActive={isActive}>
        {children}
      </Button>
    </NextLink>
  )
}

type Links = {
  href: string
  label: string | JSX.Element
  match?: (asPath: string, href: string) => boolean
}[]

export const docsNav: Links = [
  {
    href: '/docs',
    label: 'Getting started',
    match: (asPath: string, href: string) =>
      asPath === '/docs' ||
      (href.startsWith('/docs/core') && asPath.startsWith('/docs/core')),
  },
  {
    href: '/docs/components',
    label: 'Components',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/components') &&
      asPath.startsWith('/docs/components'),
  },
  {
    href: '/docs/hooks/use-collapse',
    label: 'Hooks',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/hooks') && asPath.startsWith('/docs/hooks'),
  },
  {
    href: '/docs/guides',
    label: 'Guides',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/guides') && asPath.startsWith('/docs/guides'),
  },
]

export const proNav: Links = [
  {
    href: '/docs/pro',
    label: 'Getting started',
    match: (asPath: string, href: string) => asPath === '/docs/pro',
  },
  {
    href: '/docs/pro/packages',
    label: 'Packages',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/pro/packages') &&
      asPath.startsWith('/docs/pro/packages'),
  },
  {
    href: '/docs/nextjs-starter-kit',
    label: 'Next.js starter kit',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/nextjs-starter-kit') &&
      asPath.startsWith('/docs/nextjs-starter-kit'),
  },
]

const blogLinks: Links = [
  {
    href: '/blog',
    label: (
      <HStack role="group" spacing="1">
        <Icon
          as={FiArrowLeft}
          _groupHover={{
            transform: 'translateX(-5px)',
            transitionProperty: 'common',
            transitionDuration: 'normal',
          }}
        />{' '}
        <span>All articles</span>
      </HStack>
    ),
    match: (asPath: string, href: string) => asPath === '/blog',
  },
]

export const SecondaryNav = (props) => {
  const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isBlog = router.asPath.match(/\/blog/)
  const isPro = router.asPath.match(/\/pro/)

  const links = isBlog ? blogLinks : isPro ? proNav : docsNav

  const activeItem = links.find((link) =>
    link.match?.(router.asPath, link.href)
  )

  return (
    <Box
      top="60px"
      position="sticky"
      left="0"
      w="full"
      zIndex="100"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="slow"
      borderBottom="1px"
      // boxShadow={y > height ? 'md' : ''}
      bg="whiteAlpha.900"
      _dark={{
        bg: 'transparent',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        bottom: '-10px',
        backdropFilter: 'blur(16px)',
        mask: 'linear-gradient(to-b, black, transparent)',
        WebkitMask: 'linear-gradient(to bottom, black 48px, transparent)',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <Box position="relative" borderBottomWidth="1px">
        <Container maxW="container.2xl" px="2" py="1">
          <Stack spacing="2" direction="row" {...props}>
            {isMobile ? (
              <ResponsiveMenu>
                <MenuButton
                  as={Button}
                  rightIcon={<Icon as={FiChevronDown} />}
                  py="4"
                  variant="ghost"
                >
                  {activeItem?.label}
                </MenuButton>
                <ResponsiveMenuList>
                  {links.map((item) => (
                    <Link key={item.href} href={item.href} legacyBehavior>
                      <MenuItem>{item.label}</MenuItem>
                    </Link>
                  ))}
                </ResponsiveMenuList>
              </ResponsiveMenu>
            ) : (
              <>
                {links.map((item) => (
                  <SecondaryNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={item.match?.(router.asPath, item.href)}
                  >
                    {item.label}
                  </SecondaryNavLink>
                ))}
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
