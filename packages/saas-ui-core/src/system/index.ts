import type { ElementType } from 'react'

import { HTMLChakraProps, chakra } from '@chakra-ui/react'
import type { Dict } from '@chakra-ui/utils'

export const sui = chakra

export type HTMLSystemProps<
  T extends ElementType,
  P extends Dict = {},
> = HTMLChakraProps<T, P>

export {
  createSlotRecipeContext,
  createRecipeContext,
  useRecipe,
  defineRecipe,
  defineSlotRecipe,
} from '@chakra-ui/react'

export type {
  SlotRecipeProps,
  RecipeProps,
  UnstyledProp,
} from '@chakra-ui/react'
