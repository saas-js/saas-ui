import { Badge, HStack } from '@saas-ui/react'
import Link from 'next/link'

import { Logo } from '../logo'
import { ProBadge } from './pro-badge'

export const ProLogoLink = () => (
  <HStack asChild focusRing="outside" gap="1.5">
    <Link href="/" aria-label="Back to homepage">
      <Logo color="fg" />
      <ProBadge />
    </Link>
  </HStack>
)
