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

const accounts: Account[] = [
  {
    id: 'acc_01',
    company: 'Northstar Labs',
    domain: 'northstar.test',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 12400,
    renewal: '2026-01-18',
    owner: 'Maya Chen',
  },
  {
    id: 'acc_02',
    company: 'Kite & Harbor',
    domain: 'kiteharbor.test',
    plan: 'Growth',
    status: 'Trial',
    mrr: 3200,
    renewal: '2026-02-18',
    owner: 'Noah Williams',
  },
  {
    id: 'acc_03',
    company: 'Arcwell Health',
    domain: 'arcwell.test',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 9800,
    renewal: '2026-03-18',
    owner: 'Priya Shah',
  },
  {
    id: 'acc_04',
    company: 'Fieldnote Studio',
    domain: 'fieldnote.test',
    plan: 'Starter',
    status: 'Paused',
    mrr: 890,
    renewal: '2026-04-18',
    owner: 'Jon Bell',
  },
  {
    id: 'acc_05',
    company: 'Copperline',
    domain: 'copperline.test',
    plan: 'Growth',
    status: 'Active',
    mrr: 4700,
    renewal: '2026-05-18',
    owner: 'Maya Chen',
  },
  {
    id: 'acc_06',
    company: 'Daybreak Energy',
    domain: 'daybreak.test',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 15100,
    renewal: '2026-06-18',
    owner: 'Noah Williams',
  },
  {
    id: 'acc_07',
    company: 'Plainspoken',
    domain: 'plainspoken.test',
    plan: 'Starter',
    status: 'Trial',
    mrr: 640,
    renewal: '2026-07-18',
    owner: 'Priya Shah',
  },
  {
    id: 'acc_08',
    company: 'Orbit Commerce',
    domain: 'orbitcommerce.test',
    plan: 'Growth',
    status: 'Active',
    mrr: 6250,
    renewal: '2026-08-18',
    owner: 'Jon Bell',
  },
  {
    id: 'acc_09',
    company: 'Morrow Works',
    domain: 'morrow.test',
    plan: 'Growth',
    status: 'Paused',
    mrr: 2800,
    renewal: '2026-09-18',
    owner: 'Maya Chen',
  },
  {
    id: 'acc_10',
    company: 'Tandem Security',
    domain: 'tandemsecurity.test',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 17600,
    renewal: '2026-10-18',
    owner: 'Noah Williams',
  },
]

const statusPalette = (value: string) =>
  value === 'Active' ? 'green' : value === 'Trial' ? 'blue' : 'orange'

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'selection',
    header: ({ header }) => <header.SelectionHeader />,
    cell: ({ cell }) => <cell.SelectionCell />,
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

export function DataTablePinnedColumns() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { start: ['selection', 'company'], end: ['owner'] },
      pagination: { pageIndex: 0, pageSize: 20 },
    },
  })

  return (
    <table.Provider>
      <table.Root layout="fixed" maxWidth="40rem" variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts with pinned columns" />
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
