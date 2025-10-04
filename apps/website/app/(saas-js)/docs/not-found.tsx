'use client'

import { EmptyState } from '@saas-ui/react'
import { TbError404 } from 'react-icons/tb'

export default function NotFound() {
  return (
    <EmptyState
      minH="90dvh"
      icon={<TbError404 />}
      title="Page not found"
      description="The page you are looking for does not exist."
    />
  )
}
