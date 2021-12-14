import { HStack } from '@chakra-ui/layout'
import headerNavLinks from 'data/headerNavLinks'

import NavLink from 'components/NavLink'

const Header = () => {
  return (
    <HStack spacing="2">
      {headerNavLinks.map(({ href, title, ...props }, i) => {
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
