import { AppShell } from '@saas-ui/react'

import { AppSidebar } from '#components/sidebar/sidebar'

export const SidebarLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <AppShell height="$100vh" sidebar={<AppSidebar />}>
      {props.children}
    </AppShell>
  )
}
