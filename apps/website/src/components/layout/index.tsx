import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'

import Header, { HeaderProps } from './header'
import Footer, { FooterProps } from './footer'

interface LayoutProps {
  children: ReactNode
  header: HeaderProps
  footer: FooterProps
}

const Layout = ({ children, header, footer }: LayoutProps) => {
  return (
    <Box>
      <Header {...header} />
      <Box as="main">{children}</Box>
      {footer}
    </Box>
  )
}

export default Layout
