import { InstallCommand } from '@/components/saas-js/install-command'
import { highlightCode } from '@/lib/highlight-code'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import {
  formatRelativeDate,
  formatWeeklyDownloads,
  getNpmPackageStats,
} from '@/lib/saas-js/npm'
import {
  PACKAGE_IDS,
  getPackage,
  packageDocsPath,
  packageGuides,
  packageGroups,
} from '@/lib/saas-js/packages'
import {
  Box,
  Card,
  Container,
  Grid,
  HStack,
  Heading,
  List,
  Stack,
  Text,
} from '@chakra-ui/react'
import { notFound } from 'next/navigation'

import { LinkButton } from '@/components/link-button'
import { PackageMark } from '@/components/saas-js/package-mark'
import { Button } from '#components/ui/button'
import { Link as UILink } from '#components/ui/link'
import { TbArrowLeft } from 'react-icons/tb'

interface Props {
  params: Promise<{ package: string }>
}

export const revalidate = 86400

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

  const stats = await getNpmPackageStats(pkg.npm)
  const guides = packageGuides.filter((page) => page.packageId === pkg.id)
  const category =
    packageGroups.find((group) => group.id === pkg.group)?.label ?? pkg.group

  const facts = [
    stats.version ? { label: 'Version', value: stats.version } : null,
    { label: 'Category', value: category },
    stats.weeklyDownloads != null
      ? {
          label: 'Downloads',
          value: formatWeeklyDownloads(stats.weeklyDownloads),
        }
      : null,
    stats.lastUpdated
      ? {
          label: 'Last updated',
          value: formatRelativeDate(stats.lastUpdated),
        }
      : null,
  ].filter(Boolean) as { label: string; value: string }[]

  const sampleHtml = await highlightCode(pkg.sample.code, {
    lang: pkg.sample.language,
  })

  return (
    <Box mb="-8" overflowX="hidden">
      <Container>
        <Box
          position="relative"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="border"
          minH={{ lg: 'calc(100vh - 64px)' }}
        >
          <BleedRule position="absolute" top="0" />
          <Box px={{ base: '6', md: '8' }} py={{ base: '8', md: '10' }}>
            <Stack gap="6">
              <UILink
                href="/packages"
                colorPalette="accent"
                width="fit-content"
              >
                <TbArrowLeft /> Overview
              </UILink>

              <HStack gap="5" align="center" justify="space-between">
                <HStack gap="5" align="center" minW="0">
                  <PackageMark
                    mark={pkg.mark}
                    logo={pkg.logo}
                    logoFramed={pkg.logoFramed}
                    name={pkg.name}
                  />
                  <Stack gap="1" minW="0">
                    <Heading
                      as="h1"
                      textStyle={{ base: '3xl', md: '4xl' }}
                      fontWeight="semibold"
                      letterSpacing="-0.03em"
                    >
                      {pkg.name}
                    </Heading>
                    <Text
                      textStyle={{ base: 'md', md: 'lg' }}
                      color="fg.muted"
                      textWrap="pretty"
                    >
                      {pkg.tagline}
                    </Text>
                  </Stack>
                </HStack>
                <LinkButton
                  href={packageDocsPath(pkg.id)}
                  variant="surface"
                  size="lg"
                  flexShrink="0"
                >
                  Documentation
                </LinkButton>
              </HStack>
            </Stack>
          </Box>

          <Box position="relative">
            <BleedRule />

            <Grid
              templateColumns={{
                base: '1fr',
                lg: 'minmax(0, 1fr) minmax(18rem, 30%)',
              }}
            >
              <Box
                px={{ base: '6', md: '8' }}
                py={{ base: '10', md: '14' }}
                borderBottomWidth={{ base: '1px', lg: '0' }}
                borderColor="border"
              >
                <Stack gap="8" maxW="3xl">
                  <Stack gap="4" maxW="65ch">
                    {(Array.isArray(pkg.description)
                      ? pkg.description
                      : [pkg.description]
                    ).map((paragraph) => (
                      <Text
                        key={paragraph}
                        textStyle="md"
                        color="fg"
                        lineHeight="1.7"
                        textWrap="pretty"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </Stack>

                  <Card.Root overflow="hidden">
                    <Card.Body p="0">
                      <Box
                        className="code-highlight"
                        overflow="auto"
                        css={{
                          '& pre.shiki': {
                            my: '0',
                            p: '5',
                            bg: 'transparent!',
                          },
                          '& pre.shiki, & pre.shiki span': {
                            bg: 'transparent!',
                          },
                        }}
                        dangerouslySetInnerHTML={{ __html: sampleHtml }}
                      />
                    </Card.Body>
                  </Card.Root>

                  {guides.length > 0 ? (
                    <Stack gap="3">
                      <Heading as="h3" textStyle="lg" fontWeight="semibold">
                        Useful guides
                      </Heading>
                      <List.Root as="ul" display="block" ps="5">
                        {guides.map((page) => (
                          <List.Item key={page.path} mb="2">
                            <UILink href={page.path} colorPalette="accent">
                              {page.title}
                            </UILink>
                          </List.Item>
                        ))}
                      </List.Root>
                    </Stack>
                  ) : null}
                </Stack>
              </Box>

              <Box
                borderLeftWidth={{ lg: '1px' }}
                borderColor="border"
                px={{ base: '6', md: '8' }}
                py={{ base: '10', md: '14' }}
              >
                <Stack gap="8">
                  <Stack gap="6">
                    {facts.map((fact) => (
                      <Stack key={fact.label} gap="1">
                        <Text textStyle="sm" color="fg.muted">
                          {fact.label}
                        </Text>
                        <Text textStyle="md" color="fg">
                          {fact.value}
                        </Text>
                      </Stack>
                    ))}
                  </Stack>

                  <InstallCommand command={pkg.install} />

                  <Stack gap="3">
                    <Button variant="surface" width="full" asChild>
                      <a href={pkg.github} target="_blank" rel="noreferrer">
                        View source
                      </a>
                    </Button>
                    <Button variant="surface" width="full" asChild>
                      <a href={pkg.npmUrl} target="_blank" rel="noreferrer">
                        View on NPM
                      </a>
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>

      <BleedRule />
    </Box>
  )
}

function BleedRule(props: { position?: 'absolute'; top?: string }) {
  return (
    <Box
      borderTopWidth="1px"
      borderColor="border"
      w="100vw"
      ml="50%"
      transform="translateX(-50%)"
      pointerEvents="none"
      {...props}
    />
  )
}
