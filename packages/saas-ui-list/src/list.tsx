import * as React from 'react'

import {
  chakra,
  forwardRef,
  useStyles,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  SystemProps,
  SystemStyleObject,
  As,
  useColorModeValue,
  useMultiStyleConfig,
} from '@chakra-ui/system'

import { cx, __DEV__ } from '@chakra-ui/utils'

import { ButtonGroup, ButtonGroupProps } from '@saas-ui/button'

import { Icon } from '@chakra-ui/icon'

interface ListOptions {
  /**
   * An array of list items
   */
  items?: Array<ListItemProps>
}

export interface ListProps
  extends ListOptions,
    HTMLChakraProps<'ul'>,
    ThemingProps<'List'> {}

/**
 * React component to render lists of data
 */
export const List = forwardRef<ListProps, 'ul'>((props, ref) => {
  const { items, children, ...rest } = props

  const styles = useMultiStyleConfig('List', rest) as Record<
    string,
    SystemStyleObject
  >

  const listProps = omitThemingProps(rest)

  let content
  if (items) {
    content = items.map((item: any, i: number) => {
      return <ListItem {...item} key={item.id || i} />
    })
  } else {
    content = children
  }

  const listStyles: SystemStyleObject = {
    py: 2,
    position: 'relative',
    ...styles.list,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.ul
        ref={ref}
        __css={listStyles}
        {...listProps}
        className={cx('saas-list', props.className)}
      >
        {content}
      </chakra.ul>
    </StylesProvider>
  )
})

List.defaultProps = {
  variant: 'structured-list',
}

if (__DEV__) {
  List.displayName = 'List'
}

export interface ListHeaderProps extends HTMLChakraProps<'li'> {
  /**
   * Action rendered next to the title
   */
  action?: React.ReactNode
  /**
   * The aria-level
   */
  level?: number
}

export const ListHeader: React.FC<ListHeaderProps> = (props) => {
  const {
    children,
    onClick,
    action,
    role = 'heading',
    level = 1,
    ...rest
  } = props
  const styles = useStyles()

  const headerStyles = {
    display: 'flex',
    flexDirection: 'row',
    py: 2,
    px: 4,
    position: 'sticky',
    fontSize: 'md',
    fontWeight: 'semibold',
    color: useColorModeValue('gray.500', 'gray.400'),
    ...styles.header,
  }

  return (
    <chakra.li
      __css={headerStyles}
      onClick={onClick}
      {...rest}
      className={cx('saas-list__header', props.className)}
    >
      <chakra.span flex="1" userSelect="none" role={role} aria-level={level}>
        {children}
      </chakra.span>
      {action}
    </chakra.li>
  )
}

if (__DEV__) {
  ListHeader.displayName = 'ListHeader'
}

export interface ListItemProps extends HTMLChakraProps<'li'> {
  icon?: any
  primary?: React.ReactNode
  secondary?: React.ReactNode
  tertiary?: React.ReactNode
  action?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  href?: string | object
}

/**
 * Adding `onClick` or `href` props will wrap the content in a `ListButton`
 */
export const ListItem = forwardRef<ListItemProps, 'li'>((props, ref) => {
  const {
    icon,
    primary,
    secondary,
    tertiary,
    action,
    onClick,
    href,
    as,
    children,
    ...rest
  } = props

  const styles = useStyles()

  const isButton = onClick || href

  const ContentWrapper = isButton ? ListItemButton : React.Fragment
  const isComposed = !!(icon || primary || secondary || tertiary || action)
  const disablePadding = !isComposed || isButton

  const itemStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 'md',
    py: disablePadding ? 0 : 2,
    px: disablePadding ? 0 : 4,
    ...styles.item,
  }

  const wrapperProps = isButton
    ? {
        paddingEnd: action ? 16 : undefined,
        onClick,
        href,
        as,
      }
    : {}

  const content =
    isButton || isComposed ? (
      <ContentWrapper {...wrapperProps}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {(primary || secondary) && (
          <ListItemLabel primary={primary} secondary={secondary} />
        )}
        {tertiary && <ListItemTertiary>{tertiary}</ListItemTertiary>}
        {children}
      </ContentWrapper>
    ) : (
      children
    )

  return (
    <chakra.li
      ref={ref}
      __css={itemStyles}
      {...rest}
      className={cx('saas-list__item', props.className)}
    >
      {content}
      {action && <ListItemAction>{action}</ListItemAction>}
    </chakra.li>
  )
})

if (__DEV__) {
  ListItem.displayName = 'ListItem'
}

