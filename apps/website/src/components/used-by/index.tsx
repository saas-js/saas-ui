import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Section, { SectionProps } from '../marketing/section-wrapper'
import { Polypane } from '../logos/customers/polypane'
import { Aidbase } from '../logos/customers/aidbase'
import { YouGotBud } from '../logos/customers/you-got-bud'
import { Voxtell } from '../logos/customers/voxtell'
import { Eqtble } from '../logos/customers/eqtble'
import { Yext } from '../logos/customers/yext'
import { Growtha } from '../logos/customers/growtha'

export const UsedBy = (props?: Omit<SectionProps, 'children'>) => {
  return (
    <Section innerWidth="container.xl" pt="12" {...props}>
      <Heading size="md" fontWeight="medium" textAlign="center" mb="12">
        Used by indie founders and startups worldwide
      </Heading>
      <Flex
        gap="4"
        rowGap="12"
        flexDirection="row"
        justifyContent="space-around"
        flexWrap="wrap"
        userSelect="none"
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
          <Yext height="30px" />
        </Flex>
        <Flex justifyContent="center">
          <Voxtell height="24px" />
        </Flex>
        <Flex justifyContent="center" gap="2">
          <Growtha height="28px" />
        </Flex>
        <Flex justifyContent="center">
          <Eqtble height="24px" />
        </Flex>
      </Flex>
    </Section>
  )
}
