'use client'

import * as React from 'react'

import { type HTMLChakraProps, chakra } from '@chakra-ui/react'
import type { Cell, Column, Header, Row, RowData } from '@tanstack/react-table'

import { ResizeHandle, SortIndicator } from './data-table-cells'
import {
  getColumnWindow,
  useDataTableVirtualizerContext,
} from './data-table-virtual'
import {
  type DataTableLayout,
  type DataTableUIContextValue,
  DataTableUIProvider,
  useDataTableUI,
  useTableInstance,
} from './data-table.context'
import type { DataTableFeatures } from './data-table.features'
import {
  DataTableRootSlot,
  DataTableScrollAreaSlot,
  TableBodySlot,
  TableCellSlot,
  TableColumnHeaderSlot,
  TableColumnTitleSlot,
  TableEmptySlot,
  TableFooterSlot,
  TableHeaderSlot,
  TableRowSlot,
  TableSlot,
} from './data-table.primitives'
import type { DataTableVariantProps } from './data-table.recipe'
import { type DataTableSize, dataAttr, escapeId } from './data-table.utils'

type AnyColumn = Column<DataTableFeatures, RowData, unknown>
type AnyHeader = Header<DataTableFeatures, RowData, unknown>
type AnyCell = Cell<DataTableFeatures, RowData, unknown>

/* -------------------------------------------------------------------------
 * Root
 * ---------------------------------------------------------------------- */

export interface DataTableRootProps
  extends HTMLChakraProps<'div'>, DataTableVariantProps {
  /**
   * `grow` stretches columns to fill the available width, `fixed` keeps
   * columns at their configured sizes. Column virtualization always behaves
   * as `fixed`.
   */
  layout?: DataTableLayout
  /**
   * Keeps the header visible while the body scrolls. Enabled by default.
   */
  stickyHeader?: boolean
}

export function DataTableRoot(props: DataTableRootProps) {
  const {
    children,
    layout = 'grow',
    size = 'md',
    stickyHeader = true,
    striped,
    variant,
    ...rest
  } = props
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const value = React.useMemo<DataTableUIContextValue>(
    () => ({
      layout,
      scrollRef,
      size: (size ?? 'md') as DataTableSize,
      stickyHeader,
      striped,
      variant,
    }),
    [layout, size, stickyHeader, striped, variant],
  )

  return (
    <DataTableUIProvider value={value}>
      <DataTableRootSlot
        size={size}
        striped={striped}
        variant={variant}
        {...rest}
      >
        {children}
      </DataTableRootSlot>
    </DataTableUIProvider>
  )
}

/* -------------------------------------------------------------------------
 * ScrollArea
 * ---------------------------------------------------------------------- */

export interface DataTableScrollAreaProps extends HTMLChakraProps<'div'> {}

export function DataTableScrollArea(props: DataTableScrollAreaProps) {
  const { scrollRef } = useDataTableUI()

  return <DataTableScrollAreaSlot ref={scrollRef} {...props} />
}

/* -------------------------------------------------------------------------
 * Column sizing + pinning helpers
 *
 * Column widths and pinned offsets are written once as CSS variables on the
 * table element, so resizing a column never re-renders rows — cells resolve
 * their width through `var()`.
 * ---------------------------------------------------------------------- */

function useColumnSizeVars(layout: DataTableLayout, virtualColumns: boolean) {
  const table = useTableInstance()
  const columns = table.getVisibleLeafColumns()

  const vars: Record<string, string | number> = {
    '--dt-col-grow': layout === 'grow' && !virtualColumns ? 1 : 0,
    '--dt-table-width': table.getTotalSize(),
  }

  let startOffset = 0
  for (const column of columns) {
    vars[`--dt-col-${escapeId(column.id)}-size`] = column.getSize()
    if (column.getIsPinned() === 'start') {
      vars[`--dt-pin-${escapeId(column.id)}`] = startOffset
      startOffset += column.getSize()
    }
  }

  let endOffset = 0
  for (const column of [...columns].reverse()) {
    if (column.getIsPinned() === 'end') {
      vars[`--dt-pin-${escapeId(column.id)}`] = endOffset
      endOffset += column.getSize()
    }
  }

  return vars
}

