import { HStack, Radiomark, Stack, Text } from '@chakra-ui/react'

export const RadiomarkStates = () => {
  return (
    <Stack gap="4">
      <HStack gap="4">
        <Text textStyle="sm" color="fg.muted" width="20">
          Default
        </Text>
        <Radiomark />
        <Radiomark checked />
      </HStack>
      <HStack gap="4">
        <Text textStyle="sm" color="fg.muted" width="20">
          Disabled
        </Text>
        <Radiomark disabled />
        <Radiomark checked disabled />
      </HStack>
    </Stack>
  )
}
