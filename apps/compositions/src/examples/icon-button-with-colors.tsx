import { For, HStack } from '@chakra-ui/react'
import { IconButton } from 'compositions/ui/icon-button'
import { LuSearch } from 'react-icons/lu'

import { colorPalettes } from '../lib/color-palettes'

export const IconButtonWithColors = () => {
  return (
    <HStack wrap="wrap">
      <For each={colorPalettes}>
        {(c) => (
          <IconButton aria-label="Search database" key={c} colorPalette={c}>
            <LuSearch />
          </IconButton>
        )}
      </For>
    </HStack>
  )
}
