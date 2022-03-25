import * as React from 'react'
import {
  useTable,
  useSortBy,
  useRowSelect,
  TableInstance,
  TableOptions,
  CellProps,
  HeaderGroup,
  Hooks,
  IdType,
} from 'react-table'
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
  useStyles,
} from '@chakra-ui/react'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

import { Link } from '@saas-ui/layout'

export type { Column, TableInstance } from 'react-table'

export interface DataTableProps<Data extends object>
  extends TableOptions<Data> {
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
  onSelectedRowsChange?: (rows: IdType<Data>[]) => void
}

export const DataTable = React.forwardRef(
  <Data extends object>(
    props: DataTableProps<Data>,
    ref: React.ForwardedRef<TableInstance<Data>>
  ) => {
    const {
      columns,
      data,
      initialState,
      autoResetHiddenColumns,
      stateReducer,
      useControlledState,
      getSubRows,
      defaultColumn,
      getRowId,
      manualRowSelectKey,
      autoResetSelectedRow,
      isSortable,
      isSelectable,
      onSelectedRowsChange,
      ...rest
    } = props

    const instance = useTable<Data>(
      {
        columns: React.useMemo(() => {
          return columns?.map((column: any) => {
            if (!column.accessor) {
              column.accessor = column.id
            }
            if (!column.Cell) {
              column.Cell = DataTableCell
            }
            return column
          })
        }, []),
        data,
        initialState,
        autoResetHiddenColumns,
        stateReducer,
        useControlledState,
        defaultColumn,
        getSubRows,
        getRowId,
        manualRowSelectKey,
        autoResetSelectedRow,
      },
      useSortBy,
      useRowSelect,
      useCheckboxColumn(isSelectable)
    )

    // This exposes the useTable api through the forwareded ref
    React.useImperativeHandle(ref, () => instance, [ref])

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
    } = instance

    React.useEffect(() => {
      onSelectedRowsChange?.(Object.keys(state.selectedRowIds))
    }, [onSelectedRowsChange, state.selectedRowIds])

    return (
      <Table
        {...getTableProps()}
        sx={{ 'tr:last-child td': { border: 0 } }}
        {...rest}
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <DataTableHeader
                  key={column.id}
                  column={column}
                  isSortable={isSortable}
                />
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                      isTruncated
                    >
                      {cell.render('Cell')}
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
) as <Data extends object>(
  props: DataTableProps<Data> & {
    ref?: React.ForwardedRef<TableInstance<Data>>
  }
) => React.ReactElement

export interface DataTableSortProps<Data extends object> {
  column: HeaderGroup<Data>
}
export const DataTableSort = <Data extends object>(
  props: DataTableSortProps<Data>
) => {
  const { column, ...rest } = props

  const styles = useStyles()

  const sorterStyles = {
    ms: 2,
    ...styles.sorter,
  }

  if (column.id === 'selection') {
    return null
  }

  return (
    <chakra.span __css={sorterStyles} {...rest}>
      {column.isSorted ? (
        column.isSortedDesc ? (
          <TriangleDownIcon aria-label="sorted descending" />
        ) : (
          <TriangleUpIcon aria-label="sorted ascending" />
        )
      ) : (
        ''
      )}
    </chakra.span>
  )
}

export interface DataTableHeaderProps<Data extends object> {
  column: HeaderGroup<Data>
  isSortable?: boolean
}
export const DataTableHeader = <Data extends object>(
  props: DataTableHeaderProps<Data>
) => {
  const { column, isSortable, ...rest } = props

  let headerProps = {}

  if (isSortable) {
    headerProps = {
      ...column.getSortByToggleProps(),
      className: 'chakra-table-sortable',
    }
  }

  return (
    <Th
      {...column.getHeaderProps(headerProps)}
      textTransform="none"
      width={column.width}
      isNumeric={column.isNumeric}
      {...rest}
    >
      {column.render('Header')}
      {isSortable && <DataTableSort column={column} />}
    </Th>
  )
}

const getResult = (fn: any, params: any) => {
  if (typeof fn === 'function') {
    return fn(params)
  }
  return fn
}

export const DataTableCell = <Data extends object>({
  value,
  column,
  row,
}: CellProps<Data>) => {
  if (column.href) {
    const href = getResult(column.href, row.original) as string
    return <Link href={href}>{value}</Link>
  }
  return value || null
}

const DataTableCheckbox = forwardRef((props, ref) => {
  const { checked, indeterminate, ...rest } = props

  return (
    <chakra.div>
      <Checkbox
        ref={ref}
        isChecked={checked}
        isIndeterminate={indeterminate}
        {...rest}
      />
    </chakra.div>
  )
})

const useCheckboxColumn = <Data extends object>(enabled?: boolean) => {
  return (hooks: Hooks<Data>) => {
    enabled &&
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          width: '1%',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <DataTableCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: CellProps<Data>) => (
            <DataTableCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ])
  }
}
