'use client'

import { Stack, Text } from '@chakra-ui/react'
import {
  SelectionHeader,
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'

interface Account {
  id: string
  company: string
  domain: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  status: 'Active' | 'Trial' | 'Paused'
  mrr: number
  renewal: string
  owner: string
}

const companies = [
  'Northstar Labs',
  'Kite & Harbor',
  'Arcwell Health',
  'Fieldnote Studio',
  'Copperline',
  'Daybreak Energy',
]

const plans = ['Enterprise', 'Growth', 'Starter'] as const
const statuses = ['Active', 'Trial', 'Paused'] as const
const owners = ['Maya Chen', 'Noah Williams', 'Priya Shah', 'Jon Bell']

const accounts: Account[] = Array.from({ length: 90 }, (_, index) => {
  const name = companies[index % companies.length]!
  const batch = Math.floor(index / companies.length) + 1
  return {
    id: `acc_${String(index + 1).padStart(3, '0')}`,
    company: batch === 1 ? name : `${name} ${batch}`,
    domain: `${name.toLowerCase().replace(/[^a-z]/g, '')}.test`,
    plan: plans[index % plans.length]!,
    status: statuses[index % statuses.length]!,
    mrr: 800 + ((index * 137) % 18000),
    renewal: `2026-${String((index % 12) + 1).padStart(2, '0')}-18`,
    owner: owners[index % owners.length]!,
  }
})

const statusPalette = (value: string) =>
  value === 'Active' ? 'green' : value === 'Trial' ? 'blue' : 'orange'

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'selection',
    header: () => <SelectionHeader />,
    cell: ({ cell }) => <cell.SelectionCell />,
    enableCellSelection: false,
    enableResizing: false,
    enableSorting: false,
    maxSize: 40,
    minSize: 40,
    size: 40,
  }),
  columnHelper.accessor('company', {
    header: 'Account',
    cell: ({ row }) => (
      <Stack gap="0" minWidth="0">
        <Text fontWeight="medium" overflow="hidden" textOverflow="ellipsis">
          {row.original.company}
        </Text>
        <Text
          color="fg.muted"
          overflow="hidden"
          textOverflow="ellipsis"
          textStyle="xs"
        >
          {row.original.domain}
        </Text>
      </Stack>
    ),
    size: 220,
    sortFn: 'text',
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    cell: ({ cell }) => <cell.TextCell />,
    size: 120,
    sortFn: 'text',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.BadgeCell colorPalette={statusPalette} />,
    size: 110,
    sortFn: 'text',
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
    size: 110,
    sortDescFirst: true,
  }),
  columnHelper.accessor('renewal', {
    header: 'Renewal',
    cell: ({ cell }) => <cell.DateCell />,
    size: 140,
    sortFn: 'text',
  }),
  columnHelper.accessor('owner', {
    header: 'Owner',
    cell: ({ cell }) => <cell.TextCell />,
    size: 150,
    sortFn: 'text',
  }),
])

export function DataTablePagination() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 15 },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="40rem">
          <table.Table aria-label="Accounts" />
        </table.ScrollArea>
        <table.Pagination />
      </table.Root>
    </table.Provider>
  )
}