export interface ListItemButtonProps extends HTMLChakraProps<'div'> {
  onClick?: (e: React.MouseEvent) => void
  as?: As
}

/**
 * Behaves like a button by default.
 * Use the 'as' prop to render a link.
 *
 * <ListItemButton as="a" href="/page" />
 *
 * or
 *
 * <ListItemButton as={Link} href={{path: '/page}} />
 */
export const ListItemButton = forwardRef<ListItemButtonProps, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props
    const styles = useStyles()

    const buttonStyles: SystemStyleObject = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      cursor: 'pointer',
      userSelect: 'none',
      py: 2,
      px: 4,
      ...styles.button,
    }

    return (
      <chakra.div
        ref={ref}
        __css={buttonStyles}
        role="button"
        tabIndex={0}
        {...rest}
        className={cx('saas-list__item-button', props.className)}
      >
        {children}
      </chakra.div>
    )
  }
)

if (__DEV__) {
  ListItemButton.displayName = 'ListItemButton'
}

export interface ListItemIconProps extends HTMLChakraProps<'div'> {
  /**
   * The icon size, based on fontSize
   * @default 'xl'
   */
  size?: SystemProps['fontSize']
  /**
   * The icon spacing, ltr supported
   */
  spacing?: SystemProps['margin']
}

export const ListItemIcon: React.FC<ListItemIconProps> = (props) => {
  const { children, spacing, size = 5, as, ...rest } = props
  const styles = useStyles()

  const iconStyles: SystemStyleObject = {
    ...styles.icon,
    display: 'flex',
    flexShrink: 0,
    me: spacing,
  }

  let _icon = children
  if (!_icon && as) {
    _icon = <Icon as={as} role="presentation" boxSize={size} />
  } else if (React.isValidElement(_icon) && _icon.type === Icon) {
    _icon = React.cloneElement(_icon, {
      boxSize: size,
    })
  }

  return (
    <chakra.div
      __css={iconStyles}
      {...rest}
      className={cx('saas-list__item-icon', props.className)}
    >
      {_icon}
    </chakra.div>
  )
}

if (__DEV__) {
  ListItemIcon.displayName = 'ListItemIcon'
}

export interface ListItemLabelProps extends HTMLChakraProps<'div'> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
}

export const ListItemLabel: React.FC<ListItemLabelProps> = (props) => {
  const { primary, secondary, children, ...rest } = props
  const styles = useStyles()

  const labelStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    py: 1,
    ...styles.label,
  }

  const primaryStyles = {
    ...styles.primary,
  }

  const secondaryStyles = {
    fontSize: 'sm',
    color: useColorModeValue('gray.500', 'gray.400'),
    ...styles.secondary,
  }

  return (
    <chakra.div
      __css={labelStyles}
      {...rest}
      className={cx('saas-list__item-label', props.className)}
    >
      {primary && (
        <chakra.span noOfLines={1} __css={primaryStyles}>
          {primary}
        </chakra.span>
      )}
      {secondary && (
        <chakra.span noOfLines={1} __css={secondaryStyles}>
          {secondary}
        </chakra.span>
      )}
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  ListItemLabel.displayName = 'ListItemLabel'
}

export interface ListItemTertiaryProps extends HTMLChakraProps<'div'> {
  /**
   * Spacing between items
   * @default 2
   */
  spacing?: SystemProps['margin']
}

/**
 * Tertiary item position between the item label and action
 */
export const ListItemTertiary: React.FC<ListItemTertiaryProps> = ({
  children,
  spacing = 2,
  ...rest
}) => {
  const styles = useStyles()

  const tertiaryStyles: SystemStyleObject = {
    display: 'flex',
    '& > *:not(style) ~ *:not(style)': { marginStart: spacing },
    ...styles.tertiary,
  }

  return (
    <chakra.div
      __css={tertiaryStyles}
      {...rest}
      className={cx('saas-list__item-tertiary', rest.className)}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  ListItemTertiary.displayName = 'ListItemTertiary'
}

/**
 * Data list action component, behaves like a button group
 */
export const ListItemAction: React.FC<ButtonGroupProps> = ({
  children,
  ...rest
}) => {
  const styles = useStyles()
  return (
    <ButtonGroup
      variant="ghost"
      ms={2}
      sx={styles.action}
      position="absolute"
      right={4}
      {...rest}
      className={cx('saas-list__item-action', rest.className)}
    >
      {children}
    </ButtonGroup>
  )
}

if (__DEV__) {
  ListItemAction.displayName = 'ListItemAction'
}
