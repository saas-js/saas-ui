import * as stylex from '@stylexjs/stylex'

import {
  cardBody,
  cardDescription,
  cardDescriptionVariants,
  cardHeader,
  cardRoot,
  cardRootSizes,
  cardRootVariants,
  cardTitle,
  cardTitleSizes,
  type CardSize,
  type CardVariant,
} from '../slot-recipes/card.ts'
import { bluePalette, greenPalette, redPalette } from '../themes/palettes.ts'

const palettes = {
  gray: null,
  blue: bluePalette,
  red: redPalette,
  green: greenPalette,
} as const

export interface CardExampleProps {
  variant?: CardVariant
  size?: CardSize
  colorPalette?: keyof typeof palettes
}

/**
 * Example of StyleX variants on a slot recipe: one `create()` per slot
 * axis, then `root.base`, `rootSizes[size]`, `rootVariants[variant]`.
 *
 * @see https://stylexjs.com/docs/learn/recipes/variants
 */
export function CardExample({
  variant = 'outline',
  size = 'md',
  colorPalette: palette = 'gray',
}: CardExampleProps) {
  return (
    <article
      {...stylex.props(
        palettes[palette],
        cardRoot.base,
        cardRootSizes[size],
        cardRootVariants[variant],
      )}
    >
      <header {...stylex.props(cardHeader.base)}>
        <h3 {...stylex.props(cardTitle.base, cardTitleSizes[size])}>
          Projects
        </h3>
        <p
          {...stylex.props(
            cardDescription.base,
            variant === 'solid' && cardDescriptionVariants.solid,
          )}
        >
          Semantic tokens and slot recipes, compiled to StyleX.
        </p>
      </header>
      <div {...stylex.props(cardBody.base)}>
        The card slot recipe is a direct translation of the Chakra
        `cardSlotRecipe`.
      </div>
    </article>
  )
}
