import { describe, expect, it } from 'vitest'

import { emitRecipe, stripSuiPrefix, toKebabCase } from './generate-recipe.ts'

const buttonLike = {
  base: {
    colorPalette: 'gray',
    display: 'inline-flex',
    fontWeight: 'medium',
    focusVisibleRing: 'outside',
    _disabled: {
      layerStyle: 'disabled',
    },
    _icon: {
      fontSize: '1em',
    },
  },
  variants: {
    size: {
      '2xs': {
        px: '2',
        textStyle: 'xs',
      },
      md: {
        px: '3',
        textStyle: 'sm',
      },
    },
    variant: {
      solid: {
        bg: 'colorPalette.solid',
        color: 'colorPalette.contrast',
      },
      plain: {
        color: 'colorPalette.fg',
      },
      surface: {
        bg: 'bg',
      },
    },
    colorPalette: {
      gray: {},
    },
  },
  compoundVariants: [
    {
      variant: 'plain',
      css: {
        px: 0,
      },
    },
    {
      variant: 'surface',
      size: 'md',
      css: {
        shadow: 'sm',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'surface',
    colorPalette: 'gray',
  },
}

describe('emitRecipe', () => {
  it('emits one create() per axis and StyleX variant lookups', () => {
    const result = emitRecipe('button', buttonLike)
    const { code, skipped } = result

    expect(code).toContain('export const buttonStyles = stylex.create')
    expect(code).toContain('export const buttonSizes = stylex.create')
    expect(code).toContain('export const buttonVariants = stylex.create')
    expect(code).toContain('export const buttonWhenVariantSurface = stylex.create')
    expect(code).toContain('export const buttonTextStyles')
    expect(code).toContain('"2xs": textStyles.xs')
    expect(code).toContain('md: textStyles.sm')
    expect(code).toContain('buttonVariants[variant]')
    expect(code).toContain('buttonSizes[size]')
    expect(code).toContain('variant === "surface" && buttonWhenVariantSurface')
    expect(code).not.toContain('colorPalette:')
    expect(code).toContain("from './button.stylex.ts'")
    expect(code).toContain('export { buttonIconVars }')
    expect(code).toContain('export const buttonIcon = stylex.create')
    expect(code).toContain('[buttonIconVars.fontSize]')
    expect(code).toContain('fontSize: buttonIconVars.fontSize')
    expect(result.varsCode).toContain(
      'export const buttonIconVars = stylex.defineVars',
    )
    expect(skipped).not.toContain('_icon')
  })

  it('assigns descendant vars on the parent variant that owned them', () => {
    const { code, varsCode } = emitRecipe('radiomark', {
      base: {
        display: 'inline-flex',
        '& .dot': {
          width: '100%',
          scale: '0.4',
        },
      },
      variants: {
        variant: {
          solid: {
            bg: 'colorPalette.solid',
          },
          outline: {
            '& .dot': {
              scale: '0.6',
            },
          },
        },
      },
      defaultVariants: {
        variant: 'solid',
      },
    })

    expect(varsCode).toContain('export const radiomarkDotVars = stylex.defineVars')
    expect(varsCode).toContain('scale: 0.4')
    expect(code).toContain("from './radiomark.stylex.ts'")
    expect(code).toContain('[radiomarkDotVars.scale]: 0.6')
    expect(code).toContain('scale: radiomarkDotVars.scale')
  })

  it('merges single-axis compounds into that variant', () => {
    const { code } = emitRecipe('button', buttonLike)

    expect(code).toMatch(/plain: \{[\s\S]*paddingInline: 0/)
  })
})

describe('stripSuiPrefix', () => {
  it('drops the Chakra-era sui prefix from Saas UI recipe names', () => {
    expect(stripSuiPrefix('suiCommand')).toBe('command')
    expect(stripSuiPrefix('suiIconBadge')).toBe('iconBadge')
    expect(stripSuiPrefix('suiSidebarNavItem')).toBe('sidebarNavItem')
    expect(stripSuiPrefix('button')).toBe('button')
    expect(toKebabCase(stripSuiPrefix('suiIconBadge'))).toBe('icon-badge')
  })
})

describe('toKebabCase', () => {
  it('converts camelCase recipe names to file names', () => {
    expect(toKebabCase('inputAddon')).toBe('input-addon')
    expect(toKebabCase('iconBadge')).toBe('icon-badge')
  })
})
