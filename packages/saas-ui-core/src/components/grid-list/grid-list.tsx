import * as React from 'react'

import { type HTMLSystemProps, sui } from '#system'
import { mergeRefs } from '#utils'

import {
  type GridListItemOptions,
  GridListProvider,
  useGridList,
  useGridListItem,
} from './grid-list.context.ts'

export interface GridListRootProps extends HTMLSystemProps<'div'> {}

/**
 * React component to render lists of data
 */
export const GridListRoot = React.forwardRef<HTMLDivElement, GridListRootProps>(
  (props, ref) => {
    const { children, ...rest } = props

    const { listProps, ...context } = useGridList(props)

    return (
      <GridListProvider value={context}>
        <sui.div
          ref={mergeRefs(ref, context.containerRef)}
          role="grid"
          aria-readonly
          {...rest}
          {...listProps}
        >
          {children}
        </sui.div>
      </GridListProvider>
    )
  },
)

export interface GridListHeaderProps extends HTMLSystemProps<'div'> {}

export const GridListHeader = React.forwardRef<
  HTMLDivElement,
  GridListHeaderProps
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <sui.div ref={ref} role="columnheader" {...rest}>
      {children}
    </sui.div>
  )
})

export interface GridListItemProps
  extends GridListItemOptions,
    HTMLSystemProps<'div'> {}

export const GridListItem = React.forwardRef<HTMLDivElement, GridListItemProps>(
  (props, ref) => {
    const { children, ...rest } = props

    const { itemProps } = useGridListItem(props)

    return (
      <sui.div ref={ref} role="row" {...itemProps} {...rest}>
        {children}
      </sui.div>
    )
  },
)

export interface GridListCellProps extends HTMLSystemProps<'div'> {}

export const GridListCell = React.forwardRef<HTMLDivElement, GridListCellProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <sui.div ref={ref} role="gridcell" {...rest}>
        {children}
      </sui.div>
    )
  },
)
