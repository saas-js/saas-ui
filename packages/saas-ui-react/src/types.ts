import {
  RecipeProps as ChakraRecipeProps,
  SlotRecipeProps as ChakraSlotRecipeProps,
  type RecipeDefinition,
} from '@chakra-ui/react'

export type RecipeProps<T, DefaultRecipe> =
  ChakraRecipeProps<T> extends { recipe?: RecipeDefinition }
    ? ChakraRecipeProps<T> & DefaultRecipe
    : ChakraRecipeProps<T>

export type SlotRecipeProps<T, DefaultSlotRecipe> =
  ChakraSlotRecipeProps<T> extends { recipe?: RecipeDefinition }
    ? ChakraSlotRecipeProps<T> & DefaultSlotRecipe
    : ChakraSlotRecipeProps<T>
