import * as React from 'react'
import type { ComponentType } from 'react'

import {
  Box,
  Container,
  FormatNumber,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'

import { Menu } from '../menu/index.ts'
import {
  SelectionHeader,
  createDataTableColumnHelper,
  useDataTable,
} from './index.ts'

type Account = {
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
  ['Northstar Labs', 'northstar.test', 'Enterprise', 'Active', 12400],
  ['Kite & Harbor', 'kiteharbor.test', 'Growth', 'Trial', 3200],
  ['Arcwell Health', 'arcwell.test', 'Enterprise', 'Active', 9800],
  ['Fieldnote Studio', 'fieldnote.test', 'Starter', 'Paused', 890],
  ['Copperline', 'copperline.test', 'Growth', 'Active', 4700],
  ['Daybreak Energy', 'daybreak.test', 'Enterprise', 'Active', 15100],
  ['Plainspoken', 'plainspoken.test', 'Starter', 'Trial', 640],
  ['Orbit Commerce', 'orbitcommerce.test', 'Growth', 'Active', 6250],
  ['Morrow Works', 'morrow.test', 'Growth', 'Paused', 2800],
  ['Tandem Security', 'tandemsecurity.test', 'Enterprise', 'Active', 17600],
  ['Bower Supply', 'bowersupply.test', 'Starter', 'Trial', 720],
  ['Goodweather', 'goodweather.test', 'Growth', 'Active', 5400],
  ['Lattice Grove', 'latticegrove.test', 'Enterprise', 'Active', 11300],
  ['Signal House', 'signalhouse.test', 'Growth', 'Trial', 3800],
  ['Sable Finance', 'sablefinance.test', 'Enterprise', 'Active', 14200],
  ['Studio Meridian', 'meridian.test', 'Starter', 'Paused', 510],
  ['Common Thread', 'commonthread.test', 'Growth', 'Active', 4150],
  ['Highland Systems', 'highland.test', 'Enterprise', 'Active', 18900],
] as const

const owners = ['Maya Chen', 'Noah Williams', 'Priya Shah', 'Jon Bell']

const accounts: Account[] = companies.map((row, index) => ({
  id: `acc_${String(index + 1).padStart(2, '0')}`,
  company: row[0],
  domain: row[1],
  plan: row[2],
  status: row[3],
  mrr: row[4],
  renewal: `2026-${String((index % 12) + 1).padStart(2, '0')}-18`,
  owner: owners[index % owners.length]!,
}))

const columnHelper = createDataTableColumnHelper<Account>()

const statusPalette = (value: string) =>
  value === 'Active' ? 'green' : value === 'Trial' ? 'blue' : 'orange'

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'selection',
    header: () => <SelectionHeaderCell />,
    cell: ({ cell }) => <cell.SelectionCell />,
    enableCellSelection: false,
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

function SelectionHeaderCell() {
  return <SelectionHeader />
}

function DataTableStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts" />
        </table.ScrollArea>
        <table.Pagination />
      </table.Root>
    </table.Provider>
  )
}

function PinnedColumnsStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { start: ['selection', 'company'], end: ['owner'] },
      pagination: { pageIndex: 0, pageSize: 18 },
    },
  })

  return (
    <table.Provider>
      <table.Root layout="fixed" maxWidth="40rem" variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts with pinned columns">
            <table.Header />
            <table.Body
              onRowClick={(row) => {
                console.log('row click', row.original.company)
              }}
            />
          </table.Table>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

/**
 * Custom row rendering through the Body render prop: the body keeps owning
 * the loop, empty state and virtualization while each row is composed at
 * the call site.
 */
function ComposableRowsStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
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
            <table.Body>
              {(row, rowProps) => (
                <table.Row
                  row={row}
                  {...rowProps}
                  opacity={row.original.status === 'Paused' ? 0.5 : undefined}
                  onRowClick={(clicked) => {
                    console.log('custom row click', clicked.original.company)
                  }}
                />
              )}
            </table.Body>
          </table.Table>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

/**
 * Row context menus, composed through the Body render prop: each row is
 * wrapped in a menu with a context trigger — right-click a row to open it.
 */
function ContextMenuStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
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

function StripedStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 18 },
    },
  })

  return (
    <table.Provider>
      <table.Root size="sm" striped variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts, striped" />
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

function InteractiveRowsStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts">
            <table.Header />
            <table.Body
              onRowClick={(row) => {
                console.log('row click', row.original.company)
              }}
            />
          </table.Table>
        </table.ScrollArea>
        <table.Pagination />
      </table.Root>
    </table.Provider>
  )
}

const manyAccounts: Account[] = Array.from({ length: 5 }, (_, batch) =>
  accounts.map((account, index) => ({
    ...account,
    id: `acc_${batch}_${index}`,
    company: batch === 0 ? account.company : `${account.company} ${batch + 1}`,
    mrr: account.mrr + batch * 37,
  })),
).flat()

function PaginationStory() {
  const table = useDataTable({
    columns,
    data: manyAccounts,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 15 },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="40rem">
          <table.Table aria-label="Accounts" />
        </table.ScrollArea>
        <table.Pagination />
      </table.Root>
    </table.Provider>
  )
}

