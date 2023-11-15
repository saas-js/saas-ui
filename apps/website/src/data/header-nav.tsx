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
    href: '/pricing',
    label: 'Pricing',
    ...hideMobile,
  },
  { href: '/docs', label: 'Documentation', ...hideMobile },
]

export default headerNav
