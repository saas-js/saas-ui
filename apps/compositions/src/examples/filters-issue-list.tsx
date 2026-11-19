'use client'

import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { createFilters } from 'compositions/ui/filters'
import { GridList } from 'compositions/ui/grid-list'
import { z } from 'zod'

const issueFilters = createFilters({
  fields: {
    status: {
      type: 'enum',
      label: 'Status',
      schema: z.enum(['Backlog', 'In progress', 'Done']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      meta: {
        icon: <Box boxSize="2" rounded="full" bg="gray.500" />,
        pluralLabel: 'statuses',
      },
      options: [
        {
          value: 'Backlog',
          label: 'Backlog',
          meta: {
            icon: <Box boxSize="2" rounded="full" bg="gray.500" />,
          },
        },
        {
          value: 'In progress',
          label: 'In progress',
          meta: {
            icon: <Box boxSize="2" rounded="full" bg="blue.500" />,
          },
        },
        {
          value: 'Done',
          label: 'Done',
          meta: {
            icon: <Box boxSize="2" rounded="full" bg="green.500" />,
          },
        },
      ],
    },
    title: {
      type: 'string',
      label: 'Title',
      schema: z.string().min(1),
      operators: ['contains', 'equals', 'startsWith'],
      defaultOperator: 'contains',
    },
    estimate: {
      type: 'number',
      label: 'Estimate',
      schema: z.coerce.number().min(0),
      operators: ['equals', 'gte', 'lte', 'between'],
      defaultOperator: 'gte',
    },
  },
  operatorLabels: {
    gte: 'at least',
    lte: 'at most',
  },
  formatValue: ({ fieldId, value }) => {
    if (fieldId === 'estimate' && typeof value === 'number') {
      return `${value} ${value === 1 ? 'point' : 'points'}`
    }
    return undefined
  },
})

interface Issue {
  id: string
  title: string
  status: 'Backlog' | 'In progress' | 'Done'
  estimate: number
}

const issues: Issue[] = [
  {
    id: 'ENG-101',
    title: 'Add keyboard shortcuts',
    status: 'Backlog',
    estimate: 3,
  },
  {
    id: 'ENG-102',
    title: 'Fix invitation flow',
    status: 'In progress',
    estimate: 2,
  },
  {
    id: 'ENG-103',
    title: 'Add saved views',
    status: 'In progress',
    estimate: 5,
  },
  {
    id: 'ENG-104',
    title: 'Update onboarding copy',
    status: 'Done',
    estimate: 1,
  },
]

export function FiltersIssueList() {
  const conditions = issueFilters.useConditions()
  const matches = conditions.useFilter(issues)

  return (
    <conditions.Root>
      <Stack gap="4">
        <conditions.FilterBar />

        <Text textStyle="sm" color="fg.muted" aria-live="polite">
          {matches.length} of {issues.length} issues
        </Text>

        <GridList.Root
          aria-label="Issues"
          borderWidth="1px"
          rounded="md"
          divideY="1px"
        >
          {matches.map((issue) => (
            <GridList.Item key={issue.id} p="4" gap="3" flexWrap="wrap">
              <GridList.Cell textStyle="sm" color="fg.muted">
                {issue.id}
              </GridList.Cell>
              <GridList.Cell flex="1" minW="40" fontWeight="medium">
                {issue.title}
              </GridList.Cell>
              <GridList.Cell textStyle="sm">{issue.status}</GridList.Cell>
              <GridList.Cell textStyle="sm" color="fg.muted">
                {issue.estimate} {issue.estimate === 1 ? 'point' : 'points'}
              </GridList.Cell>
            </GridList.Item>
          ))}
        </GridList.Root>

        {matches.length === 0 && (
          <Stack p="6" align="center">
            <Text>No issues match these filters.</Text>
            <Button
              variant="outline"
              onClick={() => conditions.actions.clear()}
            >
              Clear filters
            </Button>
          </Stack>
        )}
      </Stack>
    </conditions.Root>
  )
}
