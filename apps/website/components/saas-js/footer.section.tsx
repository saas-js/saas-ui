import { Logo } from '@/components/logo'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@saas-ui/react'
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
      { label: 'React components', href: '/docs/components' },

      { label: 'Next.js starter kit', href: '/pro/starter-kits/nextjs' },
      { label: 'Next.js boilerplate', href: '/pro/starter-kits/nextjs' },
      {
        label: 'Tanstack Start starter kit',
        href: '/pro/starter-kits/tanstack-start',
      },
      { label: 'Figma UI kit', href: '/pro/figma' },
      { label: 'Blocks', href: '/pro/blocks' },
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