function getColumnSizeStyle(column: AnyColumn): React.CSSProperties {
  const id = escapeId(column.id)
  const maxSize = column.columnDef.maxSize

  return {
    flexBasis: `calc(var(--dt-col-${id}-size) * 1px)`,
    flexGrow: `var(--dt-col-grow, 0)` as unknown as number,
    flexShrink: 0,
    // In grow layout every column takes an equal share of the free space;
    // maxSize caps that so fixed-width columns (expander, selection) stay
    // fixed and the flexible columns absorb the rest.
    maxWidth:
      maxSize != null && maxSize !== Number.MAX_SAFE_INTEGER
        ? `${maxSize}px`
        : undefined,
    minWidth: `calc(var(--dt-col-${id}-size) * 1px)`,
    width: `calc(var(--dt-col-${id}-size) * 1px)`,
  }
}

function getPinnedProps(
  table: ReturnType<typeof useTableInstance>,
  column: AnyColumn,
) {
  const pinned = column.getIsPinned()

  if (!pinned) {
    return { attrs: undefined, style: undefined }
  }

  const boundary =
    pinned === 'start'
      ? table.getStartVisibleLeafColumns().at(-1)?.id === column.id
        ? 'start'
        : undefined
      : table.getEndVisibleLeafColumns().at(0)?.id === column.id
        ? 'end'
        : undefined

  return {
    attrs: {
      'data-pinned': pinned,
      'data-pinned-boundary': boundary,
    },
    style: {
      '--dt-pinned-offset': `calc(var(--dt-pin-${escapeId(column.id)}) * 1px)`,
    } as React.CSSProperties,
  }
}

/**
 * Splits a list of headers or cells into pinned and center sections and
 * windows the center section when a column virtualizer is active.
 */
function useColumnSections<T extends { column: AnyColumn }>(items: Array<T>) {
  const { columnVirtualizer } = useDataTableVirtualizerContext()
  const window = getColumnWindow(columnVirtualizer)

  if (!window) {
    return { center: items, paddingEnd: 0, paddingStart: 0, start: [], end: [] }
  }

  const start: Array<T> = []
  const center: Array<T> = []
  const end: Array<T> = []

  for (const item of items) {
    const pinned = item.column.getIsPinned()
    if (pinned === 'start') start.push(item)
    else if (pinned === 'end') end.push(item)
    else center.push(item)
  }

  return {
    center: window.items
      .map((virtualColumn) => center[virtualColumn.index])
      .filter((item): item is T => item != null),
    end,
    paddingEnd: window.paddingEnd,
    paddingStart: window.paddingStart,
    start,
  }
}

function ColumnSpacer(props: { as?: 'td' | 'th'; width: number }) {
  if (props.width <= 0) {
    return null
  }

  const Component = props.as === 'th' ? chakra.th : chakra.td

  return (
    <Component
      aria-hidden="true"
      display="block"
      flexShrink={0}
      style={{ width: props.width }}
    />
  )
}

/* -------------------------------------------------------------------------
 * Table
 * ---------------------------------------------------------------------- */

export interface DataTableTableProps extends HTMLChakraProps<'table'> {}

/**
 * The table element. Renders `Header` and `Body` by default; pass children
 * to compose the sections yourself.
 */
export function DataTableTable(props: DataTableTableProps) {
  const table = useTableInstance()

  return (
    <table.Subscribe
      selector={(state) => ({
        columnFilters: state.columnFilters,
        columnPinning: state.columnPinning,
        columnSizing: state.columnSizing,
        columnVisibility: state.columnVisibility,
        globalFilter: state.globalFilter,
        pagination: state.pagination,
      })}
    >
      {() => <TableImpl {...props} />}
    </table.Subscribe>
  )
}

function TableImpl(props: DataTableTableProps) {
  const { children, style, ...rest } = props
  const table = useTableInstance()
  const { layout } = useDataTableUI()
  const { columnVirtualizer, rowVirtualizer } = useDataTableVirtualizerContext()
  const columnSizeVars = useColumnSizeVars(layout, Boolean(columnVirtualizer))

  const virtual = Boolean(columnVirtualizer ?? rowVirtualizer)
  const rowCount = table.getRowModel().rows.length

  return (
    <TableSlot
      aria-colcount={virtual ? table.getVisibleLeafColumns().length : undefined}
      aria-rowcount={
        virtual ? rowCount + table.getHeaderGroups().length : undefined
      }
      role="table"
      style={{ ...columnSizeVars, ...style } as React.CSSProperties}
      {...rest}
    >
      {children ?? (
        <>
          <DataTableHeader />
          <DataTableBody />
        </>
      )}
    </TableSlot>
  )
}

