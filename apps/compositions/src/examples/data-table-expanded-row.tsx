'use client'

import { Box, FormatNumber, HStack, Stack, Text } from '@chakra-ui/react'
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
  columnHelper.display({
    id: 'expander',
    cell: ({ cell }) => <cell.ExpanderCell />,
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
])

/**
 * Master–detail expansion: any row can expand into a custom detail panel
 * rendered as a full-width row via `renderExpandedRow`. Uses `getRowCanExpand`
 * since the rows have no sub-rows.
 */
export function DataTableExpandedRow() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowCanExpand: () => true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 18 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts">
            <table.Header />
            <table.Body
              renderExpandedRow={(row) => (
                <Box
                  background="bg.muted"
                  paddingX="12"
                  paddingY="4"
                  width="100%"
                >
                  <HStack gap="10">
                    <Stack gap="0">
                      <Text color="fg.muted" textStyle="xs">
                        Domain
                      </Text>
                      <Text textStyle="sm">{row.original.domain}</Text>
                    </Stack>
                    <Stack gap="0">
                      <Text color="fg.muted" textStyle="xs">
                        Owner
                      </Text>
                      <Text textStyle="sm">{row.original.owner}</Text>
                    </Stack>
                    <Stack gap="0">
                      <Text color="fg.muted" textStyle="xs">
                        Renewal
                      </Text>
                      <Text textStyle="sm">{row.original.renewal}</Text>
                    </Stack>
                    <Stack gap="0">
                      <Text color="fg.muted" textStyle="xs">
                        Annual value
                      </Text>
                      <Text textStyle="sm">
                        <FormatNumber
                          currency="USD"
                          maximumFractionDigits={0}
                          style="currency"
                          value={row.original.mrr * 12}
                        />
                      </Text>
                    </Stack>
                  </HStack>
                </Box>
              )}
            />
          </table.Table>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}
