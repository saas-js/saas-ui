import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import {
  chakra,
  Menu,
  MenuProps,
  MenuList,
  MenuListProps,
  MenuItem,
  HTMLChakraProps,
  useMenuContext,
  useEventListener,
  useOutsideClick,
  forwardRef,
} from '@chakra-ui/react'

import { createContext, mergeRefs } from '@chakra-ui/react-utils'
import { AnyPointerEvent, callAllHandlers, runIfFn } from '@chakra-ui/utils'

// @todo migrate this to Ark-ui ContextMenu
import { useLongPress } from '@react-aria/interactions'

import { getEventPoint } from '@zag-js/dom-event'
import { FocusableElement } from '@react-types/shared'

type Position = [number, number]
type Anchor = { x: number; y: number }

export interface UseContextMenuReturn {
  isOpen: boolean
  anchor: Anchor
  triggerRef: React.RefObject<HTMLSpanElement>
  menuRef: React.RefObject<HTMLDivElement>
  onClose: () => void
  onOpen: (event: AnyPointerEvent) => void
}

export const [ContextMenuProvider, useContextMenuContext] =
  createContext<UseContextMenuReturn>({
    name: 'UseContextMenuContext',
    strict: false,
  })

export interface UseContextMenuProps extends ContextMenuProps {
  onClose?: () => void
}

export const useContextMenu = (props: UseContextMenuProps) => {
  const { closeOnBlur = true } = props
  const [isOpen, setIsOpen] = useState(false)
  const [anchor, setAnchor] = useState<Anchor>({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // useOutsideClick of menu doesn't catch contextmenu
  useEventListener('contextmenu', (e) => {
    if (
      !triggerRef.current?.contains(e.target as any) &&
      e.target !== triggerRef.current
    ) {
      setIsOpen(false)
    } else {
      e.preventDefault()
      e.stopPropagation()
    }
  })

  useOutsideClick({
    enabled: isOpen && closeOnBlur,
    ref: menuRef,
    handler: (event: any /* MouseEvent */) => {
      if (
        !(
          event.button === 2 &&
          triggerRef.current?.contains(event.target as HTMLElement)
        ) &&
        menuRef.current?.parentElement !== event.target
      ) {
        onClose()
      }
    },
  })

  const onOpen = useCallback((event: AnyPointerEvent) => {
    const point = getEventPoint(event)
    setAnchor(point)
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    props.onClose?.()
    setIsOpen(false)
  }, [props.onClose, setIsOpen])

  return {
    isOpen,
    anchor,
    triggerRef,
    menuRef,
    onClose,
    onOpen,
  }
}

export interface ContextMenuProps extends MenuProps {}
export const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { children, ...rest } = props
  const ctx = useContextMenu(props)

  const context = React.useMemo(() => ctx, [ctx])

  const { isOpen, onClose } = context

  return (
    <Menu
      gutter={0}
      {...rest}
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={false}
    >
      {(fnProps) => (
        <ContextMenuProvider value={context}>
          {runIfFn(children, fnProps)}
        </ContextMenuProvider>
      )}
    </Menu>
  )
}

ContextMenu.displayName = 'ContextMenu'

const generateClientRect = (x = 0, y = 0) => {
  return () => {
    return {
      width: 0,
      height: 0,
      top: y,
      left: x,
      right: x,
      bottom: y,
    }
  }
}

const isTouchDevice = () => {
  return (
    typeof window !== undefined && window.matchMedia('(hover: none)').matches
  )
}

const useContextMenuTrigger = (
  props: ContextMenuTriggerProps,
  ref: React.ForwardedRef<any>
) => {
  const { triggerRef, onOpen, onClose, anchor } = useContextMenuContext()

  const menu = useMenuContext()

  const { popper, openAndFocusFirstItem } = menu

  const { longPressProps } = useLongPress({
    isDisabled: props.longPressDisabled,
    accessibilityDescription: 'Long press to open context menu',
    onLongPressStart: (e) => {
      onClose()
    },
    onLongPress: (e) => {
      if (e.pointerType === 'mouse') return

      if (e.type === 'longpress') {
        onOpen(e as unknown as AnyPointerEvent)
        openAndFocusFirstItem()
      }
    },
  })

  const anchorRef = React.useRef({
    getBoundingClientRect: generateClientRect(anchor.x, anchor.y),
  })

  React.useEffect(() => {
    popper.referenceRef(anchorRef.current)
  }, [])

  React.useEffect(() => {
    anchorRef.current.getBoundingClientRect = generateClientRect(
      anchor.x,
      anchor.y
    )
    menu.popper.update()
  }, [anchor])

  const onPointerDown: React.PointerEventHandler<FocusableElement> = (
    event
  ) => {
    if (event.pointerType !== 'mouse') {
      longPressProps.onPointerDown?.(event)
    }
  }

  const onMouseDown: React.MouseEventHandler<FocusableElement> = (event) => {
    if (isTouchDevice()) {
      longPressProps.onMouseDown?.(event)
    }
  }

  return {
    triggerProps: {
      ...longPressProps,
      onPointerDown,
      onMouseDown,
      onContextMenu: callAllHandlers((event: AnyPointerEvent) => {
        event.preventDefault()
        onOpen(event)
        openAndFocusFirstItem()
      }, props.onContextMenu as any),
      ref: mergeRefs(triggerRef, ref),
    },
  }
}

export interface ContextMenuTriggerProps extends HTMLChakraProps<'span'> {
  /**
   * If `true`, the long press gesture is disabled.
   */
  longPressDisabled?: boolean
}

export const ContextMenuTrigger = forwardRef<ContextMenuTriggerProps, 'span'>(
  (props, ref) => {
    const { children, longPressDisabled, ...rest } = props

    const { triggerProps } = useContextMenuTrigger(props, ref)

    return (
      <chakra.span
        {...rest}
        sx={{ WebkitTouchCallout: 'none' }}
        {...triggerProps}
      >
        {children}
      </chakra.span>
    )
  }
)

ContextMenuTrigger.displayName = 'ContextMenuTrigger'

export interface ContextMenuListProps extends MenuListProps {}

export const ContextMenuList: React.FC<ContextMenuListProps> = (props) => {
  const { children, ...rest } = props
  const { menuRef } = useContextMenuContext()

  return (
    <MenuList ref={menuRef} {...rest}>
      {children}
    </MenuList>
  )
}

ContextMenuList.displayName = 'ContextMenuList'

export const ContextMenuItem = MenuItem
