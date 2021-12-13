import { createRef } from 'react'

import { HStack } from '@chakra-ui/layout'

import headerNavLinks from 'data/headerNavLinks'

import NavLink from 'components/NavLink'
import ThemeToggle from 'components/layout/ThemeToggle'

const Header = () => {
  return (
    <HStack spacing="2">
      {headerNavLinks.map(({ href, title, ...props }, i) => (
        <NavLink href={href} key={i} {...props}>
          {title}
        </NavLink>
      ))}
      <ThemeToggle />
    </HStack>
  )
}

export default Header
