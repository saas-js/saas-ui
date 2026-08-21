'use client'

import {
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'

interface Account {
  id: string
  company: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  mrr: number
}

const plans = ['Enterprise', 'Growth', 'Starter'] as const

const accounts: Account[] = Array.from({ length: 5000 }, (_, index) => ({
  id: `acc_${String(index + 1).padStart(5, '0')}`,
  company: `Account ${index + 1}`,
  plan: plans[index % plans.length]!,
  mrr: 800 + ((index * 137) % 18000),
}))

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
    size: 140,
  }),
])

/** 5,000 rows — only the visible window is rendered. */
export function DataTableVirtualRows() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: accounts.length },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root height="24rem" variant="outline">
        <table.ScrollArea flex="1" minHeight="0">
          <table.Virtualizer>
            <table.Table aria-label="Virtualized accounts" />
          </table.Virtualizer>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
