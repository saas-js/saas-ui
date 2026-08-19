'use client'

import type * as React from 'react'

import type { RowData, TableOptions, TableState } from '@tanstack/react-table'
import { createTableHook } from '@tanstack/react-table'

import {
  BadgeCell,
  DateCell,
  ExpanderCell,
  NumberCell,
  ResizeHandle,
  SelectionCell,
  SelectionHeader,
  SortIndicator,
  TextCell,
} from './data-table-cells'
import { DataTableNoResults } from './data-table-no-results'
import {
  DataTablePageSelect,
  DataTablePagination,
  DataTablePaginationNav,
  DataTablePaginationPages,
  DataTablePaginationRange,
} from './data-table-pagination'
import { DataTableVirtualizer } from './data-table-virtual'
import {
  dataTableCellContext,
  dataTableHeaderContext,
  dataTableTableContext,
} from './data-table.context'
import {
  type DataTableFeatures,
  dataTableFeatures,
} from './data-table.features'
import {
  DataTableBody,
  type DataTableBodyProps,
  DataTableCell,
  type DataTableCellProps,
  DataTableFooter,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableRoot,
  DataTableRow,
  type DataTableRowProps,
  DataTableScrollArea,
  DataTableTable,
} from './data-table'

const dataTableComponents = {
  Root: DataTableRoot,
  ScrollArea: DataTableScrollArea,
  Virtualizer: DataTableVirtualizer,
  Table: DataTableTable,
  Header: DataTableHeader,
  HeaderCell: DataTableHeaderCell,
  Body: DataTableBody,
  Row: DataTableRow,
  Cell: DataTableCell,
  Footer: DataTableFooter,
  NoResults: DataTableNoResults,
  Pagination: DataTablePagination,
  PaginationRange: DataTablePaginationRange,
  PaginationNav: DataTablePaginationNav,
  PaginationPages: DataTablePaginationPages,
  PageSelect: DataTablePageSelect,
}

const dataTableCellComponents = {
  BadgeCell,
  DateCell,
  ExpanderCell,
  NumberCell,
  SelectionCell,
  TextCell,
}

const dataTableHeaderComponents = {
  ResizeHandle,
  SelectionHeader,
  SortIndicator,
}

const {
  createAppColumnHelper: createDataTableColumnHelper,
  useAppTable,
  useTableContext: useDataTableContext,
  useCellContext: useDataTableCell,
  useHeaderContext: useDataTableHeader,
} = createTableHook({
  features: dataTableFeatures,
  tableContext: dataTableTableContext,
  cellContext: dataTableCellContext,
  headerContext: dataTableHeaderContext,
  tableComponents: dataTableComponents,
  cellComponents: dataTableCellComponents,
  headerComponents: dataTableHeaderComponents,
  defaultColumn: {
    minSize: 48,
    size: 160,
    maxSize: 800,
  },
  // The feature defaults to enabled; spreadsheet-style cell selection should
  // be a per-table opt-in (`enableCellSelection: true`).
  enableCellSelection: false,
  enableSortingRemoval: false,
  globalFilterFn: 'includesString',
  getColumnCanGlobalFilter: (column) => Boolean(column.accessorFn),
  columnResizeMode: 'onChange',
})

export {
  createDataTableColumnHelper,
  useDataTableCell,
  useDataTableContext,
  useDataTableHeader,
}

type BoundTable<TData extends RowData, TSelected> = ReturnType<
  typeof useAppTable<TData, TSelected>
>

export type DataTable<
  TData extends RowData,
  TSelected = TableState<DataTableFeatures>,
> = Omit<BoundTable<TData, TSelected>, 'Body' | 'Row' | 'Cell'> & {
  /**
   * Context provider for all table parts. Alias of TanStack's `AppTable`.
   */
  Provider: BoundTable<TData, TSelected>['AppTable']
  // The row-level parts re-typed with this table's TData, so callbacks like
  // `onRowClick` and the Body render prop infer row types without an
  // explicit generic at the call site.
  Body: (props: DataTableBodyProps<TData>) => React.ReactNode
  Row: (props: DataTableRowProps<TData>) => React.ReactNode
  Cell: (props: DataTableCellProps<TData>) => React.ReactNode
}

export interface UseDataTableOptions<TData extends RowData> extends Omit<
  TableOptions<DataTableFeatures, TData>,
  'features'
> {}

/**
 * Creates a data table instance with all parts, cell components and header
 * components bound to it:
 *
 *   const table = useDataTable({ columns, data })
 *
 *   <table.Provider>
 *     <table.Root>
 *       <table.ScrollArea>
 *         <table.Table aria-label="Accounts" />
 *       </table.ScrollArea>
 *       <table.Pagination />
 *     </table.Root>
 *   </table.Provider>
 *
 * Pass a `selector` to only re-render the calling component for a slice of
 * the table state — the parts subscribe to what they need on their own.
 */
export function useDataTable<
  TData extends RowData,
  TSelected = TableState<DataTableFeatures>,
>(
  options: UseDataTableOptions<TData>,
  selector?: (state: TableState<DataTableFeatures>) => TSelected,
): DataTable<TData, TSelected> {
  const table = useAppTable<TData, TSelected>(options, selector) as DataTable<
    TData,
    TSelected
  >

  table.Provider ??= table.AppTable

  return table
}
