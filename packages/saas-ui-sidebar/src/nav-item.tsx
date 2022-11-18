import * as React from 'react'

import {
  chakra,
  forwardRef,
  omitThemingProps,
  HTMLChakraProps,
  ThemingProps,
  SystemProps,
  useMultiStyleConfig,
  Tooltip,
} from '@chakra-ui/react'

import { cx, dataAttr } from '@chakra-ui/utils'
import { useLink } from '@saas-ui/provider'

import { useSidebarContext } from './use-sidebar'
import { NavItemStylesProvider, useNavItemStyles } from './nav-context'

export interface NavItemLabelProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'NavLink'> {}

export const NavItemLabel = forwardRef<NavItemLabelProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useNavItemStyles()
    return (
      <chakra.div
        ref={ref}
        __css={styles.label}
        {...props}
        className={cx('saas-nav-item__label', props.className)}
      >
        {children}
      </chakra.div>
    )
  }
)

NavItemLabel.displayName = 'NavItemLabel'

const NavItemIcon: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const styles = useNavItemStyles()

  const { className, children, ...rest } = props

  const child = React.Children.only(children)

  const clone = React.isValidElement<HTMLChakraProps<any>>(child)
    ? React.cloneElement(child, {
        focusable: 'false',
        'aria-hidden': true,
      })
    : null

  return (
    <chakra.span
      {...rest}
      className={cx('saas-nav-item__icon', props.className)}
      __css={{
        flexShrink: 0,
        ...styles.icon,
      }}
    >
      {clone}
    </chakra.span>
  )
}

NavItemIcon.displayName = 'NavItemIcon'

export interface NavItemProps
  extends HTMLChakraProps<'a'>,
    ThemingProps<'NavItem'> {
  href?: string
  /* @deprecated use children instead */
  label?: string
  icon?: React.ReactElement
  inset?: SystemProps['paddingLeft']
  tooltip?: React.ReactNode
  isActive?: boolean
}

export const NavItem = forwardRef<NavItemProps, 'a'>((props, ref) => {
  const {
    href = '#',
    label: labelProp,
    icon,
    inset,
    className,
    tooltip,
    isActive,
    children,
    ...rest
  } = omitThemingProps(props)
  const RouterLink = useLink()
  const { onClose, variant: sidebarVariant } = useSidebarContext() || {}
  const isCondensed = sidebarVariant === 'condensed'

  const styles = useMultiStyleConfig('NavItem', props)

  let label = children || labelProp
  if (typeof label === 'string') {
    label = <NavItemLabel>{label}</NavItemLabel>
  }

  let link = (
    <chakra.a
      {...rest}
      ref={ref}
      href={href}
      className="nav-item__link"
      data-active={dataAttr(isActive)}
      __css={styles.link}
    >
      <chakra.span
        __css={{
          ...styles.inner,
          pl: inset,
        }}
        className="saas-nav-item__inner"
      >
        {icon && <NavItemIcon>{icon}</NavItemIcon>}
        {!isCondensed && label}
      </chakra.span>
    </chakra.a>
  )

  if (href && href !== '#') {
    link = <RouterLink href={href}>{link}</RouterLink>
  }

  const tooltipLabel = isCondensed && !tooltip ? label : tooltip

  return (
    <NavItemStylesProvider value={styles}>
      <Tooltip label={tooltipLabel} placement="right" openDelay={400}>
        <chakra.div
          __css={styles.item}
          onClick={onClose}
          data-condensed={dataAttr(isCondensed)}
          className={cx('saas-nav-item', className)}
        >
          {link}
        </chakra.div>
      </Tooltip>
    </NavItemStylesProvider>
  )
})

NavItem.displayName = 'NavItem'
