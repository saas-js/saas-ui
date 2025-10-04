import React from 'react'

import { Splitter } from '@ark-ui/react'
import { Box } from '@saas-ui/react'

export const Resizer = (props: { children: React.ReactNode }) => {
  const [isResizing, setResizing] = React.useState(false)

  return (
    <Splitter.Root
      panels={[
        {
          id: 'a',

          minSize: 30,
        },
        {
          id: 'b',
          minSize: 0,
        },
      ]}
      defaultSize={[100, 0]}
      onResizeStart={() => setResizing(true)}
      onResizeEnd={() => setResizing(false)}
      asChild
    >
      <Box display="flex" flexDirection="row" position="relative">
        {isResizing && <Box position="absolute" inset="0" />}
        <Splitter.Panel id="a">{props.children}</Splitter.Panel>
        <Box as={Splitter.ResizeTrigger} id="a:b" position="relative">
          <Box
            position="absolute"
            top="50%"
            right="1"
            mt="-40px"
            width="4px"
            bg="muted"
            mx="2"
            height="80px"
            rounded="full"
            zIndex="overlay"
            _hover={{
              bg: 'primary.500',
            }}
            _focus={{
              outline: 'none',
              bg: 'primary.500',
            }}
          />
        </Box>
        <Splitter.Panel id="b" asChild>
          <Box bg="gray.400" _dark={{ bg: 'black' }}></Box>
        </Splitter.Panel>
      </Box>
    </Splitter.Root>
  )
}
