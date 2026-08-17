import {
  type RecipeVariantProps,
  defineSlotRecipe,
} from '@chakra-ui/react/styled-system'

export const asideSlotRecipe = defineSlotRecipe({
  className: 'sui-aside',
  slots: ['root', 'headerWrapper', 'header', 'title', 'body'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minH: 0,
      position: 'relative',
      transitionProperty: 'margin-right',
      _open: {
        marginRight: 0,
        transitionDuration: 'moderate',
        transitionTimingFunction: 'bounce-in',
      },
      _closed: {
        marginRight: 'calc(var(--aside-width, 360px) * -1)',
        transitionDuration: 'fast',
        transitionTimingFunction: 'bounce-out',
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      minH: 12,
      borderBottomWidth: '1px',
    },
    title: {
      fontWeight: 'medium',
    },
    body: {
      flex: 1,
      overflow: 'auto',
    },
  },
  variants: {
    size: {
      md: {
        header: {
          p: 4,
        },
        title: {
          fontSize: 'md',
        },
        body: {
          p: 4,
        },
      },
      lg: {
        header: {
          p: 6,
        },
        title: {
          fontSize: 'lg',
        },
        body: {
          p: 6,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type AsideVariantProps = RecipeVariantProps<typeof asideSlotRecipe>
