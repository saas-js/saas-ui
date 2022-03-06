import * as React from 'react'
import { HStack, IconButton, Link } from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { useRouter } from 'next/router'

import headerNav from '@/data/header-nav'

import NavLink from '@/components/nav-link'

import { useScrollSpy } from '@/hooks/use-scrollspy'

import { MobileNavButton } from '@/docs/components/mobile-nav'
import { MobileNavContent } from '@/docs/components/mobile-nav'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'

import ThemeToggle from './theme-toggle'

const Header = () => {
  const mobileNav = useDisclosure()
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

  return (
    <HStack spacing="2" flexShrink={0}>
      {headerNav.map(({ href, id, ...props }, i) => {
        return (
          <NavLink
            display={['none', null, 'block']}
            href={href || `/#${id}`}
            key={i}
            isActive={
              (id && activeId === id) ||
              (href && !!router.asPath.match(new RegExp(href)))
            }
            {...props}
          />
        )
      })}

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

      <ThemeToggle />

      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </HStack>
  )
}

export default Header
