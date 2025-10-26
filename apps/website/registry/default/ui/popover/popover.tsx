'use client'

import { forwardRef } from 'react'

import { Popover as ChakraPopover } from '@chakra-ui/react/popover'

import { CloseButton, type CloseButtonProps } from '../close-button/index.ts'

interface PopoverContentProps extends ChakraPopover.ContentProps {}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(props, ref) {
    return (
      <ChakraPopover.Positioner>
        <ChakraPopover.Content ref={ref} {...props} />
      </ChakraPopover.Positioner>
    )
  },
)

const PopoverArrow = forwardRef<HTMLDivElement, ChakraPopover.ArrowProps>(
  function PopoverArrow(props, ref) {
    return (
      <ChakraPopover.Arrow {...props} ref={ref}>
        <ChakraPopover.ArrowTip />
      </ChakraPopover.Arrow>
    )
  },
)

interface PopoverCloseButtonProps
  extends CloseButtonProps,
    ChakraPopover.CloseTriggerProps {}

const PopoverCloseButton = forwardRef<
  HTMLButtonElement,
  PopoverCloseButtonProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopover.CloseTrigger ref={ref} asChild>
      <CloseButton position="absolute" top="1" insetEnd="1" {...props} />
    </ChakraPopover.CloseTrigger>
  )
})

const PopoverCloseTrigger = ChakraPopover.CloseTrigger
const PopoverTitle = ChakraPopover.Title
const PopoverDescription = ChakraPopover.Description
const PopoverFooter = ChakraPopover.Footer
const PopoverHeader = ChakraPopover.Header
const PopoverRoot = ChakraPopover.Root
const PopoverBody = ChakraPopover.Body
const PopoverTrigger = ChakraPopover.Trigger
const PopoverContext = ChakraPopover.Context

export {
  PopoverContent as Content,
  PopoverArrow as Arrow,
  PopoverCloseButton as CloseButton,
  PopoverCloseTrigger as CloseTrigger,
  PopoverTitle as Title,
  PopoverDescription as Description,
  PopoverFooter as Footer,
  PopoverHeader as Header,
  PopoverRoot as Root,
  PopoverBody as Body,
  PopoverTrigger as Trigger,
  PopoverContext as Context,
}

type PopoverRootProps = ChakraPopover.RootProps

export type { PopoverRootProps as RootProps }
