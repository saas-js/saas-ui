import { forwardRef } from 'react'

import { ActionBar } from '@chakra-ui/react/action-bar'
import { Portal } from '@chakra-ui/react/portal'

import { CloseButton as CloseButtonBase } from '../close-button'

interface ActionBarContentProps extends ActionBar.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

const ActionBarContent = forwardRef<HTMLDivElement, ActionBarContentProps>(
  function ActionBarContent(props, ref) {
    const { children, portalled = true, portalRef, ...rest } = props

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ActionBar.Positioner>
          <ActionBar.Content ref={ref} {...rest} asChild={false}>
            {children}
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    )
  },
)

const ActionBarCloseButton = forwardRef<
  HTMLButtonElement,
  ActionBar.CloseTriggerProps
>(function ActionBarCloseTrigger(props, ref) {
  return (
    <ActionBar.CloseTrigger {...props} asChild ref={ref}>
      <CloseButtonBase size="sm" />
    </ActionBar.CloseTrigger>
  )
})

export const Root = ActionBar.Root
export const SelectionTrigger = ActionBar.SelectionTrigger
export const Separator = ActionBar.Separator
export const Content = ActionBarContent
export const CloseButton = ActionBarCloseButton

export type RootProps = ActionBar.RootProps
export type SelectionTriggerProps = ActionBar.SelectionTriggerProps
export type SeparatorProps = ActionBar.SeparatorProps
export type ContentProps = ActionBarContentProps
export type CloseTriggerProps = ActionBar.CloseTriggerProps
