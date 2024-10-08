import {
  SystemStyleObjectRecord,
  ThemingProps,
  useDisclosure,
} from '@chakra-ui/react'

import { callAllHandlers, createContext } from '@chakra-ui/utils'
import { useCallback } from 'react'

export interface CommandBarOptions {
  shouldFilter?: boolean
  onFilter?(string: string, search: string): number
  value?: string
  onChange?(search: string): void
  onSelect?(value: string): void
  isOpen?: boolean
  onClose?(): void
  closeOnSelect?: boolean
  size?: ThemingProps<'SuiCommandBar'>['size']
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
    onChange,
    onSelect,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    closeOnSelect,
    size,
  } = props

  const { isOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    onClose: onCloseProp,
  })

  const getCommandProps = useCallback(
    (props: any) => {
      return {
        shouldFilter,
        filter: onFilter,
        value,
        onValueChange: onChange,
        ...props,
      }
    },
    [shouldFilter, onFilter, value, onChange]
  )

  const getItemProps = useCallback(
    (props: any) => {
      const { isDisabled, onSelect: onSelectProp, ...rest } = props
      return {
        ...rest,
        disabled: isDisabled,
        onSelect: callAllHandlers(onSelectProp, onSelect, () => {
          if (closeOnSelect) {
            onClose()
          }
        }),
      }
    },
    [onSelect, closeOnSelect, onClose]
  )

  const getDialogProps = useCallback(
    (props?: any) => {
      return {
        isOpen,
        onClose: callAllHandlers(props?.onClose, onClose),
        size,
        ...props,
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
