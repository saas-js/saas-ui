import { dateInputAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

import { inputRecipe } from '../recipes/input.recipe.ts'
import { mapEntries } from '../utils.ts'

const { variants, defaultVariants } = inputRecipe

// Focus lands on the individual segments, so the group shows its ring from
// `data-focus` (set by Ark) instead of its own `:focus-visible`.
const groupFocus = {
  outline: {
    focusVisibleRing: undefined,
    focusRing: 'inside',
    focusRingWidth: '0',
    _focus: {
      borderColor: 'var(--focus-ring-color)',
    },
  },
  subtle: {
    focusVisibleRing: undefined,
    focusRing: 'inside',
  },
  flushed: {
    _focusVisible: undefined,
    _focus: {
      borderColor: 'var(--focus-color)',
      boxShadow: '0px 1px 0px 0px var(--focus-color)',
      _invalid: {
        borderColor: 'var(--error-color)',
        boxShadow: '0px 1px 0px 0px var(--error-color)',
      },
    },
  },
} as const

const segmentFocus = {
  outline: { bg: 'colorPalette.subtle', color: 'colorPalette.fg' },
  subtle: { bg: 'colorPalette.subtle', color: 'colorPalette.fg' },
  flushed: { bg: 'colorPalette.subtle', color: 'colorPalette.fg' },
} as const

export const dateInputSlotRecipe = defineSlotRecipe({
  className: 'chakra-date-input',
  slots: dateInputAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    label: {
      fontWeight: 'medium',
      userSelect: 'none',
      textStyle: 'sm',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      width: 'full',
    },
    segmentGroup: {
      ...inputRecipe.base,
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5',
      cursor: 'text',
      fontVariantNumeric: 'tabular-nums',
    },
    segment: {
      borderRadius: 'control.sm',
      px: '0.5',
      outline: 'none',
      _placeholderShown: {
        color: 'fg.subtle',
      },
      '&[data-type=literal]': {
        px: '0',
        color: 'fg.subtle',
      },
    },
  },

  variants: {
    size: mapEntries(variants!.size, (key, value) => [
      key,
      { segmentGroup: value },
    ]),
    variant: mapEntries(variants!.variant, (key, value) => [
      key,
      {
        segmentGroup: { ...value, ...groupFocus[key] },
        segment: { _focus: segmentFocus[key] },
      },
    ]),
  },

  defaultVariants: defaultVariants,
})
