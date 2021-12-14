import {
  forwardRef,
  chakra,
  useStyleConfig,
  omitThemingProps,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react'

import Link from 'next/link'

interface NavLinkProps extends HTMLChakraProps<'a'>, ThemingProps<'NavLink'> {}

const NavLink = forwardRef(
  ({ href, children, type, ...props }: NavLinkProps, ref) => {
    const styles = useStyleConfig('NavLink', props)

    const ownProps = omitThemingProps(props)

    return (
      <Link href={href as string} passHref>
        <chakra.a __css={styles} {...ownProps}>
          {children}
        </chakra.a>
      </Link>
    )
  }
)

NavLink.displayName = 'NavLink'

export default NavLink
