import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  chakra,
  Portal,
  Menu,
  MenuProps,
  MenuList,
  MenuListProps,
  HTMLChakraProps,
  useMenuContext,
  useEventListener,
} from '@chakra-ui/react'

import { createContext } from '@chakra-ui/react-utils'
import { runIfFn, __DEV__ } from '@chakra-ui/utils'

type Position = [number, number]

export interface UseContextMenuReturn {
  isOpen: boolean
  position: Position
  triggerRef: React.RefObject<HTMLSpanElement>
  onClose: () => void
  onOpen: (event: React.MouseEvent) => void
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
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<Position>([0, 0])
  const triggerRef = useRef<HTMLSpanElement>(null)

  // useOutsideClick off menu doesn't catch contextmenu
  useEventListener('contextmenu', (e) => {
    if (
      !triggerRef.current?.contains(e.target as any) &&
      e.target !== triggerRef.current
    ) {
      setIsOpen(false)
    }
  })

  const onOpen = useCallback((event: React.MouseEvent) => {
    setIsOpen(true)
    setPosition([event.pageX, event.pageY])
  }, [])

  const onClose = useCallback(() => {
    props.onClose?.()
    setIsOpen(false)
  }, [props.onClose, setIsOpen])

  return {
    isOpen,
    position,
    triggerRef,
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
    <Menu gutter={0} {...rest} isOpen={isOpen} onClose={onClose}>
      {(fnProps) => (
        <ContextMenuProvider value={context}>
          {runIfFn(children, fnProps)}
        </ContextMenuProvider>
      )}
    </Menu>
  )
}

if (__DEV__) {
  ContextMenu.displayName = 'ContextMenu'
}

export interface ContextMenuTriggerProps extends HTMLChakraProps<'span'> {}

export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = (
  props
) => {
  const { children, ...rest } = props
  const { triggerRef, onOpen } = useContextMenuContext()

  const menu = useMenuContext()

  const { openAndFocusFirstItem } = menu

  // @todo add long press support
  return (
    <chakra.span
      {...rest}
      sx={{ WebkitTouchCallout: 'none' }}
      onContextMenu={(event) => {
        event.preventDefault()
        onOpen(event)
        openAndFocusFirstItem()
      }}
      ref={triggerRef}
    >
      {children}
    </chakra.span>
  )
}

if (__DEV__) {
  ContextMenuTrigger.displayName = 'ContextMenuTrigger'
}

export interface ContextMenuListProps extends MenuListProps {}

export const ContextMenuList: React.FC<ContextMenuListProps> = (props) => {
  const { children, ...rest } = props
  const { position } = useContextMenuContext()

  return (
    <Portal>
      <MenuList
        {...rest}
        style={{
          position: 'absolute',
          left: position[0],
          top: position[1],
        }}
      >
        {children}
      </MenuList>
    </Portal>
  )
}

if (__DEV__) {
  ContextMenuList.displayName = 'ContextMenuList'
}
