import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'

import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'

import Header, { HeaderProps } from './header'

interface LayoutProps {
  children: ReactNode
  header: HeaderProps
  footer: ReactNode
}

const Layout = ({ children, header, footer }: LayoutProps) => {
  return (
    <Box>
      <SkipNavLink>Skip to content</SkipNavLink>
      <Header {...header} />
      <Box as="main">
        <SkipNavContent />
        {children}
      </Box>
      {footer}
    </Box>
  )
}

export default Layout
