import { ComponentProps, ReactNode, RefObject, forwardRef } from 'react'

import { Portal } from '@ark-ui/react'
import {
  Menu as ArkMenu,
  type MenuArrowBaseProps as ArkMenuArrowBaseProps,
  type MenuArrowTipBaseProps as ArkMenuArrowTipBaseProps,
  type MenuCheckboxItemBaseProps as ArkMenuCheckboxItemBaseProps,
  type MenuContentBaseProps as ArkMenuContentBaseProps,
  type MenuContextTriggerBaseProps as ArkMenuContextTriggerBaseProps,
  type MenuIndicatorBaseProps as ArkMenuIndicatorBaseProps,
  type MenuItemBaseProps as ArkMenuItemBaseProps,
  type MenuItemGroupBaseProps as ArkMenuItemGroupBaseProps,
  type MenuItemGroupLabelBaseProps as ArkMenuItemGroupLabelBaseProps,
  type MenuItemIndicatorBaseProps as ArkMenuItemIndicatorBaseProps,
  type MenuItemTextBaseProps as ArkMenuItemTextBaseProps,
  type MenuPositionerProps as ArkMenuPositionerProps,
  type MenuRadioItemBaseProps as ArkMenuRadioItemBaseProps,
  type MenuRadioItemGroupBaseProps as ArkMenuRadioItemGroupBaseProps,
  type MenuSeparatorBaseProps as ArkMenuSeparatorBaseProps,
  type MenuTriggerItemBaseProps as ArkMenuTriggerItemBaseProps,
  type MenuTriggerProps as ArkMenuTriggerProps,
} from '@ark-ui/react/menu'
import '@saas-ui/panda-preset/jsx'
import { menu } from '@saas-ui/panda-preset/recipes'

import { HTMLSuiProps, createStyleContext } from '../context'
import { CheckIcon, ChevronRightIcon } from '../icons'

const { withProvider, withContext } = createStyleContext(menu)

export interface MenuRootProps extends ComponentProps<typeof ArkMenu.Root> {}

export const MenuRootBase = withProvider(ArkMenu.Root)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerProps extends ArkMenuTriggerProps {}

