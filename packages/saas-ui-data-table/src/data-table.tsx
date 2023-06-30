import * as React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  Table as TableInstance,
  flexRender,
  ColumnDef,
  ColumnSort,
  TableOptions,
  Header,
  Cell,
} from '@tanstack/react-table'
import {
  chakra,
  forwardRef,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  ThemingProps,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

import { ChevronDownIcon, ChevronUpIcon, Link } from '@saas-ui/core'

export type { TableInstance, ColumnDef }

export interface DataTableProps<Data extends object>
  extends Omit<TableOptions<Data>, 'getCoreRowModel'>,
    ThemingProps<'Table'> {
  /**
   * The TableInstance reference
   */
  instanceRef?: React.Ref<TableInstance<Data>>
  /**
   * Enable sorting on all columns
   */
  isSortable?: boolean
  /**
   * Enable row selection
   */
  isSelectable?: boolean
  /**
   * Triggers whenever the row selection changes.
   * @params rows The selected row id's
   */
  onSelectedRowsChange?: (rows: Array<string>) => void
  /**
   * Triggers when sort changed.
   * Use incombination with `manualSortBy` to enable remote sorting.
   */
  onSortChange?: (columns: ColumnSort[]) => void
  /**
   * The table class name attribute
   */
  className?: string
}

export const DataTable = React.forwardRef(
  <Data extends object>(
    props: DataTableProps<Data>,
    ref: React.ForwardedRef<HTMLTableElement>
  ) => {
    const {
      instanceRef,
      columns,
      isSortable,
      isSelectable,
      onSelectedRowsChange,
      onSortChange,
      colorScheme,
      size,
      variant,
      className,
      ...rest
    } = props

    const instance = useReactTable<Data>({
      columns: React.useMemo(() => {
        return getSelectionColumn<Data>(isSelectable).concat(
          columns?.map((column: any) => {
            if (!column.accessorKey) {
              column.accessorKey = column.accessor || column.id
            }
            if (!column.header && column.Header) {
              column.header = column.Header
            }
            if (!column.cell && column.Cell) {
              column.cell = column.Cell
            } else if (!column.cell) {
              column.cell = DataTableCell
            }
            return column
          })
        )
      }, []),
      enableRowSelection: isSelectable,
      getSortedRowModel: isSortable ? getSortedRowModel() : undefined,
      ...rest,
      getCoreRowModel: getCoreRowModel(),
    })

    // This exposes the useTable api through the instanceRef
    React.useImperativeHandle(instanceRef, () => instance, [instanceRef])

    const state = instance.getState()

    React.useEffect(() => {
      onSelectedRowsChange?.(Object.keys(state.rowSelection))
    }, [onSelectedRowsChange, state.rowSelection, instance])

    React.useEffect(() => {
      onSortChange?.(state.sorting)
    }, [onSortChange, state.sorting])

    return (
      <Table
        ref={ref}
        sx={{ 'tr:last-child td': { border: 0 } }}
        className={cx('sui-data-table', className)}
        colorScheme={colorScheme}
        size={size}
        variant={variant}
      >
        <Thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <DataTableHeader
                  key={header.id}
                  header={header}
                  isSortable={isSortable}
                />
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {instance.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const meta = (cell.column.columnDef.meta || {}) as any
                  return (
                    <Td
                      key={cell.id}
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      isNumeric={meta.isNumeric}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
  }
) as (<Data extends object>(
  props: DataTableProps<Data> & {
    ref?: React.ForwardedRef<HTMLTableElement>
  }
) => React.ReactElement) & { displayName?: string }

DataTable.displayName = 'DataTable'

export interface DataTableSortProps<Data extends object, TValue> {
  header: Header<Data, TValue>
}
export const DataTableSort = <Data extends object, TValue>(
  props: DataTableSortProps<Data, TValue>
) => {
  const { header, ...rest } = props

  const sorterStyles = {
    ms: 2,
  }

  if (header.id === 'selection') {
    return null
  }

  const sorted = header.column.getIsSorted()

  return (
    <chakra.span __css={sorterStyles} {...rest}>
      {sorted ? (
        sorted === 'desc' ? (
          <ChevronDownIcon aria-label="sorted descending" />
        ) : (
          <ChevronUpIcon aria-label="sorted ascending" />
        )
      ) : (
        ''
      )}
    </chakra.span>
  )
}

DataTableSort.displayName = 'DataTableSort'

export interface DataTableHeaderProps<Data extends object, TValue> {
  header: Header<Data, TValue>
  isSortable?: boolean
}
export const DataTableHeader = <Data extends object, TValue>(
  props: DataTableHeaderProps<Data, TValue>
) => {
  const { header, isSortable, ...rest } = props

  let headerProps = {}

  const enabled = !header.column.getCanSort() ? false : isSortable

  if (enabled) {
    headerProps = {
      className: 'saas-data-table__sortable',
      userSelect: 'none',
      cursor: 'pointer',
      onClick: header.column.getToggleSortingHandler(),
    }
  }

  const meta = (header.column.columnDef.meta || {}) as any
  const size = header.column.columnDef.size
  return (
    <Th
      colSpan={header.colSpan}
      textTransform="none"
      width={size && `${size}px`}
      isNumeric={meta.isNumeric}
      {...headerProps}
      {...rest}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {enabled && <DataTableSort header={header} />}
    </Th>
  )
}

DataTableHeader.displayName = 'DataTableHeader'

const getResult = <Data extends object>(
  fn: (row: Data) => string,
  params: Data
): string => {
  if (typeof fn === 'function') {
    return fn(params)
  }
  return fn
}

export const DataTableCell = <Data extends object, TValue>(
  props: Cell<Data, TValue>
) => {
  const { column, row, getValue } = props

  const meta = (column.columnDef.meta || {}) as any

  if (meta.href) {
    const href = getResult(meta.href, row.original)
    return <Link href={href}>{getValue<string>()}</Link>
  }
  return getValue() || null
}

DataTableCell.displayName = 'DataTableCell'

const DataTableCheckbox = forwardRef((props, ref) => {
  return (
    <chakra.div>
      <Checkbox ref={ref} {...props} />
    </chakra.div>
  )
})

DataTableCheckbox.displayName = 'DataTableCheckbox'

const getSelectionColumn = <Data extends object>(enabled?: boolean) => {
  return enabled
    ? [
        {
          id: 'selection',
          size: 1,
          header: ({ table }) => (
            <DataTableCheckbox
              isChecked={table.getIsAllRowsSelected()}
              isIndeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label={
                table.getIsAllRowsSelected()
                  ? 'Deselect all rows'
                  : 'Select all rows'
              }
            />
          ),
          cell: ({ row }) => (
            <DataTableCheckbox
              isChecked={row.getIsSelected()}
              isIndeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
              aria-label={row.getIsSelected() ? 'Deselect row' : 'Select row'}
            />
          ),
        } as ColumnDef<Data>,
      ]
    : []
}
