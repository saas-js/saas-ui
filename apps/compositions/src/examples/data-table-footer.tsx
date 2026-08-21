'use client'

import { FormatNumber, Text } from '@chakra-ui/react'
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
  {
    id: '7',
    company: 'Plainspoken',
    plan: 'Starter',
    status: 'Trial',
    mrr: 640,
  },
  {
    id: '8',
    company: 'Orbit Commerce',
    plan: 'Growth',
    status: 'Active',
    mrr: 6250,
  },
  {
    id: '9',
    company: 'Morrow Works',
    plan: 'Growth',
    status: 'Paused',
    mrr: 2800,
  },
  {
    id: '10',
    company: 'Tandem Security',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 17600,
  },
  {
    id: '11',
    company: 'Bower Supply',
    plan: 'Starter',
    status: 'Trial',
    mrr: 720,
  },
  {
    id: '12',
    company: 'Goodweather',
    plan: 'Growth',
    status: 'Active',
    mrr: 5400,
  },
]

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
  columnHelper.accessor('company', {
    header: 'Account',
    footer: () => <Text fontWeight="medium">Page total</Text>,
    cell: ({ cell }) => <cell.TextCell />,
    size: 220,
    sortFn: 'text',
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    cell: ({ cell }) => <cell.TextCell />,
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
    footer: ({ table }) => (
      <Text fontWeight="medium" whiteSpace="nowrap">
        <FormatNumber
          currency="USD"
          maximumFractionDigits={0}
          style="currency"
          value={table
            .getRowModel()
            .rows.reduce((sum, row) => sum + row.original.mrr, 0)}
        />
      </Text>
    ),
    meta: { isNumeric: true },
    size: 140,
  }),
])

export function DataTableFooter() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 8 },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="24rem">
          <table.Table aria-label="Accounts with totals">
            <table.Header />
            <table.Body />
            <table.Footer />
          </table.Table>
        </table.ScrollArea>
        <table.Pagination />
      </table.Root>
    </table.Provider>
  )
}
