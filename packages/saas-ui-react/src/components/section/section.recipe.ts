import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

const slots = ['root', 'header', 'title', 'description', 'body']

export const sectionSlotRecipe = defineSlotRecipe({
  className: 'sui-section',
  slots,
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      flexShrink: 0,
      mb: 4,
    },
    title: {
      textStyle: 'heading',
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
      mb: 1,
    },
    description: {
      color: 'fg.muted',
      fontSize: 'md',
      '& a': {
        fontWeight: 'medium',
        color: 'fg',
      },
    },
    body: {
      flex: 1,
      minWidth: 0,
    },
  },
  variants: {
    variant: {
      annotated: {
        root: {
          flexDirection: {
            base: 'column',
            md: 'row',
          },
          mt: 4,
        },
        header: {
          width: {
            base: 'full',
            md: '30%',
          },
          mb: {
            base: 4,
            md: 0,
          },
          pe: {
            base: 4,
            md: 8,
          },
        },
      },
    },
  },
  defaultVariants: {},
})
