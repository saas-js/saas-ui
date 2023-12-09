import * as React from 'react'

export interface HotkeysItemConfig {
  /**
   * Label describing the function of this keyboard shortcut
   */
  label: string
  /**
   * The key combination.
   * Supports shorthands: ⌥ ⇧ ⌃ ⌘
   *
   * Shifted keys like ? and + are handled automatically
   */
  command: string
}

export interface HotkeysGroupItems {
  [item: string]: HotkeysItemConfig
}

export interface HotkeysGroupConfig {
  /**
   * The group title
   */
  title?: string
  /**
   * Hotkeys in this group
   */
  hotkeys: HotkeysGroupItems
}

/**
 * The hotkeys configuration.
 * Supports shorthands: ⌥ ⇧ ⌃ ⌘
 *
 * Shifted keys like ? and + are handled automatically
 */
export interface HotkeysConfig {
  [group: string]: HotkeysGroupConfig
}

const { createContext, useContext } = React

export interface HotkeysContextValues<
  Config extends HotkeysConfig = HotkeysConfig
> {
  hotkeys: Config
}

const HotkeysContext: any = createContext([])

export interface HotkeysProviderProps {
  children: React.ReactNode
  hotkeys: HotkeysConfig
}

export const HotkeysProvider = ({
  children,
  hotkeys,
}: HotkeysProviderProps) => {
  const value = { hotkeys }

  return (
    <HotkeysContext.Provider value={value}>{children}</HotkeysContext.Provider>
  )
}

export const useHotkeysContext = (): HotkeysContextValues => {
  return useContext(HotkeysContext)
}
