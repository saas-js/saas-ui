import type { ComponentType } from 'react'

import {
  Badge,
  Box,
  Container,
  FormatNumber,
  HStack,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { createConditionQuery, defineConditions } from '@saas-js/conditions'
import { z } from 'zod'

import { FilterIcon } from '../../icons/index.ts'
import { createFilters } from './index.ts'

interface Account {
  id: string
  company: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  status: 'Active' | 'Trial' | 'Paused'
  owner: string
  mrr: number
  createdAt: Date
}

const owners = [
  'Maya Chen',
  'Jon Bell',
  'Priya Shah',
  'Alex Moreno',
  'Noor Aziz',
  'Sam Whitfield',
]

const accounts: Account[] = (
  [
    ['Northstar Labs', 'Enterprise', 'Active', 0, 12400, '2025-01-14'],
    ['Kite & Harbor', 'Growth', 'Trial', 1, 3200, '2025-06-03'],
    ['Arcwell Health', 'Enterprise', 'Active', 2, 9800, '2024-11-22'],
    ['Fieldnote Studio', 'Starter', 'Paused', 3, 890, '2024-08-09'],
    ['Copperline', 'Growth', 'Active', 4, 4700, '2025-05-18'],
    ['Daybreak Energy', 'Enterprise', 'Active', 0, 15100, '2025-02-27'],
    ['Plainspoken', 'Starter', 'Trial', 5, 640, '2025-07-12'],
    ['Orbit Commerce', 'Growth', 'Active', 1, 6250, '2025-03-30'],
    ['Morrow Works', 'Growth', 'Paused', 2, 2800, '2024-12-05'],
    ['Tandem Security', 'Enterprise', 'Active', 3, 17600, '2025-04-21'],
  ] as const
).map(([company, plan, status, owner, mrr, createdAt], index) => ({
  id: `account-${index}`,
  company,
  plan,
  status,
  owner: owners[owner],
  mrr,
  createdAt: new Date(`${createdAt}T00:00:00`),
}))

const accountConditions = defineConditions({
  fields: {
    status: {
      type: 'enum',
      label: 'Status',
      schema: z.enum(['Active', 'Trial', 'Paused']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      meta: { pluralLabel: 'statuses' },
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Trial', label: 'Trial' },
        { value: 'Paused', label: 'Paused' },
      ],
    },
    plan: {
      type: 'enum',
      label: 'Plan',
      schema: z.enum(['Enterprise', 'Growth', 'Starter']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      options: [
        { value: 'Enterprise', label: 'Enterprise' },
        { value: 'Growth', label: 'Growth' },
        { value: 'Starter', label: 'Starter' },
      ],
    },
    company: {
      type: 'string',
      label: 'Company',
      schema: z.string().min(1),
      operators: ['contains', 'equals', 'startsWith', 'isNull'],
      defaultOperator: 'contains',
    },
    mrr: {
      type: 'number',
      label: 'MRR',
      schema: z.coerce.number().min(0),
      operators: ['equals', 'gte', 'lte', 'between'],
      defaultOperator: 'gte',
    },
    createdAt: {
      type: 'date',
      label: 'Created',
      schema: z.coerce.date(),
      operators: ['equals', 'gte', 'lte', 'between'],
      defaultOperator: 'gte',
    },
  },
})

const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const accountFilters = createFilters({
  definition: accountConditions,
  formatValue: ({ fieldId, value }) => {
    if (fieldId === 'mrr' && typeof value === 'number') {
      return currencyFormat.format(value)
    }
    return undefined
  },
})

const defaultQuery = createConditionQuery({
  items: [
    {
      kind: 'condition',
      id: 'status-active',
      field: 'status',
      operator: 'equals',
      value: 'Active',
    },
  ],
})

function statusColor(status: Account['status']) {
  if (status === 'Active') return 'green'
  if (status === 'Trial') return 'blue'
  return 'gray'
}

function AccountList({ accounts }: { accounts: Account[] }) {
  return (
    <Stack gap="0" borderTopWidth="1px" borderColor="border">
      <HStack
        px="4"
        py="2"
        bg="bg.subtle"
        borderBottomWidth="1px"
        borderColor="border"
      >
        <Text textStyle="sm" color="fg.muted">
          {accounts.length} accounts
        </Text>
      </HStack>
      {accounts.map((account) => (
        <HStack
          key={account.id}
          px="4"
          py="3"
          gap="4"
          borderBottomWidth="1px"
          borderColor="border"
          _last={{ borderBottomWidth: '0' }}
        >
          <Stack gap="0" flex="1" minW="0">
            <Text textStyle="sm" fontWeight="medium" truncate>
              {account.company}
            </Text>
            <Text textStyle="xs" color="fg.muted" truncate>
              {account.owner} · {account.plan}
            </Text>
          </Stack>
          <Badge size="sm" colorPalette={statusColor(account.status)}>
            {account.status}
          </Badge>
          <Text textStyle="sm" color="fg.muted" minW="20" textAlign="end">
            <FormatNumber
              value={account.mrr}
              style="currency"
              currency="USD"
              maximumFractionDigits={0}
            />
          </Text>
        </HStack>
      ))}
      {!accounts.length ? (
        <Box px="4" py="8">
          <Text textStyle="sm" color="fg.muted" textAlign="center">
            No accounts match these filters.
          </Text>
        </Box>
      ) : null}
    </Stack>
  )
}

function FiltersStory() {
  const conditions = accountFilters.useConditions({
    defaultValue: defaultQuery,
  })
  const matches = conditions.useFilter(accounts)

  return (
    <Box borderWidth="1px" borderColor="border" rounded="lg" bg="bg">
      <conditions.Root>
        <Box px="4" py="3">
          <conditions.FilterBar />
        </Box>
        <AccountList accounts={matches} />
      </conditions.Root>
    </Box>
  )
}

/**
 * Async option sources resolve through `useConditionOptions`: the editor gets
 * a search input, loading state and abortable fetches for free.
 */
const ownerConditions = defineConditions({
  fields: {
    owner: {
      type: 'enum',
      label: 'Owner',
      schema: z.string().min(1),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      options: async ({ query, signal }) => {
        await new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, 350)
          signal.addEventListener('abort', () => {
            clearTimeout(timer)
            reject(new DOMException('Aborted', 'AbortError'))
          })
        })
        return owners
          .filter((owner) =>
            owner.toLowerCase().includes(query.toLowerCase()),
          )
          .map((owner) => ({ value: owner, label: owner }))
      },
    },
    status: {
      type: 'enum',
      label: 'Status',
      schema: z.enum(['Active', 'Trial', 'Paused']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Trial', label: 'Trial' },
        { value: 'Paused', label: 'Paused' },
      ],
    },
  },
})

