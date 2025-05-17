import type React from 'react'

import { usePalette } from '@/providers/palette'
import {
  Box,
  Flex,
  type FlexProps,
  type GridProps,
  SimpleGrid,
  Stack,
  Text,
  toast,
  useClipboard,
} from '@saas-ui/react'
import chroma from 'chroma-js'

type ColorPaletteProps = FlexProps & { color: string; name?: string }

export const ColorName = (props: FlexProps) => {
  const { children, ...rest } = props
  return (
    <Flex
      flex="1"
      height="3rem"
      alignItems="center"
      color="muted"
      fontSize="sm"
      {...rest}
    >
      <Box>{children}</Box>
    </Flex>
  )
}

function parseOklchString(str: string) {
  const match = str.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!match) throw new Error('Invalid OKLCH string')
  const [, l, c, h] = match.map(Number)

  if (Number.isNaN(l) || Number.isNaN(c) || Number.isNaN(h)) {
    console.warn('Invalid OKLCH string', str)
    return str
  }

  return chroma.oklch(l, c, h)
}

export const ColorPalette = (props: ColorPaletteProps) => {
  const { color, name, ...rest } = props

  const [{ colors }] = usePalette()

  let colorCode = color
  const [hue, shade] = color.split('.')

  if (shade && hue) {
    colorCode = colors?.[hue]?.[shade]
  }

  if (color in colors && typeof colors?.[color] === 'string') {
    colorCode = colors?.[color]
  }

  const { copy } = useClipboard({
    value: colorCode,
  })

  /**
   * Converting to hex to calculate contrast
   */
  const hex = colorCode.startsWith('oklch')
    ? chroma(parseOklchString(colorCode)).hex()
    : colorCode

  const lightContrast = Math.round(chroma.contrast(hex, '#ffffff') * 100) / 100
  const darkContrast = Math.round(chroma.contrast(hex, '#000000') * 100) / 100

  const textColor = lightContrast < 4.5 ? 'black' : 'white'
  const contrast = lightContrast < 4.5 ? darkContrast : lightContrast

  return (
    <Flex flex="1" position="relative" {...rest}>
      <Flex
        height="3rem"
        flex="1"
        boxShadow={{
          base: 'inner',
          _dark: 'none',
        }}
        bg={color}
        color={textColor}
        fontSize="sm"
        overflow="hidden"
        css={{
          position: 'absolute',
          width: '100%',
          cursor: 'pointer',
          transitionProperty: 'width, height',
          transitionDuration: 'moderate',
          '& > div': {
            opacity: 0,
          },
          _hover: {
            zIndex: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'calc(100% + 3rem)',
            height: 'calc(100% + 3rem)',
            transform: 'translate(-50%, -50%)',
            boxShadow: 'lg',
            borderRadius: 'sm',
            '& > div': {
              opacity: 1,
            },
          },
        }}
        onClick={() => {
          toast.info({ title: `Copied ${colorCode}` })
          copy()
        }}
      >
        <Stack width="100%" textAlign="center" p="4">
          <Flex justifyContent="center" flex="1">
            <Text fontWeight="semibold">{colorCode}</Text>
          </Flex>
          <Flex>
            <Text opacity="0.4" flex="1">
              WCAG 2:{' '}
            </Text>
            <Text>{contrast}</Text>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  )
}

export const ColorPalettes = (props: { color: string; name: string }) => {
  const { color, name } = props
  const [{ colors }] = usePalette()
  if (!colors?.[color]?.['50']) return null

  const keys = Object.keys(colors?.[color])

  return (
    <>
      <ColorName>{name || color}</ColorName>
      {keys.map((item) => (
        <ColorPalette
          key={`${color}.${item}`}
          color={`${color}.${item}`}
          name={`${color} ${item}`}
        />
      ))}
    </>
  )
}

export const ColorWrapper: React.FC<GridProps> = (props) => (
  <SimpleGrid columns={12} {...props} gap="0" />
)
