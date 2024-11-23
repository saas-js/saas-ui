import * as React from 'react'

import { type HTMLSystemProps, sui } from '#system'
import { type MaybeRenderProp, cx, mergeRefs, runIfFn } from '#utils'

import {
  type GridListItemProps,
  GridListProvider,
  useGridList,
  useGridListItem,
} from './grid-list.context.ts'

interface GridListRootOptions {
  /**
   * An array of list items
   */
  items?: Array<GridListItemProps>
  /**
   * The children to render inside the grid list
   */
  children?: MaybeRenderProp<{
    items: GridListItemProps[]
  }>
}

export interface GridListRootProps
  extends GridListRootOptions,
    Omit<HTMLSystemProps<'ul'>, 'children'> {}

/**
 * React component to render lists of data
 */
export const GridListRoot = React.forwardRef<
  HTMLUListElement,
  GridListRootProps
>((props, ref) => {
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
        {runIfFn(children, {
          items: items ?? [],
        })}
      </sui.ul>
    </GridListProvider>
  )
})

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

export const GridListHeader = React.forwardRef<
  HTMLLIElement,
  GridListHeaderProps
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <sui.li ref={ref} {...rest}>
      {children}
    </sui.li>
  )
})

export const GridListItem = React.forwardRef<HTMLLIElement, GridListItemProps>(
  (props, ref) => {
    const { children, ...rest } = props

    const { itemProps } = useGridListItem(props)

    return (
      <sui.li ref={ref} {...itemProps} {...rest}>
        {children}
      </sui.li>
    )
  },
)

export interface GridListCellProps extends HTMLSystemProps<'div'> {}

export const GridListCell = sui.div
