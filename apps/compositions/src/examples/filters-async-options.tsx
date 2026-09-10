'use client'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { createFilters } from 'compositions/ui/filters'
import { LuBuilding2, LuUserRound } from 'react-icons/lu'
import { z } from 'zod'

interface Contact {
  id: string
  name: string
  owner: string
}

const owners = [
  'Maya Chen',
  'Jon Bell',
  'Priya Shah',
  'Alex Moreno',
  'Noor Aziz',
  'Sam Whitfield',
]

const contacts: Contact[] = [
  { id: '1', name: 'Northstar Labs', owner: 'Maya Chen' },
  { id: '2', name: 'Kite & Harbor', owner: 'Jon Bell' },
  { id: '3', name: 'Arcwell Health', owner: 'Priya Shah' },
  { id: '4', name: 'Fieldnote Studio', owner: 'Alex Moreno' },
  { id: '5', name: 'Copperline', owner: 'Noor Aziz' },
  { id: '6', name: 'Daybreak Energy', owner: 'Maya Chen' },
  { id: '7', name: 'Plainspoken', owner: 'Sam Whitfield' },
  { id: '8', name: 'Orbit Commerce', owner: 'Jon Bell' },
]

const contactFilters = createFilters({
  fields: {
    owner: {
      type: 'enum',
      label: 'Owner',
      schema: z.string().min(1),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      meta: { icon: <LuUserRound />, pluralLabel: 'owners' },
      // Async option sources get a search input, debounced queries and a
      // loading state in the value editor, without extra wiring.
      options: async ({ query, signal }) => {
        await new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, 400)
          signal.addEventListener('abort', () => {
            clearTimeout(timer)
            reject(new DOMException('Aborted', 'AbortError'))
          })
        })
        return owners
          .filter((owner) => owner.toLowerCase().includes(query.toLowerCase()))
          .map((owner) => ({ value: owner, label: owner }))
      },
    },
    name: {
      type: 'string',
      label: 'Name',
      schema: z.string().min(1),
      operators: ['contains', 'equals', 'startsWith'],
      defaultOperator: 'contains',
      meta: { icon: <LuBuilding2 /> },
    },
  },
})

export function FiltersAsyncOptions() {
  const conditions = contactFilters.useConditions()
  const matches = conditions.useFilter(contacts)

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
          {matches.map((contact) => (
            <HStack key={contact.id} px="4" py="2.5" gap="4">
              <Text textStyle="sm" fontWeight="medium" flex="1" truncate>
                {contact.name}
              </Text>
              <Text textStyle="sm" color="fg.muted">
                {contact.owner}
              </Text>
            </HStack>
          ))}
          {!matches.length ? (
            <Text textStyle="sm" color="fg.muted" textAlign="center" py="8">
              No contacts match these filters.
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </conditions.Root>
  )
}
