import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { Section } from '#components/ui/section'
import Link from 'next/link'

import { Button } from '#components/ui/button'
import type { SeoLandingContent } from '@/lib/saas-js/seo-pages'

import { CustomersSection } from './customers.section'
import { TestimonialsSection } from './testimonials.section'

/**
 * Long-form landing page for a framework keyword. Deliberately answers the
 * research query (stack, contents, build-vs-buy, why this framework) instead
 * of repeating the product pitch on `/` and `/nextjs`.
 */
export function SeoLanding({ content }: { content: SeoLandingContent }) {
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

      <Box as="section" pt={{ base: '24', md: '36' }} pb="16">
        <Container maxW="5xl">
          <Stack gap="6">
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              lineHeight="1.05"
              letterSpacing="tight"
              textWrap="balance"
            >
              {content.h1}
            </Heading>
            <Text textStyle={{ base: 'md', md: 'lg' }} color="fg.subtle" maxW="3xl">
              {content.intro}
            </Text>
            <HStack gap="3" pt="2" flexWrap="wrap">
              <Button size="lg" asChild variant="glass" colorPalette="accent">
                <Link href="/pricing">Buy now, $200</Link>
              </Button>
              <Button size="lg" asChild variant="outline" colorPalette="neutral">
                <Link href={content.docsHref}>Read the docs</Link>
              </Button>
            </HStack>
          </Stack>
        </Container>
      </Box>

      <CustomersSection />

      <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
        <Container maxW="5xl">
          <Stack gap="4" mb="10">
            <Heading as="h2" textStyle="4xl" letterSpacing="tight">
              What tech stack does it use?
            </Heading>
            <Text textStyle="lg" color="fg.subtle" maxW="2xl">
              These are the defaults. Every one of them is swappable.
            </Text>
          </Stack>

          <Box overflowX="auto">
            <Table.Root size="md" variant="outline" minW="3xl">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Layer</Table.ColumnHeader>
                  <Table.ColumnHeader>Choice</Table.ColumnHeader>
                  <Table.ColumnHeader>Why</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {content.stack.map((row) => (
                  <Table.Row key={row.layer}>
                    <Table.Cell fontWeight="medium" whiteSpace="nowrap">
                      {row.layer}
                    </Table.Cell>
                    <Table.Cell whiteSpace="nowrap">{row.choice}</Table.Cell>
                    <Table.Cell color="fg.subtle">{row.note}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Container>
      </Section.Root>

      <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
        <Container maxW="5xl">
          <Heading as="h2" textStyle="4xl" letterSpacing="tight" mb="10">
            What&apos;s included?
          </Heading>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gridAutoRows={{ md: 'auto' }}
            gap={{ base: '8', md: '10' }}
          >
            {content.included.map((item) => (
              <CardCell key={item.title} title={item.title} body={item.body} />
            ))}
          </Grid>
        </Container>
      </Section.Root>

      <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
        <Container maxW="5xl">
          <Stack gap="4" mb="10">
            <Heading as="h2" textStyle="4xl" letterSpacing="tight">
              Why not just generate it?
            </Heading>
            <Text textStyle="lg" color="fg.subtle" maxW="2xl">
              An agent will scaffold sign-in this afternoon. The question is
              what your tenth feature looks like, and whether you would notice
              it getting something wrong.
            </Text>
          </Stack>

          <Box overflowX="auto">
            <Table.Root size="md" variant="outline" minW="3xl">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Area</Table.ColumnHeader>
                  <Table.ColumnHeader>Generated from a prompt</Table.ColumnHeader>
                  <Table.ColumnHeader>In the kit</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {content.generateVsKit.map((row) => (
                  <Table.Row key={row.area}>
                    <Table.Cell fontWeight="medium" whiteSpace="nowrap">
                      {row.area}
                    </Table.Cell>
                    <Table.Cell color="fg.subtle">{row.generated}</Table.Cell>
                    <Table.Cell>{row.withKit}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Container>
      </Section.Root>

      <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
        <Container maxW="5xl">
          <Heading as="h2" textStyle="4xl" letterSpacing="tight" mb="10">
            Why {content.framework} for a SaaS with agents?
          </Heading>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gridAutoRows={{ md: 'auto' }}
            gap={{ base: '8', md: '10' }}
          >
            {content.whyFramework.map((item) => (
              <CardCell key={item.title} title={item.title} body={item.body} />
            ))}
          </Grid>
        </Container>
      </Section.Root>

      <TestimonialsSection />

      <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
        <Container maxW="3xl">
          <Heading as="h2" textStyle="4xl" letterSpacing="tight" mb="10">
            Frequently asked questions
          </Heading>
          <Stack gap="8">
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
        </Container>
      </Section.Root>

      <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
        <Container maxW="3xl">
          <Stack gap="6" alignItems="flex-start">
            <Heading as="h2" textStyle="4xl" letterSpacing="tight">
              Start with the boring parts done
            </Heading>
            <Text textStyle="lg" color="fg.subtle">
              One-time purchase with lifetime access. Unlimited self-hosted
              projects.
            </Text>
            <HStack gap="3" flexWrap="wrap">
              <Button size="lg" asChild variant="glass" colorPalette="accent">
                <Link href="/pricing">See pricing</Link>
              </Button>
              <Button size="lg" asChild variant="outline" colorPalette="neutral">
                <Link href={content.productHref}>
                  About the {content.framework} kit
                </Link>
              </Button>
            </HStack>
          </Stack>
        </Container>
      </Section.Root>
    </>
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
