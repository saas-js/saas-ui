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
} from '@chakra-ui/react'

import { createContext } from '@chakra-ui/react-utils'
import { AnyPointerEvent, runIfFn } from '@chakra-ui/utils'

// @todo migrate this to Ark-ui ContextMenu
import { useLongPress } from '@react-aria/interactions'

import { getEventPoint } from '@zag-js/dom-event'
import { getPlacement } from '@zag-js/popper'

type Position = [number, number]

export interface UseContextMenuReturn {
  isOpen: boolean
  position: Position
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
  const [position, setPosition] = useState<Position>([0, 0])
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
    handler: (event) => {
      if (!triggerRef.current?.contains(event.target as HTMLElement)) {
        onClose()
      }
    },
  })

  const onOpen = useCallback((event: AnyPointerEvent) => {
    setIsOpen(true)
    const point = getEventPoint(event)
    setPosition([point.x, point.y])
  }, [])

  const onClose = useCallback(() => {
    props.onClose?.()
    setIsOpen(false)
  }, [props.onClose, setIsOpen])

  const getAnchorRect = () => {
    return {
      width: 0,
      height: 0,
      top: position[1],
      left: position[0],
    }
  }
  const placement = getPlacement(triggerRef.current, menuRef.current, {
    getAnchorRect,
    listeners: false,
    onComplete(data) {
      console.log('data', data)
    },
  })

  console.log('placement', placement)

  // const getMenuListProps = () => {

  // }

  return {
    isOpen,
    position,
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

export interface ContextMenuTriggerProps extends HTMLChakraProps<'span'> {}

export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = (
  props
) => {
  const { children, ...rest } = props
  const { triggerRef, onOpen, onClose } = useContextMenuContext()

  const { longPressProps } = useLongPress({
    accessibilityDescription: 'Long press to open context menu',
    onLongPressStart: (e) => {
      if (e.pointerType === 'mouse') {
        onClose()
      }
    },
    onLongPress: (e) => {
      if (e.pointerType === 'mouse') return

      if (e.type === 'longpress') {
        onOpen(e as unknown as AnyPointerEvent)
        openAndFocusFirstItem()
      }
    },
  })

  const menu = useMenuContext()

  const { openAndFocusFirstItem } = menu

  return (
    <chakra.span
      {...rest}
      sx={{ WebkitTouchCallout: 'none' }}
      {...longPressProps}
      onContextMenu={(event) => {
        event.preventDefault()
        onOpen(event as unknown as AnyPointerEvent)
        openAndFocusFirstItem()
      }}
      ref={triggerRef}
    >
      {children}
    </chakra.span>
  )
}

ContextMenuTrigger.displayName = 'ContextMenuTrigger'

export interface ContextMenuListProps extends MenuListProps {}

export const ContextMenuList: React.FC<ContextMenuListProps> = (props) => {
  const { children, ...rest } = props
  const { position, menuRef } = useContextMenuContext()

  return (
    <MenuList
      ref={menuRef}
      {...rest}
      style={{
        position: 'absolute',
        left: position[0],
        top: position[1],
      }}
    >
      {children}
    </MenuList>
  )
}

ContextMenuList.displayName = 'ContextMenuList'

export const ContextMenuItem = MenuItem
