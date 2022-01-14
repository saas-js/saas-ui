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

import { ButtonGroup, ButtonGroupProps } from '@chakra-ui/react'

interface DataListOptions {
  /**
   * An array of list items
   */
  items?: Array<DataListItemProps>
}

export interface DataListProps
  extends DataListOptions,
    HTMLChakraProps<'div'>,
    ThemingProps<'DataList'> {}

/**
 * React component to render lists of data
 */
export const DataList = forwardRef<DataListProps, 'div'>((props, ref) => {
  const { items, children, ...rest } = props

  const styles = useMultiStyleConfig('DataList', rest)

  const listProps = omitThemingProps(rest)

  let content
  if (items) {
    content = items.map((item: any, i: number) => {
      return <DataListItem {...item} key={item.id || i} />
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

export interface ListHeaderProps extends HTMLChakraProps<'div'> {
  action?: React.ReactNode
}

export const DataListHeader: React.FC<ListHeaderProps> = ({
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

export interface DataListItemProps extends HTMLChakraProps<'div'> {
  icon?: any
  primary?: React.ReactNode
  secondary?: React.ReactNode
  tertiary?: React.ReactNode
  action?: React.ReactNode
  onClick?: () => void
}

export const DataListItem = forwardRef<DataListItemProps, 'div'>(
  (props, ref) => {
    const {
      icon,
      primary,
      secondary,
      tertiary,
      action,
      onClick,
      children,
      ...rest
    } = props

    const styles = useStyles()

    const itemStyles = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      py: 2,
      px: 4,
      '.sui-data-list &:is(a)': {
        _hover: {
          bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
        },
      },
      ...styles.item,
    }

    let content = (
      <>
        {icon && <DataListItemIcon>{icon}</DataListItemIcon>}
        {(primary || secondary) && (
          <DataListItemLabel primary={primary} secondary={secondary} />
        )}
        {tertiary && <DataListItemTertiary>{tertiary}</DataListItemTertiary>}
        {children}
        {action && <DataListItemAction>{action}</DataListItemAction>}
      </>
    )

    let as
    if (onClick) {
      as = DataListItemButton
    }

    return (
      <chakra.div
        ref={ref}
        __css={itemStyles}
        as={as}
        onClick={onClick}
        {...rest}
      >
        {content}
      </chakra.div>
    )
  },
)

export interface DataListItemButtonProps extends HTMLChakraProps<'div'> {
  onClick?: (e: React.MouseEvent) => void
  as?: As
}

/**
 * Behaves like a button by default.
 * Use the 'as' prop to render a link.
 *
 * <DataListItemButton as="a" href="/page" />
 *
 * or
 *
 * <DataListItemButton as={Link} href={{path: '/page}} />
 */
export const DataListItemButton = forwardRef<DataListItemButtonProps, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props
    const styles = useStyles()

    const buttonStyles = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      cursor: 'pointer',
      _hover: {
        bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
      },
      ...styles.button,
    }

    return (
      <chakra.div ref={ref} __css={buttonStyles} {...rest}>
        {children}
      </chakra.div>
    )
  },
)

export interface DataListItemIconProps extends HTMLChakraProps<'div'> {
  /**
   * The icon size
   * @default 24px
   */
  size?: SystemProps['fontSize']
  /**
   * The icon spacing, ltr supported
   * @default 4
   */
  spacing?: SystemProps['margin']
}

export const DataListItemIcon: React.FC<DataListItemIconProps> = (props) => {
  const { children, spacing = 4, size = '24px', ...rest } = props
  const styles = useStyles()

  const iconStyles = {
    display: 'flex',
    fontSize: size,
    flexShrink: 0,
    me: spacing,
    ...styles.icon,
  }

  let _icon = React.isValidElement(children)
    ? React.cloneElement(children, {
        'aria-hidden': true,
        focusable: false,
      })
    : children

  return (
    <chakra.div __css={iconStyles} {...rest}>
      {_icon}
    </chakra.div>
  )
}

export interface DataListItemLabelProps extends HTMLChakraProps<'div'> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
}

export const DataListItemLabel: React.FC<DataListItemLabelProps> = (props) => {
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
    fontSize: 'md',
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

export interface ListItemTertiaryProps extends HTMLChakraProps<'div'> {}

/**
 * Tertiary item position between the item label and action
 */
export const DataListItemTertiary: React.FC<ListItemTertiaryProps> = ({
  children,
  ...rest
}) => {
  const styles = useStyles()

  const tertiaryStyles = {
    ms: 2,
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
export const DataListItemAction: React.FC<ButtonGroupProps> = ({
  children,
  ...rest
}) => {
  const styles = useStyles()

  const actionStyles = {
    ms: 2,
    ...styles.action,
  }

  return (
    <ButtonGroup variant="ghost" sx={actionStyles} {...rest}>
      {children}
    </ButtonGroup>
  )
}
