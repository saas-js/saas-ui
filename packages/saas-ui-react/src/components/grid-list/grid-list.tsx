import type { HTMLChakraProps } from '@chakra-ui/react/styled-system'
import { GridList } from '@saas-ui/core/grid-list'

import type { SlotRecipeProps } from '../../types.ts'
import { withContext, withProvider } from './grid-list.context.ts'
import type { GridListVariantProps } from './grid-list.recipe.ts'

interface GridListRootProps
  extends HTMLChakraProps<'div'>,
    SlotRecipeProps<'suiGridList', GridListVariantProps> {}

const GridListRoot = withProvider<HTMLDivElement, GridListRootProps>(
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

interface GridListCellProps extends HTMLChakraProps<'div'> {}

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
  GridListHeaderProps as HeaderProps,
  GridListItemProps as ItemProps,
  GridListCellProps as CellProps,
}
