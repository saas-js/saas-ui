import { Flex, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
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

        <IconButton
          variant="ghost"
          aria-label="discord"
          icon={<FaDiscord size="14" />}
          borderRadius="md"
          as={Link}
          href="https://discord.gg/4PmJGFcAjX"
        />

        <IconButton
          variant="ghost"
          aria-label="twitter"
          icon={<FaTwitter size="14" />}
          borderRadius="md"
          as={Link}
          href="https://twitter.com/saas_js"
        />

        <IconButton
          variant="ghost"
          aria-label="github"
          icon={<FaGithub size="14" />}
          borderRadius="md"
          as={Link}
          href="https://github.com/saas-js/saas-ui"
        />
      </HStack>
    </Footer>
  )
}

export default CustomFooter
