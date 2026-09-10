import { For, RatingGroup, Stack } from '@chakra-ui/react'

export const RatingWithSizes = () => {
  return (
    <Stack gap="4">
      <For each={['xs', 'sm', 'md', 'lg'] as const}>
        {(size) => (
          <RatingGroup.Root key={size} count={5} defaultValue={3} size={size}>
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        )}
      </For>
    </Stack>
  )
}
