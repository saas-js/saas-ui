'use client'

import { ButtonGroup } from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'
import {
  createDataTableColumnHelper,
  useDataTable,
} from 'compositions/ui/data-table'
import { Page } from 'compositions/ui/page'

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
]

const statusPalette = (value: string) =>
  value === 'Active' ? 'green' : value === 'Trial' ? 'blue' : 'gray'

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
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.BadgeCell colorPalette={statusPalette} />,
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

export const PageWithDataTable = () => {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <Page.Root height="380px" borderWidth="1px" rounded="l3">
      <Page.Header
        title="Accounts"
        actions={
          <ButtonGroup justifyContent="flex-end">
            <Button variant="glass" colorPalette="accent" size="xs">
              Add account
            </Button>
          </ButtonGroup>
        }
      />
      <Page.Body p="0">
        <table.Provider>
          <table.Root>
            <table.ScrollArea>
              <table.Table aria-label="Accounts" />
            </table.ScrollArea>
          </table.Root>
        </table.Provider>
      </Page.Body>
    </Page.Root>
  )
}
