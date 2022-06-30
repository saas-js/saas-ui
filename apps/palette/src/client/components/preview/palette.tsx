import { Stack, Box, Flex, Text } from '@chakra-ui/react'

import {
  ColorWrapper,
  ColorPalette,
  ColorPalettes,
  ColorName,
} from '../palette'

const PalettePreview = () => {
  return (
    <Stack spacing="4px">
      <ColorWrapper>
        {['', 50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((hue) => (
          <Flex key={hue} justifyContent="center" height="3rem">
            <Text color="muted" fontSize="sm">
              {hue}
            </Text>
          </Flex>
        ))}
      </ColorWrapper>

      <ColorWrapper>
        <ColorPalettes color="primary" name="Primary" />
      </ColorWrapper>

      <Box height="3rem" />

      <ColorWrapper>
        <ColorName>Black</ColorName>
        <ColorPalette color="black" />
      </ColorWrapper>

      <Box height="3rem" />

      <ColorWrapper>
        <ColorPalettes color="gray" name="Gray" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="red" name="Red" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="orange" name="Orange" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="yellow" name="Yellow" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="green" name="Green" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="teal" name="Teal" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="cyan" name="Cyan" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="blue" name="Blue" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="purple" name="Purple" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="pink" name="Pink" />
      </ColorWrapper>

      <Box height="3rem" />

      <ColorWrapper>
        <ColorPalettes color="blackAlpha" name="Black Alpha" />
      </ColorWrapper>
      <ColorWrapper>
        <ColorPalettes color="whiteAlpha" name="White Apha" />
      </ColorWrapper>
    </Stack>
  )
}

export default PalettePreview
