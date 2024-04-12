import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Section, { SectionProps } from '../marketing/section-wrapper'
import { Polypane } from '../logos/customers/polypane'
import { Aidbase } from '../logos/customers/aidbase'
import { Ownco } from '../logos/customers/ownco'
import { YouGotBud } from '../logos/customers/you-got-bud'
import { Startec } from '../logos/customers/startec'
import { Eqtble } from '../logos/customers/eqtble'

export const UsedBy = (props?: Omit<SectionProps, 'children'>) => {
  return (
    <Section innerWidth="container.xl" {...props}>
      <Heading size="md" fontWeight="medium" textAlign="center" mb="12">
        Used by indie founders and startups worldwide
      </Heading>
      <SimpleGrid
        spacing="12"
        userSelect="none"
        columns={{ base: 2, md: 3, xl: 6 }}
        scale={{ base: 0.4, lg: 1 }}
      >
        <Flex justifyContent="center" gap="2" whiteSpace="nowrap">
          <Polypane height="30px" />
          <Text fontWeight="bold" fontSize="xl">
            Polypane
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Aidbase height="30px" />
        </Flex>
        <Flex justifyContent="center">
          <Ownco height="26px" />
        </Flex>
        <Flex justifyContent="center" gap="2">
          <YouGotBud height="30px" />
          <Text fontWeight="bold" fontSize="xl">
            You Got Bud
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Startec height="30px" />
        </Flex>
        <Flex justifyContent="center">
          <Eqtble height="24px" />
        </Flex>
      </SimpleGrid>
    </Section>
  )
}