const ownerFilters = createFilters({ definition: ownerConditions })

function AsyncOptionsStory() {
  const conditions = ownerFilters.useConditions()
  const matches = conditions.useFilter(accounts)

  return (
    <Box borderWidth="1px" borderColor="border" rounded="lg" bg="bg">
      <conditions.Root>
        <Box px="4" py="3">
          <conditions.FilterBar />
        </Box>
        <AccountList accounts={matches} />
      </conditions.Root>
    </Box>
  )
}

/**
 * Compose the bar yourself: pass children to `FilterBar` and place the parts
 * (or your own components) where you need them.
 */
function ComposedBarStory() {
  const conditions = accountFilters.useConditions({
    defaultValue: defaultQuery,
  })
  const matches = conditions.useFilter(accounts)

  return (
    <Box borderWidth="1px" borderColor="border" rounded="lg" bg="bg">
      <conditions.Root>
        <Box px="4" py="3">
          <conditions.FilterBar>
            <conditions.AddFilterButton variant="outline">
              <FilterIcon /> Add filter
            </conditions.AddFilterButton>
            <conditions.FilterChips />
            <Spacer />
            <conditions.ClearFiltersButton>
              Clear all
            </conditions.ClearFiltersButton>
          </conditions.FilterBar>
        </Box>
        <AccountList accounts={matches} />
      </conditions.Root>
    </Box>
  )
}

export default {
  title: 'Components/Filters',
  component: FiltersStory,
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
        <Container maxWidth="4xl">
          <Story />
        </Container>
      </Box>
    ),
  ],
}

export const Default = {}

export const AsyncOptions = {
  render: () => <AsyncOptionsStory />,
}

export const ComposedBar = {
  render: () => <ComposedBarStory />,
}
