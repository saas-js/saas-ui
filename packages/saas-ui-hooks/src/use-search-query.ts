'use client'

import * as React from 'react'

import { useControllableState } from '@chakra-ui/react'

const regExpSyntaxCharacter = /[.*+?^${}()|[\]\\]/g

function escapeRegExp(value: string) {
  return value.replace(regExpSyntaxCharacter, '\\$&')
}

interface Result {
  id?: string
  [key: string]: any
}

export interface UseSearchQueryOptions<T> {
  items?: Array<T>
  fields?: string[]
  defaultValue?: string
  value?: string
  onChange?(value: string): void
}

export const useSearchQuery = <T extends Result = Result>(
  props: UseSearchQueryOptions<T> = {},
) => {
  const {
    items,
    fields = ['id'],
    defaultValue = '',
    value,
    onChange: onChangeProp,
  } = props

  const [query, setQuery] = useControllableState({
    defaultValue,
    value,
    onChange: onChangeProp,
  })

  const results = React.useMemo(() => {
    if (!query || !query.length) {
      return items
    }

    const re = query && new RegExp(escapeRegExp(query), 'i')

    return items?.filter((item) =>
      fields.find((field) => item[field]?.match(re)),
    )
  }, [query, items])

  const onChange = (value: string) => {
    setQuery(value)
  }

  const onReset = () => setQuery('')

  return { value: query, results, setQuery, onReset, onChange }
}
