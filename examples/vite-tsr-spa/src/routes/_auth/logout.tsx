import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/logout')({
  beforeLoad: async ({ context }) => {
    await context.supabase.auth.signOut()

    throw redirect({
      to: '/',
    })
  },
  component: () => null,
})
