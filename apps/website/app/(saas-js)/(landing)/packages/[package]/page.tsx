import { InstallCommand } from '@/components/saas-js/install-command'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import {
  PACKAGE_IDS,
  getPackage,
  keywordPages,
  packageDocsPath,
} from '@/lib/saas-js/packages'
import {
  Box,
  Container,
  Heading,
  List,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Button } from '#components/ui/button'
import { Link as UILink } from '#components/ui/link'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ package: string }>
}

export async function generateStaticParams() {
  return PACKAGE_IDS.map((id) => ({ package: id }))
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const pkg = getPackage(params.package)

  if (!pkg) notFound()

  return createSjsMetadata({
    title: pkg.name,
    description: pkg.tagline,
    path: `/packages/${pkg.id}`,
  })
}

export default async function PackageLandingPage(props: Props) {
  const params = await props.params
  const pkg = getPackage(params.package)

  if (!pkg) notFound()

  return (
    <Box>
      <Container maxW="8xl" py={{ base: '12', md: '20' }}>
        <Stack gap="8" maxW="3xl">
          <Stack gap="4">
            <Heading as="h1" textStyle="5xl" textWrap="balance">
              {pkg.name}
            </Heading>
            <Text textStyle="xl" color="fg.subtle" fontWeight="medium" textWrap="pretty">
              {pkg.tagline}
            </Text>
          </Stack>

          <InstallCommand command={pkg.install} />

          {pkg.usedInStarterKit ? (
            <Text textStyle="sm" color="fg.muted">
              Used in the{' '}
              <UILink href="/">
                TanStack Start starter kit
              </UILink>
              .
            </Text>
          ) : null}

          <Box
            as="pre"
            fontFamily="mono"
            textStyle="sm"
            p="5"
            borderWidth="1px"
            borderStyle="dashed"
            overflow="auto"
            bg="bg"
            color="fg"
          >
            <Box as="code" whiteSpace="pre">
              {pkg.sample.code}
            </Box>
          </Box>

          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button variant="glass" colorPalette="accent" asChild>
              <Link href={packageDocsPath(pkg.id)}>Read the docs</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={pkg.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box borderTopWidth="1px" borderStyle="dashed">
        <Container maxW="8xl" py="16">
          <Heading as="h2" textStyle="2xl" mb="8">
            What it does
          </Heading>
          <List.Root ps="5" maxW="3xl" textStyle="md" color="fg.subtle" gap="3">
            {pkg.features.map((feature) => (
              <List.Item key={feature} textWrap="pretty">
                {feature}
              </List.Item>
            ))}
          </List.Root>
          {keywordPages.filter((page) => page.packageId === pkg.id).length > 0 ? (
            <Stack gap="3" mt="12" maxW="3xl">
              <Heading as="h2" textStyle="xl">
                Guides
              </Heading>
              {keywordPages
                .filter((page) => page.packageId === pkg.id)
                .map((page) => (
                  <UILink key={page.path} href={page.path}>
                    {page.title}
                  </UILink>
                ))}
            </Stack>
          ) : null}
        </Container>
      </Box>
    </Box>
  )
}