/* -------------------------------------------------------------------------
 * Header
 * ---------------------------------------------------------------------- */

export interface DataTableHeaderProps extends HTMLChakraProps<'thead'> {}

export function DataTableHeader(props: DataTableHeaderProps) {
  const table = useTableInstance()

  return (
    <table.Subscribe
      selector={(state) => ({
        columnPinning: state.columnPinning,
        columnResizing: state.columnResizing,
        columnVisibility: state.columnVisibility,
        sorting: state.sorting,
      })}
    >
      {() => <HeaderImpl {...props} />}
    </table.Subscribe>
  )
}

function HeaderImpl(props: DataTableHeaderProps) {
  const table = useTableInstance()
  const { stickyHeader } = useDataTableUI()
  const headerGroups = table.getHeaderGroups()

  return (
    <TableHeaderSlot
      data-sticky={dataAttr(stickyHeader)}
      role="rowgroup"
      {...props}
    >
      {headerGroups.map((headerGroup) => (
        <HeaderRow
          key={headerGroup.id}
          headers={headerGroup.headers}
          // Column windowing assumes a single header level; grouped headers
          // render in full and stay aligned through the shared size vars.
          windowed={headerGroups.length === 1}
        />
      ))}
    </TableHeaderSlot>
  )
}

function HeaderRow(props: { headers: Array<AnyHeader>; windowed: boolean }) {
  const sections = useColumnSections(props.windowed ? props.headers : [])
  const { start, center, end, paddingStart, paddingEnd } = props.windowed
    ? sections
    : {
        center: props.headers,
        end: [],
        paddingEnd: 0,
        paddingStart: 0,
        start: [],
      }

  return (
    <TableRowSlot role="row">
      {start.map((header) => (
        <DataTableHeaderCell header={header} key={header.id} />
      ))}
      <ColumnSpacer as="th" width={paddingStart} />
      {center.map((header) => (
        <DataTableHeaderCell header={header} key={header.id} />
      ))}
      <ColumnSpacer as="th" width={paddingEnd} />
      {end.map((header) => (
        <DataTableHeaderCell header={header} key={header.id} />
      ))}
    </TableRowSlot>
  )
}

export interface DataTableHeaderCellProps<TData extends RowData = RowData> {
  header: Header<DataTableFeatures, TData, unknown>
}

/**
 * A single column header cell: sort toggle, indicator and resize handle in a
 * `th` carrying the column's size variables and pinning attributes. Use it
 * when composing a custom header.
 */
export function DataTableHeaderCell<TData extends RowData = RowData>(
  props: DataTableHeaderCellProps<TData>,
) {
  const header = props.header as unknown as AnyHeader
  const table = useTableInstance()
  const { AppHeader } = table
  const column = header.column
  const meta = column.columnDef.meta
  const sorted = column.getIsSorted()
  const canSort = column.getCanSort()
  const pinned = getPinnedProps(table, column)

  return (
    <AppHeader header={header}>
      {(boundHeader) => (
        <TableColumnHeaderSlot
          aria-sort={
            sorted
              ? sorted === 'desc'
                ? 'descending'
                : 'ascending'
              : canSort
                ? 'none'
                : undefined
          }
          colSpan={header.colSpan > 1 ? header.colSpan : undefined}
          data-is-numeric={meta?.isNumeric || undefined}
          role="columnheader"
          scope="col"
          style={{ ...getColumnSizeStyle(column), ...pinned.style }}
          {...pinned.attrs}
        >
          {header.isPlaceholder ? null : canSort ? (
            <TableColumnTitleSlot
              data-is-numeric={meta?.isNumeric || undefined}
              data-sortable=""
              type="button"
              onClick={column.getToggleSortingHandler()}
            >
              <boundHeader.FlexRender />
              <SortIndicator />
            </TableColumnTitleSlot>
          ) : (
            <TableColumnTitleSlot
              as="div"
              data-is-numeric={meta?.isNumeric || undefined}
            >
              <boundHeader.FlexRender />
            </TableColumnTitleSlot>
          )}
          <ResizeHandle />
        </TableColumnHeaderSlot>
      )}
    </AppHeader>
  )
}

/* -------------------------------------------------------------------------
 * Body + Row
 * ---------------------------------------------------------------------- */

