import { Flex, Heading, VisuallyHidden } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import AccessibleLink from '@/components/Link'
import React from 'react'

export interface LogoProps {
  href?: string
  svg?: React.ReactNode
  svgDark?: React.ReactNode
  text?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const Logo = ({ href = '/', svg, svgDark, text, onClick }: LogoProps) => {
  const { colorMode } = useColorMode()

  let logo = colorMode === 'dark' ? svgDark : svg
  if (!logo) {
    logo = (
      <Heading as="h1" size="md">
        {text}
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
        <VisuallyHidden>{text}</VisuallyHidden>
      </AccessibleLink>
    </Flex>
  )
}

export default Logo
