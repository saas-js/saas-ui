// import {useContext} from 'react'
// import {AppulseContext} from '../AppulseProvider'

export function useActivePath(path: string) {
  // const context = useContext(AppulseContext)
  return window.location.pathname === path
}
