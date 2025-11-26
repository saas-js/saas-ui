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
    <Container maxW="4xl">
      <SkipNavContent />
      <Stack minH="50vh" py="12">
        <Heading as="h2" size="4xl" mb="8">
          Documentation
        </Heading>

        <Grid templateColumns="repeat(3, 1fr)" gap="12">
          <Stack gap="4">
            <Heading as="h3" size="lg">
              Starter kits
            </Heading>

            <List.Root textStyle="md" gap="2">
              <List.Item>
                <Link href="/docs/starter-kits/nextjs">Next.js</Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/starter-kits/tanstack-start">
                  Tanstack Start
                </Link>
              </List.Item>
            </List.Root>
          </Stack>

          <Stack gap="4">
            <Heading as="h3" size="lg">
              Utilities
            </Heading>

            <List.Root textStyle="md" gap="2">
              <List.Item>
                <Link href="/docs/drizzle-crud">Drizzle CRUD</Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/slingshot">Slingshot</Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/iconx">Iconx</Link>
              </List.Item>
            </List.Root>
          </Stack>

          <Stack gap="4">
            <Heading as="h3" size="lg">
              UI
            </Heading>

            <List.Root textStyle="md" gap="2">
              <List.Item>
                <Link href="https://saas-ui.dev/docs">
                  Saas UI <TbExternalLink />
                </Link>
              </List.Item>
              <List.Item>
                <Link href="https://saas-ui.dev/docs/pro">
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
