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
  const isMobile = useBreakpointValue({ base: true, sm: false })
  let logo
  if (siteConfig.logo) {
    logo = (
      <Box
        as={isMobile ? siteConfig.logoIcon : siteConfig.logo}
        height="28px"
      />
    )
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