const MenuTriggerBase = withContext<HTMLDivElement, MenuTriggerProps>(
  ArkMenu.Trigger,
  'trigger',
  {
    defaultProps: {
      asChild: true,
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuContextTriggerProps
  extends ArkMenuContextTriggerBaseProps,
    HTMLSuiProps<'button'> {}

const MenuContextTriggerBase = withContext<
  HTMLButtonElement,
  MenuContextTriggerProps
>(ArkMenu.ContextTrigger, 'contextTrigger')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuPositionerProps
  extends ArkMenuPositionerProps,
    Omit<HTMLSuiProps<'div'>, keyof ArkMenuPositionerProps> {}

const MenuPositionerBase = withContext<HTMLDivElement, MenuPositionerProps>(
  ArkMenu.Positioner,
  'positioner',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuSeparatorBaseProps
  extends ArkMenuSeparatorBaseProps,
    HTMLSuiProps<'hr'> {}

const MenuSeparatorBase = withContext<HTMLHRElement, MenuSeparatorBaseProps>(
  ArkMenu.Separator,
  'separator',
)

////////////////////////////////////////////////////////////////////////////////////

interface MenuContentBaseProps
  extends ArkMenuContentBaseProps,
    HTMLSuiProps<'div'> {}

const MenuContentBase = withContext<HTMLDivElement, MenuContentBaseProps>(
  ArkMenu.Content,
  'content',
)

// arrow

export interface MenuArrowBaseProps
  extends ArkMenuArrowBaseProps,
    HTMLSuiProps<'div'> {}

const MenuArrowBase = withContext<HTMLDivElement, MenuArrowBaseProps>(
  ArkMenu.Arrow,
  'arrow',
)

// arrow tip

export interface MenuArrowTipProps
  extends ArkMenuArrowTipBaseProps,
    HTMLSuiProps<'div'> {}

const MenuArrowTipBase = withContext<HTMLDivElement, MenuArrowTipProps>(
  ArkMenu.ArrowTip,
  'arrowTip',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuIndicatorProps
  extends ArkMenuIndicatorBaseProps,
    HTMLSuiProps<'div'> {}

const MenuIndicatorBase = withContext<HTMLDivElement, MenuIndicatorProps>(
  ArkMenu.Indicator,
  'indicator',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupProps
  extends ArkMenuItemGroupBaseProps,
    HTMLSuiProps<'div'> {}

const MenuItemGroupBase = withContext<HTMLDivElement, MenuItemGroupProps>(
  ArkMenu.ItemGroup,
  'itemGroup',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupLabelProps
  extends ArkMenuItemGroupLabelBaseProps,
    HTMLSuiProps<'div'> {}

const MenuItemGroupLabelBase = withContext<
  HTMLDivElement,
  MenuItemGroupLabelProps
>(ArkMenu.ItemGroupLabel, 'itemGroupLabel')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemProps
  extends ArkMenuItemBaseProps,
    HTMLSuiProps<'div'> {}

const MenuItemBase = withContext<HTMLDivElement, MenuItemProps>(
  ArkMenu.Item,
  'item',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerItemBaseProps
  extends ArkMenuTriggerItemBaseProps,
    HTMLSuiProps<'div'> {}

const MenuTriggerItemBase = withContext<
  HTMLDivElement,
  MenuTriggerItemBaseProps
>(ArkMenu.TriggerItem, 'item')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemTextProps
  extends ArkMenuItemTextBaseProps,
    HTMLSuiProps<'div'> {}

const MenuItemTextBase = withContext<HTMLDivElement, MenuItemTextProps>(
  ArkMenu.ItemText,
  'itemText',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemCommandBaseProps extends HTMLSuiProps<'kbd'> {}

const MenuItemCommandBase = withContext<
  HTMLSpanElement,
  MenuItemCommandBaseProps
>('kbd', 'itemCommand')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemIndicatorBaseProps
  extends ArkMenuItemIndicatorBaseProps,
    HTMLSuiProps<'div'> {}

const MenuItemIndicatorBase = withContext<
  HTMLDivElement,
  MenuItemIndicatorBaseProps
>(ArkMenu.ItemIndicator, 'itemIndicator')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuCheckboxItemProps
  extends ArkMenuCheckboxItemBaseProps,
    HTMLSuiProps<'div'> {}

const MenuCheckboxItemBase = withContext<HTMLDivElement, MenuCheckboxItemProps>(
  ArkMenu.CheckboxItem,
  'item',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemGroupProps
  extends ArkMenuRadioItemGroupBaseProps,
    HTMLSuiProps<'div'> {}

const MenuRadioItemGroupBase = withContext<
  HTMLDivElement,
  MenuRadioItemGroupProps
>(ArkMenu.RadioItemGroup, 'itemGroup')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemProps
  extends ArkMenuRadioItemBaseProps,
    HTMLSuiProps<'div'> {}

const MenuRadioItemBase = withContext<HTMLDivElement, MenuRadioItemProps>(
  ArkMenu.RadioItem,
  'item',
)

////////////////////////////////////////////////////////////////////////////////////

export const MenuContext = ArkMenu.Context
export const MenuItemContext = ArkMenu.ItemContext

export interface MenuOpenChangeDetails extends ArkMenu.OpenChangeDetails {}
export interface MenuSelectionDetails extends ArkMenu.SelectionDetails {}
export interface MenuHighlightChangeDetails
  extends ArkMenu.HighlightChangeDetails {}

interface MenuContentProps extends MenuContentBaseProps {
  portalled?: boolean
  portalRef?: RefObject<HTMLElement>
}

export const Content = forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <MenuPositionerBase>
          <MenuContentBase ref={ref} {...rest} />
        </MenuPositionerBase>
      </Portal>
    )
  },
)

export const Arrow = forwardRef<HTMLDivElement, MenuArrowBaseProps>(
  function MenuArrow(props, ref) {
    return (
      <MenuArrowBase ref={ref} {...props}>
        <MenuArrowTipBase />
      </MenuArrowBase>
    )
  },
)

export const CheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  function MenuCheckboxItem(props, ref) {
    return (
      <MenuCheckboxItemBase ref={ref} {...props}>
        <MenuIndicatorBase hidden={false}>
          <CheckIcon height={16} width={16} />
        </MenuIndicatorBase>
        {props.children}
      </MenuCheckboxItemBase>
    )
  },
)

export const RadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  function MenuRadioItem(props, ref) {
    const { children, ...rest } = props
    return (
      <MenuRadioItemBase ps="8" ref={ref} {...rest}>
        <MenuItemIndicatorBase
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <CheckIcon height={16} width={16} />
        </MenuItemIndicatorBase>
        <MenuItemTextBase>{children}</MenuItemTextBase>
      </MenuRadioItemBase>
    )
  },
)

export const ItemGroup = forwardRef<HTMLDivElement, MenuItemGroupProps>(
  function MenuItemGroup(props, ref) {
    const { title, children, ...rest } = props
    return (
      <MenuItemGroupBase ref={ref} {...rest}>
        {title && (
          <MenuItemGroupLabelBase userSelect="none">
            {title}
          </MenuItemGroupLabelBase>
        )}
        {children}
      </MenuItemGroupBase>
    )
  },
)

export interface MenuTriggerItemProps extends MenuTriggerItemBaseProps {
  startIcon?: ReactNode
}

export const TriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>(
  function MenuTriggerItem(props, ref) {
    const { startIcon, children, ...rest } = props
    return (
      <MenuTriggerItemBase ref={ref} {...rest}>
        {startIcon}
        {children}
        <ChevronRightIcon />
      </MenuTriggerItemBase>
    )
  },
)

export const Root = MenuRootBase
export const RadioItemGroup = MenuRadioItemGroupBase
export const ContextTrigger = MenuContextTriggerBase
export const Separator = MenuSeparatorBase
export const Item = MenuItemBase
export const ItemText = MenuItemTextBase
export const ItemCommand = MenuItemCommandBase
export const Trigger = MenuTriggerBase
