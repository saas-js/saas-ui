import { NavLinkProps } from '@/components/nav-link'
import { Badge, Box, HStack, Text } from '@chakra-ui/react'

const hideMobile = {
  // display: ['none', null, 'block'],
}

const headerNav: NavLinkProps[] = [
  { id: 'home', label: 'Home', display: 'none' },
  { id: 'features', label: 'Features', ...hideMobile },
  {
    href: '/themes',
    label: 'Themes',
    ...hideMobile,
  },
  {
    href: '/blocks',
    label: (
      <HStack justifyContent="center">
        <Text>Blocks</Text>
        <Badge
          rounded="full"
          colorScheme="primary"
          variant="solid"
          lineHeight={1.2}
          py="0.5"
          px="1.5"
          fontSize="2xs"
        >
          New
        </Badge>
      </HStack>
    ),
  },
  {
    href: '/pricing',
    label: 'Pricing',
    ...hideMobile,
  },
  { href: '/docs', label: 'Documentation', ...hideMobile },
]

export default headerNav
