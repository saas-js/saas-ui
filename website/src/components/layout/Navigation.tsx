import { HStack } from '@chakra-ui/layout'
import headerNav from '@/data/header-nav'

import NavLink from '@/components/NavLink'

const Header = () => {
  return (
    <HStack spacing="2">
      {headerNav.map(({ href, title, ...props }, i) => {
        return (
          <NavLink href={href} key={i} {...props}>
            {title}
          </NavLink>
        )
      })}
    </HStack>
  )
}

export default Header
