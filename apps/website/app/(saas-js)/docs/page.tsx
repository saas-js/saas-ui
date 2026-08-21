import { Container, Grid, Heading, List, SkipNavContent, Stack, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

import { createSjsMetadata } from '@/lib/saas-js/metadata'

export const metadata = createSjsMetadata({
  title: 'Documentation',
  description: 'Guides and documentation for Saas.js starter kits and packages.',
  path: '/docs',
})

export default function Page() {
  return (
    <Container maxW="6xl">
      <SkipNavContent />
      <Stack minH="50vh" py="12">
        <Heading as="h2" size="4xl">
          Documentation
        </Heading>

        <Text textStyle="xl" color="fg.subtle" mb="8">
          Explore our guides and documentation to work with Saas.js
        </Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="12">
          <Stack gap="4">
            <Heading as="h3" size="xl">
              Starter kits
            </Heading>

            <List.Root textStyle="lg" gap="2" listStyle="none">
              <List.Item>
                <Link
                  href="/docs/starter-kits/nextjs"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Next.js
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/docs/starter-kits/tanstack-start"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Tanstack Start
                </Link>
              </List.Item>
            </List.Root>
          </Stack>

          <Stack gap="4">
            <Heading as="h3" size="xl">
              Packages
            </Heading>

            <List.Root textStyle="lg" gap="2" listStyle="none">
              <List.Item>
                <Link
                  href="/packages"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  All packages
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/packages/drizzle-crud/docs"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Drizzle CRUD
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/packages/conditions/docs"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Conditions
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/packages/slingshot/docs"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Slingshot
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/packages/better-auth-react-query/docs"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Better Auth React Query
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/packages/iconx/docs"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Iconx
                </Link>
              </List.Item>
            </List.Root>
          </Stack>
        </Grid>
      </Stack>
    </Container>
  )
}
