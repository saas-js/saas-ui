import { Splitter } from '@ark-ui/react'
import { Box } from '@chakra-ui/react'
import React from 'react'

export const Resizer = (props) => {
  const [isResizing, setResizing] = React.useState(false)

  return (
    <Box
      as={Splitter.Root}
      display="flex"
      flexDirection="row"
      position="relative"
      defaultSize={[
        { id: 'a', size: 100, minSize: 30 },
        { id: 'b', size: 0 },
      ]}
      onSizeChangeStart={() => setResizing(true)}
      onSizeChangeEnd={() => setResizing(false)}
    >
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
  )
}
