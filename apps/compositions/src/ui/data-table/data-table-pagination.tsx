'use client'

import * as React from 'react'

import {
  Combobox,
  type HTMLChakraProps,
  IconButton,
  Portal,
  chakra,
  useFilter,
  useListCollection,
} from '@chakra-ui/react'

import { ChevronLeftIcon } from '../../icons/chevron-left-icon'
import { ChevronRightIcon } from '../../icons/chevron-right-icon'
import { Pagination } from '../pagination/index'
import { useTableInstance } from './data-table.context'
import { DataTablePaginationSlot } from './data-table.primitives'

/**
 * Pagination is composed from parts. The container renders the range and
 * prev/next controls by default; pass children to compose your own:
 *
 *   <table.Pagination>
 *     <table.PaginationRange />
 *     <table.PageSelect />
 *     <table.PaginationNav />
 *   </table.Pagination>
 *
 * or numbered page buttons:
 *
 *   <table.Pagination>
 *     <table.PaginationRange />
 *     <table.PaginationPages />
 *   </table.Pagination>
 */

interface PaginationSlice {
  pageIndex: number
  pageSize: number
}

/**
 * Subscribes a pagination part to the state its output derives from. The
 * pagination slice is passed to children rather than read from
 * `table.state`, which holds whatever slice the table's creator selected.
 */
function PaginationStateSubscriber(props: {
  children: (pagination: PaginationSlice) => React.ReactNode
}) {
  const table = useTableInstance()

  return (
    <table.Subscribe
      selector={(state) => ({
        columnFilters: state.columnFilters,
        globalFilter: state.globalFilter,
        pagination: state.pagination,
      })}
    >
      {({ pagination }) => props.children(pagination)}
    </table.Subscribe>
  )
}

export interface DataTablePaginationProps extends HTMLChakraProps<'div'> {}

export function DataTablePagination(props: DataTablePaginationProps) {
  const { children, ...rest } = props

  return (
    <DataTablePaginationSlot {...rest}>
      {children ?? (
        <>
          <DataTablePaginationRange />
          <DataTablePaginationNav />
        </>
      )}
    </DataTablePaginationSlot>
  )
}

export interface DataTablePaginationRangeProps extends HTMLChakraProps<'span'> {
  /**
   * Formats the visible range. Defaults to `1–10 of 42`.
   */
  formatRange?: (range: {
    start: number
    end: number
    count: number
  }) => React.ReactNode
}

export function DataTablePaginationRange(props: DataTablePaginationRangeProps) {
  const { formatRange, ...rest } = props
  const table = useTableInstance()

  return (
    <PaginationStateSubscriber>
      {({ pageIndex, pageSize }) => {
        const count = table.getRowCount()
        const start = count ? pageIndex * pageSize + 1 : 0
        const end = Math.min((pageIndex + 1) * pageSize, count)

        return (
          <chakra.span {...rest}>
            {formatRange
              ? formatRange({ count, end, start })
              : `${start}–${end} of ${count}`}
          </chakra.span>
        )
      }}
    </PaginationStateSubscriber>
  )
}

export interface DataTablePaginationNavProps extends HTMLChakraProps<'div'> {
  previousPageLabel?: string
  nextPageLabel?: string
}

