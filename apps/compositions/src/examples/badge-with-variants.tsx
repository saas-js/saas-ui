import { Stack, Badge } from '@chakra-ui/react'

export const BadgeWithVariants = () => {
  return (
    <Stack gap="2" align="flex-start">
      <Stack direction="row">
        <Badge variant="outline">Outline</Badge>
        <Badge variant="solid">Solid</Badge>
        <Badge variant="subtle">Subtle</Badge>
        <Badge variant="surface">Surface</Badge>
      </Stack>
      <Stack direction="row">
        <Badge variant="outline" colorPalette="accent">
          Outline
        </Badge>
        <Badge variant="solid" colorPalette="accent">
          Solid
        </Badge>
        <Badge variant="subtle" colorPalette="accent">
          Subtle
        </Badge>
        <Badge variant="surface" colorPalette="accent">
          Surface
        </Badge>
      </Stack>
    </Stack>
  )
}
