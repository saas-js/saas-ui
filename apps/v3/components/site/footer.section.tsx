import { Logo } from '@/components/logo'
import {
  Box,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'

const linkTree = [
  {
    title: 'Resources',
    items: [
      {
        label: 'Affiliate program',
        href: 'https://saas-ui.lemonsqueezy.com/affiliates?aff_ref=nB1mj6rB',
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
      { label: 'Next.js starter kit', href: '/nextjs-starter-kit' },
      { label: 'Next.js boilerplate', href: '/nextjs-starter-kit' },
      { label: 'Base components', href: '/docs/components' },
      { label: 'Figma UI kit', href: '/figma' },
      { label: 'Blocks', href: '/blocks' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Contact', href: '/contact' },
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
              Crafted by <a href="https://appulse.net">Saas UI B.V.</a> &copy;{' '}
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
              <Stack key={column.title} direction="column" gap="4">
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
