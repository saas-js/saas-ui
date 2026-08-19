export {
  createDataTableColumnHelper,
  useDataTable,
  useDataTableCell,
  useDataTableContext,
  useDataTableHeader,
} from './use-data-table.ts'

export type { DataTable, UseDataTableOptions } from './use-data-table.ts'

export {
  DataTableBody,
  DataTableCell,
  DataTableFooter,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableRoot,
  DataTableRow,
  DataTableScrollArea,
  DataTableTable,
} from './data-table.tsx'

export type {
  DataTableBodyProps,
  DataTableCellProps,
  DataTableFooterProps,
  DataTableHeaderCellProps,
  DataTableHeaderProps,
  DataTableRootProps,
  DataTableRowProps,
  DataTableRowRenderProps,
  DataTableScrollAreaProps,
  DataTableTableProps,
} from './data-table.tsx'

export {
  DataTablePageSelect,
  DataTablePagination,
  DataTablePaginationNav,
  DataTablePaginationPages,
  DataTablePaginationRange,
} from './data-table-pagination.tsx'

export type {
  DataTablePageSelectProps,
  DataTablePaginationNavProps,
  DataTablePaginationPagesProps,
  DataTablePaginationProps,
  DataTablePaginationRangeProps,
} from './data-table-pagination.tsx'

export {
  DataTableVirtualizer,
  getColumnWindow,
  useDataTableVirtualizer,
  useDataTableVirtualizerContext,
} from './data-table-virtual.tsx'

export type {
  ColumnWindow,
  DataTableColumnVirtualizer,
  DataTableRowVirtualizer,
  DataTableVirtualizerProps,
  UseDataTableVirtualizerOptions,
} from './data-table-virtual.tsx'

export {
  BadgeCell,
  DateCell,
  ExpanderCell,
  NumberCell,
  ResizeHandle,
  SelectionCell,
  SelectionHeader,
  SortIndicator,
  TextCell,
} from './data-table-cells.tsx'

export type {
  BadgeCellProps,
  DateCellProps,
  ExpanderCellProps,
  NumberCellProps,
} from './data-table-cells.tsx'

export {
  DataTableUIProvider,
  useDataTableStyles,
  useDataTableUI,
} from './data-table.context.ts'

export { dataTableFeatures } from './data-table.features.ts'

export type { DataTableFeatures } from './data-table.features.ts'

export {
  DataTablePaginationSlot,
  DataTableRootSlot,
  DataTableScrollAreaSlot,
  TableBodySlot,
  TableCellSlot,
  TableColumnHeaderSlot,
  TableColumnTitleSlot,
  TableEmptySlot,
  TableFooterSlot,
  TableHeaderSlot,
  TableResizerSlot,
  TableRowSlot,
  TableSlot,
} from './data-table.primitives.tsx'

export {
  type DataTableVariantProps,
  dataTableSlotRecipe,
} from './data-table.recipe.ts'

export { estimateDataTableRowHeight } from './data-table.utils.ts'

export type {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  ColumnVisibilityState,
  ExpandedState,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  TableState,
} from '@tanstack/react-table'

export {
  DataTableNoResults,
  type DataTableNoResultsProps,
} from './data-table-no-results.tsx'
