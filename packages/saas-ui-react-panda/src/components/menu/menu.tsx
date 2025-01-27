import { ComponentProps, ReactNode, RefObject, forwardRef } from 'react'

import { Portal } from '@ark-ui/react'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { styled } from '@saas-ui/panda/jsx'
import { menu } from '@saas-ui/panda/recipes'

import { createStyleContext } from '../context'
import { CheckIcon, ChevronRightIcon } from '../icons'

const { withProvider, withContext } = createStyleContext(menu)

export interface MenuRootProps extends ComponentProps<typeof ArkMenu.Root> { }

export const MenuRootBase = withProvider(styled(ArkMenu.Root))

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerProps
  extends ComponentProps<typeof MenuTriggerBase> { }

const MenuTriggerBase = withContext(
  styled(
    ArkMenu.Trigger,
    {},
    {
      defaultProps: {
        asChild: true,
      },
    },
  ),
  'trigger',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuContextTriggerProps
  extends ComponentProps<typeof MenuContextTriggerBase> { }

const MenuContextTriggerBase = withContext(
  styled(ArkMenu.ContextTrigger),
  'contextTrigger',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuPositionerProps
  extends ComponentProps<typeof MenuPositionerBase> { }

const MenuPositionerBase = withContext(styled(ArkMenu.Positioner), 'positioner')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuSeparatorProps
  extends ComponentProps<typeof MenuSeparatorBase> { }

const MenuSeparatorBase = withContext(styled(ArkMenu.Separator), 'separator')

////////////////////////////////////////////////////////////////////////////////////

interface MenuContentBaseProps extends ComponentProps<typeof MenuContentBase> { }

const MenuContentBase = withContext(styled(ArkMenu.Content), 'content')

// arrow

export interface MenuArrowBaseProps
  extends ComponentProps<typeof MenuArrowBase> { }

const MenuArrowBase = withContext(styled(ArkMenu.Arrow), 'arrow')

// arrow tip

export interface MenuArrowTipProps
  extends ComponentProps<typeof MenuArrowTipBase> { }

export const MenuArrowTipBase = withContext(
  styled(ArkMenu.ArrowTip),
  'arrowTip',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuIndicatorProps
  extends ComponentProps<typeof MenuIndicatorBase> { }

const MenuIndicatorBase = withContext(styled(ArkMenu.Indicator), 'indicator')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemGroupProps
  extends ComponentProps<typeof MenuItemGroupBase> { }

const MenuItemGroupBase = withContext(styled(ArkMenu.ItemGroup), 'itemGroup')

////////////////////////////////////////////////////////////////////////////////////

// export interface MenuItemGroupLabelProps
//   extends ComponentProps<typeof MenuItemGroupLabelBase> {}

const MenuItemGroupLabelBase = withContext(
  styled(ArkMenu.ItemGroupLabel),
  'itemGroupLabel',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemProps extends ComponentProps<typeof MenuItemBase> { }

const MenuItemBase = withContext(styled(ArkMenu.Item), 'item')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuTriggerItemBaseProps
  extends ComponentProps<typeof MenuTriggerItemBase> { }

const MenuTriggerItemBase = withContext(styled(ArkMenu.TriggerItem), 'item')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemTextProps
  extends ComponentProps<typeof MenuItemTextBase> { }

const MenuItemTextBase = withContext(styled(ArkMenu.ItemText), 'itemText')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemCommandBaseProps
  extends ComponentProps<typeof MenuItemCommandBase> { }

const MenuItemCommandBase = withContext(styled.kbd, 'itemCommand')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemIndicatorBaseProps
  extends ComponentProps<typeof MenuItemIndicatorBase> { }

const MenuItemIndicatorBase = withContext(
  styled(ArkMenu.ItemIndicator),
  'itemIndicator',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuCheckboxItemProps
  extends ComponentProps<typeof MenuCheckboxItemBase> { }

const MenuCheckboxItemBase = withContext(styled(ArkMenu.CheckboxItem), 'item')

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemGroupProps
  extends ComponentProps<typeof RadioItemGroup> { }

const MenuRadioItemGroupBase = withContext(
  styled(ArkMenu.RadioItemGroup),
  'itemGroup',
)

////////////////////////////////////////////////////////////////////////////////////

export interface MenuRadioItemProps
  extends ComponentProps<typeof MenuRadioItemBase> { }

const MenuRadioItemBase = withContext(styled(ArkMenu.RadioItem), 'item')

////////////////////////////////////////////////////////////////////////////////////

export const MenuContext = ArkMenu.Context
export const MenuItemContext = ArkMenu.ItemContext

export interface MenuOpenChangeDetails extends ArkMenu.OpenChangeDetails { }
export interface MenuSelectionDetails extends ArkMenu.SelectionDetails { }
export interface MenuHighlightChangeDetails
  extends ArkMenu.HighlightChangeDetails { }

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
