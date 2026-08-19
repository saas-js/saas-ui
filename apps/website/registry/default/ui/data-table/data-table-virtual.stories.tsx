import type { ComponentType } from 'react'

import { Box, Container, Text } from '@chakra-ui/react'

import { createDataTableColumnHelper, useDataTable } from './index.ts'

type Account = {
  id: string
  company: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  mrr: number
  [metric: `metric${number}`]: string | number
}

const plans = ['Enterprise', 'Growth', 'Starter'] as const

const METRIC_COUNT = 60

const accounts: Account[] = Array.from({ length: 10000 }, (_, index) => {
  const account: Account = {
    id: `acc_${String(index + 1).padStart(5, '0')}`,
    company: `Account ${index + 1}`,
    plan: plans[index % plans.length]!,
    mrr: 800 + ((index * 137) % 18000),
  }
  for (let metric = 0; metric < METRIC_COUNT; metric++) {
    account[`metric${metric}`] = ((index + 1) * (metric + 3)) % 9973
  }
  return account
})

const columnHelper = createDataTableColumnHelper<Account>()

const rowColumns = columnHelper.columns([
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

const gridColumns = columnHelper.columns([
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

function VirtualRowsStory() {
  const table = useDataTable({
    columns: rowColumns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: accounts.length },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root height="100%" variant="outline">
        <table.ScrollArea flex="1" minHeight="0">
          <table.Virtualizer>
            <table.Table aria-label="Virtualized accounts" />
          </table.Virtualizer>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

function VirtualGridStory() {
  const table = useDataTable({
    columns: gridColumns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { start: ['company'], end: [] },
      pagination: { pageIndex: 0, pageSize: accounts.length },
    },
  })

  return (
    <table.Provider>
      <table.Root height="100%" layout="fixed" variant="outline">
        <table.ScrollArea flex="1" minHeight="0">
          <table.Virtualizer columns>
            <table.Table aria-label="Virtualized metrics grid" />
          </table.Virtualizer>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

export default {
  title: 'Components/DataTable Virtualized',
  component: VirtualRowsStory,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: ComponentType) => (
      <Box
        background="bg.subtle"
        minHeight="100dvh"
        padding={{ base: '3', md: '8' }}
      >
        <Container maxWidth="6xl">
          <Text color="fg.muted" marginBottom="3" textStyle="sm">
            10,000 rows — only the visible window is rendered.
          </Text>
          <Box height="32rem">
            <Story />
          </Box>
        </Container>
      </Box>
    ),
  ],
}

export const VirtualRows = {}

export const VirtualRowsAndColumns = {
  render: () => <VirtualGridStory />,
}
