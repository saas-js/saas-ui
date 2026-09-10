import { tableAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

const lineVariant = {
  columnHeader: {
    borderBottomWidth: '1px',
  },
  cell: {
    borderBottomWidth: '1px',
  },
  row: {
    bg: 'transparent',
  },
}

export const tableSlotRecipe = defineSlotRecipe({
  className: 'chakra-table',
  slots: tableAnatomy.keys(),
  base: {
    root: {
      fontVariantNumeric: 'lining-nums tabular-nums',
      borderCollapse: 'collapse',
      width: 'full',
      textAlign: 'start',
      verticalAlign: 'top',
    },
    row: {
      _selected: {
        bg: 'colorPalette.subtle',
      },
    },
    cell: {
      textAlign: 'start',
      alignItems: 'center',
    },
    columnHeader: {
      fontWeight: 'medium',
      textAlign: 'start',
      color: 'fg',
    },
    caption: {
      fontWeight: 'medium',
      textStyle: 'xs',
    },
    footer: {
      fontWeight: 'medium',
    },
  },

  variants: {
    interactive: {
      true: {
        body: {
          '& tr': {
            _hover: {
              bg: 'interaction.hover',
            },
          },
        },
      },
    },

    stickyHeader: {
      true: {
        header: {
          '& :where(tr)': {
            top: 'var(--table-sticky-offset, 0)',
            position: 'sticky',
            zIndex: 1,
          },
        },
      },
    },

    striped: {
      true: {
        row: {
          '&:nth-of-type(odd) td': {
            bg: 'bg.muted',
          },
        },
      },
    },

    showColumnBorder: {
      true: {
        columnHeader: {
          '&:not(:last-of-type)': {
            borderInlineEndWidth: '1px',
          },
        },
        cell: {
          '&:not(:last-of-type)': {
            borderInlineEndWidth: '1px',
          },
        },
      },
    },

    variant: {
      line: lineVariant,

      inset: {
        ...lineVariant,
        root: {
          marginInline: 'calc(0px - var(--table-cell-padding-x))',
          width:
            'calc(100% + var(--table-cell-padding-x) + var(--table-cell-padding-x))',
        },
      },

      outline: {
        root: {
          boxShadow: '0 0 0 1px {colors.border}',
          overflow: 'hidden',
        },
        columnHeader: {
          borderBottomWidth: '1px',
        },
        header: {
          bg: 'bg.muted',
        },
        row: {
          '&:not(:last-of-type)': {
            borderBottomWidth: '1px',
          },
        },
        footer: {
          borderTopWidth: '1px',
        },
      },
    },

    size: {
      sm: {
        root: {
          '--table-cell-padding-x': 'spacing.1',
          '--control-height': 'sizes.control.sm',
          textStyle: 'sm',
        },
        columnHeader: {
          px: 'var(--table-cell-padding-x)',
          py: '1',
        },
        cell: {
          px: 'var(--table-cell-padding-x)',
          py: '1',
        },
      },

      md: {
        root: {
          '--table-cell-padding-x': 'spacing.2',
          '--control-height': 'sizes.control.md',
          textStyle: 'sm',
        },
        columnHeader: {
          px: 'var(--table-cell-padding-x)',
          py: '2',
        },
        cell: {
          px: 'var(--table-cell-padding-x)',
          py: '2',
        },
      },

      lg: {
        root: {
          '--table-cell-padding-x': 'spacing.4',
          '--control-height': 'sizes.control.lg',
          textStyle: 'md',
        },
        columnHeader: {
          px: 'var(--table-cell-padding-x)',
          py: '3',
        },
        cell: {
          px: 'var(--table-cell-padding-x)',
          py: '3',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'line',
    size: 'md',
  },
})
