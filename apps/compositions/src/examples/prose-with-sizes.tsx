import { For, Stack, Text } from '@chakra-ui/react'
import { Prose } from 'compositions/ui/prose'

export const ProseWithSizes = () => {
  return (
    <Stack gap="10">
      <For each={['md', 'lg'] as const}>
        {(size) => (
          <Stack key={size}>
            <Text textStyle="sm" color="fg.muted">
              size: {size}
            </Text>
            <Prose size={size}>
              <h2>Title Heading 2</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                at dolor nec ex rutrum semper. Praesent ultricies purus eget
                lectus tristique egestas ac in lacus.
              </p>
            </Prose>
          </Stack>
        )}
      </For>
    </Stack>
  )
}
