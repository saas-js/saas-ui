import { Box, Flex, Heading, VisuallyHidden } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import AccessibleLink from '@/components/Link'
import React from 'react'

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

import siteConfig from '@/data/site-config'

const Logo = ({ href = '/', onClick }: LogoProps) => {
  const { colorMode } = useColorMode()

  let logo = colorMode === 'dark' ? siteConfig.logoDark : siteConfig.logo

  if (logo) {
    logo = <Box as={logo} />
  } else {
    logo = (
      <Heading as="h1" size="md">
        {siteConfig.seo?.title}
      </Heading>
    )
  }

  return (
    <Flex h="8">
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
