import { defineSlotRecipe } from '@chakra-ui/react'
import { pinInputAnatomy } from '@chakra-ui/react/anatomy'

import { mapEntries } from '../../utils.ts'
import { inputRecipe } from './input'

const { variants, defaultVariants } = inputRecipe

export const pinInputSlotRecipe = defineSlotRecipe({
  className: 'chakra-pin-input',
  slots: pinInputAnatomy.keys(),
  base: {
    input: {
      ...inputRecipe.base,
      textAlign: 'center',
      width: 'var(--input-height)',
    },
  },
  variants: {
    size: mapEntries(variants!.size, (key, value) => [
      key,
      {
        input: {
          ...value,
          px: 0,
        },
      },
    ]),
    variant: mapEntries(variants!.variant, (key, value) => [
      key,
      { input: value },
    ]),
  },
  defaultVariants: defaultVariants,
})