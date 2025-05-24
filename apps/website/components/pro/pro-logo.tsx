import { Badge, HStack } from '@chakra-ui/react'
import Link from 'next/link'

import { Logo } from '../logo'

export const ProLogoLink = () => (
  <HStack asChild focusRing="outside">
    <Link href="/pro" aria-label="Saas UI Pro, Back to homepage">
      <Logo color="fg" />
      <Badge
        size="xs"
        variant="outline"
        colorPalette="indigo"
        borderRadius="5px"
        boxShadow="none"
        borderWidth="2px"
        borderColor="indigo.600"
        textStyle="xs"
        height="4.5"
        px="0.5"
        fontWeight="semibold"
      >
        PRO
      </Badge>
    </Link>
  </HStack>
)
