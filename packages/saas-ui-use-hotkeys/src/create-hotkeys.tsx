import React from 'react'
import {
  HotkeysConfig,
  HotkeysContextValues,
  HotkeysProvider as HotkeysProviderBase,
  useHotkeysContext as useHotkeysContextBase,
} from './provider'
import { UseHotkeysOptions } from './use-hotkeys'
import { useHotkeysShortcut as useHotkeysShortcutBase } from './use-hotkeys-shortcut'
import { Hotkey as HotkeyBase } from './hotkey'

type ExtractHotkeys<T extends HotkeysConfig> = {
  [Group in keyof T]: {
    [Item in keyof T[Group]['hotkeys']]: `${string & Group}.${string & Item}`
  }[keyof T[Group]['hotkeys']]
}[keyof T]

export const createHotkeys = <Config extends HotkeysConfig>(
  hotkeys: Config
) => {
  return {
    hotkeys,
    HotkeysProvider: (props: { children: React.ReactNode }) => (
      <HotkeysProviderBase {...props} hotkeys={hotkeys} />
    ),
    useHotkeysContext: () =>
      useHotkeysContextBase() as HotkeysContextValues<Config>,
    useHotkeys: (
      shortcut: ExtractHotkeys<Config>,
      callback: (event: KeyboardEvent) => void,
      options: UseHotkeysOptions | Array<any> = [],
      deps?: Array<any>
    ) => useHotkeysShortcutBase(shortcut, callback, options, deps),
    Hotkey: HotkeyBase as React.FC<{
      command: ExtractHotkeys<Config>
      callback: () => void
      hotkeyOptions?: UseHotkeysOptions
      children: React.ReactNode | ((props: { keys: string }) => React.ReactNode)
    }>,
  }
}
