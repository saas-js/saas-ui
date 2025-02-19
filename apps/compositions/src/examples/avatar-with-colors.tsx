import { Stack, Text } from '@chakra-ui/react'
import { Avatar } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'

export const AvatarWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack key={colorPalette} align="center" direction="row" gap="10">
          <Text minW="8ch">{colorPalette}</Text>
          <Avatar
            colorPalette={colorPalette}
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
          />
          <Avatar colorPalette={colorPalette} name="Segun Adebayo" />
          <Avatar colorPalette={colorPalette} />
        </Stack>
      ))}
    </Stack>
  )
}
