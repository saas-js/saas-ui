'use client'

import {
  Box,
  Carousel,
  Flex,
  Grid,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

import { Avatar } from '#components/ui/avatar'
import { Section } from '#components/ui/section'

const testimonials = [
  {
    name: 'Simon Høiberg',
    role: 'Founder',
    company: { name: 'Aidbase', href: 'https://aidbase.ai/' },
    avatar:
      'https://senjaio.b-cdn.net/public/avatar/33d3d3ac-530d-4a2a-a2a9-93621e00bb1d_1698499800957.jpg?width=96',
    quote:
      'At Aidbase, we’re developing a framework-agnostic component library to support our various chatbots, ticket forms, and other widgets. It’s challenging building something that’s a great developer experience and performing well at the same time. SaaS UI has been a massive help in this.',
  },
  {
    name: 'Michael Andreuzza',
    role: 'Founder',
    company: { name: 'Lexington Themes', href: 'https://lexingtonthemes.com' },
    avatar:
      'https://cdn.senja.io/public/avatar/5e93a8cc-0204-422a-a509-546cd0a634a6_actual.png?width=96',
    quote:
      'I’ve watched Saas.js grow over time, and you can really see the care that goes into it. Every update feels purposeful. It’s the kind of product you instantly recognize as being built by someone who truly gets SaaS.',
  },
]

export const Testimonials = () => {
  return (
    <Section.Root>
      <Carousel.Root slideCount={testimonials.length} loop gap="0">
        <Carousel.ItemGroup>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={testimonial.name} index={index}>
              <Grid
                as="figure"
                templateColumns={{ base: '1fr', md: '280px minmax(0, 1fr)' }}
                gap={{ base: '6', md: '16' }}
                py={{ base: '12', md: '20' }}
                minH={{ md: '400px' }}
                alignContent="center"
                m="0"
                h="full"
              >
                <HStack
                  as="figcaption"
                  gap="3"
                  alignItems="center"
                  alignSelf="start"
                  order={{ base: 1, md: 0 }}
                >
                  <Avatar
                    name={testimonial.name}
                    src={testimonial.avatar}
                    size="md"
                  />
                  <Stack gap="0">
                    <Text fontWeight="medium">{testimonial.name}</Text>
                    <Text textStyle="sm" color="fg.muted">
                      {testimonial.role},{' '}
                      <Link
                        href={testimonial.company.href}
                        target="_blank"
                        rel="noopener"
                      >
                        <Box
                          as="span"
                          color="fg"
                          textDecoration="underline"
                          textDecorationColor="border.emphasized"
                          textUnderlineOffset="3px"
                          _hover={{ textDecorationColor: 'fg' }}
                        >
                          {testimonial.company.name}
                        </Box>
                      </Link>
                    </Text>
                  </Stack>
                </HStack>

                <Box
                  as="blockquote"
                  m="0"
                  fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                  lineHeight="1.35"
                  letterSpacing="-0.02em"
                  fontWeight="medium"
                  textWrap="pretty"
                  maxW="4xl"
                >
                  <Box as="span" color="fg.subtle" aria-hidden="true">
                    “
                  </Box>
                  {testimonial.quote}
                  <Box as="span" color="fg.subtle" aria-hidden="true">
                    ”
                  </Box>
                </Box>
              </Grid>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Flex w="full" align="end" justify="flex-end" mt="2">
          <Carousel.Control gap="3" flex="none" w="auto">
            <Carousel.PrevTrigger asChild>
              <IconButton
                aria-label="Previous testimonial"
                size="sm"
                variant="outline"
                rounded="full"
              >
                <LuChevronLeft />
              </IconButton>
            </Carousel.PrevTrigger>
            <Carousel.Indicators />
            <Carousel.NextTrigger asChild>
              <IconButton
                aria-label="Next testimonial"
                size="sm"
                variant="outline"
                rounded="full"
              >
                <LuChevronRight />
              </IconButton>
            </Carousel.NextTrigger>
          </Carousel.Control>
        </Flex>
      </Carousel.Root>
    </Section.Root>
  )
}