/**
 * Props the body passes to a custom row renderer. Spread them into
 * `DataTableRow` (or apply them to your own row element) — they carry the
 * index and, when virtualized, the measurement ref and offset that keep the
 * row compatible with the virtualizer.
 */
export interface DataTableRowRenderProps {
  rowIndex: number
  measureRef?: React.Ref<HTMLTableRowElement>
  virtualStart?: number
}

export interface DataTableBodyProps<
  TData extends RowData = RowData,
> extends Omit<HTMLChakraProps<'tbody'>, 'children'> {
  /**
   * Custom row renderer. The body keeps owning the loop, empty state and
   * virtualization; the callback only decides what each row looks like:
   *
   *   <table.Body>
   *     {(row, rowProps) => <table.Row row={row} {...rowProps} />}
   *   </table.Body>
   */
  children?: (
    row: Row<DataTableFeatures, TData>,
    rowProps: DataTableRowRenderProps,
  ) => React.ReactNode
  /**
   * Rendered when the row model is empty.
   */
  emptyState?: React.ReactNode
  /**
   * Rows become clickable and keyboard-interactive when set. Applies to the
   * default row rendering; custom `children` handle their own interaction.
   */
  onRowClick?: (
    row: Row<DataTableFeatures, TData>,
    event:
      | React.MouseEvent<HTMLTableRowElement>
      | React.KeyboardEvent<HTMLTableRowElement>,
  ) => void
  /**
   * Renders an extra full-width row below rows where `getIsExpanded()` is
   * true. Not supported in combination with row virtualization.
   */
  renderExpandedRow?: (row: Row<DataTableFeatures, TData>) => React.ReactNode
}

export function DataTableBody<TData extends RowData = RowData>(
  props: DataTableBodyProps<TData>,
) {
  const table = useTableInstance<TData>()

  return (
    <table.Subscribe
      selector={(state) => ({
        cellSelection: state.cellSelection,
        columnFilters: state.columnFilters,
        columnPinning: state.columnPinning,
        columnVisibility: state.columnVisibility,
        expanded: state.expanded,
        globalFilter: state.globalFilter,
        grouping: state.grouping,
        pagination: state.pagination,
        rowSelection: state.rowSelection,
        sorting: state.sorting,
      })}
    >
      {() => <BodyImpl<TData> {...props} />}
    </table.Subscribe>
  )
}

function BodyImpl<TData extends RowData = RowData>(
  props: DataTableBodyProps<TData>,
) {
  const {
    children,
    emptyState,
    onRowClick,
    renderExpandedRow,
    style,
    ...rest
  } = props
  const table = useTableInstance<TData>()
  const { rowVirtualizer } = useDataTableVirtualizerContext()
  const rows = table.getRowModel().rows

  if (!rows.length) {
    return (
      <TableBodySlot role="rowgroup" {...rest}>
        <TableRowSlot role="row">
          <chakra.td display="flex" flex="1" minWidth="0" role="cell">
            <TableEmptySlot>{emptyState ?? 'No results'}</TableEmptySlot>
          </chakra.td>
        </TableRowSlot>
      </TableBodySlot>
    )
  }

  if (rowVirtualizer) {
    const virtualRows = rowVirtualizer.getVirtualItems()

    return (
      <TableBodySlot
        role="rowgroup"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          // Absolute rows keep the tbody from getting an intrinsic width, so
          // span the table (grow layout) with the columns' total width as
          // the floor (horizontal scrolling).
          minWidth: 'calc(var(--dt-table-width) * 1px)',
          position: 'relative',
          width: '100%',
          ...style,
        }}
        {...rest}
      >
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index]

          if (!row) {
            return null
          }

          if (children) {
            return (
              <React.Fragment key={row.id}>
                {children(row, {
                  measureRef: rowVirtualizer.measureElement,
                  rowIndex: virtualRow.index,
                  virtualStart: virtualRow.start,
                })}
              </React.Fragment>
            )
          }

          return (
            <DataTableRow
              key={row.id}
              measureRef={rowVirtualizer.measureElement}
              onRowClick={onRowClick}
              row={row}
              rowIndex={virtualRow.index}
              virtualStart={virtualRow.start}
            />
          )
        })}
      </TableBodySlot>
    )
  }

  return (
    <TableBodySlot role="rowgroup" style={style} {...rest}>
      {rows.map((row, index) => (
        <React.Fragment key={row.id}>
          {children ? (
            children(row, { rowIndex: index })
          ) : (
            <DataTableRow onRowClick={onRowClick} row={row} rowIndex={index} />
          )}
          {renderExpandedRow && row.getIsExpanded() ? (
            <TableRowSlot data-expanded-content role="row">
              <chakra.td display="flex" flex="1" minWidth="0" role="cell">
                {renderExpandedRow(row)}
              </chakra.td>
            </TableRowSlot>
          ) : null}
        </React.Fragment>
      ))}
    </TableBodySlot>
  )
}

