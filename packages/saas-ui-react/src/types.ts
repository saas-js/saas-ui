import {
  RecipeProps as ChakraRecipeProps,
  SlotRecipeProps as ChakraSlotRecipeProps,
  type RecipeDefinition,
  type SlotRecipeDefinition,
} from '@chakra-ui/react'

export type RecipeProps<T, DefaultRecipe> =
  ChakraRecipeProps<T> extends { recipe?: RecipeDefinition }
    ? ChakraRecipeProps<T> & DefaultRecipe
    : ChakraRecipeProps<T>

export type SlotRecipeProps<T, DefaultSlotRecipe> =
  ChakraSlotRecipeProps<T> extends { variant?: any }
    ? ChakraSlotRecipeProps<T>
    : ChakraSlotRecipeProps<T> & DefaultSlotRecipe

type Test = ChakraSlotRecipeProps<'suiGridList'>
