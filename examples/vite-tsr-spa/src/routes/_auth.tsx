import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { PublicLayout } from '#layouts/public-layout'

export const Route = createFileRoute('/_auth')({
  component: LayoutComponent,
  beforeLoad: async ({ context, location }) => {
    const user = await context.getUser()
    if (user && location.pathname !== '/logout') {
      throw redirect({
        to: '/',
      })
    }
  },
})

function LayoutComponent() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  )
}
