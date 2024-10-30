import * as React from 'react'

import { mergeRefs } from '@chakra-ui/react'
import { nextById, prevById, queryAll } from '@zag-js/dom-utils'

import {
  type HTMLSystemProps,
  type SlotRecipeProps,
  createSlotRecipeContext,
  sui,
} from '#system'

import { callAll, cx, dataAttr } from '../utils'
import {
  GridListProvider,
  useGridList,
  useGridListContext,
} from './grid-list.context.ts'

const {
  useStyles: useGridListStyles,
  withContext,
  withProvider,
} = createSlotRecipeContext({
  key: 'gridList',
})

export { useGridListStyles }

interface GridListRootOptions {
  // /**
  //  * An array of list items
  //  */
  // // items?: Array<GridListItemProps>
}

export interface GridListRootProps
  extends GridListRootOptions,
    HTMLSystemProps<'ul'>,
    SlotRecipeProps<'sui-grid-list'> {}

/**
 * React component to render lists of data
 */
export const GridListRoot = withProvider<HTMLUListElement, GridListRootProps>(
  React.forwardRef((props, ref) => {
    const { items, children, ...rest } = props

    const { listProps, ...context } = useGridList(props)

    return (
      <GridListProvider value={context}>
        <sui.ul
          ref={mergeRefs(ref, context.containerRef)}
          {...rest}
          {...listProps}
          className={cx('sui-list', props.className)}
        >
          {children}
        </sui.ul>
      </GridListProvider>
    )
  }),
  'root',
)

export interface GridListHeaderProps extends HTMLSystemProps<'li'> {
  /**
   * Action rendered next to the title
   */
  action?: React.ReactNode
  /**
   * The aria-level
   */
  level?: number
}

export const GridListHeader = withContext<HTMLLIElement, GridListHeaderProps>(
  'li',
  'header',
  {
    defaultProps: {
      role: 'heading',
      level: 1,
    },
  },
)

export interface GridListItemProps extends HTMLSystemProps<'li'> {
  disabled?: boolean
}

/**
 * Adding `onClick` or `href` props will wrap the content in a `GridListButton`
 */
export const GridListItem = withContext<HTMLLIElement, GridListItemProps>(
  React.forwardRef((props, ref) => {
    const { children, ...rest } = props

    const { itemProps } = useGridListItem(props)

    return (
      <sui.li ref={ref} {...itemProps} {...rest}>
        {children}
      </sui.li>
    )
  }),
  'item',
)

const useGridListItem = (props: GridListItemProps) => {
  const {
    id: containerId,
    containerRef,
    focusId,
    setFocusId,
  } = useGridListContext()

  const id = `${containerId}-${React.useId()}`
  const buttonId = props.id ?? id

  const isFocused = focusId === buttonId

  function getItems() {
    return queryAll(
      containerRef.current,
      `.sui-list__item-button:not([aria-disabled=true])`,
    )
  }

  const itemProps = {
    id: buttonId,
    ['data-focus']: dataAttr(isFocused),
    ['aria-disabled']: props.disabled ? true : undefined,
    tabIndex: props.disabled ? -1 : 0,
    onFocus: callAll(props.onFocus, () => {
      setFocusId(buttonId)
    }),
    onKeyDown: callAll(
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
        [buttonId],
      ),
    ),
    onClick: (e: React.MouseEvent<HTMLLIElement>) => {
      if (props.disabled) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      props.onClick?.(e)
    },
  }

  return {
    itemProps,
  }
}

export interface GridListCellProps extends HTMLSystemProps<'div'> {}

export const GridListCell = withContext<HTMLDivElement, GridListCellProps>(
  'div',
  'cell',
)
