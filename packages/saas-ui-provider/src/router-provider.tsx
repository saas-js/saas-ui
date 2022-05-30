import { ParsedUrlQuery } from 'querystring'

import * as React from 'react'

interface NavigateOptions {
  replace?: boolean
}

interface RouterLocation {
  pathname: string
  hash?: string
  search?: string
}

export interface RouterContextValue {
  navigate: (path: string, options?: NavigateOptions) => void
  back: () => void
  params?: ParsedUrlQuery
  location?: RouterLocation
}

export const RouterContext = React.createContext<RouterContextValue | null>(
  null
)

/**
 * A simple to wrapper to abstract basic router functionality
 */
export const RouterProvider = RouterContext.Provider

export const useRouterContext = () =>
  React.useContext(RouterContext) as RouterContextValue

export const useNavigate = () => {
  const context = useRouterContext()
  return context?.navigate
}

export const useParams = () => {
  const context = useRouterContext()
  return context?.params
}

export const useLocation = () => {
  const context = useRouterContext()
  if (context) {
    return context.location
  } else if (typeof window !== 'undefined') {
    return window.location
  }
  return null
}

export function useActivePath(path: string) {
  const location = useLocation()
  return location?.pathname === path
}
