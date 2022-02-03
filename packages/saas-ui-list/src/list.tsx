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
  As,
  useColorModeValue,
} from '@chakra-ui/system'
import { useMultiStyleConfig } from '@saas-ui/system'
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
    HTMLChakraProps<'div'>,
    ThemingProps<'List'> {}

/**
 * React component to render lists of data
 */
export const List = forwardRef<ListProps, 'div'>((props, ref) => {
  const { items, children, ...rest } = props

  const styles = useMultiStyleConfig('List', rest)

  const listProps = omitThemingProps(rest)

  let content
  if (items) {
    content = items.map((item: any, i: number) => {
      return <ListItem {...item} key={item.id || i} />
    })
  } else {
    content = children
  }

  const listStyles = {
    py: 2,
    position: 'relative',
    ...styles.list,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div
        ref={ref}
        __css={listStyles}
        className="sui-data-list"
        {...listProps}
      >
        {content}
      </chakra.div>
    </StylesProvider>
  )
})

List.defaultProps = {
  variant: 'data-list',
}

export interface ListHeaderProps extends HTMLChakraProps<'div'> {
  action?: React.ReactNode
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  children,
  onClick,
  action,
  ...rest
}) => {
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
    <chakra.div __css={headerStyles} onClick={onClick} role="heading" {...rest}>
      <chakra.span flex="1" userSelect="none">
        {children}
      </chakra.span>
      {action}
    </chakra.div>
  )
}

export interface ListItemProps extends HTMLChakraProps<'div'> {
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
export const ListItem = forwardRef<ListItemProps, 'div'>((props, ref) => {
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

  const itemStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 'md',
    py: disablePadding ? 0 : 2,
    px: disablePadding ? 0 : 4,
    ...styles.item,
  }

  const content =
    isButton || isComposed ? (
      <ContentWrapper
        paddingEnd={action ? 16 : undefined}
        onClick={onClick}
        href={href}
        as={as}
      >
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
    <chakra.div ref={ref} __css={itemStyles} {...rest}>
      {content}
      {action && <ListItemAction>{action}</ListItemAction>}
    </chakra.div>
  )
})

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

    const buttonStyles = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      cursor: 'pointer',
      userSelect: 'none',
      py: 2,
      px: 4,
      _hover: {
        bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
      },
      _focus: {
        bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
      },
      _active: {
        bg: useColorModeValue('blackAlpha.400', 'whiteAlpha.300'),
      },
      ...styles.button,
    }

    return (
      <chakra.div ref={ref} __css={buttonStyles} {...rest}>
        {children}
      </chakra.div>
    )
  }
)

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

  const iconStyles = {
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
    <chakra.div __css={iconStyles} {...rest}>
      {_icon}
    </chakra.div>
  )
}

export interface ListItemLabelProps extends HTMLChakraProps<'div'> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
}

export const ListItemLabel: React.FC<ListItemLabelProps> = (props) => {
  const { primary, secondary, children, ...rest } = props
  const styles = useStyles()

  const labelStyles = {
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
    <chakra.div __css={labelStyles} {...rest}>
      {primary && (
        <chakra.span isTruncated __css={primaryStyles}>
          {primary}
        </chakra.span>
      )}
      {secondary && (
        <chakra.span isTruncated __css={secondaryStyles}>
          {secondary}
        </chakra.span>
      )}
      {children}
    </chakra.div>
  )
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

  const tertiaryStyles = {
    display: 'flex',
    '& > *:not(style) ~ *:not(style)': { marginStart: spacing },
    ...styles.tertiary,
  }

  return (
    <chakra.div __css={tertiaryStyles} {...rest}>
      {children}
    </chakra.div>
  )
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
    >
      {children}
    </ButtonGroup>
  )
}
