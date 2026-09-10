import { useMemo } from 'react'

import { useEditorContext } from '@/providers/editor'
import { usePalette } from '@/providers/palette'
import { Code } from '@chakra-ui/react'

import CopyButton from '../copy-button'

const CodePreview = () => {
  const [{ theme }] = useEditorContext()
  const [{ colors }] = usePalette()
  const code = useMemo(() => {
    switch (theme) {
      case 'Chakra UI':
        return exampleCodeChakra({ colors })
      default:
        return exampleCodeSaas({ colors })
    }
  }, [theme, colors])

  return (
    <>
      <Code w="100%" p={4}>
        <pre>{code}</pre>
      </Code>
      <CopyButton code={code} pos="absolute" top="8" right="8" />
    </>
  )
}

export default CodePreview

export const exampleCodeChakra = ({ colors }: any) => `
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const colors = ${JSON.stringify(colors, null, 2)}

const system = createSystem(defaultConfig, defineConfig({
  theme: { tokens: { colors } }
}))

export default system
`

export const exampleCodeSaas = ({ colors }: any) => `
import { createSystem, defineConfig } from '@chakra-ui/react'
import { defaultConfig } from '@saas-ui/chakra-preset'

const colors = ${JSON.stringify(colors, null, 2)}

const system = createSystem(defaultConfig, defineConfig({
  theme: { tokens: { colors } }
}))

export default system
`
