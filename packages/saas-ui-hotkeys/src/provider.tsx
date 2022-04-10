import * as React from 'react'

import { HotkeysListOptions, HotkeysOptions } from './hotkeys'

const { createContext, useContext } = React

interface HotkeysContextValues {
  hotkeys: HotkeysListOptions
}

const HotkeysContext: any = createContext([])

export interface HotkeysProviderProps extends HotkeysOptions {
  children: React.ReactNode
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
