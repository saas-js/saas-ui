import { Flex, HStack, Stack, Text } from '@chakra-ui/react'
import Footer, { Copyright, FooterLink } from './layout/footer'

import Logo from './saas-ui'

const CustomFooter = () => {
  return (
    <Footer columns={2}>
      <Stack spacing="8">
        <Stack alignItems="flex-start">
          <Flex width="100px">
            <Logo />
          </Flex>
          <Text fontSize="md" color="muted">
            The React component library for startups.
          </Text>
        </Stack>
        <Copyright>
          Built by{' '}
          <FooterLink href="https://twitter.com/Pagebakers">
            Eelco Wiersma
          </FooterLink>
        </Copyright>
      </Stack>
      <HStack justify="flex-end" spacing="4" alignSelf="flex-end">
        <FooterLink href="/blog">Blog</FooterLink>
        <FooterLink href="mailto:hello@saas-ui.dev">Contact</FooterLink>
        <FooterLink href="/license">License</FooterLink>
        <FooterLink href="/terms">Terms</FooterLink>
        <FooterLink href="/privacy">Privacy</FooterLink>
      </HStack>
    </Footer>
  )
}

export default CustomFooter
