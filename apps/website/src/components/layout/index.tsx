import { Box, Flex } from '@chakra-ui/react'
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
    <Flex minH="$100vh" flexDirection="column">
      <SkipNavLink>Skip to content</SkipNavLink>
      <AnnouncementBanner {...announcement} />
      <Header {...header} />
      <Box as="main" flex="1">
        <SkipNavContent />
        {children}
      </Box>
      {footer}
    </Flex>
  )
}

export default Layout
