import { NavLinkProps } from '@/components/nav-link'
import { Badge, HStack, Text } from '@chakra-ui/react'

const headerNav: (NavLinkProps & { authenticated?: boolean })[] = [
  { id: 'home', label: 'Home', display: 'none' },
  { id: 'features', label: 'Features' },
  {
    href: '/themes',
    label: 'Themes',
  },
  {
    href: '/figma',
    label: 'Figma',
  },
  {
    href: '/blocks',
    authenticated: true,
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
  },
  { href: '/docs', label: 'Documentation' },
]

export default headerNav
