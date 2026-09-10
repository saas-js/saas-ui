import {
  type RecipeVariantProps,
  defineSlotRecipe,
} from '@chakra-ui/react/styled-system'

export const splitPageSlotRecipe = defineSlotRecipe({
  className: 'sui-split-page',
  slots: ['root', 'content'],
  base: {
    root: {
      display: 'flex',
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      flexDirection: 'row',
      _vertical: {
        flexDirection: 'column',
      },
    },
    content: {
      display: 'flex',
      flex: 1,
      height: '100%',
    },
  },
  variants: {
    mobile: {
      true: {
        content: {
          transitionProperty: 'right',
          position: 'absolute',
          zIndex: 'layer-1',
          top: 0,
          right: { base: '-100%', lg: '0' },
          bottom: 0,
          width: '100vw',

          _open: {
            right: 0,
            opacity: 1,
            transitionDuration: 'moderate',
            transitionTimingFunction: 'bounce-in',
          },
          _closed: {
            right: '-100%',
            opacity: 0,
            transitionDuration: 'fast',
            transitionTimingFunction: 'bounce-out',
          },
        },
      },
    },
  },
})

export type SplitPageVariantProps = RecipeVariantProps<
  typeof splitPageSlotRecipe
>
