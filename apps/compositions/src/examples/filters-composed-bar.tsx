'use client'

import { Box, HStack, Spacer, Stack, Text } from '@chakra-ui/react'
import { createFilters } from 'compositions/ui/filters'
import { LuBuilding2, LuListFilter } from 'react-icons/lu'
import { z } from 'zod'

interface Account {
  id: string
  company: string
  status: 'Active' | 'Trial' | 'Paused'
}

const accounts: Account[] = [
  { id: '1', company: 'Northstar Labs', status: 'Active' },
  { id: '2', company: 'Kite & Harbor', status: 'Trial' },
  { id: '3', company: 'Arcwell Health', status: 'Active' },
  { id: '4', company: 'Fieldnote Studio', status: 'Paused' },
  { id: '5', company: 'Copperline', status: 'Active' },
]

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
    company: {
      type: 'string',
      label: 'Company',
      schema: z.string().min(1),
      operators: ['contains', 'equals', 'startsWith'],
      defaultOperator: 'contains',
      meta: { icon: <LuBuilding2 /> },
    },
  },
})

export function FiltersComposedBar() {
  const conditions = accountFilters.useConditions()
  const matches = conditions.useFilter(accounts)

  return (
    <conditions.Root>
      <Stack gap="3" width="full">
        <conditions.FilterBar>
          <conditions.AddFilterButton variant="outline">
            <LuListFilter /> Add filter
          </conditions.AddFilterButton>
          <conditions.FilterChips />
          <Spacer />
          <conditions.ClearFiltersButton>Clear all</conditions.ClearFiltersButton>
        </conditions.FilterBar>
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
                {account.status}
              </Text>
            </HStack>
          ))}
          {!matches.length ? (
            <Text textStyle="sm" color="fg.muted" textAlign="center" py="8">
              No accounts match these filters.
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </conditions.Root>
  )
}
