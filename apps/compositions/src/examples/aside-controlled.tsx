'use client'

import * as React from 'react'

import { Button, Flex, Text } from '@chakra-ui/react'
import { Aside } from 'compositions/ui/aside'

export const AsideControlled = () => {
  const [open, setOpen] = React.useState(true)

  return (
    <Flex
      height="320px"
      borderWidth="1px"
      rounded="l3"
      overflow="hidden"
      position="relative"
    >
      <Flex flex="1" p="4" direction="column" gap="3">
        <Button size="sm" alignSelf="flex-start" onClick={() => setOpen((v) => !v)}>
          Toggle aside
        </Button>
        <Text textStyle="sm">Main content</Text>
      </Flex>
      <Aside.Root
        open={open}
        onOpenChange={({ open }) => setOpen(open)}
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
