import { chakra, forwardRef, HTMLChakraProps } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { useNavBarStyles } from './navbar-context'

export interface NavbarBrandProps extends HTMLChakraProps<'div'> {
  children?: React.ReactNode | React.ReactNode[]
}

export const NavbarBrand = forwardRef<NavbarBrandProps, 'div'>((props, ref) => {
  const { className, children, ...rest } = props

  const styles = useNavBarStyles()

  return (
    <chakra.div
      ref={ref}
      __css={styles.brand}
      className={cx('sui-navbar__brand')}
      {...rest}
    >
      {children}
    </chakra.div>
  )
})

NavbarBrand.displayName = 'NavbarBrand'
