'use client'

import { type ComponentType, forwardRef } from 'react'

import { DialogContext } from '@ark-ui/react/dialog'
import { Drawer as ChakraDrawer, Portal } from '@chakra-ui/react'
import type { DrawerVariantProps } from '@saas-ui/chakra-preset/slot-recipes/drawer'

import { CloseButton as CloseButtonBase } from '../close-button/index'

export interface ContentProps extends ChakraDrawer.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  offset?: ChakraDrawer.ContentProps['padding']
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  function DrawerContent(props, ref) {
    const { children, portalled = true, portalRef, offset, ...rest } = props
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraDrawer.Positioner padding={offset}>
          <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
            {children}
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    )
  },
)

export const CloseButton = forwardRef<
  HTMLButtonElement,
  ChakraDrawer.CloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraDrawer.CloseTrigger {...rest} asChild>
      <CloseButtonBase size="sm" ref={ref}>
        {children}
      </CloseButtonBase>
    </ChakraDrawer.CloseTrigger>
  )
})

export const CloseTrigger = ChakraDrawer.CloseTrigger
export const Trigger = ChakraDrawer.Trigger

type ChakraDrawerRootPropsWithoutPresetVariants = Omit<
  ChakraDrawer.RootProps,
  keyof DrawerVariantProps
>

export interface RootProps
  extends ChakraDrawerRootPropsWithoutPresetVariants, DrawerVariantProps {}

export const Root = ChakraDrawer.Root as ComponentType<RootProps>
export const Footer = ChakraDrawer.Footer
export const Header = ChakraDrawer.Header
export const Body = ChakraDrawer.Body
export const Backdrop = ChakraDrawer.Backdrop
export const Description = ChakraDrawer.Description
export const Title = ChakraDrawer.Title
export const ActionTrigger = ChakraDrawer.ActionTrigger
export const Context = DialogContext
