import { Box, HStack } from '@chakra-ui/react'
import Footer, { Copyright, FooterLink } from './layout/footer'

import ThemeToggle from './layout/theme-toggle'

const CustomFooter = () => {
  return (
    <Footer columns={2}>
      <Box>
        <Copyright>
          Build by <FooterLink href="https://appulse.net">Appulse</FooterLink>
        </Copyright>
      </Box>
      <HStack justify="flex-end" spacing="4">
        <FooterLink href="mailto:hello@saas-ui.dev">Contact</FooterLink>
        <FooterLink href="/privacy">Privacy</FooterLink>
      </HStack>
    </Footer>
  )
}

export default CustomFooter
