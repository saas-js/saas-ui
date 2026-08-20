'use client'

import { Button, EmptyState, HStack } from '@chakra-ui/react'

import { useTableInstance } from './data-table.context'

export interface DataTableNoResultsProps extends Omit<
  EmptyState.RootProps,
  'title'
> {
  title?: string
  /**
   * The name of the resource shown in the default messages, e.g. `contacts`.
   */
  resource?: string
  clearLabel?: string
  /**
   * Called instead of the default reset (which clears the table's global and
   * column filters). Wire this up when filters are managed outside the table.
   */
  onReset?(): void
}

/**
 * A filter-aware empty state for the table body. The message reflects the
 * active global filter or column filter count, with a button to clear them:
 *
 *   <table.Body emptyState={<table.NoResults resource="contacts" />} />
 */
export function DataTableNoResults(props: DataTableNoResultsProps) {
  const table = useTableInstance()

  return (
    <table.Subscribe
      selector={(state) => ({
        columnFilters: state.columnFilters,
        globalFilter: state.globalFilter,
      })}
    >
      {({ columnFilters, globalFilter }) => {
        // A non-string global filter (e.g. a condition query object from an
        // adapter) can't be echoed in the message, but still counts as an
        // active filter.
        const opaqueGlobalFilter =
          globalFilter != null && typeof globalFilter !== 'string'
        return (
          <NoResultsImpl
            {...props}
            filterCount={columnFilters.length + (opaqueGlobalFilter ? 1 : 0)}
            globalFilter={
              typeof globalFilter === 'string' ? globalFilter : undefined
            }
          />
        )
      }}
    </table.Subscribe>
  )
}

function NoResultsImpl(
  props: DataTableNoResultsProps & {
    filterCount: number
    globalFilter?: string
  },
) {
  const table = useTableInstance()
  const {
    filterCount,
    globalFilter,
    resource = 'results',
    title = globalFilter
      ? `No ${resource} found for "${globalFilter}"`
      : filterCount
        ? `No ${resource} matching ${filterCount} ${
            filterCount === 1 ? 'filter' : 'filters'
          }.`
        : `No ${resource}.`,
    clearLabel = 'Clear filters',
    onReset,
    ...rest
  } = props

  const handleReset =
    onReset ??
    (() => {
      table.resetColumnFilters()
      table.setGlobalFilter('')
    })

  return (
    <EmptyState.Root {...rest}>
      <EmptyState.Content>
        <EmptyState.Description>{title}</EmptyState.Description>
        {(filterCount > 0 || globalFilter) && (
          <HStack justifyContent="center">
            <Button onClick={handleReset} size="xs" variant="ghost">
              {clearLabel}
            </Button>
          </HStack>
        )}
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
