import {
  Badge,
  Card,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@saas-ui/react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'A collection of SaaS products powered by Saas UI',
  openGraph: {
    images: `/og?title=Showcase`,
  },
}

export default async function Page() {
  const { default: showcases } = await import('../../content/showcases.json')

  return (
    <Container maxW="6xl">
      <VStack pt="20" pb="16" gap="10">
        <Stack py="20" width="full" alignItems="flex-start">
          <Badge variant="outline" size="lg" colorPalette="gray">
            Showcase
          </Badge>

          <Heading as="h1" size="6xl" lineHeight="1.2">
            Products powered
            <br /> by Saas UI
          </Heading>

          <Text textStyle="xl" color="fg.subtle">
            Trusted by 600+ developers and teams worldwide.
          </Text>
        </Stack>

        <SimpleGrid
          minChildWidth="480px"
          gap="6"
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
        >
          {showcases?.map(({ title, description, url, image }) => (
            <Card.Root size="sm" key={url} asChild overflow="hidden">
              <Link href={url}>
                <Image
                  src={image}
                  alt={title}
                  aspectRatio="16/9"
                  objectFit="fill"
                />

                <Card.Body>
                  <Card.Title textStyle="sm">{title}</Card.Title>
                  <Card.Description>{description}</Card.Description>
                </Card.Body>
              </Link>
            </Card.Root>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}
