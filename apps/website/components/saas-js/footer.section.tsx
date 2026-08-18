import { Logo } from '@/components/saas-js/logo'
import { Box, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

const linkTree = [
  {
    title: 'Resources',
    items: [
      {
        label: 'Affiliate program',
        href: 'https://saas-ui.affonso.io',
      },
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Roadmap', href: 'https://roadmap.saas-ui.dev' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Products',
    items: [
      {
        label: 'Tanstack Start starter kit',
        href: '/',
      },
      { label: 'Next.js starter kit', href: '/' },
      {
        label: 'Drizzle CRUD',
        href: '/docs/drizzle-crud',
      },
      {
        label: 'Slingshot',
        href: '/docs/slingshot',
      },
      {
        label: 'Iconx',
        href: '/docs/iconx',
      },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'License', href: '/license' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export const FooterSection = () => {
  return (
    <footer>
      <Container py="8" fontSize="sm">
        <Stack
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-between"
          align="flex-start"
          gap="8"
        >
          <Stack align="flex-start" gap="4" maxW="sm">
            <Logo />
            <Text color="fg.subtle" textWrap="pretty">
              SaaS.js is built by{' '}
              <Box asChild color="fg" _hover={{ textDecoration: 'underline' }}>
                <Link href="https://saas-ui.dev">Saas UI B.V.</Link>
              </Box>
              {' '}in the Netherlands &copy;{' '}
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
                <Heading as="h2" size="md" fontWeight="medium">
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
