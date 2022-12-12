import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'

import Header, { HeaderProps } from './header'
import {
  AnnouncementBanner,
  AnnouncementBannerProps,
} from '../announcement-banner'

interface LayoutProps {
  children: ReactNode
  announcement: AnnouncementBannerProps
  header: HeaderProps
  footer: ReactNode
}

const Layout = ({ children, announcement, header, footer }: LayoutProps) => {
  return (
    <Box>
      <SkipNavLink>Skip to content</SkipNavLink>
      <AnnouncementBanner {...announcement} />
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
