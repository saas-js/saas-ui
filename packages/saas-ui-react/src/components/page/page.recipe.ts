import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

const slots = [
  'root',
  'header',
  'headerContent',
  'heading',
  'headerFooter',
  'title',
  'description',
  'body',
]

export const pageSlotRecipe = defineSlotRecipe({
  className: 'sui-page',
  slots,
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minH: 0,
    },
    title: {
      fontWeight: 'medium',
      fontSize: 'sm',
    },
    description: {
      color: 'fg.muted',
      fontSize: 'xs',
    },
    body: {
      flex: 1,
      overflowY: 'auto',
      p: 4,
    },
  },
  variants: {
    variant: {
      panel: {
        root: {
          '--page-bg-color': 'colors.bg.muted',
          bg: 'color-mix(in srgb, var(--page-bg-color) 50%, white)',
          zIndex: 1,
        },
        header: {
          '--page-header-row-height': '40px',
          display: 'grid',
          gridTemplateAreas: `"nav heading actions"
               "footer footer footer"`,
          gridTemplateColumns: 'auto max-content 1fr',
          gridTemplateRows: 'minmax(var(--page-header-row-height), auto)',
          columnGap: 2,
          alignItems: 'center',
          justifyContent: 'stretch',
          flexShrink: 0,
          px: 3,
          borderBottomWidth: '1px',
        },
        title: {
          me: 4,
        },
      },
      settings: {
        root: {
          overflowY: 'auto',
          px: 4,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          mb: {
            base: 4,
            lg: 8,
          },
          minH: 24,
        },
        heading: {
          py: {
            base: 4,
            lg: 8,
          },
        },
        title: {
          textStyle: '2xl',
        },
        description: {
          textStyle: 'md',
        },
        body: {
          overflow: 'visible',
          p: 0,
        },
      },
    },
  },
  defaultVariants: {
    variant: 'panel',
  },
})
