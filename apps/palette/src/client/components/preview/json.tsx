import { usePalette } from '@/providers/palette'
import { Code } from '@saas-ui/react'

import CopyButton from '../copy-button'
import { transformColors } from './code'

const JsonPreview = () => {
  const [{ colors }] = usePalette()
  const json = JSON.stringify(transformColors(colors), undefined, 2)
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
