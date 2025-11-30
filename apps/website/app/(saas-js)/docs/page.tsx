import {
  Container,
  Grid,
  Heading,
  Link,
  List,
  SkipNavContent,
  Stack,
  Text,
} from '@saas-ui/react'
import { TbExternalLink } from 'react-icons/tb'

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

        <Grid templateColumns="repeat(3, 1fr)" gap="12">
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
              Utilities
            </Heading>

            <List.Root textStyle="lg" gap="2" listStyle="none">
              <List.Item>
                <Link
                  href="/docs/drizzle-crud"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Drizzle CRUD
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/docs/slingshot"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Slingshot
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/docs/iconx"
                  colorPalette="cyan"
                  fontWeight="medium"
                >
                  Iconx
                </Link>
              </List.Item>
            </List.Root>
          </Stack>

          <Stack gap="4">
            <Heading as="h3" size="xl">
              UI
            </Heading>

            <List.Root textStyle="lg" gap="2" listStyle="none">
              <List.Item>
                <Link
                  href="https://saas-ui.dev/docs"
                  colorPalette="indigo"
                  fontWeight="medium"
                >
                  Saas UI <TbExternalLink />
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="https://saas-ui.dev/docs/pro"
                  colorPalette="indigo"
                  fontWeight="medium"
                >
                  Saas UI Pro <TbExternalLink />
                </Link>
              </List.Item>
            </List.Root>
          </Stack>
        </Grid>
      </Stack>
    </Container>
  )
}
