import {
  CardBody,
  CardDescription,
  CardRoot,
  CardTitle,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Metadata } from 'next'
import Link from 'next/link'

import { showcases } from '.velite'

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'A collection of SaaS apps built with Saas UI',
  openGraph: {
    images: `/og?title=Showcase`,
  },
}

export default function Page() {
  return (
    <VStack pt="10" pb="16" gap="10">
      <VStack>
        <Heading as="h1" textStyle={{ base: '4xl', md: '5xl' }}>
          Showcase
        </Heading>
        <Text
          textWrap="balance"
          maxWidth="2xl"
          textAlign="center"
          color="fg.subtle"
        >
          A collection of SaaS apps built with Saas UI
        </Text>
      </VStack>

      <SimpleGrid minChildWidth="240px" gap="6">
        {showcases.map(({ title, description, url, image }) => (
          <CardRoot size="sm" key={url} asChild overflow="hidden">
            <Link href={url}>
              <Image
                src={image}
                alt={title}
                aspectRatio="16/9"
                objectFit="cover"
              />

              <CardBody>
                <CardTitle textStyle="sm">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardBody>
            </Link>
          </CardRoot>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
