import type { HTMLChakraProps, SlotRecipeProps } from '@chakra-ui/react'
import { GridList } from '@saas-ui/core/grid-list'

import { withContext, withProvider } from './grid-list.context.ts'

interface GridListRootProps
  extends GridList.RootProps,
    Omit<HTMLChakraProps<'div'>, 'children'>,
    SlotRecipeProps<'suiGridList'> {}

const GridListRoot = withProvider<HTMLDivElement, GridList.RootProps>(
  GridList.Root,
  'root',
)

interface GridListItemProps extends HTMLChakraProps<'div'> {}

const GridListItem = withContext<HTMLDivElement, GridListItemProps>(
  GridList.Item,
  'item',
)

interface GridListHeaderProps extends HTMLChakraProps<'header'> {}

const GridListHeader = withContext<HTMLDivElement, GridListHeaderProps>(
  GridList.Header,
  'header',
)

interface GridListCellProps
  extends GridList.CellProps,
    HTMLChakraProps<'div'> {}

const GridListCell = withContext<HTMLDivElement, GridListCellProps>(
  GridList.Cell,
  'cell',
)

export {
  GridListRoot as Root,
  GridListItem as Item,
  GridListHeader as Header,
  GridListCell as Cell,
}

export type {
  GridListRootProps as RootProps,
  GridListItemProps as ItemProps,
  GridListHeaderProps as HeaderProps,
  GridListCellProps as CellProps,
}
