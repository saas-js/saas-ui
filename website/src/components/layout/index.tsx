import { Box } from "@chakra-ui/layout"
import { ReactNode } from "react"

import Header, { HeaderProps } from "./Header"
import Footer, { FooterProps } from "./Footer"
import Meta from "./Meta"

interface LayoutProps {
  children: ReactNode
  header: HeaderProps,
  footer: FooterProps
}

const Layout = ({ children, header, footer }: LayoutProps) => {
  return (
    <Box>
      <Meta />
      <Header {...header} />
      <Box as="main">
        {children}
      </Box>
      {footer || <Footer />}
    </Box>
  )
}

export default Layout
