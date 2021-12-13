import {
  forwardRef,
  chakra,
  useStyleConfig,
  LinkProps,
  omitThemingProps,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react'

interface NavLinkProps extends HTMLChakraProps<'a'>, ThemingProps<'NavLink'> {}

const NavLink = forwardRef(
  ({ href, children, type, ...props }: NavLinkProps, ref) => {
    const styles = useStyleConfig('NavLink', props)

    const ownProps = omitThemingProps(props)

    return (
      <chakra.a __css={styles} href={href} {...ownProps}>
        {children}
      </chakra.a>
    )
  }
)

NavLink.displayName = 'NavLink'

export default NavLink
