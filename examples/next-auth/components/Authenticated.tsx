import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Authenticated: React.FC<React.PropsWithChildren> = (props) => {
  const router = useRouter()
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  if (!data) {
    return null
  }

  return props.children
}
