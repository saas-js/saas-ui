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
    label: (
      <HStack justifyContent="center">
        <Text>Themes</Text>
        <Box lineHeight={1.4}>
          <Badge
            variant="solid"
            colorScheme="primary"
            rounded="full"
            px="2"
            fontWeight="medium"
          >
            New!
          </Badge>
        </Box>
      </HStack>
    ),
    ...hideMobile,
  },
  {
    href: '/pricing',
    label: 'Pricing',
    ...hideMobile,
  },
  { href: '/docs/introduction', label: 'Documentation', ...hideMobile },
  {
    href: '/pricing',
    label: 'Buy Pro',
    variant: 'solid',
    colorScheme: 'primary',
    fontSize: 'sm',
  },
]

export default headerNav
