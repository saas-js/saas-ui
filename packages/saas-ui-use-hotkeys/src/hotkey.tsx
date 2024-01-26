import React from 'react'
import { UseHotkeysOptions, toAriaKeyshortcuts } from './use-hotkeys'
import { useHotkeysShortcut } from './use-hotkeys-shortcut'

export interface HotkeyProps {
  /**
   * The key combination.
   * Supports shorthands: ⌥ ⇧ ⌃ ⌘
   *
   * Shifted keys like ? and + are handled automatically
   */
  command: string | string[]
  /**
   * Callback to be called when the key combination is pressed
   */
  callback: () => void
  /**
   * Options for the useHotkeys hook
   */
  hotkeyOptions?: UseHotkeysOptions
  /**
   * A single child or render prop function
   */
  children:
    | string
    | React.ReactElement
    | ((props: {
        keys: string | string[]
        ariaKeyshortcuts?: string
      }) => React.ReactNode)
}

/**
 * Registers a hotkey shortcut.
 * Supports shorthands: ⌥ ⇧ ⌃ ⌘
 * Shifted keys like ? and + are handled automatically
 *
 * Will pass `aria-keyshortcuts` to the child if it's a valid element, or render a span with the attribute
 */
export const Hotkey: React.FC<HotkeyProps> = (props) => {
  const { command, callback, hotkeyOptions, children } = props

  const keys = useHotkeysShortcut(command, callback, hotkeyOptions)

  const ariaKeyshortcuts = React.useMemo(() => toAriaKeyshortcuts(keys), [keys])

  if (typeof children === 'function') {
    return children({ keys, ariaKeyshortcuts })
  }

  if (React.isValidElement(children)) {
    return React.cloneElement<any>(children, {
      'aria-keyshortcuts': ariaKeyshortcuts,
    })
  }

  return <span aria-keyshortcuts={ariaKeyshortcuts}>{children}</span>
}
