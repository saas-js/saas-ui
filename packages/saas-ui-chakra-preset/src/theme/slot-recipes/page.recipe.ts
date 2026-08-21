import {
  type RecipeVariantProps,
  defineSlotRecipe,
} from '@chakra-ui/react/styled-system'

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
    header: {
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    },
    headerContent: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      gap: 2,
      minW: 0,
    },
    heading: {
      flex: 1,
      minW: 0,
    },
    headerFooter: {
      /**
       * The footer row is full bleed, so content like filter bars and toolbars
       * can span the entire width of the header, including their borders.
       * Column flex makes intrinsically sized content, eg a `Group`, stretch.
       * Use `--page-header-padding-x` to align content with the header above.
       */
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
    },
    title: {
      fontWeight: 'medium',
    },
    description: {
      color: 'fg.muted',
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
          '--page-bg-color': 'colors.bg',
          bg: 'var(--page-bg-color)',
          zIndex: 1,
        },
        header: {
          '--page-header-row-height': '40px',
          '--page-header-padding-x': 'spacing.4',
          borderBottomWidth: '1px',
        },
        headerContent: {
          minH: 'var(--page-header-row-height)',
          px: 'var(--page-header-padding-x)',
        },
        title: {
          me: 4,
          textStyle: 'sm',
        },
        description: {
          textStyle: 'xs',
        },
      },
      settings: {
        root: {
          overflowY: 'auto',
          px: 4,
        },
        header: {
          mb: {
            base: 4,
            lg: 8,
          },
        },
        headerContent: {
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

export type PageVariantProps = RecipeVariantProps<typeof pageSlotRecipe>
