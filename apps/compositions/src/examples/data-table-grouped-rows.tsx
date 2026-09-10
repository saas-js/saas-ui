'use client'

import { FormatNumber, HStack, Text } from '@chakra-ui/react'
import {
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'

interface Account {
  id: string
  company: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  status: 'Active' | 'Trial' | 'Paused'
  mrr: number
}

const companies = [
  'Northstar Labs',
  'Kite & Harbor',
  'Arcwell Health',
  'Fieldnote Studio',
  'Copperline',
  'Daybreak Energy',
  'Orbit Commerce',
  'Tandem Security',
  'Goodweather',
  'Lattice Grove',
  'Signal House',
  'Sable Finance',
]

const plans = ['Enterprise', 'Growth', 'Starter'] as const
const statuses = ['Active', 'Trial', 'Paused'] as const

const accounts: Account[] = companies.map((company, index) => ({
  id: `acc_${index + 1}`,
  company,
  plan: plans[index % plans.length]!,
  status: statuses[index % statuses.length]!,
  mrr: 800 + ((index * 1370) % 18000),
}))

const statusPalette = (value: string) =>
  value === 'Active' ? 'green' : value === 'Trial' ? 'blue' : 'orange'

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
  columnHelper.accessor('plan', {
    header: 'Plan',
    cell: ({ cell, row }) =>
      cell.getIsGrouped() ? (
        <HStack gap="1" minWidth="0">
          <cell.ExpanderCell />
          <Text fontWeight="medium">{String(cell.getValue())}</Text>
          <Text color="fg.muted" textStyle="xs">
            ({row.subRows.length})
          </Text>
        </HStack>
      ) : (
        <cell.TextCell />
      ),
    size: 200,
  }),
  columnHelper.accessor('company', {
    header: 'Account',
    // Cells without an aggregationFn render their regular template on group
    // rows, so blank them there explicitly.
    cell: ({ cell, row }) => (row.getIsGrouped() ? null : <cell.TextCell />),
    size: 220,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell, row }) =>
      row.getIsGrouped() ? null : (
        <cell.BadgeCell colorPalette={statusPalette} />
      ),
    size: 120,
  }),
  columnHelper.accessor('mrr', {
    header: 'MRR',
    aggregationFn: 'sum',
    // The default aggregatedCell renders the raw value; format the sum the
    // same way as the leaf cells. (No bound components here — the column
    // helper only augments cell/header/footer contexts.)
    aggregatedCell: ({ getValue }) => (
      <Text fontWeight="medium" whiteSpace="nowrap">
        <FormatNumber
          currency="USD"
          maximumFractionDigits={0}
          style="currency"
          value={getValue<number>() ?? 0}
        />
      </Text>
    ),
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

export function DataTableGroupedRows() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      expanded: true,
      grouping: ['plan'],
      pagination: { pageIndex: 0, pageSize: 50 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="40rem">
          <table.Table aria-label="Accounts grouped by plan" />
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