function NumberedPaginationStory() {
  const table = useDataTable({
    columns,
    data: manyAccounts,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="40rem">
          <table.Table aria-label="Accounts" />
        </table.ScrollArea>
        <table.Pagination>
          <table.PaginationRange />
          <table.PaginationPages />
        </table.Pagination>
      </table.Root>
    </table.Provider>
  )
}

function PageSelectStory() {
  const table = useDataTable({
    columns,
    data: manyAccounts,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'company', desc: false }],
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="40rem">
          <table.Table aria-label="Accounts" />
        </table.ScrollArea>
        <table.Pagination>
          <table.PaginationRange />
          <HStack gap="3">
            <HStack gap="2">
              <Text textStyle="sm">Page</Text>
              <table.PageSelect />
            </HStack>
            <table.PaginationNav />
          </HStack>
        </table.Pagination>
      </table.Root>
    </table.Provider>
  )
}

/**
 * Server-side pagination: the table only ever holds the current page.
 * `manualPagination` disables client-side slicing, `rowCount` drives the
 * page count, and the selector limits re-renders of this component to
 * pagination changes, which the effect uses to fetch the next page.
 */
function ManualPaginationStory() {
  const [data, setData] = React.useState<Account[]>([])
  const [loading, setLoading] = React.useState(true)

  const table = useDataTable(
    {
      columns,
      data,
      enableRowSelection: true,
      getRowId: (row) => row.id,
      manualPagination: true,
      rowCount: manyAccounts.length,
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
      },
    },
    (state) => state.pagination,
  )

  const { pageIndex, pageSize } = table.state

  React.useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setData(
        manyAccounts.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
      )
      setLoading(false)
    }, 400)
    return () => clearTimeout(timeout)
  }, [pageIndex, pageSize])

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea
          maxHeight="40rem"
          opacity={loading ? 0.5 : 1}
          transition="opacity 0.15s"
        >
          <table.Table aria-label="Accounts">
            <table.Header />
            <table.Body emptyState={loading ? 'Loading…' : 'No results'} />
          </table.Table>
        </table.ScrollArea>
        <table.Pagination />
      </table.Root>
    </table.Provider>
  )
}

/* Sub-rows: hierarchical data expanded in place. */

type AccountNode = Account & { subsidiaries?: AccountNode[] }

const regions = ['EU', 'US', 'APAC'] as const

const accountTree: AccountNode[] = accounts
  .slice(0, 8)
  .map((account, index) => ({
    ...account,
    subsidiaries: regions.slice(0, (index % 3) + 1).map((region, sub) => ({
      ...account,
      id: `${account.id}_${region}`,
      company: `${account.company} ${region}`,
      domain: `${region.toLowerCase()}.${account.domain}`,
      mrr: Math.round(account.mrr / ((index % 3) + 2)),
      owner: owners[(index + sub + 1) % owners.length]!,
    })),
  }))

const treeColumnHelper = createDataTableColumnHelper<AccountNode>()

