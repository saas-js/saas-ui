import { Checkmark, HStack, Stack, Text } from '@chakra-ui/react'

export const CheckmarkStates = () => {
  return (
    <Stack gap="4">
      <HStack gap="4">
        <Text textStyle="sm" color="fg.muted" width="20">
          Default
        </Text>
        <Checkmark />
        <Checkmark checked />
        <Checkmark indeterminate />
      </HStack>
      <HStack gap="4">
        <Text textStyle="sm" color="fg.muted" width="20">
          Disabled
        </Text>
        <Checkmark disabled />
        <Checkmark checked disabled />
        <Checkmark indeterminate disabled />
      </HStack>
    </Stack>
  )
}
