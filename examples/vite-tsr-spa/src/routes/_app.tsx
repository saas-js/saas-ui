import { Outlet, FileRoute } from '@tanstack/react-router'
import { SidebarLayout } from '#/layouts/sidebar-layout'

export const Route = new FileRoute('/_app').createRoute({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  )
}
