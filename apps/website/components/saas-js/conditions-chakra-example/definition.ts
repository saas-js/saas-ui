import {
  type ConditionQueryForDefinition,
  createConditionQuery,
  defineConditions,
  getConditionOperator,
} from '@saas-js/conditions'
import { z } from 'zod'

export interface Contact {
  id: string
  name: string
  status: 'lead' | 'customer' | 'churned'
  company: string
  arr: number
  createdAt: Date
  subscribed: boolean
}

export const contactConditions = defineConditions({
  fields: {
    status: {
      type: 'enum',
      label: 'Status',
      schema: z.enum(['lead', 'customer', 'churned']),
      operators: ['equals', 'not', 'in'],
      defaultOperator: 'equals',
      options: [
        { value: 'lead', label: 'Lead' },
        { value: 'customer', label: 'Customer' },
        { value: 'churned', label: 'Churned' },
      ],
    },
    company: {
      type: 'string',
      label: 'Company',
      schema: z.string().min(1),
      operators: ['contains', 'equals', 'startsWith', 'isNull'],
      defaultOperator: 'contains',
    },
    arr: {
      type: 'number',
      label: 'ARR',
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
    subscribed: {
      type: 'boolean',
      label: 'Subscribed',
      schema: z.boolean(),
      operators: ['equals'],
      defaultOperator: 'equals',
    },
  },
})

export type ContactFieldId = keyof typeof contactConditions.fields
export type ContactsQuery = ConditionQueryForDefinition<typeof contactConditions>

export const fieldEntries = Object.entries(contactConditions.fields) as [
  ContactFieldId,
  (typeof contactConditions.fields)[ContactFieldId],
][]

export const contacts: Contact[] = [
  {
    id: 'northstar',
    name: 'Maya Chen',
    status: 'customer',
    company: 'Northstar Labs',
    arr: 84_000,
    createdAt: new Date('2025-01-14'),
    subscribed: true,
  },
  {
    id: 'foundry',
    name: 'Jon Bell',
    status: 'lead',
    company: 'Foundry Works',
    arr: 24_000,
    createdAt: new Date('2025-06-03'),
    subscribed: false,
  },
  {
    id: 'meridian',
    name: 'Priya Shah',
    status: 'customer',
    company: 'Meridian Health',
    arr: 132_000,
    createdAt: new Date('2024-11-22'),
    subscribed: true,
  },
  {
    id: 'paperplane',
    name: 'Alex Moreno',
    status: 'churned',
    company: 'Paperplane Studio',
    arr: 18_000,
    createdAt: new Date('2024-08-09'),
    subscribed: false,
  },
  {
    id: 'signal',
    name: 'Noor Aziz',
    status: 'lead',
    company: 'Signal & Tide',
    arr: 56_000,
    createdAt: new Date('2025-05-18'),
    subscribed: true,
  },
]

export const defaultQuery = createConditionQuery({
  items: [
    {
      kind: 'condition',
      id: 'status-customer',
      field: 'status',
      operator: 'equals',
      value: 'customer',
    },
  ],
}) as ContactsQuery

const operatorChipLabels: Record<string, string> = {
  equals: 'is',
  not: 'is not',
  contains: 'contains',
  startsWith: 'starts with',
  gte: '≥',
  lte: '≤',
  between: 'is between',
  in: 'is any of',
  isNull: 'is empty',
}

export function operatorLabel(operatorId?: string) {
  if (!operatorId) return 'is'
  return (
    operatorChipLabels[operatorId] ??
    getConditionOperator(contactConditions, operatorId)?.label ??
    operatorId
  )
}

const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function formatFieldValue(fieldId: string, value: unknown) {
  if (fieldId === 'arr') {
    return currencyFormat.format(Number(value))
  }

  if (fieldId === 'createdAt' && value instanceof Date) {
    return value.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (fieldId === 'status') {
    const option = contactConditions.fields.status.options.find(
      (item) => item.value === value,
    )
    return option?.label ?? String(value ?? '')
  }

  if (fieldId === 'subscribed') return value ? 'Yes' : 'No'
  return value == null ? '' : String(value)
}

export function valueLabel(fieldId: string | undefined, value: unknown) {
  if (!fieldId) return 'Choose value…'
  if (Array.isArray(value)) {
    if (!value.length) return 'Choose value…'
    return value.map((item) => formatFieldValue(fieldId, item)).join(' – ')
  }
  const label = formatFieldValue(fieldId, value)
  return label || 'Choose value…'
}
