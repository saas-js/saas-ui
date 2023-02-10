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
} from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { ResponsiveMenu, ResponsiveMenuList } from '@saas-ui/pro'
import Link from 'next/link'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FiChevronDown } from 'react-icons/fi'

type SecondaryNavLinkProps = {
  href: string
  isActive?: boolean
  children: React.ReactNode
  label?: string
}

const SecondaryNavLink = ({
  href,
  isActive,
  children,
}: SecondaryNavLinkProps) => {
  const linkColor = useColorModeValue('gray.900', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        py="2"
        px="3"
        align="center"
        fontSize="md"
        fontWeight="medium"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={isActive ? linkColor : 'muted'}
        _hover={{ color: linkColor }}
      >
        {children}
      </Flex>
    </NextLink>
  )
}

export const docsNav = [
  {
    href: '/docs/introduction',
    label: 'Introduction',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/introduction') &&
      asPath.startsWith('/docs/introduction'),
  },
  {
    href: '/docs/core/overview',
    label: 'Core',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/core') && asPath.startsWith('/docs/core'),
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
    href: '/docs/pro/overview',
    label: 'Pro',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/pro') && asPath.startsWith('/docs/pro'),
  },
  {
    href: '/changelog',
    label: 'Changelog',
    match: (asPath: string, href: string) =>
      href.startsWith('/changelog') && asPath.startsWith('/changelog'),
  },
]

const blogLinks = [
  {
    href: '/blog',
    label: 'Blog',
    match: (asPath: string, href: string) =>
      href.startsWith('/blog') && asPath.startsWith('/blog'),
  },
]

export const SecondaryNav = (props) => {
  const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isBlog = router.asPath.match(/\/blog/)

  const links = isBlog ? blogLinks : docsNav

  const activeItem = links.find((link) => link.match(router.asPath, link.href))

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
      }}
    >
      <Box position="relative" borderBottomWidth="1px">
        <Container maxW="container.2xl" px="6" py="1">
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
