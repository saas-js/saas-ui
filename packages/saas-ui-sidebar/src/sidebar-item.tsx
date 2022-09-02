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
  SystemStyleObject,
  createStylesContext,
} from '@chakra-ui/react'

import { cx, __DEV__, dataAttr } from '@chakra-ui/utils'

import { useLink } from '@saas-ui/react'
import { useSidebarContext } from './use-sidebar'

const [StylesProvider, useStyles] = createStylesContext('SidebarItem')

export interface SidebarItemLabelProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'NavLink'> {}

export const SidebarItemLabel = forwardRef<SidebarItemLabelProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.div ref={ref} __css={styles.label} {...props}>
        {children}
      </chakra.div>
    )
  }
)

if (__DEV__) {
  SidebarItemLabel.displayName = 'SidebSidebarItemLabelarMenu'
}

const SidebarItemIcon: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const styles = useStyles()

  const { className, children, ...rest } = props

  const child = React.Children.only(children)

  const clone = React.isValidElement(child)
    ? React.cloneElement(child, {
        focusable: 'false',
        'aria-hidden': true,
      })
    : null

  return (
    <chakra.span
      {...rest}
      __css={{
        flexShrink: 0,
        ...styles.icon,
      }}
    >
      {clone}
    </chakra.span>
  )
}

if (__DEV__) {
  SidebarItemIcon.displayName = 'SidebarItemIcon'
}

export interface SidebarItemProps
  extends HTMLChakraProps<'a'>,
    ThemingProps<'SidebarItem'> {
  href?: string
  label: string
  icon?: React.ReactElement
  inset?: SystemProps['paddingLeft']
  tooltip?: React.ReactNode
  isActive?: boolean
}

export const SidebarItem = forwardRef<SidebarItemProps, 'a'>((props, ref) => {
  const {
    href = '#',
    label,
    icon,
    inset,
    className,
    tooltip,
    isActive,
    children,
    ...rest
  } = omitThemingProps(props)
  const RouterLink = useLink()
  const { onClose, variant } = useSidebarContext()

  const isCondensed = variant === 'condensed'

  const styles = useMultiStyleConfig('SidebarItem', {
    isActive,
    isCondensed,
    ...props,
  }) as Record<string, SystemStyleObject>

  let link = (
    <chakra.a
      {...rest}
      ref={ref}
      href={href}
      className={cx('saas-sidebar-link', className)}
      data-active={dataAttr(isActive)}
      __css={styles.link}
    >
      <chakra.span
        __css={{
          ...styles.inner,
          pl: inset,
        }}
      >
        {icon && <SidebarItemIcon>{icon}</SidebarItemIcon>}
        <SidebarItemLabel>{label}</SidebarItemLabel>
        {children}
      </chakra.span>
    </chakra.a>
  )

  if (href && href !== '#') {
    link = <RouterLink href={href}>{link}</RouterLink>
  }

  const tooltipLabel = isCondensed && !tooltip ? label : tooltip

  return (
    <StylesProvider value={styles}>
      <Tooltip label={tooltipLabel} placement="right" openDelay={400}>
        <chakra.div __css={styles.container} onClick={onClose}>
          {link}
        </chakra.div>
      </Tooltip>
    </StylesProvider>
  )
})

if (__DEV__) {
  SidebarItem.displayName = 'SidebarItem'
}
