import * as React from 'react'
import { createContext, PropGetter } from '@chakra-ui/react-utils'
import { useDisclosure, useId } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

export const [CollapseProvider, useCollapseContext] =
  createContext<UseCollapseReturn>({
    name: 'UseCollapseReturn',
  })

export interface UseCollapse {
  defaultIsOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  isCollapsible?: boolean
}

export const useCollapse = (props: UseCollapse = {}) => {
  const { isCollapsible = true, ...rest } = props

  const id = `collapse-${useId()}`

  const { isOpen, onToggle, onOpen, onClose } = useDisclosure(rest)

  const getToggleProps: PropGetter = React.useCallback(
    (props = {}) => {
      const { className, ...rest } = props
      if (isCollapsible) {
        return {
          className: cx('sui-collapse-toggle', className),
          onClick: () => onToggle(),
          'aria-expanded': isOpen.toString(),
          'aria-controls': id,
          ...rest,
        }
      }
      return {}
    },
    [isCollapsible, isOpen]
  )

  const getCollapseProps: PropGetter = React.useCallback(
    (props = {}) => {
      return {
        id,
        in: isOpen,
        ...props,
      }
    },
    [isOpen]
  )

  return {
    isCollapsible,
    isOpen,
    getToggleProps,
    getCollapseProps,
    onToggle,
    onOpen,
    onClose,
  }
}

export interface UseCollapseReturn extends ReturnType<typeof useCollapse> {}
