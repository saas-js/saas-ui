'use client'

import { Button } from '@saas-ui/react'

export const ButtonWithResponsiveSize = () => {
  return (
    <Button rounded="3xl" size={{ base: 'md', md: 'lg' }}>
      Button
    </Button>
  )
}
