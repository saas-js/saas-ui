import { Flex, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import Footer, { Copyright, FooterLink } from './layout/footer'
import { FaXTwitter } from 'react-icons/fa6'

import Logo from './saas-ui'

const CustomFooter = () => {
  return (
    <Footer columns={{ base: 1, lg: 2 }} mb={{ lg: 16 }}>
      <Stack spacing="8" mb="4">
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
      <Stack
        direction={{ base: 'row', lg: 'column-reverse' }}
        justify={{ base: 'flex-start', lg: 'flex-end' }}
        alignItems="flex-end"
        spacing="4"
        alignSelf="flex-end"
        mb="4"
      >
        <HStack spacing="4">
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="mailto:hello@saas-ui.dev">Contact</FooterLink>
          <FooterLink href="/license">License</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
        </HStack>
        <HStack display={{ base: 'none', lg: 'block' }}>
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
            icon={<FaXTwitter size="14" />}
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
      </Stack>
    </Footer>
  )
}

export default CustomFooter
