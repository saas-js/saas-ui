import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  SystemProps,
  SystemStyleObject,
  As,
  useColorModeValue,
  useMultiStyleConfig,
  createStylesContext,
  Icon,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

const [StylesProvider, useStyles] = createStylesContext('SuiStructuredList')

interface StructuredListOptions {
  /**
   * An array of list items
   */
  items?: Array<StructuredListItemProps>
}

export interface StructuredListProps
  extends StructuredListOptions,
    HTMLChakraProps<'ul'>,
    ThemingProps<'SuiStructuredList'> {}

/**
 * React component to render lists of data
 */
export const StructuredList = forwardRef<StructuredListProps, 'ul'>(
  (props, ref) => {
    const { items, children, ...rest } = props

    const styles = useMultiStyleConfig('SuiStructuredList', rest)

    const listProps = omitThemingProps(rest)

    let content
    if (items) {
      content = items.map((item: any, i: number) => {
        return <StructuredListItem {...item} key={item.id || i} />
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
          className={cx('sui-list', props.className)}
        >
          {content}
        </chakra.ul>
      </StylesProvider>
    )
  }
)

StructuredList.displayName = 'StructuredList'

export interface StructuredListHeaderProps extends HTMLChakraProps<'li'> {
  /**
   * Action rendered next to the title
   */
  action?: React.ReactNode
  /**
   * The aria-level
   */
  level?: number
}

export const StructuredListHeader: React.FC<StructuredListHeaderProps> = (
  props
) => {
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
      className={cx('sui-list__header', props.className)}
    >
      <chakra.span flex="1" userSelect="none" role={role} aria-level={level}>
        {children}
      </chakra.span>
      {action}
    </chakra.li>
  )
}

StructuredListHeader.displayName = 'StructuredListHeader'

export interface StructuredListItemProps extends HTMLChakraProps<'li'> {
  onClick?: (e: React.MouseEvent) => void
  href?: string | object
}

/**
 * Adding `onClick` or `href` props will wrap the content in a `StructuredListButton`
 */
export const StructuredListItem = forwardRef<StructuredListItemProps, 'li'>(
  (props, ref) => {
    const { onClick, href, as, children, ...rest } = props

    const styles = useStyles()

    const isButton = !!(onClick || href)

    const ContentWrapper = isButton ? StructuredListButton : React.Fragment
    const disablePadding = !!isButton

    const itemStyles: SystemStyleObject = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 'md',
      ...styles.item,
      ...(disablePadding ? { py: 0, px: 0 } : {}),
    }

    const wrapperProps = isButton
      ? {
          onClick,
          href,
          as,
        }
      : {}

    const content = isButton ? (
      <ContentWrapper {...wrapperProps}>{children}</ContentWrapper>
    ) : (
      children
    )

    return (
      <chakra.li
        ref={ref}
        __css={itemStyles}
        {...rest}
        className={cx('sui-list__item', props.className)}
      >
        {content}
      </chakra.li>
    )
  }
)

StructuredListItem.displayName = 'StructuredListItem'

export interface StructuredListButtonProps extends HTMLChakraProps<'div'> {
  onClick?: (e: React.MouseEvent) => void
  as?: As
}

/**
 * Behaves like a button by default.
 * Use the 'as' prop to render a link.
 *
 * <StructuredListItemButton as="a" href="/page" />
 *
 * or
 *
 * <StructuredListItemButton as={Link} href={{path: '/page}} />
 */
export const StructuredListButton = forwardRef<
  StructuredListButtonProps,
  'div'
>((props, ref) => {
  const { children, ...rest } = props
  const styles = useStyles()

  const buttonStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    cursor: 'pointer',
    userSelect: 'none',
    ...styles.button,
  }

  return (
    <chakra.div
      ref={ref}
      __css={buttonStyles}
      role="button"
      tabIndex={0}
      {...rest}
      className={cx('sui-list__item-button', props.className)}
    >
      {children}
    </chakra.div>
  )
})

StructuredListButton.displayName = 'StructuredListButton'

export interface StructuredListIconProps extends HTMLChakraProps<'div'> {
  /**
   * The icon size
   * @default 5
   */
  size?: SystemProps['boxSize']
  /**
   * The icon spacing, ltr supported
   */
  spacing?: SystemProps['margin']
}

export const StructuredListIcon: React.FC<StructuredListIconProps> = (
  props
) => {
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
    _icon = React.cloneElement<any>(_icon, {
      boxSize: size,
    })
  }

  return (
    <chakra.div
      __css={iconStyles}
      {...rest}
      className={cx('sui-list__item-icon', props.className)}
    >
      {_icon}
    </chakra.div>
  )
}

StructuredListIcon.displayName = 'StructuredListItemIcon'

export interface StructuredListCellProps extends HTMLChakraProps<'div'> {}

export const StructuredListCell: React.FC<StructuredListCellProps> = (
  props
) => {
  const { children, ...rest } = props
  const styles = useStyles()

  return (
    <chakra.div
      __css={styles.cell}
      {...rest}
      className={cx('sui-list__cell', props.className)}
    >
      {children}
    </chakra.div>
  )
}

StructuredListCell.displayName = 'StructuredListCell'
