'use client'

import { forwardRef } from 'react'

import type { CollectionItem } from '@chakra-ui/react/collection'
import { Portal } from '@chakra-ui/react/portal'
import { Select as SelectPrimitive } from '@chakra-ui/react/select'

import { CloseButton } from '#components/close-button'

export interface SelectTriggerProps extends SelectPrimitive.ControlProps {
  clearable?: boolean
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(props, ref) {
    const { children, clearable, ...rest } = props
    return (
      <SelectPrimitive.Control {...rest}>
        <SelectPrimitive.Trigger ref={ref}>{children}</SelectPrimitive.Trigger>
        <SelectPrimitive.IndicatorGroup>
          {clearable && <SelectClearTrigger />}
          <SelectPrimitive.Indicator />
        </SelectPrimitive.IndicatorGroup>
      </SelectPrimitive.Control>
    )
  },
)

const SelectClearTrigger = forwardRef<
  HTMLButtonElement,
  SelectPrimitive.ClearTriggerProps
>(function SelectClearTrigger(props, ref) {
  return (
    <SelectPrimitive.ClearTrigger asChild {...props} ref={ref}>
      <CloseButton
        size="xs"
        variant="plain"
        focusVisibleRing="inside"
        focusRingWidth="2px"
        pointerEvents="auto"
      />
    </SelectPrimitive.ClearTrigger>
  )
})

export interface SelectContentProps extends SelectPrimitive.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <SelectPrimitive.Positioner>
          <SelectPrimitive.Content {...rest} ref={ref} />
        </SelectPrimitive.Positioner>
      </Portal>
    )
  },
)

export const SelectItem = forwardRef<HTMLDivElement, SelectPrimitive.ItemProps>(
  function SelectItem(props, ref) {
    const { item, children, ...rest } = props
    return (
      <SelectPrimitive.Item key={item.value} item={item} {...rest} ref={ref}>
        {children}
        <SelectPrimitive.ItemIndicator />
      </SelectPrimitive.Item>
    )
  },
)

export interface SelectValueTextProps
  extends Omit<SelectPrimitive.ValueTextProps, 'children'> {
  children?(items: CollectionItem[]): React.ReactNode
}

export const SelectValueText = forwardRef<
  HTMLSpanElement,
  SelectValueTextProps
>(function SelectValueText(props, ref) {
  const { children, ...rest } = props
  return (
    <SelectPrimitive.ValueText {...rest} ref={ref}>
      <SelectPrimitive.Context>
        {(select) => {
          const items = select.selectedItems
          if (items.length === 0) return props.placeholder
          if (children) return children(items)
          if (items.length === 1)
            return select.collection.stringifyItem(items[0])
          return `${items.length} selected`
        }}
      </SelectPrimitive.Context>
    </SelectPrimitive.ValueText>
  )
})

export interface SelectRootProps<T> extends SelectPrimitive.RootProps<T> {}

export const SelectRoot = forwardRef(function SelectRoot<
  T extends CollectionItem,
>(props: SelectRootProps<T>, ref: React.Ref<HTMLDivElement>) {
  return (
    <SelectPrimitive.Root
      {...props}
      ref={ref}
      positioning={{ sameWidth: true, ...props.positioning }}
    />
  )
}) as <T extends CollectionItem>(
  props: SelectRootProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement

export interface SelectItemGroupProps extends SelectPrimitive.ItemGroupProps {
  label: React.ReactNode
}

export const SelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(
  function SelectItemGroup(props, ref) {
    const { children, label, ...rest } = props
    return (
      <SelectPrimitive.ItemGroup {...rest} ref={ref}>
        <SelectPrimitive.ItemGroupLabel>{label}</SelectPrimitive.ItemGroupLabel>
        {children}
      </SelectPrimitive.ItemGroup>
    )
  },
)

export const SelectLabel = SelectPrimitive.Label
export const SelectItemText = SelectPrimitive.ItemText
