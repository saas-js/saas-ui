'use client'

import { HStack } from '@chakra-ui/react'
import type { ValueEditorProps } from '@saas-js/conditions-react'

import { Input } from '../input/index.ts'

function toDateInput(value: unknown) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return ''
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${value.getFullYear()}-${month}-${day}`
}

export function FiltersStringEditor({
  value,
  onValueChange,
  error,
}: ValueEditorProps<string>) {
  return (
    <Input
      size="sm"
      autoFocus
      value={value ?? ''}
      aria-invalid={Boolean(error)}
      placeholder="Enter a value"
      onChange={(event) => onValueChange(event.target.value)}
    />
  )
}

export function FiltersNumberEditor({
  value,
  onValueChange,
  operator,
  error,
}: ValueEditorProps) {
  const values = Array.isArray(value) ? value : [value]
  const range = operator.valueMode === 'range'

  const update = (index: number, raw: string) => {
    const parsed = raw === '' ? undefined : Number(raw)
    if (range) {
      const next = [values[0], values[1]]
      next[index] = parsed
      onValueChange(next as unknown as readonly [number, number])
      return
    }
    onValueChange(parsed as number)
  }

  return (
    <HStack gap="2">
      {(range ? [0, 1] : [0]).map((index) => (
        <Input
          key={index}
          size="sm"
          type="number"
          autoFocus={index === 0}
          value={values[index] ?? ''}
          aria-invalid={Boolean(error)}
          placeholder={range ? (index === 0 ? 'Min' : 'Max') : 'Amount'}
          onChange={(event) => update(index, event.target.value)}
        />
      ))}
    </HStack>
  )
}

export function FiltersDateEditor({
  value,
  onValueChange,
  operator,
}: ValueEditorProps) {
  const values = Array.isArray(value) ? value : [value]
  const range = operator.valueMode === 'range'

  const update = (index: number, raw: string) => {
    const parsed = raw ? new Date(`${raw}T00:00:00`) : undefined
    if (range) {
      const next = [values[0], values[1]]
      next[index] = parsed
      onValueChange(next as unknown as readonly [Date, Date])
      return
    }
    onValueChange(parsed as Date)
  }

  return (
    <HStack gap="2">
      {(range ? [0, 1] : [0]).map((index) => (
        <Input
          key={index}
          size="sm"
          type="date"
          autoFocus={index === 0}
          value={toDateInput(values[index])}
          onChange={(event) => update(index, event.target.value)}
        />
      ))}
    </HStack>
  )
}
