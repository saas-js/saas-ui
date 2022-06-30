import { Code } from '@chakra-ui/react'

import { usePalette } from '@/providers/palette'

import CopyButton from '../copy-button'

const JsonPreview = () => {
  const [{ colors }] = usePalette()
  const json = JSON.stringify(colors, undefined, 2)
  return (
    <>
      <Code w="100%" p={4}>
        <pre>{json}</pre>
      </Code>
      <CopyButton code={json} pos="absolute" top="8" right="8" />
    </>
  )
}

export default JsonPreview
