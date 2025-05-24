import {
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import Footer, { Copyright, FooterLink } from './layout/footer'
import { FaXTwitter } from 'react-icons/fa6'

import Logo from './saas-ui'

const CustomFooter = () => {
  return (
    <Footer columns={{ base: 1, lg: 2 }} pb="">
      <Stack spacing="8" mb="20">
        <Stack alignItems="flex-start" maxW="container.sm" gap="4">
          <Flex width="80px">
            <Logo />
          </Flex>
          <Text fontSize="sm" color="muted">
            The React toolkit for SaaS products. Crafted by{' '}
            <Link href="https://appulse.net">Appulse Software</Link>.
          </Text>
        </Stack>

        <HStack display={{ base: 'none', lg: 'block' }}>
          <IconButton
            variant="ghost"
            aria-label="discord"
            icon={<FaDiscord size="14" />}
            borderRadius="md"
            as={Link}
            href="/discord"
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
            href="https://github.com/saas-js"
          />
        </HStack>
      </Stack>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem>
          <Heading as="h5" size="xs" mb="4">
            Resources
          </Heading>
          <Stack>
            <FooterLink href="https://saas-ui.lemonsqueezy.com/affiliates">
              Affiliate Program
            </FooterLink>
            <FooterLink href="/docs">Documentation</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="https://roadmap.saas-ui.dev">Roadmap</FooterLink>
          </Stack>
        </GridItem>
        <GridItem>
          <Heading as="h5" size="xs" mb="4">
            Products
          </Heading>
          <Stack>
            <FooterLink href="/docs/tanstack-router-starter-kit">
              TanStack Router Starter Kit
            </FooterLink>
            <FooterLink href="/docs/tanstack-router-starter-kit">
              TanStack Router Boilerplate
            </FooterLink>
            <FooterLink href="/nextjs-starter-kit">
              Next.js Starter Kit
            </FooterLink>
            <FooterLink href="/nextjs-starter-kit">
              Next.js Boilerplate
            </FooterLink>
            <FooterLink href="/docs/components">Component library</FooterLink>
            <FooterLink href="/figma">Figma UI Kit</FooterLink>
            <FooterLink href="/blocks">Pre-built components</FooterLink>
          </Stack>
        </GridItem>
        <GridItem>
          <Heading as="h5" size="xs" mb="4">
            Company
          </Heading>
          <Stack>
            <FooterLink href="mailto:hello@saas-ui.dev">Contact</FooterLink>
            <FooterLink href="/license">License</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
          </Stack>
        </GridItem>
      </Grid>
    </Footer>
  )
}

export default CustomFooter
