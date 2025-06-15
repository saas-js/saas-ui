'use client'

import { EmptyState } from '@saas-ui/react'
import { LuShoppingCart } from 'react-icons/lu'

export const EmptyStateBasic = () => {
  return (
    <EmptyState
      icon={<LuShoppingCart />}
      title="Your cart is empty"
      description="Explore our products and add items to your cart"
    />
  )
}
