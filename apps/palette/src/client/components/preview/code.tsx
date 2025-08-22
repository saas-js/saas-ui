import { useMemo } from 'react'

import { useEditorContext } from '@/providers/editor'
import { usePalette } from '@/providers/palette'
import { Code } from '@saas-ui/react'

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

export function transformColors(colors: Record<string, any>) {
  return Object.entries(colors).reduce(
    (acc, [key, value]) => {
      let newVal: any

      if (typeof value === 'string') {
        newVal = { value }
      } else {
        newVal = Object.entries(value).reduce(
          (acc, [shade, color]) => {
            acc[shade] = { value: color }
            return acc
          },
          {} as Record<string, { value: any }>,
        )
      }

      acc[key] = newVal

      return acc
    },
    {} as Record<string, { value: any }>,
  )
}

export const exampleCodeChakra = ({
  colors,
}: {
  colors: Record<string, any>
}) => {
  const transformedColors = transformColors(colors)

  return `import { extendTheme } from '@chakra-ui/react'
import { baseTheme } from '@saas-ui/react' // Only required if you use Saas UI components.

const colors = ${JSON.stringify(transformedColors, null, 2)}

const config = defineConfig({
  theme: {
    tokens: {
      colors,
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
`
}

export const exampleCodeSaas = ({
  colors,
}: {
  colors: Record<string, any>
}) => {
  const transformedColors = transformColors(colors)

  return `import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/react'

const colors = ${JSON.stringify(transformedColors, null, 2)}

const config = defineConfig({
  theme: {
    tokens: {
      colors,
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
`
}
