import { Flex, Heading, VisuallyHidden } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import AccessibleLink from 'components/Link'

export interface LogoProps {
  href?: string
  svg?: React.ReactNode
  svgDark?: React.ReactNode
  text?: string
}

const Logo = ({ href = '/', svg, svgDark, text }: LogoProps) => {
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
      <AccessibleLink href={href} display="flex" p="1" borderRadius="sm">
        {logo}
        <VisuallyHidden>{text}</VisuallyHidden>
      </AccessibleLink>
    </Flex>
  )
}

export default Logo
