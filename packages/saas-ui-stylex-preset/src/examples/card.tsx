import * as stylex from '@stylexjs/stylex'

import { cardSlotStyles } from '../slot-recipes/card.ts'
import { ThemeProvider } from '../theme.tsx'

export function CardExample() {
  return (
    <ThemeProvider>
      <article {...stylex.props(...cardSlotStyles('root'))}>
        <header {...stylex.props(...cardSlotStyles('header'))}>
          <h3 {...stylex.props(...cardSlotStyles('title'))}>Projects</h3>
          <p {...stylex.props(...cardSlotStyles('description'))}>
            Semantic tokens and slot recipes, compiled to StyleX.
          </p>
        </header>
        <div {...stylex.props(...cardSlotStyles('body'))}>
          The card slot recipe is a direct translation of the Chakra
          `cardSlotRecipe`.
        </div>
      </article>
    </ThemeProvider>
  )
}
