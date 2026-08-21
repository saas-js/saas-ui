'use client'

import { Badge, Box, HStack, Stack, Text } from '@chakra-ui/react'
import {
  type ConditionQueryForDefinition,
  createConditionQuery,
} from '@saas-js/conditions'
import { createFilters } from 'compositions/ui/filters'
import { LuBuilding2, LuCircleDollarSign, LuLayers } from 'react-icons/lu'
import { z } from 'zod'

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

const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const statusDot = (color: string) => (
  <Box boxSize="2" rounded="full" bg={color} />
)

const accountFilters = createFilters({
  fields: {
    status: {
      type: 'enum',
      label: 'Status',
      schema: z.enum(['Active', 'Trial', 'Paused']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      meta: { icon: statusDot('border.emphasized'), pluralLabel: 'statuses' },
      options: [
        {
          value: 'Active',
          label: 'Active',
          meta: { icon: statusDot('green.solid') },
        },
        {
          value: 'Trial',
          label: 'Trial',
          meta: { icon: statusDot('blue.solid') },
        },
        {
          value: 'Paused',
          label: 'Paused',
          meta: { icon: statusDot('gray.solid') },
        },
      ],
    },
    plan: {
      type: 'enum',
      label: 'Plan',
      schema: z.enum(['Enterprise', 'Growth', 'Starter']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      meta: { icon: <LuLayers />, pluralLabel: 'plans' },
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
      operators: ['contains', 'equals', 'startsWith'],
      defaultOperator: 'contains',
      meta: { icon: <LuBuilding2 /> },
    },
    mrr: {
      type: 'number',
      label: 'MRR',
      schema: z.coerce.number().min(0),
      operators: ['equals', 'gte', 'lte', 'between'],
      defaultOperator: 'gte',
      meta: { icon: <LuCircleDollarSign /> },
    },
  },
  formatValue: ({ fieldId, value }) => {
    if (fieldId === 'mrr' && typeof value === 'number') {
      return currencyFormat.format(value)
    }
    return undefined
  },
})

function statusColor(status: Account['status']) {
  if (status === 'Active') return 'green'
  if (status === 'Trial') return 'blue'
  return 'gray'
}

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
}) as ConditionQueryForDefinition<typeof accountFilters.definition>

export function FiltersBasic() {
  const conditions = accountFilters.useConditions({
    defaultValue: defaultQuery,
  })
  const matches = conditions.useFilter(accounts)

  return (
    <conditions.Root>
      <Stack gap="3" width="full">
        <conditions.FilterBar />
        <Stack
          gap="0"
          borderWidth="1px"
          borderColor="border"
          rounded="md"
          divideY="1px"
          divideColor="border"
        >
          {matches.map((account) => (
            <HStack key={account.id} px="4" py="2.5" gap="4">
              <Text textStyle="sm" fontWeight="medium" flex="1" truncate>
                {account.company}
              </Text>
              <Text textStyle="sm" color="fg.muted">
                {account.plan}
              </Text>
              <Badge size="sm" colorPalette={statusColor(account.status)}>
                {account.status}
              </Badge>
              <Text textStyle="sm" color="fg.muted" minW="16" textAlign="end">
                {currencyFormat.format(account.mrr)}
              </Text>
            </HStack>
          ))}
          {!matches.length ? (
            <Box px="4" py="8">
              <Text textStyle="sm" color="fg.muted" textAlign="center">
                No accounts match these filters.
              </Text>
            </Box>
          ) : null}
        </Stack>
      </Stack>
    </conditions.Root>
  )
}