const treeColumns = treeColumnHelper.columns([
  treeColumnHelper.accessor('company', {
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
  treeColumnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.BadgeCell colorPalette={statusPalette} />,
    size: 120,
  }),
  treeColumnHelper.accessor('mrr', {
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
  treeColumnHelper.accessor('owner', {
    header: 'Owner',
    cell: ({ cell }) => <cell.TextCell />,
    size: 160,
  }),
])

function SubRowsStory() {
  const table = useDataTable({
    columns: treeColumns,
    data: accountTree,
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

/* Grouped rows: rows grouped by a column value with aggregated cells. */

const groupColumnHelper = createDataTableColumnHelper<Account>()

const groupedColumns = groupColumnHelper.columns([
  groupColumnHelper.accessor('plan', {
    header: 'Plan',
    cell: ({ cell, row }) =>
      cell.getIsGrouped() ? (
        <HStack gap="1" minWidth="0">
          <cell.ExpanderCell />
          <Text fontWeight="medium">{String(cell.getValue())}</Text>
          <Text color="fg.muted" textStyle="xs">
            ({row.subRows.length})
          </Text>
        </HStack>
      ) : (
        <cell.TextCell />
      ),
    size: 200,
  }),
  groupColumnHelper.accessor('company', {
    header: 'Account',
    // Cells without an aggregationFn render their regular template on group
    // rows, so blank them there explicitly.
    cell: ({ cell, row }) => (row.getIsGrouped() ? null : <cell.TextCell />),
    size: 220,
  }),
  groupColumnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell, row }) =>
      row.getIsGrouped() ? null : (
        <cell.BadgeCell colorPalette={statusPalette} />
      ),
    size: 120,
  }),
  groupColumnHelper.accessor('mrr', {
    header: 'MRR',
    aggregationFn: 'sum',
    // The feature's default aggregatedCell renders the raw value; format the
    // sum the same way as the leaf cells. (No bound components here — the
    // column helper only augments cell/header/footer contexts.)
    aggregatedCell: ({ getValue }) => (
      <Text fontWeight="medium" whiteSpace="nowrap">
        <FormatNumber
          currency="USD"
          maximumFractionDigits={0}
          style="currency"
          value={getValue<number>() ?? 0}
        />
      </Text>
    ),
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

function GroupedRowsStory() {
  const table = useDataTable({
    columns: groupedColumns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      expanded: true,
      grouping: ['plan'],
      pagination: { pageIndex: 0, pageSize: 50 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="40rem">
          <table.Table aria-label="Accounts grouped by plan" />
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

/**
 * Master–detail expansion: any row can expand into a custom detail panel
 * rendered as a full-width row via `renderExpandedRow`. Uses
 * `getRowCanExpand` since the rows have no sub-rows.
 */

const expandColumnHelper = createDataTableColumnHelper<Account>()

const expandColumns = expandColumnHelper.columns([
  expandColumnHelper.display({
    id: 'expander',
    cell: ({ cell }) => <cell.ExpanderCell />,
    enableResizing: false,
    enableSorting: false,
    maxSize: 40,
    minSize: 40,
    size: 40,
  }),
  expandColumnHelper.accessor('company', {
    header: 'Account',
    cell: ({ cell }) => <cell.TextCell />,
    size: 220,
    sortFn: 'text',
  }),
  expandColumnHelper.accessor('plan', {
    header: 'Plan',
    cell: ({ cell }) => <cell.TextCell />,
    size: 120,
  }),
  expandColumnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.BadgeCell colorPalette={statusPalette} />,
    size: 120,
  }),
  expandColumnHelper.accessor('mrr', {
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

function ExpandedRowStory() {
  const table = useDataTable({
    columns: expandColumns,
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

/**
 * Spreadsheet-style cell selection: click a cell, drag to extend the range,
 * shift-click to extend from the anchor, cmd/ctrl-click to add or subtract
 * ranges. Opt in with `enableCellSelection`.
 */
function CellSelectionStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    enableCellSelection: true,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 18 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea maxHeight="30rem">
          <table.Table aria-label="Accounts" />
        </table.ScrollArea>
        <table.Pagination>
          <table.Subscribe selector={(state) => state.cellSelection}>
            {() => (
              <Text textStyle="sm">
                {table.getSelectedCellCount()} cells selected
              </Text>
            )}
          </table.Subscribe>
        </table.Pagination>
      </table.Root>
    </table.Provider>
  )
}

/**
 * Column `footer` templates render in a sticky footer, e.g. page totals.
 * The footer only renders when at least one column defines a `footer`.
 */

const footerColumnHelper = createDataTableColumnHelper<Account>()

const footerColumns = footerColumnHelper.columns([
  footerColumnHelper.accessor('company', {
    header: 'Account',
    footer: () => <Text fontWeight="medium">Page total</Text>,
    cell: ({ cell }) => <cell.TextCell />,
    size: 220,
    sortFn: 'text',
  }),
  footerColumnHelper.accessor('plan', {
    header: 'Plan',
    cell: ({ cell }) => <cell.TextCell />,
    size: 120,
  }),
  footerColumnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell }) => <cell.BadgeCell colorPalette={statusPalette} />,
    size: 120,
  }),
  footerColumnHelper.accessor('mrr', {
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

function FooterStory() {
  const table = useDataTable({
    columns: footerColumns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
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

function EmptyStateStory() {
  const table = useDataTable({
    columns,
    data: accounts,
    getRowId: (row) => row.id,
    initialState: {
      globalFilter: 'wayfarer',
      pagination: { pageIndex: 0, pageSize: 18 },
    },
  })

  return (
    <table.Provider>
      <table.Root variant="outline">
        <table.ScrollArea>
          <table.Table aria-label="Accounts">
            <table.Header />
            <table.Body emptyState={<table.NoResults resource="accounts" />} />
          </table.Table>
        </table.ScrollArea>
      </table.Root>
    </table.Provider>
  )
}

export default {
  title: 'Components/DataTable',
  component: DataTableStory,
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
          <Story />
        </Container>
      </Box>
    ),
  ],
}

export const Default = {}

export const PinnedColumns = {
  render: () => <PinnedColumnsStory />,
}

export const Striped = {
  render: () => <StripedStory />,
}

export const InteractiveRows = {
  render: () => <InteractiveRowsStory />,
}

export const ComposableRows = {
  render: () => <ComposableRowsStory />,
}

export const ContextMenu = {
  render: () => <ContextMenuStory />,
}

export const Pagination = {
  render: () => <PaginationStory />,
}

export const NumberedPagination = {
  render: () => <NumberedPaginationStory />,
}

export const PageSelect = {
  render: () => <PageSelectStory />,
}

export const ManualPagination = {
  render: () => <ManualPaginationStory />,
}

export const Footer = {
  render: () => <FooterStory />,
}

export const SubRows = {
  render: () => <SubRowsStory />,
}

export const ExpandedRow = {
  render: () => <ExpandedRowStory />,
}

export const CellSelection = {
  render: () => <CellSelectionStory />,
}

export const GroupedRows = {
  render: () => <GroupedRowsStory />,
}

export const EmptyState = {
  render: () => <EmptyStateStory />,
}
