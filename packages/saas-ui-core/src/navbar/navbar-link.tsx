import { chakra, forwardRef, HTMLChakraProps } from '@chakra-ui/react'
import { cx, dataAttr } from '@chakra-ui/utils'

import { useNavBarStyles } from './navbar-context'
import { useLink } from '../provider'

export interface NavbarLinkProps extends HTMLChakraProps<'a'> {
  children?: React.ReactNode
  /**
   * Whether the link is active or not.
   * @default false
   */
  isActive?: boolean
}

export const NavbarLink = forwardRef<NavbarLinkProps, 'li'>((props, ref) => {
  const { className, children, isActive, ...rest } = props

  const Link = useLink()

  const styles = useNavBarStyles()

  return (
    <chakra.a
      as={Link}
      ref={ref}
      __css={styles.link}
      data-active={dataAttr(isActive)}
      className={cx('sui-navbar__link', className)}
      {...rest}
    >
      {children}
    </chakra.a>
  )
})

NavbarLink.displayName = 'NavbarLink'