export interface DataTableRowProps<
  TData extends RowData = RowData,
> extends Omit<HTMLChakraProps<'tr'>, 'children'> {
  row: Row<DataTableFeatures, TData>
  rowIndex: number
  interactive?: boolean
  measureRef?: React.Ref<HTMLTableRowElement>
  onRowClick?: DataTableBodyProps<TData>['onRowClick']
  /**
   * Offset from the top of the body in pixels. Set by the virtualized body;
   * switches the row to absolute positioning.
   */
  virtualStart?: number
}

export function DataTableRow<TData extends RowData = RowData>(
  props: DataTableRowProps<TData>,
) {
  const {
    interactive,
    measureRef,
    onRowClick,
    row,
    rowIndex,
    style,
    virtualStart,
    ...rest
  } = props
  const table = useTableInstance<TData>()
  const isInteractive = interactive ?? Boolean(onRowClick)
  const sections = useColumnSections(
    row.getVisibleCells() as unknown as Array<AnyCell>,
  )

  return (
    <TableRowSlot
      ref={measureRef}
      aria-rowindex={
        virtualStart != null
          ? rowIndex + 1 + table.getHeaderGroups().length
          : undefined
      }
      aria-selected={row.getIsSelected() || undefined}
      data-index={rowIndex}
      data-interactive={dataAttr(isInteractive)}
      data-odd={dataAttr(rowIndex % 2 === 1)}
      data-selected={dataAttr(row.getIsSelected())}
      role="row"
      tabIndex={isInteractive ? 0 : undefined}
      onClick={(event) => onRowClick?.(row, event)}
      onKeyDown={(event) => {
        if (
          onRowClick &&
          event.target === event.currentTarget &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault()
          onRowClick(row, event)
        }
      }}
      style={{
        ...(virtualStart != null
          ? {
              left: 0,
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualStart}px)`,
              width: '100%',
            }
          : undefined),
        ...style,
      }}
      {...rest}
    >
      {sections.start.map((cell) => (
        <DataTableCell cell={cell} key={cell.id} />
      ))}
      <ColumnSpacer width={sections.paddingStart} />
      {sections.center.map((cell) => (
        <DataTableCell cell={cell} key={cell.id} />
      ))}
      <ColumnSpacer width={sections.paddingEnd} />
      {sections.end.map((cell) => (
        <DataTableCell cell={cell} key={cell.id} />
      ))}
    </TableRowSlot>
  )
}

export interface DataTableCellProps<TData extends RowData = RowData> {
  cell: Cell<DataTableFeatures, TData, unknown>
}

/**
 * A single body cell: renders the column def's cell template inside a `td`
 * carrying the column's size variables and pinning attributes. Use it when
 * composing custom rows so cells stay aligned, pinnable and
 * virtualization-compatible.
 */
export function DataTableCell<TData extends RowData = RowData>(
  props: DataTableCellProps<TData>,
) {
  const cell = props.cell as unknown as AnyCell
  const table = useTableInstance()
  const { AppCell } = table
  const meta = cell.column.columnDef.meta
  const pinned = getPinnedProps(table, cell.column)

  // Spreadsheet-style cell selection (opt-in via `enableCellSelection`).
  // The feature supplies the drag handlers; the selection outline is drawn
  // from the edge flags so only boundary cells paint a border.
  const selectable = cell.getCanSelect()
  const selected = selectable && cell.getIsSelected()
  const edges = selected ? cell.getSelectionEdges() : undefined
  const edgeShadow = edges
    ? [
        edges.top && 'inset 0 1px 0 0 var(--dt-selection-border)',
        edges.bottom && 'inset 0 -1px 0 0 var(--dt-selection-border)',
        edges.left && 'inset 1px 0 0 0 var(--dt-selection-border)',
        edges.right && 'inset -1px 0 0 0 var(--dt-selection-border)',
      ]
        .filter(Boolean)
        .join(', ') || undefined
    : undefined

  return (
    <AppCell cell={cell}>
      {(boundCell) => (
        <TableCellSlot
          data-cell-focused={dataAttr(selectable && cell.getIsFocused())}
          data-cell-selectable={dataAttr(selectable)}
          data-cell-selected={dataAttr(selected)}
          data-is-numeric={meta?.isNumeric || undefined}
          role="cell"
          tabIndex={selectable ? cell.getTabIndex() : undefined}
          style={{
            ...getColumnSizeStyle(cell.column),
            ...pinned.style,
            ...(edgeShadow ? { boxShadow: edgeShadow } : undefined),
          }}
          onMouseDown={
            selectable
              ? (event) => cell.getSelectionStartHandler()(event)
              : undefined
          }
          onMouseEnter={
            selectable
              ? (event) => cell.getSelectionExtendHandler()(event)
              : undefined
          }
          {...pinned.attrs}
        >
          <boundCell.FlexRender />
        </TableCellSlot>
      )}
    </AppCell>
  )
}

/* -------------------------------------------------------------------------
 * Footer
 * ---------------------------------------------------------------------- */

export interface DataTableFooterProps extends HTMLChakraProps<'tfoot'> {
  /**
   * Keeps the footer visible while the body scrolls. Enabled by default.
   */
  sticky?: boolean
}

/**
 * Renders the column `footer` templates, e.g. for totals. Nothing is
 * rendered unless at least one column defines a `footer`:
 *
 *   columnHelper.accessor('mrr', {
 *     footer: ({ table }) => <PageTotal rows={table.getRowModel().rows} />,
 *   })
 */
export function DataTableFooter(props: DataTableFooterProps) {
  const table = useTableInstance()

  return (
    <table.Subscribe
      selector={(state) => ({
        columnFilters: state.columnFilters,
        columnPinning: state.columnPinning,
        columnVisibility: state.columnVisibility,
        globalFilter: state.globalFilter,
        grouping: state.grouping,
        pagination: state.pagination,
        sorting: state.sorting,
      })}
    >
      {() => <FooterImpl {...props} />}
    </table.Subscribe>
  )
}

function FooterImpl(props: DataTableFooterProps) {
  const { sticky = true, ...rest } = props
  const table = useTableInstance()
  const footerGroups = table.getFooterGroups()

  const hasFooter = footerGroups.some((footerGroup) =>
    footerGroup.headers.some(
      (header) =>
        !header.isPlaceholder && header.column.columnDef.footer != null,
    ),
  )

  if (!hasFooter) {
    return null
  }

  return (
    <TableFooterSlot data-sticky={dataAttr(sticky)} role="rowgroup" {...rest}>
      {footerGroups.map((footerGroup) => (
        <FooterRow
          key={footerGroup.id}
          headers={footerGroup.headers}
          windowed={footerGroups.length === 1}
        />
      ))}
    </TableFooterSlot>
  )
}

function FooterRow(props: { headers: Array<AnyHeader>; windowed: boolean }) {
  const sections = useColumnSections(props.windowed ? props.headers : [])
  const { start, center, end, paddingStart, paddingEnd } = props.windowed
    ? sections
    : {
        center: props.headers,
        end: [],
        paddingEnd: 0,
        paddingStart: 0,
        start: [],
      }

  return (
    <TableRowSlot role="row">
      {start.map((header) => (
        <FooterCell header={header} key={header.id} />
      ))}
      <ColumnSpacer as="th" width={paddingStart} />
      {center.map((header) => (
        <FooterCell header={header} key={header.id} />
      ))}
      <ColumnSpacer as="th" width={paddingEnd} />
      {end.map((header) => (
        <FooterCell header={header} key={header.id} />
      ))}
    </TableRowSlot>
  )
}

function FooterCell(props: { header: AnyHeader }) {
  const { header } = props
  const table = useTableInstance()
  const { AppFooter } = table
  const column = header.column
  const meta = column.columnDef.meta
  const pinned = getPinnedProps(table, column)

  return (
    <AppFooter header={header}>
      {(boundFooter) => (
        <TableColumnHeaderSlot
          data-is-numeric={meta?.isNumeric || undefined}
          role="cell"
          style={{ ...getColumnSizeStyle(column), ...pinned.style }}
          {...pinned.attrs}
        >
          {header.isPlaceholder ? null : <boundFooter.FlexRender />}
        </TableColumnHeaderSlot>
      )}
    </AppFooter>
  )
}
