import { Outlet, FileRoute } from '@tanstack/react-router'
import { PublicLayout } from '#/layouts/public-layout'

export const Route = new FileRoute('/_auth').createRoute({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  )
}