export function DataTablePaginationNav(props: DataTablePaginationNavProps) {
  const {
    nextPageLabel = 'Next page',
    previousPageLabel = 'Previous page',
    ...rest
  } = props
  const table = useTableInstance()

  return (
    <PaginationStateSubscriber>
      {() => (
        <chakra.div display="flex" gap="2" {...rest}>
          <IconButton
            aria-label={previousPageLabel}
            disabled={!table.getCanPreviousPage()}
            size="xs"
            variant="outline"
            onClick={() => table.previousPage()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label={nextPageLabel}
            disabled={!table.getCanNextPage()}
            size="xs"
            variant="outline"
            onClick={() => table.nextPage()}
          >
            <ChevronRightIcon />
          </IconButton>
        </chakra.div>
      )}
    </PaginationStateSubscriber>
  )
}

export interface DataTablePaginationPagesProps extends Omit<
  React.ComponentProps<typeof Pagination.Root>,
  'count' | 'page' | 'pageSize' | 'onPageChange'
> {}

/**
 * Numbered page buttons with ellipsis, built on the Saas UI pagination
 * component and bound to the table's pagination state.
 */
export function DataTablePaginationPages(props: DataTablePaginationPagesProps) {
  const { siblingCount = 1, size = 'xs', ...rest } = props
  const table = useTableInstance()

  return (
    <PaginationStateSubscriber>
      {({ pageIndex, pageSize }) => (
        <Pagination.Root
          count={table.getRowCount()}
          page={pageIndex + 1}
          pageSize={pageSize}
          siblingCount={siblingCount}
          size={size}
          onPageChange={(details) => table.setPageIndex(details.page - 1)}
          {...rest}
        >
          <chakra.div alignItems="center" display="flex" gap="1">
            <Pagination.PrevButton />
            <Pagination.Items />
            <Pagination.NextButton />
          </chakra.div>
        </Pagination.Root>
      )}
    </PaginationStateSubscriber>
  )
}

export interface DataTablePageSelectProps extends Omit<
  React.ComponentProps<typeof Combobox.Root>,
  'children' | 'collection' | 'defaultValue' | 'onValueChange' | 'value'
> {
  /**
   * Accessible label for the combobox input.
   */
  label?: string
  /**
   * Renders the dropdown in a portal. Disable when the table lives inside a
   * focus-trapped container such as a dialog.
   */
  portalled?: boolean
}

/**
 * A combobox bound to the table's pagination state for jumping straight to
 * a page. Drop it inside `Pagination` next to the other parts.
 */
export function DataTablePageSelect(props: DataTablePageSelectProps) {
  return (
    <PaginationStateSubscriber>
      {(pagination) => <PageSelectImpl {...props} pagination={pagination} />}
    </PaginationStateSubscriber>
  )
}

function PageSelectImpl(
  props: DataTablePageSelectProps & { pagination: PaginationSlice },
) {
  const { label = 'Page', pagination, portalled = true, ...rest } = props
  const table = useTableInstance()
  const pageCount = Math.max(table.getPageCount(), 1)
  const page = pagination.pageIndex + 1

  const { contains } = useFilter({ sensitivity: 'base' })
  const { collection, filter, set } = useListCollection<string>({
    initialItems: [],
    filter: contains,
  })

  React.useEffect(() => {
    set(Array.from({ length: pageCount }, (_, index) => String(index + 1)))
  }, [pageCount, set])

  // The input mirrors the current page, including changes made through the
  // other pagination parts; typing takes over until a page is selected.
  const [inputValue, setInputValue] = React.useState(String(page))
  React.useEffect(() => {
    setInputValue(String(page))
  }, [page])

  const content = (
    <Combobox.Positioner>
      <Combobox.Content minWidth="24" maxHeight="60">
        <Combobox.Empty>—</Combobox.Empty>
        {collection.items.map((item) => (
          <Combobox.Item item={item} key={item}>
            <Combobox.ItemText>{item}</Combobox.ItemText>
            <Combobox.ItemIndicator />
          </Combobox.Item>
        ))}
      </Combobox.Content>
    </Combobox.Positioner>
  )

  return (
    <Combobox.Root
      collection={collection}
      inputBehavior="autohighlight"
      inputValue={inputValue}
      openOnClick
      selectionBehavior="replace"
      size="sm"
      value={[String(page)]}
      width="24"
      onInputValueChange={(details) => {
        setInputValue(details.inputValue)
        filter(details.inputValue)
      }}
      onOpenChange={() => filter('')}
      onValueChange={(details) => {
        const next = Number(details.value[0])
        if (Number.isInteger(next) && next >= 1 && next <= pageCount) {
          table.setPageIndex(next - 1)
        }
      }}
      {...rest}
    >
      <Combobox.Control>
        <Combobox.Input aria-label={label} />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      {portalled ? <Portal>{content}</Portal> : content}
    </Combobox.Root>
  )
}
