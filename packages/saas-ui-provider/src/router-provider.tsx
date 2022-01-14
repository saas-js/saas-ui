import * as React from 'react'

interface Dict {
  [key: string]: any
}

export interface Router {
  push: (path: string, options: Dict) => void
  replace: (path: string, options: Dict) => void
  goBack: () => void
  [key: string]: any
}

export interface RouterContextValue {
  useRouter?: () => Router
  linkComponent?: React.ReactNode
}

export const RouterContext = React.createContext<RouterContextValue>({})

interface RouterProviderProps {
  useRouter: () => Router
  linkComponent?: React.ReactNode
  children: React.ReactNode
}

export function RouterProvider({
  useRouter,
  linkComponent,
  children,
}: RouterProviderProps) {
  const context = {
    useRouter,
    linkComponent,
  }

  return (
    <RouterContext.Provider value={context}>{children}</RouterContext.Provider>
  )
}

export const useRouterContext = (): RouterContextValue =>
  React.useContext(RouterContext)

export const useRouter = () => {
  const context = useRouterContext()
  return context.useRouter?.()
}

export const useParams = () => {
  const context = useRouterContext()
  const router = context.useRouter?.()
  return router?.query
}

// export function useLink(): any {
//   const context = useRouterContext()
//   if (context.linkComponent) {
//     return context.linkComponent
//   }
//   return ({ children }: React.PropsWithChildren<null>) => <>{children}</>
// }
