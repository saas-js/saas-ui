import { ComponentProps, ReactNode, RefObject, forwardRef } from 'react'

import { Portal } from '@ark-ui/react'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import '@saas-ui/panda-preset/jsx'
import { menu } from '@saas-ui/panda-preset/recipes'

import { createStyleContext } from '../context'
import { CheckIcon, ChevronRightIcon } from '../icons'

const { withProvider, withContext } = createStyleContext(menu)

export interface MenuRootProps extends ComponentProps<typeof ArkMenu.Root> {}

export const MenuRootBase = withProvider(ArkMenu.Root)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerProps
  extends ComponentProps<typeof MenuTriggerBase> {}

const MenuTriggerBase = withContext(
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
  extends ComponentProps<typeof MenuContextTriggerBase> {}

const MenuContextTriggerBase = withContext(
  ArkMenu.ContextTrigger,
  'contextTrigger',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuPositionerProps
  extends ComponentProps<typeof MenuPositionerBase> {}

const MenuPositionerBase = withContext(ArkMenu.Positioner, 'positioner')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuSeparatorProps
  extends ComponentProps<typeof MenuSeparatorBase> {}

const MenuSeparatorBase = withContext(ArkMenu.Separator, 'separator')

////////////////////////////////////////////////////////////////////////////////////

interface MenuContentBaseProps extends ComponentProps<typeof MenuContentBase> {}

const MenuContentBase = withContext(ArkMenu.Content, 'content')

// arrow

export interface MenuArrowBaseProps
  extends ComponentProps<typeof MenuArrowBase> {}

const MenuArrowBase = withContext(ArkMenu.Arrow, 'arrow')

// arrow tip

export interface MenuArrowTipProps
  extends ComponentProps<typeof MenuArrowTipBase> {}

export const MenuArrowTipBase = withContext(ArkMenu.ArrowTip, 'arrowTip')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuIndicatorProps
  extends ComponentProps<typeof MenuIndicatorBase> {}

const MenuIndicatorBase = withContext(ArkMenu.Indicator, 'indicator')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupProps
  extends ComponentProps<typeof MenuItemGroupBase> {}

const MenuItemGroupBase = withContext(ArkMenu.ItemGroup, 'itemGroup')

////////////////////////////////////////////////////////////////////////////////////

// export interface MenuItemGroupLabelProps
//   extends ComponentProps<typeof MenuItemGroupLabelBase> {}

const MenuItemGroupLabelBase = withContext(
  ArkMenu.ItemGroupLabel,
  'itemGroupLabel',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemProps extends ComponentProps<typeof MenuItemBase> {}

const MenuItemBase = withContext(ArkMenu.Item, 'item')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerItemBaseProps
  extends ComponentProps<typeof MenuTriggerItemBase> {}

const MenuTriggerItemBase = withContext(ArkMenu.TriggerItem, 'item')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemTextProps
  extends ComponentProps<typeof MenuItemTextBase> {}

const MenuItemTextBase = withContext(ArkMenu.ItemText, 'itemText')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemCommandBaseProps
  extends ComponentProps<typeof MenuItemCommandBase> {}

const MenuItemCommandBase = withContext('kbd', 'itemCommand')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemIndicatorBaseProps
  extends ComponentProps<typeof MenuItemIndicatorBase> {}

const MenuItemIndicatorBase = withContext(
  ArkMenu.ItemIndicator,
  'itemIndicator',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuCheckboxItemProps
  extends ComponentProps<typeof MenuCheckboxItemBase> {}

const MenuCheckboxItemBase = withContext(ArkMenu.CheckboxItem, 'item')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemGroupProps
  extends ComponentProps<typeof RadioItemGroup> {}

const MenuRadioItemGroupBase = withContext(ArkMenu.RadioItemGroup, 'itemGroup')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemProps
  extends ComponentProps<typeof MenuRadioItemBase> {}

const MenuRadioItemBase = withContext(ArkMenu.RadioItem, 'item')

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
