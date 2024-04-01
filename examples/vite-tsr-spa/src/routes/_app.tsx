import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { SidebarLayout } from '#layouts/sidebar-layout'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: async ({ location, context }) => {
    const user = await context.getUser()
    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})

function AppLayout() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  )
}
