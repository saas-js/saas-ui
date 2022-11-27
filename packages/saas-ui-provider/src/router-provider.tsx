import * as React from 'react'
import type { ParsedUrlQuery } from 'querystring'

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
  route?: string
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

export interface UseActivePathOptions {
  /**
   * Set to false to match the first parth of the path.
   * eg: /contacts will match /contacts/people
   */
  end?: boolean
}

/**
 * Matches the given path to the current active path.
 * @param path string
 * @param options UseActivePathOptions
 * @returns boolean
 */
export function useActivePath(
  path: string,
  options: UseActivePathOptions = {}
) {
  const { end = true } = options
  const location = useLocation()
  return !!React.useMemo(
    () => location?.pathname.match(new RegExp(`${path}${end ? '$' : ''}`)),
    [location?.pathname, path, options]
  )
}
