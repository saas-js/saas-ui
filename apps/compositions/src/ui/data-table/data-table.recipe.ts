import { type RecipeVariantProps, defineSlotRecipe } from '@chakra-ui/react'

/**
 * The data table renders semantic table elements with a flex-based layout:
 * rows are flex containers and cells get their width from per-column CSS
 * variables (see `DataTableTable`). This is what makes resizing cheap (no
 * row re-renders) and lets rows and cells be windowed independently when
 * virtualization is enabled.
 *
 * The recipe is used inline via `createSlotRecipeContext({ recipe })`, so
 * installing the component requires no theme configuration.
 */
export const dataTableSlotRecipe = defineSlotRecipe({
  className: 'sui-data-table',
  slots: [
    'root',
    'scrollArea',
    'table',
    'header',
    'body',
    'footer',
    'row',
    'columnHeader',
    'columnTitle',
    'cell',
    'resizer',
    'empty',
    'pagination',
  ],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minWidth: 0,
      bg: 'bg',
      '--dt-selection-border': '{colors.accent.solid}',
    },
    scrollArea: {
      position: 'relative',
      overflow: 'auto',
      flex: '1 1 auto',
      minHeight: 0,
      width: '100%',
    },
    table: {
      display: 'block',
      width: 'fit-content',
      minWidth: '100%',
      fontVariantNumeric: 'lining-nums tabular-nums',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    header: {
      display: 'block',
      width: 'fit-content',
      minWidth: '100%',
      '&[data-sticky]': {
        position: 'sticky',
        top: 0,
        zIndex: 2,
      },
      '& tr': {
        '--dt-row-bg': '{colors.bg}',
        bg: 'var(--dt-row-bg)',
      },
    },
    body: {
      display: 'block',
      width: 'fit-content',
      minWidth: '100%',
    },
    footer: {
      display: 'block',
      width: 'fit-content',
      minWidth: '100%',
      '&[data-sticky]': {
        position: 'sticky',
        bottom: 0,
        zIndex: 2,
      },
      '& tr': {
        '--dt-row-bg': '{colors.bg}',
        bg: 'var(--dt-row-bg)',
        borderBottomWidth: '0',
        borderTopWidth: '1px',
        borderColor: 'border.subtle',
      },
    },
    row: {
      display: 'flex',
      width: '100%',
      alignItems: 'stretch',
      borderBottomWidth: '1px',
      borderColor: 'border.muted',
      '--dt-row-bg': '{colors.bg}',
      bg: 'var(--dt-row-bg)',
      '&[data-selected]': {
        '--dt-row-bg': '{colors.colorPalette.subtle}',
      },
      '&[data-interactive]': {
        cursor: 'pointer',
        _focusVisible: {
          outline: '2px solid',
          outlineColor: 'colorPalette.focusRing',
          outlineOffset: '-2px',
        },
      },
      // bg.muted, not bg.subtle: in the Saas UI preset bg.subtle is the
      // translucent interaction.hover tint, but this var must stay opaque —
      // pinned cells paint it over content scrolling beneath them. bg.muted
      // (bg.inset) is the opaque, gently recessed surface color.
      '&[data-interactive]:hover:not([data-selected])': {
        '--dt-row-bg': '{colors.bg.muted}',
      },
    },
    columnHeader: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      gap: '1',
      fontWeight: 'medium',
      color: 'fg.muted',
      textAlign: 'start',
      '&[data-is-numeric]': {
        justifyContent: 'flex-end',
      },
      // Pinned cells float over content scrolling beneath them, so they
      // need their own paint: an opaque base with the row color layered on
      // top, which keeps translucent row states (selected, hover) from
      // letting the scrolled columns bleed through.
      '&[data-pinned]': {
        position: 'sticky',
        zIndex: 1,
        bg: 'bg',
        backgroundImage: 'linear-gradient(var(--dt-row-bg), var(--dt-row-bg))',
      },
      '&[data-pinned=start]': {
        insetInlineStart: 'var(--dt-pinned-offset)',
      },
      '&[data-pinned=end]': {
        insetInlineEnd: 'var(--dt-pinned-offset)',
      },
      '&[data-pinned-boundary=start]': {
        boxShadow: 'inset -1px 0 0 {colors.border.subtle}',
      },
      '&[data-pinned-boundary=end]': {
        boxShadow: 'inset 1px 0 0 {colors.border.subtle}',
      },
      // The resizer straddles the column border, which would poke past the
      // table edge on the last column and create a few px of horizontal
      // scroll — keep it fully inside there.
      '&:last-of-type .sui-data-table__resizer': {
        insetInlineEnd: '0',
      },
    },
    columnTitle: {
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      minWidth: 0,
      gap: '1',
      textAlign: 'inherit',
      '&[data-is-numeric]': {
        justifyContent: 'flex-end',
      },
      '&[data-sortable]': {
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: 'sm',
        _focusVisible: {
          outline: '2px solid',
          outlineColor: 'colorPalette.focusRing',
          outlineOffset: '2px',
        },
      },
      '& [data-sort-hint]': {
        opacity: 0,
        transition: 'opacity 0.15s',
      },
      '&:hover [data-sort-hint]': {
        opacity: 0.6,
      },
    },
    cell: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      overflow: 'hidden',
      textAlign: 'start',
      '&[data-is-numeric]': {
        justifyContent: 'flex-end',
      },
      // See columnHeader: opaque base + row color layer, so translucent row
      // states never expose the columns scrolling underneath.
      '&[data-pinned]': {
        position: 'sticky',
        zIndex: 1,
        bg: 'bg',
        backgroundImage: 'linear-gradient(var(--dt-row-bg), var(--dt-row-bg))',
      },
      // Cell selection (opt-in): selected cells layer the accent tint over
      // the row color; the range outline is drawn per-edge from inline
      // box-shadows set by DataTableCell.
      '&[data-cell-selectable]': {
        userSelect: 'none',
      },
      '&[data-cell-selected]': {
        backgroundImage:
          'linear-gradient({colors.accent.subtle}, {colors.accent.subtle}), linear-gradient(var(--dt-row-bg), var(--dt-row-bg))',
      },
      '&[data-pinned=start]': {
        insetInlineStart: 'var(--dt-pinned-offset)',
      },
      '&[data-pinned=end]': {
        insetInlineEnd: 'var(--dt-pinned-offset)',
      },
      '&[data-pinned-boundary=start]': {
        boxShadow: 'inset -1px 0 0 {colors.border.subtle}',
      },
      '&[data-pinned-boundary=end]': {
        boxShadow: 'inset 1px 0 0 {colors.border.subtle}',
      },
    },
    resizer: {
      position: 'absolute',
      insetInlineEnd: '-1',
      top: 0,
      height: '100%',
      width: '2',
      zIndex: 2,
      cursor: 'col-resize',
      userSelect: 'none',
      touchAction: 'none',
      display: 'flex',
      justifyContent: 'center',
      color: 'transparent',
      _after: {
        content: '""',
        width: '1px',
        height: '100%',
        bg: 'currentColor',
      },
      _hover: {
        color: 'border.emphasized',
      },
      '&[data-resizing]': {
        color: 'colorPalette.solid',
      },
    },
    empty: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2',
      width: '100%',
      minHeight: '40',
      padding: '8',
      textAlign: 'center',
      color: 'fg.muted',
      textStyle: 'sm',
    },
    pagination: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '3',
      paddingX: '4',
      paddingY: '2',
      borderTopWidth: '1px',
      borderColor: 'border.subtle',
      textStyle: 'sm',
      color: 'fg.muted',
    },
  },
  variants: {
    size: {
      sm: {
        table: { textStyle: 'sm' },
        columnHeader: { paddingX: '2', paddingY: '1.5', textStyle: 'xs' },
        cell: { paddingX: '2', paddingY: '1.5' },
      },
      md: {
        table: { textStyle: 'sm' },
        columnHeader: { paddingX: '3', paddingY: '2', textStyle: 'xs' },
        cell: { paddingX: '3', paddingY: '2.5' },
      },
      lg: {
        table: { textStyle: 'md' },
        columnHeader: { paddingX: '4', paddingY: '2.5', textStyle: 'sm' },
        cell: { paddingX: '4', paddingY: '3' },
      },
    },
    variant: {
      line: {},
      outline: {
        root: {
          borderWidth: '1px',
          borderColor: 'border.subtle',
          borderRadius: 'l3',
          overflow: 'hidden',
        },
      },
    },
    striped: {
      true: {
        row: {
          // Half a step of bg.muted: stripes are ambient texture and must
          // stay quieter than the bg.muted hover state.
          '&[data-odd]:not([data-selected])': {
            '--dt-row-bg':
              'color-mix(in oklab, {colors.bg.muted} 50%, {colors.bg})',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'line',
  },
})

export type DataTableVariantProps = RecipeVariantProps<
  typeof dataTableSlotRecipe
>
