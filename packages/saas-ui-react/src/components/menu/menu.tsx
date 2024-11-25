'use client'

import { forwardRef } from 'react'

import { AbsoluteCenter, Menu as ChakraMenu, Portal } from '@chakra-ui/react'
import { LuCheck, LuChevronRight } from 'react-icons/lu'

interface MenuContentProps extends ChakraMenu.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref} {...rest} />
        </ChakraMenu.Positioner>
      </Portal>
    )
  },
)

const MenuArrow = forwardRef<HTMLDivElement, ChakraMenu.ArrowProps>(
  function MenuArrow(props, ref) {
    return (
      <ChakraMenu.Arrow ref={ref} {...props}>
        <ChakraMenu.ArrowTip />
      </ChakraMenu.Arrow>
    )
  },
)

const MenuCheckboxItem = forwardRef<
  HTMLDivElement,
  ChakraMenu.CheckboxItemProps
>(function MenuCheckboxItem(props, ref) {
  return (
    <ChakraMenu.CheckboxItem ref={ref} {...props}>
      <ChakraMenu.ItemIndicator hidden={false}>
        <LuCheck />
      </ChakraMenu.ItemIndicator>
      {props.children}
    </ChakraMenu.CheckboxItem>
  )
})

const MenuRadioItem = forwardRef<HTMLDivElement, ChakraMenu.RadioItemProps>(
  function MenuRadioItem(props, ref) {
    const { children, ...rest } = props
    return (
      <ChakraMenu.RadioItem ps="8" ref={ref} {...rest}>
        <AbsoluteCenter axis="horizontal" left="4" asChild>
          <ChakraMenu.ItemIndicator>
            <LuCheck />
          </ChakraMenu.ItemIndicator>
        </AbsoluteCenter>
        <ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>
      </ChakraMenu.RadioItem>
    )
  },
)

const MenuItemGroup = forwardRef<HTMLDivElement, ChakraMenu.ItemGroupProps>(
  function MenuItemGroup(props, ref) {
    const { title, children, ...rest } = props
    return (
      <ChakraMenu.ItemGroup ref={ref} {...rest}>
        {title && (
          <ChakraMenu.ItemGroupLabel userSelect="none">
            {title}
          </ChakraMenu.ItemGroupLabel>
        )}
        {children}
      </ChakraMenu.ItemGroup>
    )
  },
)

interface MenuTriggerItemProps extends ChakraMenu.ItemProps {
  startIcon?: React.ReactNode
}

const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>(
  function MenuTriggerItem(props, ref) {
    const { startIcon, children, ...rest } = props
    return (
      <ChakraMenu.TriggerItem ref={ref} {...rest}>
        {startIcon}
        {children}
        <LuChevronRight />
      </ChakraMenu.TriggerItem>
    )
  },
)

const MenuRadioItemGroup = ChakraMenu.RadioItemGroup
const MenuContextTrigger = ChakraMenu.ContextTrigger
const MenuRoot = ChakraMenu.Root
const MenuSeparator = ChakraMenu.Separator

const MenuItem = ChakraMenu.Item
const MenuItemText = ChakraMenu.ItemText
const MenuItemCommand = ChakraMenu.ItemCommand
const MenuTrigger = ChakraMenu.Trigger

export {
  MenuRoot as Root,
  MenuContent as Content,
  MenuArrow as Arrow,
  MenuCheckboxItem as CheckboxItem,
  MenuRadioItem as RadioItem,
  MenuItemGroup as ItemGroup,
  MenuTriggerItem as TriggerItem,
  MenuRadioItemGroup as RadioItemGroup,
  MenuContextTrigger as ContextTrigger,
  MenuSeparator as Separator,
  MenuItem as Item,
  MenuItemText as ItemText,
  MenuItemCommand as ItemCommand,
  MenuTrigger as Trigger,
}

export type {
  MenuContentProps as ContentProps,
  MenuTriggerItemProps as TriggerItemProps,
}
