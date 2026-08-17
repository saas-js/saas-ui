'use client'

import { Flex, Text } from '@chakra-ui/react'
import { Aside } from 'compositions/ui/aside'

export const AsideBasic = () => {
  return (
    <Flex height="320px" borderWidth="1px" rounded="l3" overflow="hidden">
      <Flex flex="1" p="4" align="center" justify="center">
        <Text textStyle="sm">Main content</Text>
      </Flex>
      <Aside.Root
        defaultOpen
        width="240px"
        borderLeftWidth="1px"
        bg="bg.panel"
      >
        <Aside.Header>
          <Aside.Title>Details</Aside.Title>
        </Aside.Header>
        <Aside.Body>
          <Text textStyle="sm">Aside content</Text>
        </Aside.Body>
      </Aside.Root>
    </Flex>
  )
}
