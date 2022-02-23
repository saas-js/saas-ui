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

type Position = [number, number]

export interface UseContextMenuReturn {
  isOpen: boolean
  isRendered: boolean
  isDeferredOpen: boolean
  position: Position
  triggerRef: React.RefObject<HTMLSpanElement>
  onClose: () => void
  onOpen: (event: React.MouseEvent) => void
}

export const [ContextMenuProvider, useContextMenuContext] =
  createContext<UseContextMenuReturn>({
    name: 'UseContextMenuContext',
  })

export interface UseContextMenuProps extends ContextMenuProps {
  onClose?: () => void
}

export const useContextMenu = (props: UseContextMenuProps) => {
  const { isLazy = false } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(!isLazy)
  const [isDeferredOpen, setIsDeferredOpen] = useState(false)
  const [position, setPosition] = useState<Position>([0, 0])
  const triggerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      setTimeout(() => {
        setIsDeferredOpen(true)
      })
    } else {
      setIsDeferredOpen(false)
      const timeout = setTimeout(() => {
        setIsRendered(isOpen || !isLazy)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  // useOutsideClick off menu doesn't catch contextmenu
  useEventListener('contextmenu', (e) => {
    if (
      !triggerRef.current?.contains(e.target as any) &&
      e.target !== triggerRef.current
    ) {
      setIsOpen(false)
    }
  })

  const onOpen = useCallback((event) => {
    setIsOpen(true)
    setPosition([event.pageX, event.pageY])
  }, [])

  const onClose = useCallback(() => {
    props.onClose?.()
    setIsOpen(false)
  }, [props.onClose, setIsOpen])

  return {
    isOpen,
    isRendered,
    isDeferredOpen,
    position,
    triggerRef,
    onClose,
    onOpen,
  }
}

export interface ContextMenuProps extends MenuProps {}
export const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { children } = props
  const ctx = useContextMenu(props)

  const context = React.useMemo(() => ctx, [ctx])

  const { isDeferredOpen, onClose } = context

  return (
    <Menu
      isOpen={isDeferredOpen}
      gutter={0}
      autoSelect={false}
      onClose={onClose}
    >
      <ContextMenuProvider value={context}>{children}</ContextMenuProvider>
    </Menu>
  )
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

export interface ContextMenuListProps extends MenuListProps {}

export const ContextMenuList: React.FC<ContextMenuListProps> = (props) => {
  const { children, ...rest } = props
  const { isRendered, position } = useContextMenuContext()

  return isRendered ? (
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
  ) : null
}
