'use client'

import { For, useRecipe } from '@chakra-ui/react'
import { Spinner } from '@saas-ui/react'

export const SpinnerSizeTable = () => {
  const recipe = useRecipe({ key: 'spinner' })
  return (
    <div>
      <For each={recipe.variantMap.size}>
        {(size) => (
          <Spinner key={size} margin={3} color="green.500" size={size} />
        )}
      </For>
    </div>
  )
}
