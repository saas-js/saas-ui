import { useEditorContext } from '@/providers/editor'
import { usePalette } from '@/providers/palette'
import { Code } from '@chakra-ui/react'
import { useMemo } from 'react'
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
import { extendTheme } from '@chakra-ui/react'
import { baseTheme } from '@saas-ui/react' // Only required if you use Saas UI components.

const colors = ${JSON.stringify(colors, null, 2)}

const theme = extendTheme({
  colors
}, baseTheme)

export default theme
`

export const exampleCodeSaas = ({ colors }: any) => `
import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/react'

const colors = ${JSON.stringify(colors, null, 2)}

const theme = extendTheme({
  colors
}, baseTheme)

export default theme
`
