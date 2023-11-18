import { chakra, forwardRef, HTMLChakraProps } from '@chakra-ui/react'
import { cx, dataAttr } from '@chakra-ui/utils'

import { useNavBarStyles } from './navbar-context'

export interface NavbarItemProps extends HTMLChakraProps<'li'> {
  children?: React.ReactNode
  /**
   * Whether the item is active or not.
   * @default false
   */
  isActive?: boolean
}

export const NavbarItem = forwardRef<NavbarItemProps, 'li'>((props, ref) => {
  const { className, children, isActive, ...rest } = props

  const styles = useNavBarStyles()

  return (
    <chakra.li
      ref={ref}
      __css={styles.item}
      className={cx('sui-navbar__item', className)}
      data-active={dataAttr(isActive)}
      {...rest}
    >
      {children}
    </chakra.li>
  )
})

NavbarItem.displayName = 'NavbarItem'
