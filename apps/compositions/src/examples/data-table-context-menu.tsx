'use client'

import {
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'
import { Menu } from 'compositions/ui/menu'

interface Account {
  id: string
  company: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  status: 'Active' | 'Trial' | 'Paused'
  mrr: number
  owner: string
}

const accounts: Account[] = [
  {
    id: 'acc_01',
    company: 'Northstar Labs',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 12400,
    owner: 'Maya Chen',
  },
  {
    id: 'acc_02',
    company: 'Kite & Harbor',
    plan: 'Growth',
    status: 'Trial',
    mrr: 3200,
    owner: 'Noah Williams',
  },
  {
    id: 'acc_03',
    company: 'Arcwell Health',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 9800,
    owner: 'Priya Shah',
  },
  {
    id: 'acc_04',
    company: 'Fieldnote Studio',
    plan: 'Starter',
    status: 'Paused',
    mrr: 890,
    owner: 'Jon Bell',
  },
  {
    id: 'acc_05',
    company: 'Copperline',
    plan: 'Growth',
    status: 'Active',
    mrr: 4700,
    owner: 'Maya Chen',
  },
  {
    id: 'acc_06',
    company: 'Daybreak Energy',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 15100,
    owner: 'Noah Williams',
  },
  {
    id: 'acc_07',
    company: 'Plainspoken',
    plan: 'Starter',
    status: 'Trial',
    mrr: 640,
    owner: 'Priya Shah',
  },
  {
    id: 'acc_08',
    company: 'Orbit Commerce',
    plan: 'Growth',
    status: 'Active',
    mrr: 6250,
    owner: 'Jon Bell',
  },
  {
    id: 'acc_09',
    company: 'Morrow Works',
    plan: 'Growth',
    status: 'Paused',
    mrr: 2800,
    owner: 'Maya Chen',
  },
  {
    id: 'acc_10',
    company: 'Tandem Security',
    plan: 'Enterprise',
    status: 'Active',
    mrr: 17600,
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
    cell: ({ cell }) => <cell.TextCell />,
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
  columnHelper.accessor('owner', {
    header: 'Owner',
    cell: ({ cell }) => <cell.TextCell />,
    size: 150,
    sortFn: 'text',
  }),
])

/**
 * Row context menus composed through the Body render prop: each row is
 * wrapped in a menu with a context trigger — right-click a row to open it.
 */
export function DataTableContextMenu() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 20 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts">
            <table.Header />
            <table.Body>
              {(row, rowProps) => (
                <Menu.Root>
                  <Menu.ContextTrigger asChild>
                    <table.Row interactive row={row} {...rowProps} />
                  </Menu.ContextTrigger>
                  <Menu.Content>
                    <Menu.Item
                      value="view"
                      onClick={() => console.log('view', row.original.company)}
                    >
                      View {row.original.company}
                    </Menu.Item>
                    <Menu.Item value="edit">Edit</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item color="fg.error" value="delete">
                      Delete
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Root>
              )}
            </table.Body>
          </table.Table>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
