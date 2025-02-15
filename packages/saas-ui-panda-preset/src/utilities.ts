const createFocusRing = (selector: string) => {
  return {
    values: ['outside', 'inside', 'mixed', 'none'],
    transform(value: any, { token }: any) {
      const focusRingColor = token('colors.colorPalette.focusRing')
      const styles: Record<string, any> = {
        inside: {
          '--focus-ring-color': focusRingColor,
          [selector]: {
            outlineOffset: '0px',
            outlineWidth: 'var(--focus-ring-width, 0)',
            outlineColor: 'var(--focus-ring-color)',
            outlineStyle: 'var(--focus-ring-style, solid)',
            borderColor: 'var(--focus-ring-color)',
          },
        },
        outside: {
          '--focus-ring-color': focusRingColor,
          [selector]: {
            outlineWidth: 'var(--focus-ring-width, 1px)',
            outlineOffset: 'var(--focus-ring-offset, 2px)',
            outlineStyle: 'var(--focus-ring-style, solid)',
            outlineColor: 'var(--focus-ring-color)',
          },
        },
        mixed: {
          '--focus-ring-color': focusRingColor,
          [selector]: {
            outlineWidth: 'var(--focus-ring-width, 3px)',
            outlineStyle: 'var(--focus-ring-style, solid)',
            outlineColor:
              'color-mix(in srgb, var(--focus-ring-color), transparent 60%)',
            borderColor: 'var(--focus-ring-color)',
          },
        },
        none: {
          '--focus-ring-color': focusRingColor,
          [selector]: {
            outline: 'none',
          },
        },
      }

      return styles[value] ?? {}
    },
  }
}

export const utilities = {
  focusRing: createFocusRing('&:is(:focus, [data-focus])'),
  focusVisibleRing: createFocusRing(
    '&:is(:focus-visible, [data-focus-visible])',
  ),
}
