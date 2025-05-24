import {
  Box,
  Flex,
  Heading,
  useBreakpointValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import AccessibleLink from '@/components/link'
import React from 'react'

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

import siteConfig from '@/data/site-config'

const Logo = ({ href = '/', onClick }: LogoProps) => {
  let logo
  if (siteConfig.logo) {
    logo = <Box as={siteConfig.logo} height="28px" width="90px" />
  } else {
    logo = (
      <Heading as="h1" size="md">
        {siteConfig.seo?.title}
      </Heading>
    )
  }

  return (
    <Flex flexShrink="0" alignItems="center" height="100%">
      <AccessibleLink
        href={href}
        display="flex"
        alignItems="center"
        borderRadius="sm"
        flex="1"
        onClick={onClick}
      >
        {logo}
        <VisuallyHidden>{siteConfig.seo?.title}</VisuallyHidden>
      </AccessibleLink>
    </Flex>
  )
}

export default Logo
