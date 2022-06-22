import { Box, Flex, Heading, VisuallyHidden } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import AccessibleLink from '@/components/link'
import React from 'react'

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

import siteConfig from '@/data/site-config'

const Logo = ({ href = '/', onClick }: LogoProps) => {
  const { colorMode } = useColorMode()

  let logo
  if (siteConfig.logo) {
    logo = <Box as={siteConfig.logo} height="24px" />
  } else {
    logo = (
      <Heading as="h1" size="md">
        {siteConfig.seo?.title}
      </Heading>
    )
  }

  return (
    <Flex h="8" flexShrink="0" alignItems="flex-start">
      <AccessibleLink
        href={href}
        display="flex"
        p="1"
        borderRadius="sm"
        onClick={onClick}
      >
        {logo}
        <VisuallyHidden>{siteConfig.seo?.title}</VisuallyHidden>
      </AccessibleLink>
    </Flex>
  )
}

export default Logo
