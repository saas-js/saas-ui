import { For, Stack, VStack } from '@saas-ui/react'
import { LuBox } from 'react-icons/lu'

import { DecorativeBox } from '../lib/decorative-box'

export const ForWithFallback = () => {
  return (
    <Stack gap="4">
      <For
        each={[]}
        fallback={
          <VStack textAlign="center" fontWeight="medium">
            <LuBox />
            No items to show
          </VStack>
        }
      >
        {(item, index) => (
          <DecorativeBox h="10" key={index}>
            {item}
          </DecorativeBox>
        )}
      </For>
    </Stack>
  )
}
