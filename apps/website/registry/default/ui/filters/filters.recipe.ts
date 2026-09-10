import { type RecipeVariantProps, defineSlotRecipe } from '@chakra-ui/react'

/**
 * The recipe is used inline via `createSlotRecipeContext({ recipe })`, so
 * installing the component requires no theme configuration. Chips are
 * composed from the registry `Button`; the recipe only owns the bar and
 * chip layout so both stay targetable with stable class names.
 */
export const filtersSlotRecipe = defineSlotRecipe({
  className: 'sui-filters',
  slots: ['bar', 'chip'],
  base: {
    bar: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '2',
    },
    chip: {
      display: 'inline-flex',
      alignItems: 'stretch',
      borderWidth: '1px',
      borderColor: 'border',
      rounded: 'md',
      overflow: 'hidden',
      bg: 'bg',
      // The segments render attached: square inner corners (the chip's own
      // radius + overflow clipping shape the outside) and hairline dividers.
      // Menu roots render no DOM, so the direct children are the segments.
      '& > *': {
        borderRadius: '0!',
      },
      '& > * + *': {
        borderInlineStartWidth: '1px',
        borderColor: 'border',
      },
    },
  },
})

export type FiltersVariantProps = RecipeVariantProps<typeof filtersSlotRecipe>
