import { Checkmark, HStack } from '@chakra-ui/react'

export const CheckmarkBasic = () => {
  return (
    <HStack gap="4">
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
    </HStack>
  )
}
