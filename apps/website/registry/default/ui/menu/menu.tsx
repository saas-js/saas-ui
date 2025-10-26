'use client'

import { forwardRef } from 'react'

import { Flex } from '@chakra-ui/react'
import { Menu as ChakraMenu } from '@chakra-ui/react/menu'
import { Portal } from '@chakra-ui/react/portal'

import { Button, type ButtonProps } from '../button/index.ts'
import { CheckIcon, ChevronRightIcon } from '../icons/index.ts'

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

interface MenuCheckboxItemProps extends ChakraMenu.CheckboxItemProps {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
}

const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  function MenuCheckboxItem(props, ref) {
    const { children, startElement, endElement, ...rest } = props
    return (
      <ChakraMenu.CheckboxItem ref={ref} {...rest}>
        {startElement}
        <ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>
        {endElement}
      </ChakraMenu.CheckboxItem>
    )
  },
)

interface MenuRadioItemProps extends ChakraMenu.RadioItemProps {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
}

const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  function MenuRadioItem(props, ref) {
    const { children, startElement, endElement, ...rest } = props
    return (
      <ChakraMenu.RadioItem ref={ref} {...rest}>
        {startElement}
        <ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>
        {endElement}
      </ChakraMenu.RadioItem>
    )
  },
)

const MenuItemIndicator = forwardRef<
  HTMLDivElement,
  ChakraMenu.ItemIndicatorProps
>(function MenuItemIndicator(props, ref) {
  const { children = <CheckIcon />, ...rest } = props
  return (
    <Flex alignItems="center" justifyContent="center" w="4">
      <ChakraMenu.ItemIndicator ref={ref} {...rest}>
        {children}
      </ChakraMenu.ItemIndicator>
    </Flex>
  )
})

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
        <ChevronRightIcon />
      </ChakraMenu.TriggerItem>
    )
  },
)

interface MenuButtonProps extends ButtonProps, ChakraMenu.TriggerProps {}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(props, ref) {
    return (
      <MenuTrigger ref={ref} asChild>
        <Button {...props} />
      </MenuTrigger>
    )
  },
)

const MenuRadioItemGroup = ChakraMenu.RadioItemGroup
const MenuContextTrigger = ChakraMenu.ContextTrigger
const MenuRoot = ChakraMenu.Root
const MenuSeparator = ChakraMenu.Separator
const MenuContext = ChakraMenu.Context

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
  MenuItemIndicator as ItemIndicator,
  MenuItemGroup as ItemGroup,
  MenuTriggerItem as TriggerItem,
  MenuRadioItemGroup as RadioItemGroup,
  MenuContextTrigger as ContextTrigger,
  MenuSeparator as Separator,
  MenuItem as Item,
  MenuItemText as ItemText,
  MenuItemCommand as ItemCommand,
  MenuTrigger as Trigger,
  MenuButton as Button,
  MenuContext as Context,
}

type MenuRootProps = ChakraMenu.RootProps
type MenuTriggerProps = ChakraMenu.TriggerProps
type MenuItemProps = ChakraMenu.ItemProps

export type {
  MenuRootProps as RootProps,
  MenuContentProps as ContentProps,
  MenuTriggerProps as TriggerProps,
  MenuTriggerItemProps as TriggerItemProps,
  MenuItemProps as ItemProps,
  MenuButtonProps as ButtonProps,
  MenuRadioItemProps as RadioItemProps,
}
