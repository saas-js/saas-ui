'use client'

import {
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'

interface Account {
  id: string
  company: string
  [metric: `metric${number}`]: string | number
}

const METRIC_COUNT = 60

const accounts: Account[] = Array.from({ length: 5000 }, (_, index) => {
  const account: Account = {
    id: `acc_${String(index + 1).padStart(5, '0')}`,
    company: `Account ${index + 1}`,
  }
  for (let metric = 0; metric < METRIC_COUNT; metric++) {
    account[`metric${metric}`] = ((index + 1) * (metric + 3)) % 9973
  }
  return account
})

const columnHelper = createDataTableColumnHelper<Account>()

const columns = columnHelper.columns([
  columnHelper.accessor('company', {
    header: 'Account',
    cell: ({ cell }) => <cell.TextCell />,
    size: 200,
    sortFn: 'text',
  }),
  ...Array.from({ length: METRIC_COUNT }, (_, metric) =>
    columnHelper.accessor(`metric${metric}`, {
      id: `metric${metric}`,
      header: `Metric ${metric + 1}`,
      cell: ({ cell }) => <cell.TextCell />,
      meta: { isNumeric: true },
      size: 110,
    }),
  ),
])

/**
 * Rows and columns are both virtualized — 5,000 rows by 61 columns, with the
 * first column pinned so it stays visible while scrolling sideways.
 */
export function DataTableVirtualGrid() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { start: ['company'], end: [] },
      pagination: { pageIndex: 0, pageSize: accounts.length },
    },
  })

  return (
    <table.Provider>
      <table.Root height="24rem" layout="fixed" variant="outline">
        <table.ScrollArea flex="1" minHeight="0">
          <table.Virtualizer columns>
            <table.Table aria-label="Virtualized metrics grid" />
          </table.Virtualizer>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
