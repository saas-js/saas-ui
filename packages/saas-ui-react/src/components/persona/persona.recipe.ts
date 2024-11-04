import { defineSlotRecipe, defineStyle } from '@chakra-ui/react'

const baseStyleLabel = defineStyle({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  minW: 0,
})

export const personaSlotRecipe = defineSlotRecipe({
  className: 'sui-persona',
  slots: [
    'root',
    'avatar',
    'presence',
    'details',
    'label',
    'secondaryLabel',
    'tertiaryLabel',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    presence: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      right: 0,
      boxSize: '1em',
      transform: 'translate(15%, 15%)',
      borderWidth: '0.15em',
      borderRadius: '50%',
      borderColor: 'bg.panel',
      bg: 'var(--persona-presence)',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      minW: 0,
      lineHeight: 'short',
    },
    label: baseStyleLabel,
    secondaryLabel: {
      ...baseStyleLabel,
      color: 'fg.muted',
    },
    tertiaryLabel: {
      ...baseStyleLabel,
      color: 'fg.muted',
    },
  },
  variants: {
    size: {
      xs: {
        details: { ms: 2 },
        label: { fontSize: 'xs' },
        secondaryLabel: { display: 'none' },
        tertiaryLabel: { display: 'none' },
      },
      sm: {
        details: { ms: 2 },
        label: { fontSize: 'sm' },
        secondaryLabel: { fontSize: 'xs' },
        tertiaryLabel: { display: 'none' },
      },
      md: {
        details: { ms: 2 },
        label: { fontSize: 'sm' },
        secondaryLabel: { fontSize: 'xs' },
        tertiaryLabel: { display: 'none' },
      },
      lg: {
        details: { ms: 3 },
        label: { fontSize: 'md' },
        secondaryLabel: { fontSize: 'sm' },
        tertiaryLabel: { fontSize: 'sm' },
      },
      xl: {
        details: { ms: 4 },
        label: { fontSize: 'lg' },
        secondaryLabel: { fontSize: 'md' },
        tertiaryLabel: { fontSize: 'md' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
