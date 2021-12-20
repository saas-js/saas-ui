import {
  forwardRef,
  chakra,
  useStyleConfig,
  omitThemingProps,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react'

import Link from 'next/link'

export interface NavLinkProps
  extends HTMLChakraProps<'a'>,
    ThemingProps<'NavLink'> {
  isActive?: boolean
}

const NavLink = forwardRef((props: NavLinkProps, ref) => {
  const { href, children, type, isActive, ...rest } = props
  const styles = useStyleConfig('NavLink', props)

  const ownProps = omitThemingProps(rest)

  return (
    <Link href={href as string} passHref>
      <chakra.a __css={styles} ref={ref} {...ownProps}>
        {children}
      </chakra.a>
    </Link>
  )
})

NavLink.displayName = 'NavLink'

export default NavLink
