import { Box, Flex, Heading, VisuallyHidden } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import AccessibleLink from '@/components/link'
import React from 'react'

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

import LogoLight from '/public/saasui.svg'
import LogoDark from '/public/saasui-dark.svg'

import siteConfig from '@/data/site-config'

const Logo = ({ href = '/', onClick }: LogoProps) => {
  const { colorMode } = useColorMode()

  let logo = colorMode === 'dark' ? LogoLight : LogoDark

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
    <Flex h="8" alignItems="flex-start">
      <AccessibleLink
        href={href}
        display="flex"
        p="1"
        borderRadius="sm"
        onClick={onClick}
        height="32px"
      >
        {logo}
        <VisuallyHidden>{siteConfig.seo?.title}</VisuallyHidden>
      </AccessibleLink>
    </Flex>
  )
}

export default Logo
