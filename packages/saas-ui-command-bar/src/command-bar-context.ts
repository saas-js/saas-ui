import { SystemStyleObjectRecord, useDisclosure } from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import { callAllHandlers } from '@chakra-ui/utils'
import { useCallback } from 'react'

export interface CommandBarOptions {
  shouldFilter?: boolean
  onFilter?(string: string, search: string): number
  value?: string
  onValueChange?(search: string): void
  onSelect?(value: string): void
  isOpen?: boolean
  onClose?(): void
  closeOnSelect?: boolean
}

export const [CommandBarStylesProvider, useCommandBarStyles] =
  createContext<SystemStyleObjectRecord>({
    name: 'CommandBarStylesProvider',
  })

export const [CommandBarProvider, useCommandBarContext] =
  createContext<CommandBarContext>({
    name: 'CommandBarProvider',
  })

export type CommandBarContext = ReturnType<typeof useCommandBar>

export const useCommandBar = (props: CommandBarOptions) => {
  const {
    shouldFilter = true,
    onFilter,
    value,
    onValueChange,
    onSelect,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    closeOnSelect,
  } = props

  const { isOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    onClose: onCloseProp,
  })

  const getCommandProps = useCallback(
    (props: any) => {
      return {
        shouldFilter,
        onFilter,
        value,
        onValueChange,
        ...props,
      }
    },
    [shouldFilter, onFilter, value, onValueChange]
  )

  const getItemProps = useCallback(
    (props: any) => {
      return {
        ...props,
        onSelect: callAllHandlers(props.onSelect, onSelect, () => {
          if (closeOnSelect) {
            onClose()
          }
        }),
      }
    },
    [onSelect, closeOnSelect, onClose]
  )

  const getDialogProps = useCallback(
    (props: any) => {
      return {
        isOpen,
        onClose,
      }
    },
    [isOpen, onClose]
  )

  return {
    getCommandProps,
    getItemProps,
    getDialogProps,
  }
}
