import {
  type RecipeVariantProps,
  defineSlotRecipe,
  defineStyle,
} from '@chakra-ui/react/styled-system'

const baseStyleLabel = defineStyle({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  minW: 0,
  color: 'fg',
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
      '--presence-border-color': 'var(--bg-currentcolor)',
      '--persona-presence': '{colors.presence.offline}',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
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
      color: 'fg/60',
    },
    tertiaryLabel: {
      ...baseStyleLabel,
      color: 'fg/60',
    },
  },
  variants: {
    size: {
      '2xs': {
        details: { ms: 1 },
        label: { fontSize: 'xs' },
        secondaryLabel: { display: 'none' },
        tertiaryLabel: { display: 'none' },
      },
      xs: {
        details: { ms: 1.5 },
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
      '2xl': {
        details: { ms: 4 },
        label: { fontSize: 'xl' },
        secondaryLabel: { fontSize: 'lg' },
        tertiaryLabel: { fontSize: 'lg' },
      },
    },
    variant: {
      badge: {
        presence: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          right: 0,
          boxSize: 'calc(var(--avatar-size) / 3)',
          transform: 'translate(12%, 12%)',
          borderWidth: '0.10em',
          borderRadius: '50%',
          borderColor: 'var(--presence-border-color)',
          bg: 'var(--persona-presence)',
          '[data-out-of-office] &': {
            bg: 'var(--presence-border-color)',
            borderColor: 'var(--persona-presence)',
            borderWidth: '0.12em',
            outlineWidth: '0.12em',
            outlineColor: 'var(--presence-border-color)',
            outlineOffset: '0',
            outlineStyle: 'solid',
          },
        },
      },
      ring: {
        presence: {
          outlineWidth: '2px',
          outlineColor: 'var(--persona-presence)',
          outlineOffset: '2px',
          outlineStyle: 'solid',
          borderRadius: 'full',
          position: 'absolute',
          inset: 0,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'badge',
  },
})

export type PersonaVariantProps = RecipeVariantProps<typeof personaSlotRecipe>
