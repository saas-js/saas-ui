'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toast = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})

export function Toaster() {
  return (
    <Portal>
      <ChakraToaster toaster={toast} insetInline={{ mdDown: '4' }}>
        {(item) => (
          <Toast.Root width={{ md: 'sm' }}>
            <Toast.Indicator />
            <Stack gap="1" flex="1" maxWidth="100%">
              {item.title && <Toast.Title>{item.title}</Toast.Title>}
              {item.description && (
                <Toast.Description>{item.description}</Toast.Description>
              )}
            </Stack>
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
