import React from 'react'

import { toast } from '@/components/ui/toaster'
import {
  Box,
  Flex,
  FlexProps,
  Grid,
  GridProps,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useToken,
} from '@chakra-ui/react'
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

export const ColorPalette = (props: ColorPaletteProps) => {
  const { color, name, ...rest } = props

  const [colorCode, white, black] = useToken('colors', [
    color,
    'white',
    'black',
  ])

  const lightContrast =
    Math.round(chroma.contrast(colorCode, white) * 100) / 100
  const darkContrast = Math.round(chroma.contrast(colorCode, black) * 100) / 100

  const textColor = lightContrast < 4.5 ? 'black' : 'white'
  const contrast = lightContrast < 4.5 ? darkContrast : lightContrast

  return (
    <Flex flex="1" position="relative" {...rest}>
      <Flex
        height="3rem"
        flex="1"
        boxShadow="inner"
        bg={color}
        color={textColor}
        fontSize="sm"
        overflow="hidden"
        css={{
          position: 'absolute',
          width: '100%',
          cursor: 'pointer',
          transitionProperty: 'width, height',
          transitionDuration: 'normal',
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
          toast.create({
            description: `Copied ${colorCode}`,
            type: 'info',
          })
          void navigator.clipboard.writeText(colorCode)
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
  const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

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
  <SimpleGrid columns={11} {...props} gap="0" />
)
