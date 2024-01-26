import React from 'react'
import { UseHotkeysOptions } from './use-hotkeys'
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
   * Children or render prop function
   */
  children: React.ReactNode | ((props: { keys: string }) => React.ReactNode)
}

export const Hotkey: React.FC<HotkeyProps> = (props) => {
  const { command, callback, hotkeyOptions, children } = props

  const keys = useHotkeysShortcut(command, callback, hotkeyOptions)

  if (typeof children === 'function') {
    return children({ keys })
  }

  return children
}
