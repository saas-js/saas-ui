'use client'

import { useMemo } from 'react'

import {
  Toaster as ChakraToaster,
  CreateToasterReturn,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

import { SnackbarProvider } from './snackbar.context.ts'

export interface SnackbarProps extends CreateToasterReturn {
  children: React.ReactNode
}

export const Snackbar = (props: SnackbarProps) => {
  const { children, ...rest } = props

  const toaster = useMemo(
    () =>
      createToaster({
        placement: 'bottom-end',
        pauseOnPageIdle: true,
        ...rest,
      }),
    [],
  )

  return (
    <SnackbarProvider value={{ snackbar: toaster }}>
      <Portal>
        <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
          {(toast) => (
            <Toast.Root width={{ md: 'sm' }}>
              {toast.type === 'loading' ? (
                <Spinner size="sm" color="colorPalette.solid" />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
              )}
              {toast.meta?.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          )}
        </ChakraToaster>
      </Portal>
    </SnackbarProvider>
  )
}
