'use client'

import { useMemo } from 'react'

import { createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'
import { useAsync } from 'react-use'

interface Item {
  name: string
  url: string
}

export const SelectAsyncLoading = () => {
  const state = useAsync(async (): Promise<Item[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    const data = await response.json()
    return data.results
  }, [])

  const pokemons = useMemo(() => {
    return createListCollection({
      items: state.value || [],
      itemToString: (item) => item.name,
      itemToValue: (item) => item.name,
    })
  }, [state.value])

  return (
    <Select.Root collection={pokemons} size="sm" width="320px">
      <Select.Label>Select pokemon</Select.Label>
      <Select.Trigger>
        <Select.ValueText placeholder="Pokemon" />
      </Select.Trigger>
      <Select.Content>
        {pokemons.items.map((pokemon) => (
          <Select.Item item={pokemon} key={pokemon.name}>
            {pokemon.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
