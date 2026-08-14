import {
  AspectRatio,
  Badge,
  Card,
  Container,
  Grid,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'A collection of SaaS products powered by Saas.js',
  openGraph: {
    images: `/og?title=Showcase`,
  },
}

export default async function Page() {
  const { default: showcases } = await import('../../../content/showcases.json')

  return (
    <Container maxW="6xl">
      <VStack pt="20" pb="16" gap="10">
        <Stack py="20" width="full" alignItems="flex-start">
          <Badge variant="outline" size="lg" colorPalette="gray">
            Showcase
          </Badge>

          <Heading as="h1" size="6xl" lineHeight="1.2">
            Products powered
            <br /> by Saas.js
          </Heading>

          <Text textStyle="xl" color="fg.subtle">
            Trusted by 600+ developers and teams worldwide.
          </Text>
        </Stack>

        <Grid
          gap="6"
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          width="full"
        >
          {showcases?.map(({ title, description, url, image }) => (
            <Card.Root size="sm" key={url} asChild overflow="hidden">
              <LinkBox>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={image}
                    alt={title}
                    style={{ objectFit: 'fill' }}
                    width={340}
                    height={340 * (16 / 9)}
                  />
                </AspectRatio>

                <Card.Body>
                  <Card.Title textStyle="sm" asChild>
                    <Link href={url}>
                      <LinkOverlay>{title}</LinkOverlay>
                    </Link>
                  </Card.Title>
                  <Card.Description>{description}</Card.Description>
                </Card.Body>
              </LinkBox>
            </Card.Root>
          ))}
        </Grid>
      </VStack>
    </Container>
  )
}
