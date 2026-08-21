import { HStack, Radiomark } from '@chakra-ui/react'

export const RadiomarkBasic = () => {
  return (
    <HStack gap="4">
      <Radiomark />
      <Radiomark checked />
    </HStack>
  )
}
