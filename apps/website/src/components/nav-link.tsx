import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'

import Link from 'next/link'

export interface NavLinkProps extends ButtonProps {
  isActive?: boolean
  href?: string
  id?: string
  label: React.ReactNode
}

const NavLink = forwardRef((props: NavLinkProps, ref) => {
  const { label, href, type, isActive, ...rest } = props

  return (
    <Link href={href as string} passHref legacyBehavior>
      <Button
        as="a"
        ref={ref}
        variant="nav-link"
        lineHeight="2rem"
        isActive={isActive}
        fontWeight="medium"
        fontSize="md"
        {...rest}
      >
        {label}
      </Button>
    </Link>
  )
})

NavLink.displayName = 'NavLink'

export default NavLink
