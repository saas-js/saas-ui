import { Outlet, rootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SupabaseClient, User } from '@supabase/supabase-js'

export const Route = rootRouteWithContext<{
  queryClient: QueryClient
  supabase: SupabaseClient
  getUser: () => Promise<User | null>
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
