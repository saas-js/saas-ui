import { For, ScrollArea, Stack, Text } from '@chakra-ui/react'
import Lorem from 'react-lorem-ipsum'

const variants = ['hover', 'always'] as const

export const ScrollAreaWithVariants = () => (
  <Stack gap="8" maxW="lg">
    <For each={variants}>
      {(variant) => (
        <Stack gap="2" key={variant}>
          <Text fontWeight="medium">variant="{variant}"</Text>
          <ScrollArea.Root height="8rem" variant={variant}>
            <ScrollArea.Viewport>
              <ScrollArea.Content paddingEnd="3" textStyle="sm">
                <Lorem p={4} />
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar />
          </ScrollArea.Root>
        </Stack>
      )}
    </For>
  </Stack>
)
