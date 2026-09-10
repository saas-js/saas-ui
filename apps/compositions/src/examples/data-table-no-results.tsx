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

const accounts: Account[] = [
  { id: '1', company: 'Northstar Labs', plan: 'Enterprise', mrr: 12400 },
  { id: '2', company: 'Kite & Harbor', plan: 'Growth', mrr: 3200 },
  { id: '3', company: 'Arcwell Health', plan: 'Enterprise', mrr: 9800 },
  { id: '4', company: 'Fieldnote Studio', plan: 'Starter', mrr: 890 },
  { id: '5', company: 'Copperline', plan: 'Growth', mrr: 4700 },
  { id: '6', company: 'Daybreak Energy', plan: 'Enterprise', mrr: 15100 },
]

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

export function DataTableNoResults() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      globalFilter: 'wayfarer',
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea>
          <table.Table aria-label="Accounts">
            <table.Header />
            <table.Body
              emptyState={<table.NoResults resource="accounts" />}
            />
          </table.Table>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
