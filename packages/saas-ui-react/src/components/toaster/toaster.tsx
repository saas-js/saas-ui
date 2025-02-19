'use client'

import React, { useCallback, useMemo, useState } from 'react'

import { Portal } from '@chakra-ui/react/portal'
import { Stack } from '@chakra-ui/react/stack'
import {
  Toaster as ChakraToaster,
  type CreateToasterProps,
  Toast,
  createToaster,
} from '@chakra-ui/react/toast'

import { CloseButton } from '#components/close-button'
import { Spinner } from '#components/spinner'

const defaultOptions: CreateToasterProps = {
  placement: 'bottom-end',
  pauseOnPageIdle: true,
}

export let toast = createToaster(defaultOptions)

export interface ToasterProps extends Partial<CreateToasterProps> {
  closable?: boolean
}

export const Toaster = (props?: ToasterProps) => {
  const { closable: defaultClosable = true, ...options } = props || {}

  const toaster = useMemo(() => {
    toast = createToaster({
      ...defaultOptions,
      ...options,
    })

    return toast
  }, [options])

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => {
          const closable =
            toast.meta?.closable === false
              ? false
              : defaultClosable && toast.type !== 'loading'

          return (
            <ToastRoot>
              {toast.type === 'loading' ? (
                <Spinner size="sm" color="colorPalette.solid" mt="0.5" />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}

                {toast.action && (
                  <Toast.ActionTrigger>
                    {toast.action.label}
                  </Toast.ActionTrigger>
                )}
              </Stack>

              {closable !== false && (
                <Toast.CloseTrigger>
                  <CloseButton size="xs" />
                </Toast.CloseTrigger>
              )}
            </ToastRoot>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}

/**
 * Since the height of the toast is dynamic, we need to set the height
 * in the CSS variable `--toast-height` so css transitions can be applied.
 */
function ToastRoot(props: { children: React.ReactNode }) {
  const [rect, setRect] = useState<DOMRect>()

  const rectCallbackRef = useCallback((el: HTMLDivElement) => {
    setRect(el?.getBoundingClientRect())
  }, [])

  return (
    <Toast.Root
      ref={rectCallbackRef}
      width={{ md: 'sm' }}
      css={{
        '--toast-height': `${rect?.height}px`,
      }}
    >
      {props.children}
    </Toast.Root>
  )
}
