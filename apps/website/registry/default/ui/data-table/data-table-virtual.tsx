'use client'

import * as React from 'react'

import type { RowData } from '@tanstack/react-table'
import {
  type VirtualItem,
  type Virtualizer,
  type VirtualizerOptions,
  useVirtualizer,
} from '@tanstack/react-virtual'

import { useDataTableUI, useTableInstance } from './data-table.context.ts'
import { estimateDataTableRowHeight } from './data-table.utils.ts'

export type DataTableRowVirtualizer = Virtualizer<
  HTMLDivElement,
  HTMLTableRowElement
>
export type DataTableColumnVirtualizer = Virtualizer<
  HTMLDivElement,
  HTMLTableCellElement
>

export interface DataTableVirtualizerContextValue {
  rowVirtualizer: DataTableRowVirtualizer | null
  columnVirtualizer: DataTableColumnVirtualizer | null
}

const DataTableVirtualizerContext =
  React.createContext<DataTableVirtualizerContextValue>({
    rowVirtualizer: null,
    columnVirtualizer: null,
  })

/**
 * Reads the active virtualizers. Both are `null` outside of
 * `<DataTable.Virtualizer>`, so `Header`, `Body` and `Row` can adapt
 * automatically without a separate virtualized variant.
 */
export function useDataTableVirtualizerContext() {
  return React.useContext(DataTableVirtualizerContext)
}

export interface UseDataTableVirtualizerOptions {
  /** Virtualize rows (vertical). Enabled by default. */
  rows?: boolean
  /** Virtualize the center (unpinned) columns (horizontal). Off by default. */
  columns?: boolean
  rowOptions?: Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>
  columnOptions?: Partial<
    VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>
  >
}

/**
 * Creates row and column virtualizers bound to the table's scroll area.
 * Prefer `<DataTable.Virtualizer>` which provides them through context; use
 * this hook directly when composing a custom table part that needs
 * `scrollToIndex` or the virtual items themselves.
 */
export function useDataTableVirtualizer<TData extends RowData = RowData>(
  options: UseDataTableVirtualizerOptions = {},
): DataTableVirtualizerContextValue {
  const {
    rows: rowsEnabled = true,
    columns: columnsEnabled = false,
    rowOptions,
    columnOptions,
  } = options

  const table = useTableInstance<TData>()
  const { scrollRef, size } = useDataTableUI()

  // The scroll area is usually an ancestor of the component calling this
  // hook, so its ref is not assigned yet when our mount effect runs. One
  // forced re-render after mount lets the virtualizers pick up the scroll
  // element; without it they stay empty until some other state change.
  const [, rerender] = React.useReducer((count: number) => count + 1, 0)
  React.useEffect(() => {
    if (scrollRef.current) {
      rerender()
    }
  }, [scrollRef])

  const rows = table.getRowModel().rows
  const centerColumns = table.getCenterVisibleLeafColumns()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    enabled: rowsEnabled,
    estimateSize: () => estimateDataTableRowHeight(size),
    getScrollElement: () => scrollRef.current,
    overscan: 5,
    ...rowOptions,
  })

  const columnVirtualizer = useVirtualizer({
    count: centerColumns.length,
    enabled: columnsEnabled,
    estimateSize: (index) => centerColumns[index]?.getSize() ?? 0,
    getScrollElement: () => scrollRef.current,
    horizontal: true,
    overscan: 3,
    ...columnOptions,
  })

  // Column sizes come from table state (resizing, visibility, pinning), so
  // remeasure whenever they change. Read through the store instead of
  // `table.state`: for context consumers `state` is typed as the selected
  // slice of whichever component created the table, while the store always
  // holds the full state. The slices are immutable snapshots, which makes
  // them reliable effect dependencies.
  const { columnSizing, columnVisibility, columnPinning } = table.store.state
  React.useEffect(() => {
    if (columnsEnabled) {
      columnVirtualizer.measure()
    }
  }, [
    columnsEnabled,
    columnVirtualizer,
    columnSizing,
    columnVisibility,
    columnPinning,
  ])

  return {
    rowVirtualizer: rowsEnabled ? rowVirtualizer : null,
    columnVirtualizer: columnsEnabled ? columnVirtualizer : null,
  }
}

export interface DataTableVirtualizerProps extends UseDataTableVirtualizerOptions {
  children: React.ReactNode
}

/**
 * Opt-in virtualization. Wrap the `Table` part in it and the `Header`,
 * `Body` and `Row` parts window themselves automatically:
 *
 *   <table.Virtualizer columns>
 *     <table.Table>
 *       <table.Header />
 *       <table.Body />
 *     </table.Table>
 *   </table.Virtualizer>
 *
 * Rows are windowed by default; pass `columns` to also window the unpinned
 * columns. Pinned columns always render. Pagination is usually disabled when
 * virtualizing — pass a page size covering the full dataset, or drop the
 * pagination part.
 */
export function DataTableVirtualizer(props: DataTableVirtualizerProps) {
  const table = useTableInstance()

  // Subscribe to the state the virtualizers derive their counts and sizes
  // from, so this works regardless of the selector passed to `useDataTable`.
  return (
    <table.Subscribe
      selector={(state) => ({
        columnFilters: state.columnFilters,
        columnPinning: state.columnPinning,
        columnSizing: state.columnSizing,
        columnVisibility: state.columnVisibility,
        expanded: state.expanded,
        globalFilter: state.globalFilter,
        pagination: state.pagination,
        sorting: state.sorting,
      })}
    >
      {() => <VirtualizerImpl {...props} />}
    </table.Subscribe>
  )
}

function VirtualizerImpl(props: DataTableVirtualizerProps) {
  const { children, ...options } = props
  // Intentionally not memoized: the context value must get a new identity on
  // every render (including scroll frames) so consumers re-render even though
  // `children` itself is a stable element that React bails out on.
  const value = useDataTableVirtualizer(options)

  return (
    <DataTableVirtualizerContext.Provider value={{ ...value }}>
      {children}
    </DataTableVirtualizerContext.Provider>
  )
}

export interface ColumnWindow {
  items: Array<VirtualItem>
  paddingStart: number
  paddingEnd: number
}

/**
 * Translates a column virtualizer into the window that `Header` and `Row`
 * render: the virtual items plus leading/trailing spacer widths that keep the
 * scroll width and pinned offsets stable.
 */
export function getColumnWindow(
  columnVirtualizer: DataTableColumnVirtualizer | null,
): ColumnWindow | null {
  if (!columnVirtualizer) {
    return null
  }

  const items = columnVirtualizer.getVirtualItems()
  const lastItem = items[items.length - 1]

  return {
    items,
    paddingStart: items[0]?.start ?? 0,
    paddingEnd: lastItem ? columnVirtualizer.getTotalSize() - lastItem.end : 0,
  }
}
