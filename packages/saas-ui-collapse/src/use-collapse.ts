import * as React from 'react'
import { createContext } from '@chakra-ui/react-utils'
import { useDisclosure, useId, HTMLChakraProps } from '@chakra-ui/react'

export interface UseCollapseReturn {
  getToggleProps: (props: HTMLChakraProps<any>) => HTMLChakraProps<any>
  getCollapseProps: (props: HTMLChakraProps<any>) => HTMLChakraProps<any>
  isOpen: boolean
}

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

  const getToggleProps = React.useCallback(
    (props = {}) => {
      if (isCollapsible) {
        return {
          className: 'sui-collapse-toggle',
          onClick: () => onToggle(),
          'aria-expanded': isOpen.toString(),
          'aria-controls': id,
          ...props,
        }
      }
      return {}
    },
    [isCollapsible, isOpen]
  )

  const getCollapseProps = React.useCallback(
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
    isOpen,
    getToggleProps,
    getCollapseProps,
    onToggle,
    onOpen,
    onClose,
  }
}
