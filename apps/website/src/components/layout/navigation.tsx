import * as React from 'react'
import {
  Box,
  HStack,
  IconButton,
  Kbd,
  Link,
  Spacer,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { useRouter } from 'next/router'

import headerNav from '@/data/header-nav'
import NavLink from '@/components/nav-link'
import { useScrollSpy } from '@/hooks/use-scrollspy'
import { MobileNavButton } from '@/docs/components/mobile-nav'
import { MobileNavContent } from '@/docs/components/mobile-nav'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'

import ThemeToggle from './theme-toggle'
import { ProductLaneLogo } from '../logos/productlane'
import { SearchInput, useHotkeys } from '@saas-ui/react'

import { GlobalSearch } from '../global-search/global-search'

const Header = () => {
  const mobileNav = useDisclosure()
  const isDesktop = useBreakpointValue({ xl: true })
  const router = useRouter()
  const activeId = useScrollSpy(
    headerNav.filter(({ id }) => id).map(({ id }) => `[id="${id}"]`),
    {
      threshold: 0.75,
    }
  )

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  const { isOpen, onOpen, onClose } = useDisclosure()

  useHotkeys(['/', 'CMD+K'], () => {
    onOpen()
  })

  return (
    <HStack flex="1" ps="4">
      <HStack spacing="2" flexShrink={0} flex="1" justifyContent="flex-start">
        {headerNav.map(({ href, id, ...props }, i) => {
          return (
            <NavLink
              display={{ base: 'none', lg: 'block' }}
              href={href || `/#${id}`}
              key={i}
              isActive={
                !!(id && activeId === id) ||
                !!(href && !!router.asPath.match(new RegExp(href)))
              }
              {...props}
            />
          )
        })}
      </HStack>
      <HStack>
        <Box>
          {isDesktop && (
            <SearchInput
              placeholder="Search docs..."
              size="sm"
              borderRadius="md"
              onFocus={onOpen}
              rightElement={<Kbd fontSize="md">/</Kbd>}
            />
          )}
          <GlobalSearch
            isOpen={isOpen}
            onClose={onClose}
            onSelect={(value) => {
              console.log(value)
            }}
          />
        </Box>

        <NavLink
          href="/pricing"
          label="Buy Pro"
          variant="primary"
          fontSize="sm"
        />

        <Tooltip label="Feedback &amp; Roadmap">
          <IconButton
            variant="ghost"
            aria-label="roadmap"
            icon={<ProductLaneLogo boxSize="3" />}
            borderRadius="md"
            as={Link}
            href="https://roadmap.saas-ui.dev"
          />
        </Tooltip>

        <Tooltip label="Discord community">
          <IconButton
            variant="ghost"
            aria-label="discord"
            icon={<FaDiscord size="14" />}
            borderRadius="md"
            as={Link}
            href="https://discord.gg/4PmJGFcAjX"
          />
        </Tooltip>

        <Tooltip label="Twitter">
          <IconButton
            variant="ghost"
            aria-label="twitter"
            icon={<FaXTwitter size="14" />}
            borderRadius="md"
            as={Link}
            href="https://twitter.com/saas_js"
          />
        </Tooltip>

        <Tooltip label="Github">
          <IconButton
            variant="ghost"
            aria-label="github"
            icon={<FaGithub size="14" />}
            borderRadius="md"
            as={Link}
            href="https://github.com/saas-js/saas-ui"
          />
        </Tooltip>

        <ThemeToggle />

        <MobileNavButton
          ref={mobileNavBtnRef}
          aria-label="Open Menu"
          onClick={mobileNav.onOpen}
        />

        <MobileNavContent
          isOpen={mobileNav.isOpen}
          onClose={mobileNav.onClose}
        />
      </HStack>
    </HStack>
  )
}

export default Header
