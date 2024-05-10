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
  useMultiStyleConfig,
  createStylesContext,
  Icon,
  useId,
  useMergeRefs,
} from '@chakra-ui/react'

import { callAllHandlers, cx, dataAttr } from '@chakra-ui/utils'
import { createContext } from '@chakra-ui/react-utils'

import { nextById, prevById, queryAll } from '@zag-js/dom-utils'

const [StylesProvider, useStyles] = createStylesContext('SuiStructuredList')

interface StructuredListContext {
  id: string
  containerRef: React.RefObject<HTMLUListElement>
  focusId: string | null
  setFocusId: React.Dispatch<React.SetStateAction<string | null>>
}

const [StructuredListProvider, useStructuredListContext] =
  createContext<StructuredListContext>({
    name: 'StructuredListContext',
    errorMessage:
      'useStructuredListContext: `context` is undefined. Seems you forgot to wrap the components in `<StructuredList />`',
  })

function queryAllItems(root: HTMLElement | null) {
  return queryAll(root, `[role='button']:not([disabled])`)
}

const useStructuredList = (props: StructuredListProps) => {
  const id = useId()

  const ref = React.useRef<HTMLUListElement>(null)

  const [focusId, setFocusId] = React.useState<string | null>(null)

  const listProps: StructuredListProps = {
    onBlur: callAllHandlers(props.onBlur, (e) => {
      if (e.relatedTarget) {
        const items = queryAllItems(ref.current)
        if (!items.includes(e.relatedTarget as HTMLElement)) {
          setFocusId(null)
        }
      }
    }),
  }

  return {
    id: props.id ?? id,
    containerRef: ref,
    focusId,
    setFocusId,
    listProps,
  }
}

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

    const ownProps = omitThemingProps(rest)

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

    const { listProps, ...context } = useStructuredList(props)

    return (
      <StructuredListProvider value={context}>
        <StylesProvider value={styles}>
          <chakra.ul
            ref={useMergeRefs(ref, context.containerRef)}
            __css={listStyles}
            {...ownProps}
            {...listProps}
            className={cx('sui-list', props.className)}
          >
            {content}
          </chakra.ul>
        </StylesProvider>
      </StructuredListProvider>
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

export const StructuredListHeader = forwardRef<StructuredListHeaderProps, 'li'>(
  (props, ref) => {
    const {
      children,
      onClick,
      action,
      role = 'heading',
      level = 1,
      ...rest
    } = props
    const styles = useStyles()

    return (
      <chakra.li
        ref={ref}
        __css={styles.header}
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
)

StructuredListHeader.displayName = 'StructuredListHeader'

export interface StructuredListItemProps extends HTMLChakraProps<'li'> {
  onClick?: (e: React.MouseEvent) => void
  href?: string | object
  isDisabled?: boolean
}

/**
 * Adding `onClick` or `href` props will wrap the content in a `StructuredListButton`
 */
export const StructuredListItem = forwardRef<StructuredListItemProps, 'li'>(
  (props, ref) => {
    const { onClick, href, as, children, isDisabled, ...rest } = props

    const styles = useStyles()

    const isButton = !!(onClick || href)

    const ContentWrapper = isButton ? StructuredListButton : React.Fragment
    const disablePadding = !!isButton

    const itemStyles: SystemStyleObject = {
      ...styles.item,
      ...(disablePadding ? { py: 0, px: 0 } : {}),
    }

    const wrapperProps = isButton
      ? {
          onClick,
          href,
          as,
          isDisabled,
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

const useStructuredListButton = (props: StructuredListButtonProps) => {
  const {
    id: containerId,
    containerRef,
    focusId,
    setFocusId,
  } = useStructuredListContext()

  const id = `${containerId}-${useId()}`
  const buttonId = props.id ?? id

  const isFocused = focusId === buttonId

  function getItems() {
    return queryAll(
      containerRef.current,
      `.sui-list__item-button:not([aria-disabled=true])`
    )
  }

  const buttonProps = {
    id: buttonId,
    ['data-focus']: dataAttr(isFocused),
    ['aria-disabled']: props.isDisabled ? 'true' : undefined,
    tabIndex: props.isDisabled ? -1 : 0,
    onFocus: callAllHandlers(props.onFocus, () => {
      setFocusId(buttonId)
    }),
    onKeyDown: callAllHandlers(
      props.onKeyDown,
      React.useCallback(
        (e: React.KeyboardEvent) => {
          const items = getItems()

          const keyMap: Record<string, React.KeyboardEventHandler> = {
            ArrowUp: () => {
              prevById(items, buttonId)?.focus()
            },
            ArrowDown: () => {
              nextById(items, buttonId)?.focus()
            },
            Home: () => {
              items[0]?.focus()
            },
            End: () => {
              items[items.length - 1]?.focus()
            },
          }

          if (keyMap[e.key]) {
            e.preventDefault()
            keyMap[e.key](e)
          }
        },
        [buttonId]
      )
    ),
    onClick: (e: React.MouseEvent) => {
      if (props.isDisabled) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      props.onClick?.(e)
    },
  }

  return {
    buttonProps,
  }
}

export interface StructuredListButtonProps extends HTMLChakraProps<'div'> {
  onClick?: (e: React.MouseEvent) => void
  as?: As
  isDisabled?: boolean
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
  const { children, isDisabled, ...rest } = props

  const { buttonProps } = useStructuredListButton(props)

  const styles = useStyles()

  return (
    <chakra.div
      ref={ref}
      __css={styles.button}
      role="button"
      {...rest}
      {...buttonProps}
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
