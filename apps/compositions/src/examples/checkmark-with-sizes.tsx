import { Checkmark, For, HStack } from '@chakra-ui/react'

export const CheckmarkWithSizes = () => {
  return (
    <HStack gap="4" alignItems="center">
      <For each={['xs', 'sm', 'md', 'lg'] as const}>
        {(size) => <Checkmark key={size} size={size} checked />}
      </For>
    </HStack>
  )
}
