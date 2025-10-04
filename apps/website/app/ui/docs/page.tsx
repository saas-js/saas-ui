import { LinkButton } from '@/components/link-button'
import {
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Link,
  List,
  Separator,
  SkipNavContent,
  Stack,
  Text,
} from '@saas-ui/react'
import { FaDiscord } from 'react-icons/fa'
import { TbBrandGithub, TbExternalLink, TbLifebuoy } from 'react-icons/tb'

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
              Saas UI
            </Heading>

            <List.Root textStyle="md" gap="2">
              <List.Item>
                <Link href="/docs/getting-started/introduction">
                  Getting started
                </Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/components/overview">Components</Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/theming/overview">Theming</Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/styling/overview">Styling</Link>
              </List.Item>
            </List.Root>
          </Stack>

          <Stack gap="4">
            <Heading as="h3" size="lg">
              Pro
            </Heading>

            <List.Root textStyle="md" gap="2">
              <List.Item>
                <Link href="/docs/pro/getting-started/introduction">
                  Getting started
                </Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/pro/components/data-grid">Data grid</Link>
              </List.Item>
              <List.Item>
                <Link href="/docs/pro/components/kanban">Kanban</Link>
              </List.Item>
            </List.Root>
          </Stack>

          <Stack gap="4">
            <Heading as="h3" size="lg">
              Starter kits
            </Heading>

            <List.Root textStyle="md" gap="2">
              <List.Item>
                <Link href="https://saas-js.com/docs/starter-kits/nextjs">
                  Next.js <TbExternalLink />
                </Link>
              </List.Item>
              <List.Item>
                <Link href="https://saas-js.com/docs/starter-kits/tanstack-start">
                  Tanstack Start <TbExternalLink />
                </Link>
              </List.Item>
            </List.Root>
          </Stack>
        </Grid>

        <Separator my="16" borderStyle="dashed" />

        <Grid templateColumns="repeat(2, 1fr)" gap="16">
          <Card.Root>
            <Card.Header>
              <Card.Title>Join the community</Card.Title>
            </Card.Header>
            <Card.Body>
              <LinkButton href="/discord">
                <FaDiscord /> Discord
              </LinkButton>
            </Card.Body>
          </Card.Root>

          <Box>
            <List.Root variant="plain" gap="2">
              <List.Item fontWeight="medium" textStyle="md">
                <List.Indicator>
                  <TbBrandGithub size="18" />
                </List.Indicator>
                <span>
                  Found a bug?{' '}
                  <Link href="https://github.com/saas-js/saas-ui/issues">
                    Open an Issue
                  </Link>
                </span>
              </List.Item>
              <List.Item fontWeight="medium" textStyle="md">
                <List.Indicator>
                  <TbLifebuoy size="18" />
                </List.Indicator>
                <span>
                  Missing something?{' '}
                  <Link href="https://roadmap.saas-ui.dev">
                    Feature request
                  </Link>
                </span>
              </List.Item>
            </List.Root>
          </Box>
        </Grid>
      </Stack>
    </Container>
  )
}
