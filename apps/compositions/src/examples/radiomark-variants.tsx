import { For, HStack, Radiomark } from '@chakra-ui/react'

export const RadiomarkVariants = () => {
  return (
    <HStack gap="4">
      <For each={['solid', 'subtle', 'outline', 'inverted'] as const}>
        {(variant) => <Radiomark checked key={variant} variant={variant} />}
      </For>
    </HStack>
  )
}
