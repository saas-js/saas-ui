import { For, Stack } from '@chakra-ui/react'
import { NumberInput } from '@saas-ui/react'

export const NumberInputWithSizes = () => {
  return (
    <Stack gap="5" width="200px">
      <For each={['xs', 'sm', 'md', 'lg']}>
        {(size) => <NumberInput size={size} key={size} defaultValue="10" />}
      </For>
    </Stack>
  )
}
