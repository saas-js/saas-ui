import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalProps,
  omitThemingProps,
} from '@chakra-ui/react'
import {
  CommandBarProvider,
  CommandBarStylesProvider,
  useCommandBarContext,
  useCommandBarStyles,
} from './command-bar-context'
import { cx, dataAttr } from '@chakra-ui/utils'
import { useCommandBar, CommandBarOptions } from './command-bar-context'

import { Command as CommandPrimitive } from 'cmdk'

import styleConfig from './command-bar-styles'

function cmdkFactory<P extends object>(
  Component: React.ForwardRefExoticComponent<P>,
  key: string
) {
  const StyledComponent = chakra(Component)
  return forwardRef<any, typeof StyledComponent>((props, ref) => {
    const styles = useCommandBarStyles()

    const componentStyles = {
      ...styles[key],
    }

    return (
      <StyledComponent
        ref={ref}
        {...props}
        __css={componentStyles}
        className={cx(`saas-command-bar__${key}`, props.className)}
      />
    )
  })
}

const StyledCommand = chakra(CommandPrimitive)
const StyledInput = chakra(CommandPrimitive.Input)
const StyledItem = chakra(CommandPrimitive.Item)

export const CommandBarList = cmdkFactory(CommandPrimitive.List, 'list')
export const CommandBarLoading = cmdkFactory(
  CommandPrimitive.Loading,
  'loading'
)
export const CommandBarEmpty = cmdkFactory(CommandPrimitive.Empty, 'empty')

export const CommandBarSeparator = cmdkFactory(
  CommandPrimitive.Separator,
  'separator'
)
export const CommandBarGroup = cmdkFactory(CommandPrimitive.Group, 'group')

export interface CommandBarProps
  extends CommandBarOptions,
    ThemingProps<'CommandBar'> {
  children: React.ReactNode
}

export const CommandBar: React.FC<CommandBarProps> = (props) => {
  const styles = useMultiStyleConfig('CommandBar', {
    styleConfig,
    ...props,
  })

  const { children, ...rest } = omitThemingProps(props)

  const context = useCommandBar(rest)

  return (
    <CommandBarProvider value={context}>
      <CommandBarStylesProvider value={styles}>
        {children}
      </CommandBarStylesProvider>
    </CommandBarProvider>
  )
}

CommandBar.displayName = 'CommandBar'

export const CommandBarContent = forwardRef<HTMLChakraProps<'div'>, 'div'>(
  (props, ref) => {
    const styles = useCommandBarStyles()

    const containerStyles = {
      ...styles.container,
    }

    const { getCommandProps } = useCommandBarContext()

    return (
      <StyledCommand
        ref={ref}
        {...props}
        {...getCommandProps(props)}
        __css={containerStyles}
        className={cx('saas-command-bar', props.className)}
      />
    )
  }
)

CommandBarContent.displayName = 'CommandBarContent'

export interface CommandBarInputProps
  extends Omit<HTMLChakraProps<'input'>, 'onChange'> {
  value?: string
  onChange?(value: string): void
}

export const CommandBarInput = forwardRef<CommandBarInputProps, 'input'>(
  (props, ref) => {
    const { onChange, value, ...rest } = props
    const styles = useCommandBarStyles()

    const inputStyles = {
      ...styles.input,
    }

    return (
      <StyledInput
        ref={ref}
        value={value}
        onValueChange={onChange}
        {...rest}
        __css={inputStyles}
        className={cx('saas-command-bar__input', props.className)}
      />
    )
  }
)

CommandBarInput.displayName = 'CommandBarInput'

export interface CommandBarItemProps
  extends Omit<HTMLChakraProps<'div'>, 'onSelect' | 'value'> {
  onSelect?(value: string): void
  isDisabled?: boolean
  value?: string
}

export const CommandBarItem = forwardRef<CommandBarItemProps, 'div'>(
  (props, ref) => {
    const { onSelect, value, isDisabled, ...rest } = props
    const styles = useCommandBarStyles()

    const itemStyles = {
      ...styles.item,
    }

    const { getItemProps } = useCommandBarContext()

    return (
      <StyledItem
        ref={ref}
        {...getItemProps(props)}
        __css={itemStyles}
        data-disabled={dataAttr(isDisabled)}
        className={cx('saas-command-bar__item', props.className)}
      />
    )
  }
)

CommandBarItem.displayName = 'CommandBarItem'

export interface CommandBarDialogProps
  extends Omit<ModalProps, 'variant' | 'isOpen' | 'onClose'> {
  closeOnSelect?: boolean
}

export const CommandBarDialog = forwardRef<CommandBarDialogProps, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props

    const { getDialogProps } = useCommandBarContext()

    return (
      <Modal {...getDialogProps(rest)} scrollBehavior="inside">
        <ModalContent ref={ref} bg="transparent">
          {children}
        </ModalContent>
      </Modal>
    )
  }
)

CommandBarDialog.displayName = 'CommandBarDialog'

export const CommandBarOverlay = ModalOverlay
