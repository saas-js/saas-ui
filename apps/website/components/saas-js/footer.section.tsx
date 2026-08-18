import { Logo } from '@/components/logo'
import { Box, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

const linkTree = [
  {
    title: 'Resources',
    items: [
      { label: 'TanStack Start kit', href: '/' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Affiliate program', href: 'https://saas-ui.affonso.io' },
    ],
  },
  {
    title: 'Packages',
    items: [
      { label: 'All packages', href: '/packages' },
      { label: 'Drizzle CRUD', href: '/packages/drizzle-crud' },
      { label: 'Conditions', href: '/packages/conditions' },
      { label: 'Slingshot', href: '/packages/slingshot' },
      { label: 'Better Auth React Query', href: '/packages/better-auth-react-query' },
      { label: 'Iconx', href: '/packages/iconx' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Saas UI', href: 'https://saas-ui.dev' },
      { label: 'License', href: '/license' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export const FooterSection = () => {
  return (
    <footer role="contentinfo">
      <Container py="8" fontSize="sm">
        <Stack
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-between"
          align="flex-start"
          gap="8"
        >
          <Stack align="flex-start" gap="4">
            <Logo />
            <Text color="fg.subtle">
              Crafted by Saas UI B.V. in the Netherlands &copy;{' '}
              {new Date().getFullYear()}
            </Text>
          </Stack>
          <SimpleGrid
            width="full"
            columns={{ base: 1, sm: 3 }}
            gap="10"
            maxW={{ md: '2xl' }}
            pb="20"
          >
            {linkTree.map((column) => (
              <Stack key={column.title} direction="column" gap="2.5">
                <Heading as="h5" size="md" fontWeight="medium">
                  {column.title}
                </Heading>
                {column.items.map((item) => (
                  <Box
                    key={item.label}
                    asChild
                    color="fg.subtle"
                    _hover={{ color: 'fg' }}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Box>
                ))}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </footer>
  )
}
