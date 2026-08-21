'use client'

import {
  Badge,
  Box,
  ButtonGroup,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'
import { createFilters } from 'compositions/ui/filters'
import { Page } from 'compositions/ui/page'
import { LuLayers } from 'react-icons/lu'
import { z } from 'zod'

interface Account {
  id: string
  company: string
  plan: 'Enterprise' | 'Growth' | 'Starter'
  status: 'Active' | 'Trial' | 'Paused'
}

const accounts: Account[] = [
  { id: '1', company: 'Northstar Labs', plan: 'Enterprise', status: 'Active' },
  { id: '2', company: 'Kite & Harbor', plan: 'Growth', status: 'Trial' },
  { id: '3', company: 'Arcwell Health', plan: 'Enterprise', status: 'Active' },
  { id: '4', company: 'Fieldnote Studio', plan: 'Starter', status: 'Paused' },
  { id: '5', company: 'Copperline', plan: 'Growth', status: 'Active' },
  { id: '6', company: 'Daybreak Energy', plan: 'Enterprise', status: 'Active' },
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
  },
})

function statusColor(status: Account['status']) {
  if (status === 'Active') return 'green'
  if (status === 'Trial') return 'blue'
  return 'gray'
}

export const PageWithFilters = () => {
  const conditions = accountFilters.useConditions()
  const matches = conditions.useFilter(accounts)

  return (
    <conditions.Root>
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
          footer={
            <conditions.FilterBar px="var(--page-header-padding-x)" pb="3" />
          }
        />
        <Page.Body p="0">
          <Stack gap="0" divideY="1px" divideColor="border">
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
        </Page.Body>
      </Page.Root>
    </conditions.Root>
  )
}
