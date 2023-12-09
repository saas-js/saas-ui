import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemProps,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

import { useNavBarStyles } from './navbar-context'

export interface NavbarContentProps extends HTMLChakraProps<'ul'> {
  /**
   * Typically the `NavbarItem` component
   */
  children?: React.ReactNode | React.ReactNode[]
  /**
   * Spacing between each navbar item
   */
  spacing?: SystemProps['margin']
}

export const NavbarContent = forwardRef<NavbarContentProps, 'ul'>(
  (props, ref) => {
    const { className, children, spacing = 0, ...rest } = props

    const styles = useNavBarStyles()

    const contentStyles = {
      ...styles.content,
      '& > *:not(style) ~ *:not(style)': { marginStart: spacing },
    }

    return (
      <chakra.ul
        ref={ref}
        __css={contentStyles}
        className={cx('sui-navbar__content', className)}
        {...rest}
      >
        {children}
      </chakra.ul>
    )
  }
)

NavbarContent.displayName = 'NavbarContent'
