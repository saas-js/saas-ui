# @saas-ui/stylex-preset

## 0.1.0

### Minor Changes

- cd63f41: Move the `xs`–`lg` radii up one step (`xs` 0.25rem, `sm` 0.375rem,
  `md` 0.5rem, `lg` 0.75rem), matching the StyleX Blocks theme. Controls, panels
  and indicators, and the `l1`–`l3` aliases, are all rounder as a result.
  Override `radii` in your theme to keep the previous scale.

### Patch Changes

- 757f067: Generate semantic palettes from OKLCH seeds and drop shipped 50–950
  scales.

  Named hues keep `solid` / `muted` / `fg` slots. `neutral` is a hard
  black/white accent. Destructive actions and invalid states use
  `colors.destructive`. Shadows read `{colors.shadow}` via `--color-shadow`.
  Users who want a 50–950 ramp can add Chakra’s.

- c9769ea: Keep the base tint on `bg.surface`, `bg.elevated` and `bg.overlay`.

  Panels hardcoded their chroma to zero, so they were the one surface with no
  base tint. The interaction, border and inset tokens are translucent overlays
  that contribute almost no chroma of their own, which meant anything layered on
  a panel took its hue from the untinted panel and composited to a flat grey —
  most visibly the hovered row in a select, combobox or menu reading warm
  against a cool trigger. Light panels use lightness `0.995` rather than `1`,
  because sRGB cannot represent chroma at `1` and the tint would be gamut
  clipped into a cyan cast. Light panels are no longer literally `#ffffff`.

- 3d46ff3: Generate StyleX recipes and slot recipes from the Chakra preset,
  including descendant icon vars, a CSS reset, and Storybook examples.
- 12af33a: Extract appearance and palette generators into a shared
  `@saas-ui/appearance` package.
- 563a4a1: Add an experimental StyleX preset generated from the Chakra preset.
- cd63f41: Render light-mode `bg.inset` as a translucent foreground overlay
  instead of an opaque grey, so wells inside panels, cards and popovers darken
  their parent surface and keep its tint. `bg.muted` is no longer an alias of
  `bg.inset`: it keeps the previous opaque recessed fill, so page backgrounds,
  fades and pinned table cells that rely on it are unaffected. Dark-mode
  `bg.inset` and `bg.muted` now use the same `c * 0.2` chroma factor as `bg`.
  Ported from the StyleX Blocks theme.
- Updated dependencies [c9769ea]
- Updated dependencies [c9769ea]
- Updated dependencies [12af33a]
- Updated dependencies [cd63f41]
  - @saas-ui/appearance@0.1.0
