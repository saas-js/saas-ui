'use client'

import { Box, HStack, Text } from '@chakra-ui/react'
import {
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'

interface Account {
  id: string
  company: string
  domain: string
  status: 'Active' | 'Trial' | 'Paused'
  mrr: number
  owner: string
  subsidiaries?: Account[]
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
]

const statuses = ['Active', 'Trial', 'Paused'] as const
const owners = ['Maya Chen', 'Noah Williams', 'Priya Shah', 'Jon Bell']
const regions = ['EU', 'US', 'APAC'] as const

const accounts: Account[] = companies.map((name, index) => {
  const domain = `${name.toLowerCase().replace(/[^a-z]/g, '')}.test`
  const mrr = 800 + ((index * 1370) % 18000)
  return {
    id: `acc_${index + 1}`,
    company: name,
    domain,
    status: statuses[index % statuses.length]!,
    mrr,
    owner: owners[index % owners.length]!,
    subsidiaries: regions.slice(0, (index % 3) + 1).map((region, sub) => ({
      id: `acc_${index + 1}_${region}`,
      company: `${name} ${region}`,
      domain: `${region.toLowerCase()}.${domain}`,
      status: statuses[(index + sub) % statuses.length]!,
      mrr: Math.round(mrr / ((index % 3) + 2)),
      owner: owners[(index + sub + 1) % owners.length]!,
    })),
  }
})

const statusPalette = (value: string) =>
  value === 'Active' ? 'green' : value === 'Trial' ? 'blue' : 'orange'

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
  columnHelper.accessor('company', {
    header: 'Account',
    cell: ({ cell, row }) => (
      <HStack gap="1" minWidth="0" paddingStart={`${row.depth * 1.5}rem`}>
        {row.getCanExpand() ? (
          <cell.ExpanderCell />
        ) : (
          <Box flexShrink={0} width="6" />
        )}
        <Text fontWeight="medium" overflow="hidden" textOverflow="ellipsis">
          {row.original.company}
        </Text>
      </HStack>
    ),
    size: 280,
    sortFn: 'text',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.BadgeCell colorPalette={statusPalette} />,
    size: 120,
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
    size: 120,
  }),
  columnHelper.accessor('owner', {
    header: 'Owner',
    cell: ({ cell }) => <cell.TextCell />,
    size: 160,
  }),
])

export function DataTableSubRows() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    getSubRows: (row) => row.subsidiaries,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 50 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="40rem">
          <table.Table aria-label="Accounts with subsidiaries" />
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
