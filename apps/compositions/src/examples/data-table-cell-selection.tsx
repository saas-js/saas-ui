'use client'

import { Stack, Text } from '@chakra-ui/react'
import {
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
  'Orbit Commerce',
  'Tandem Security',
  'Goodweather',
  'Lattice Grove',
]

const plans = ['Enterprise', 'Growth', 'Starter'] as const
const statuses = ['Active', 'Trial', 'Paused'] as const
const owners = ['Maya Chen', 'Noah Williams', 'Priya Shah', 'Jon Bell']

const accounts: Account[] = companies.map((company, index) => ({
  id: `acc_${index + 1}`,
  company,
  domain: `${company.toLowerCase().replace(/[^a-z]/g, '')}.test`,
  plan: plans[index % plans.length]!,
  status: statuses[index % statuses.length]!,
  mrr: 800 + ((index * 1370) % 18000),
  renewal: `2026-${String((index % 12) + 1).padStart(2, '0')}-18`,
  owner: owners[index % owners.length]!,
}))

const statusPalette = (value: string) =>
  value === 'Active' ? 'green' : value === 'Trial' ? 'blue' : 'orange'

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
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
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.BadgeCell colorPalette={statusPalette} />,
    size: 110,
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
  }),
  columnHelper.accessor('renewal', {
    header: 'Renewal',
    cell: ({ cell }) => <cell.DateCell />,
    size: 140,
  }),
  columnHelper.accessor('owner', {
    header: 'Owner',
    cell: ({ cell }) => <cell.TextCell />,
    size: 150,
  }),
])

/**
 * Spreadsheet-style cell selection: click a cell, drag to extend the range,
 * shift-click to extend from the anchor, cmd/ctrl-click to add or subtract
 * ranges. Opt in with `enableCellSelection`.
 */
export function DataTableCellSelection() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableCellSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 18 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts" />
        </table.ScrollArea>
        <table.Pagination>
          <table.Subscribe selector={(state) => state.cellSelection}>
            {() => (
              <Text textStyle="sm">
                {table.getSelectedCellCount()} cells selected
              </Text>
            )}
          </table.Subscribe>
        </table.Pagination>
      </table.Root>
    </table.Provider>
  )
}
