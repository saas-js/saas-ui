import { Badge, HStack } from '@chakra-ui/react'
import Link from 'next/link'

import { Logo } from '../logo'

export const ProLogoLink = () => (
  <HStack asChild focusRing="outside" gap="1.5">
    <Link href="/pro" aria-label="Back to homepage">
      <Logo color="fg" />
      <Badge
        size="xs"
        variant="outline"
        colorPalette="indigo"
        borderRadius="4px"
        boxShadow="none"
        borderWidth="1.5px"
        borderColor="indigo.600"
        fontSize="10px"
        height="4"
        px="0.5"
        fontWeight="semibold"
      >
        PRO
      </Badge>
    </Link>
  </HStack>
)
