'use client'

import { useState } from 'react'

import { Splitter } from '@ark-ui/react'
import { FieldsProvider, defaultFieldTypes } from '@saas-ui/forms'
import { Box } from '@saas-ui/react'

import { ExamplePreview } from './example-preview'

export function ExampleCanvas(props: { name: string }) {
  const [resizing, setResizing] = useState(false)
  const [size, setSize] = useState([100, 0])

  return (
    <Box>
      {/* <Splitter.Root
        size={size}
        panels={[
          { id: 'a', minSize: 320 },
          { id: 'b', minSize: 0 },
        ]}
        onResizeStart={() => setResizing(true)}
        onResize={(details) => {
          console.log(details)
          setSize(details.size)
        }}
        onResizeEnd={() => setResizing(false)}
      >
        <Splitter.Panel id="a"> */}
      <FieldsProvider
        value={{
          fields: defaultFieldTypes,
        }}
      >
        {/* <Box pointerEvents={resizing ? 'none' : undefined}> */}
        <ExamplePreview name={props.name} />
        {/* </Box> */}
      </FieldsProvider>
      {/* </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" aria-label="Resize">
          <Box
            width="4px"
            bg="bg.muted"
            mx="2"
            height="80px"
            rounded="full"
            _hover={{
              bg: 'accent.solid',
            }}
            _focus={{
              outline: 'none',
              bg: 'accent.solid',
            }}
          />
        </Splitter.ResizeTrigger>

        <Splitter.Panel id="b"></Splitter.Panel>
      </Splitter.Root> */}
    </Box>
  )
}
