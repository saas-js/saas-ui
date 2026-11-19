import { getLatestChangelog } from '@/lib/get-latest-changelog'
import { highlightCode } from '@/lib/highlight-code'
import type { SeoLandingContent } from '@/lib/saas-js/seo-pages'
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'

import { Button } from '#components/ui/button'

import { CustomersSection } from './customers.section'
import { FeatureTile, markLines } from './features.section'
import {
  ApiStage,
  BillingStage,
  UiStage,
  WorkspacesStage,
} from './features/feature-stages'
import { billingConfigCode, routerCode } from './features/snippets'
import { HeroProof } from './hero.ui'
import { TestimonialsSection } from './testimonials.section'

/**
 * Long-form landing page for a framework keyword. Deliberately answers the
 * research query (stack, contents, build-vs-buy, why this framework) instead
 * of repeating the product pitch on `/` and `/nextjs`. It shares the
 * homepage's visual language: the same hero type, the feature-tile mockups and
 * solid section dividers.
 */
export async function SeoLanding({ content }: { content: SeoLandingContent }) {
  const [configHtml, routerHtml] = await Promise.all([
    highlightCode(billingConfigCode, { lang: 'ts' }),
    highlightCode(routerCode, { lang: 'ts' }),
  ])

  const stages = {
    workspaces: <WorkspacesStage />,
    billing: <BillingStage configHtml={markLines(configHtml, [7])} />,
    ui: <UiStage />,
    api: <ApiStage routerHtml={markLines(routerHtml, [10])} />,
  }

  const changelog = getLatestChangelog(['tanstack', 'tanstack-start', 'nextjs'])
  const latestChangelog = changelog
    ? { title: changelog.title, link: `/changelog/${changelog.slug}` }
    : null

  return (
    <>
      {/* FAQPage markup makes the questions eligible for rich results. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // `<` is escaped per Next's JSON-LD guide, so content can never
          // break out of the script tag.
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }).replace(/</g, '\\u003c'),
        }}
      />

      <Box
        as="section"
        pt={{ base: '24', md: '36' }}
        pb={{ base: '8', md: '12' }}
      >
        <Container maxW="8xl">
          <Stack gap={{ base: '8', md: '10' }}>
            <Heading
              as="h1"
              fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }}
              lineHeight="1.05"
              letterSpacing="tight"
              textWrap="balance"
              maxW="4xl"
            >
              {content.h1}
            </Heading>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'start', md: 'end' }}
              gap={{ base: '6', md: '8' }}
            >
              <Stack gap={{ base: '6', md: '8' }} maxW="xl">
                <Text textStyle={{ base: 'md', md: 'lg' }} color="fg.subtle">
                  {content.intro}
                </Text>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  gap="3"
                  width={{ base: 'full', sm: 'auto' }}
                >
                  <Button
                    size="lg"
                    minW={{ sm: '160px' }}
                    asChild
                    variant="glass"
                    colorPalette="accent"
                  >
                    <Link href="/pricing">Buy now, $200</Link>
                  </Button>
                  <Button
                    size="lg"
                    minW={{ sm: '160px' }}
                    asChild
                    variant="outline"
                    colorPalette="neutral"
                  >
                    <Link href={content.docsHref}>Read the docs</Link>
                  </Button>
                </Stack>
              </Stack>
              <HeroProof latestChangelog={latestChangelog} />
            </Flex>
          </Stack>
        </Container>
      </Box>

      <CustomersSection />

      <PageSection
        title="What tech stack does it use?"
        description="These are the defaults. Every one of them is swappable."
      >
        <ComparisonTable
          columns={['Layer', 'Choice', 'Why']}
          rows={content.stack.map((row) => [row.layer, row.choice, row.note])}
          mutedColumn={2}
          widths={['18%', '27%', '55%']}
        />
      </PageSection>

      <PageSection
        title="What's included?"
        description={`The parts every SaaS needs before its first customer, built into the ${content.framework} kit.`}
      >
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
          columnGap={{ md: '10', xl: '16' }}
          rowGap={{ base: '16', md: '20' }}
        >
          {content.included.map((item) =>
            item.stage ? (
              <FeatureTile
                key={item.title}
                headingAs="h3"
                title={item.title}
                description={item.body}
                stage={stages[item.stage]}
              />
            ) : (
              <CardCell key={item.title} title={item.title} body={item.body} />
            ),
          )}
        </Grid>
      </PageSection>

      <PageSection
        title="Why not just generate it?"
        description="An agent will scaffold sign-in this afternoon. The question is what your tenth feature looks like, and whether you would notice it getting something wrong."
      >
        <ComparisonTable
          columns={['Area', 'Generated from a prompt', 'In the kit']}
          rows={content.generateVsKit.map((row) => [
            row.area,
            row.generated,
            row.withKit,
          ])}
          mutedColumn={1}
          widths={['18%', '32%', '50%']}
        />
      </PageSection>

      <PageSection title={`Why ${content.framework} for a SaaS with agents?`}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gridAutoRows={{ md: 'auto' }}
          columnGap={{ base: '8', md: '10' }}
          rowGap={{ base: '8', md: '12' }}
        >
          {content.whyFramework.map((item) => (
            <CardCell key={item.title} title={item.title} body={item.body} />
          ))}
        </Grid>
      </PageSection>

      <TestimonialsSection />

      <PageSection title="Frequently asked questions">
        <Stack gap="8" maxW="3xl">
          {content.faq.map((item) => (
            <Stack key={item.q} gap="2">
              <Heading as="h3" textStyle="lg">
                {item.q}
              </Heading>
              <Text color="fg.subtle" textWrap="pretty">
                {item.a}
              </Text>
            </Stack>
          ))}
        </Stack>
      </PageSection>

      <Box as="section" py={{ base: '16', md: '28' }} borderTopWidth="1px">
        <Container maxW="8xl">
          <Stack align="center" textAlign="center" gap={{ base: '6', md: '8' }}>
            <Heading
              as="h2"
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              lineHeight="1.05"
              letterSpacing="tight"
              fontWeight="medium"
              textWrap="balance"
            >
              Start with the boring parts done
            </Heading>
            <Text textStyle="lg" color="fg.subtle" maxW="xl">
              One-time purchase with lifetime access. Unlimited self-hosted
              projects.
            </Text>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              gap="3"
              justify="center"
              width={{ base: 'full', sm: 'auto' }}
              pt="2"
            >
              <Button
                size="lg"
                minW={{ sm: '160px' }}
                asChild
                variant="glass"
                colorPalette="accent"
              >
                <Link href="/pricing">See pricing</Link>
              </Button>
              <Button
                size="lg"
                minW={{ sm: '160px' }}
                asChild
                variant="outline"
                colorPalette="neutral"
              >
                <Link href={content.productHref}>
                  About the {content.framework} kit
                </Link>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

/** A full-width section with the homepage's solid divider and heading style. */
function PageSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Box as="section" py={{ base: '16', md: '24' }} borderTopWidth="1px">
      <Container maxW="8xl">
        <Stack gap="4" mb={{ base: '10', md: '14' }}>
          <Heading as="h2" textStyle="4xl" letterSpacing="tight">
            {title}
          </Heading>
          {description && (
            <Text
              textStyle="lg"
              color="fg.subtle"
              fontWeight="medium"
              maxW="2xl"
              textWrap="pretty"
            >
              {description}
            </Text>
          )}
        </Stack>
        {children}
      </Container>
    </Box>
  )
}

/** Plain rules between rows, no outer box, so it reads as part of the page. */
function ComparisonTable({
  columns,
  rows,
  mutedColumn,
  widths,
}: {
  columns: string[]
  rows: string[][]
  /** Column widths, so short labels do not take an equal share. */
  widths: string[]
  /** Index of the column rendered in the subdued colour. */
  mutedColumn: number
}) {
  return (
    <Box overflowX="auto">
      <Table.Root
        size="lg"
        variant="line"
        minW="3xl"
        css={{ tableLayout: 'fixed' }}
      >
        <Table.Header>
          <Table.Row bg="transparent">
            {columns.map((column, index) => (
              <Table.ColumnHeader
                key={column}
                color="fg.muted"
                fontWeight="medium"
                textStyle="sm"
                width={widths[index]}
              >
                {column}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row[0]} bg="transparent">
              {row.map((cell, index) => (
                <Table.Cell
                  key={index}
                  verticalAlign="top"
                  fontWeight={index === 0 ? 'medium' : undefined}
                  color={index === mutedColumn ? 'fg.subtle' : undefined}
                  textWrap="pretty"
                >
                  {cell}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

/**
 * A heading-plus-body cell that inherits the parent grid's rows, so headings
 * of different lengths still leave every body text starting on the same line.
 */
function CardCell({ title, body }: { title: string; body: string }) {
  return (
    <Box
      display="grid"
      gridTemplateRows={{ md: 'subgrid' }}
      gridRow={{ md: 'span 2' }}
      gap="2"
      alignContent="start"
    >
      <Heading as="h3" textStyle="lg" textWrap="balance">
        {title}
      </Heading>
      <Text color="fg.subtle" textWrap="pretty">
        {body}
      </Text>
    </Box>
  )
}
