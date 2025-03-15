'use client'

import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Span,
  Stack,
} from '@chakra-ui/react'

import { Aidbase } from './logos/customers/aidbase'
import { Eqtble } from './logos/customers/eqtble'
import { Growtha } from './logos/customers/growtha'
import { Polypane } from './logos/customers/polypane'
import { Voxtell } from './logos/customers/voxtell'
import { Yext } from './logos/customers/yext'

const logos = [
  {
    Logo: (props: any) => (
      <Flex gap="2" alignItems="center">
        <Polypane {...props} />
        <Span fontWeight="bold" fontSize="xl">
          Polypane
        </Span>
      </Flex>
    ),
    height: '20px',
  },
  { Logo: Aidbase, height: '20px' },
  { Logo: Voxtell, height: '20px' },
  { Logo: Eqtble, height: '20px' },
  { Logo: Yext, height: '20px' },
  { Logo: Growtha, height: '20px' },
]

const CustomersGridRow = () => (
  <SimpleGrid columns={{ base: 2, lg: 6 }}>
    {logos.map(({ Logo, height }, index) => (
      <Center key={index} height="88px">
        <Logo height={height} />
      </Center>
    ))}
  </SimpleGrid>
)

export const CustomersSection = () => (
  <Box py="10" pos="relative">
    <Container>
      <Stack>
        <Heading as="h3" textAlign="center" fontWeight="medium">
          Used by indie founders and established startups
        </Heading>
        <CustomersGridRow />
      </Stack>
    </Container>
  </Box>
)
