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
  ModalContentProps,
} from '@chakra-ui/react'
import {
  CommandBarProvider,
  CommandBarStylesProvider,
  useCommandBarContext,
  useCommandBarStyles,
} from './command-bar-context'
import { cx, dataAttr } from '@chakra-ui/utils'
import { useCommandBar, CommandBarOptions } from './command-bar-context'

import {
  CommandRoot,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
} from 'cmdk'

import { commandBarTheme } from './command-bar-theme'

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
        className={cx(`sui-command-bar__${key}`, props.className)}
      />
    )
  })
}

const StyledCommand = chakra(CommandRoot)
const StyledInput = chakra(CommandInput)
const StyledItem = chakra(CommandItem)

export const CommandBarList = cmdkFactory(CommandList, 'list')
export const CommandBarLoading = cmdkFactory(CommandLoading, 'loading')
export const CommandBarEmpty = cmdkFactory(CommandEmpty, 'empty')

export const CommandBarSeparator = cmdkFactory(CommandSeparator, 'separator')
export const CommandBarGroup = cmdkFactory(CommandGroup, 'group')

export interface CommandBarProps
  extends CommandBarOptions,
    ThemingProps<'SuiCommandBar'> {
  children: React.ReactNode
}

export const CommandBar: React.FC<CommandBarProps> = (props) => {
  const styles = useMultiStyleConfig('SuiCommandBar', {
    styleConfig: commandBarTheme,
    ...props,
  })

  const context = useCommandBar(props)

  return (
    <CommandBarProvider value={context}>
      <CommandBarStylesProvider value={styles}>
        {props.children}
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
        className={cx('sui-command-bar', props.className)}
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
        className={cx('sui-command-bar__input', props.className)}
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
        className={cx('sui-command-bar__item', props.className)}
      />
    )
  }
)

CommandBarItem.displayName = 'CommandBarItem'

export interface CommandBarDialogProps
  extends Omit<ModalProps, 'variant' | 'isOpen' | 'onClose'> {
  closeOnSelect?: boolean
  contentProps?: ModalContentProps
}

export const CommandBarDialog = forwardRef<CommandBarDialogProps, 'div'>(
  (props, ref) => {
    const { children, contentProps, ...rest } = props

    const { getDialogProps } = useCommandBarContext()

    return (
      <Modal scrollBehavior="inside" {...getDialogProps(rest)}>
        <ModalContent ref={ref} bg="transparent" {...contentProps}>
          {children}
        </ModalContent>
      </Modal>
    )
  }
)

CommandBarDialog.displayName = 'CommandBarDialog'

export const CommandBarOverlay = ModalOverlay
