import { defineSlotRecipe } from '../def'

export const segmentGroupSlotRecipe = defineSlotRecipe({
  className: 'chakra-segment-group',
  slots: ['root', 'label', 'item', 'itemText', 'itemControl', 'indicator'],
  base: {
    root: {
      '--segment-radius': 'radii.md',
      borderRadius: 'md',
      display: 'inline-flex',
      boxShadow: 'inset',
      minW: 'max-content',
      textAlign: 'center',
      position: 'relative',
      isolation: 'isolate',
      bg: 'bg.muted',
      borderWidth: '1px',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none',
      fontSize: 'sm',
      position: 'relative',
      color: 'fg.subtle',
      cursor: 'button',
      borderRadius: 'var(--segment-radius)',
      _disabled: {
        opacity: '0.5',
      },
      _hover: {
        color: 'fg',
      },
      '&:has(input:focus-visible)': {
        focusRing: 'inside',
        focusRingWidth: '1px',
      },
      _before: {
        content: '""',
        position: 'absolute',
        insetInlineStart: 0,
        insetBlock: '0',
        bg: 'border',
        width: '1px',
        transition: 'opacity 0.2s',
      },
      _checked: {
        color: 'fg',
      },
      '& + &[data-state=checked], &[data-state=checked] + &, &:first-of-type': {
        _before: {
          opacity: '0',
        },
      },
      '&[data-state=checked][data-ssr]': {
        shadow: 'sm',
        bg: 'bg',
        color: 'fg',
        borderRadius: 'var(--segment-radius)',
      },
    },
    indicator: {
      shadow: 'sm',
      pos: 'absolute',
      bg: {
        base: 'bg',
        _dark: 'bg.emphasized',
      },
      width: 'var(--width)',
      height: 'var(--height)',
      top: 'var(--top)',
      left: 'var(--left)',
      zIndex: -1,
      borderRadius: 'var(--segment-radius)',
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          height: '6',
        },
        item: {
          textStyle: 'xs',
          px: '3',
          gap: '1',
        },
      },
      sm: {
        root: {
          height: '7',
        },
        item: {
          textStyle: 'sm',
          px: '4',
          gap: '2',
        },
      },
      md: {
        root: {
          height: '8',
        },
        item: {
          textStyle: 'md',
          px: '4',
          gap: '2',
        },
      },
      lg: {
        root: {
          height: '10',
        },
        item: {
          textStyle: 'md',
          px: '5',
          gap: '3',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
