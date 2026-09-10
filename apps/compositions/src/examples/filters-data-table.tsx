'use client'

import { Box, Stack } from '@chakra-ui/react'
import { conditionsGlobalFilter } from '@saas-js/conditions-tanstack-table'
import {
  type DataTableFeatures,
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'
import { createFilters } from 'compositions/ui/filters'
import { LuBuilding2, LuCircleDollarSign, LuLayers } from 'react-icons/lu'
import { z } from 'zod'

interface Account {
  id: string
  company: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  status: 'Active' | 'Trial' | 'Paused'
  mrr: number
}

const accounts: Account[] = [
  {
    id: '1',
    company: 'Northstar Labs',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 12400,
  },
  {
    id: '2',
    company: 'Kite & Harbor',
    plan: 'Growth',
    status: 'Trial',
    mrr: 3200,
  },
  {
    id: '3',
    company: 'Arcwell Health',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 9800,
  },
  {
    id: '4',
    company: 'Fieldnote Studio',
    plan: 'Starter',
    status: 'Paused',
    mrr: 890,
  },
  {
    id: '5',
    company: 'Copperline',
    plan: 'Growth',
    status: 'Active',
    mrr: 4700,
  },
  {
    id: '6',
    company: 'Daybreak Energy',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 15100,
  },
]

const statusDot = (color: string) => (
  <Box boxSize="2" rounded="full" bg={color} />
)

const accountFilters = createFilters({
  fields: {
    status: {
      type: 'enum',
      label: 'Status',
      schema: z.enum(['Active', 'Trial', 'Paused']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      meta: { icon: statusDot('border.emphasized'), pluralLabel: 'statuses' },
      options: [
        {
          value: 'Active',
          label: 'Active',
          meta: { icon: statusDot('green.solid') },
        },
        {
          value: 'Trial',
          label: 'Trial',
          meta: { icon: statusDot('blue.solid') },
        },
        {
          value: 'Paused',
          label: 'Paused',
          meta: { icon: statusDot('gray.solid') },
        },
      ],
    },
    plan: {
      type: 'enum',
      label: 'Plan',
      schema: z.enum(['Enterprise', 'Growth', 'Starter']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      meta: { icon: <LuLayers />, pluralLabel: 'plans' },
      options: [
        { value: 'Enterprise', label: 'Enterprise' },
        { value: 'Growth', label: 'Growth' },
        { value: 'Starter', label: 'Starter' },
      ],
    },
    company: {
      type: 'string',
      label: 'Company',
      schema: z.string().min(1),
      operators: ['contains', 'equals', 'startsWith'],
      defaultOperator: 'contains',
      meta: { icon: <LuBuilding2 /> },
    },
    mrr: {
      type: 'number',
      label: 'MRR',
      schema: z.coerce.number().min(0),
      operators: ['equals', 'gte', 'lte', 'between'],
      defaultOperator: 'gte',
      meta: { icon: <LuCircleDollarSign /> },
    },
  },
})

// Module scope keeps the filter function stable across renders.
const filterOptions = conditionsGlobalFilter<DataTableFeatures, Account>(
  accountFilters.definition,
)

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
  columnHelper.accessor('company', {
    header: 'Account',
    cell: ({ cell }) => <cell.TextCell />,
    size: 220,
    sortFn: 'text',
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    cell: ({ cell }) => <cell.TextCell />,
    size: 140,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.TextCell />,
    size: 140,
  }),
  columnHelper.accessor('mrr', {
    header: 'MRR',
    cell: ({ cell }) => (
      <cell.NumberCell
        currency="USD"
        maximumFractionDigits={0}
        style="currency"
      />
    ),
    meta: { isNumeric: true },
    size: 140,
  }),
])

function AccountsTable() {
  const conditions = accountFilters.useConditionsContext()
  const query = conditions.useValue()
  const isEmpty = conditions.useIsEmpty()

  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    ...filterOptions,
    state: {
      // An empty query matches every row; leaving the state undefined also
      // keeps the empty state from counting it as an active filter.
      globalFilter: isEmpty ? undefined : query,
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea>
          <table.Table aria-label="Accounts">
            <table.Header />
            <table.Body
              emptyState={
                <table.NoResults
                  resource="accounts"
                  onReset={() => conditions.actions.clear()}
                />
              }
            />
          </table.Table>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

export function FiltersDataTable() {
  const conditions = accountFilters.useConditions()

  return (
    <conditions.Root>
      <Stack gap="3" width="full">
        <conditions.FilterBar />
        <AccountsTable />
      </Stack>
    </conditions.Root>
  )
}
