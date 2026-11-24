# @saas-ui/tailwind-preset

## 0.1.0

### Minor Changes

- cd63f41: Move the `xs`–`lg` radii up one step (`xs` 0.25rem, `sm` 0.375rem,
  `md` 0.5rem, `lg` 0.75rem), matching the StyleX Blocks theme. Controls, panels
  and indicators, and the `l1`–`l3` aliases, are all rounder as a result.
  Override `radii` in your theme to keep the previous scale.

### Patch Changes

- 3d46ff3: Add a shared control size track, role radii, and themeable focus and
  motion knobs.

  Buttons, inputs, and other controls now read `sizes.control.*` for height and
  a single `control` / `panel` radius instead of stepping corners per size.
  Cards, dialogs, popovers, and hover cards expose concentric radius variables.
  Focus rings and motion bands are CSS variables on the theme root so density
  and timing can be tuned without forking recipes.

- 918eb59: Fix Button glass variant text shadow to be more subtle for better
  contrast
- e8dc080: Add keyframes to theme
- fd7e352: Fix gray semantic tokens muted and subtle styles consistency
- acf0596: Improved sidebar flyout behavior on for inset variant
- fd7e352: Add border token to all semantic color tokens
- 5e4b520: Fix Persona out of office styles
- 757f067: Generate semantic palettes from OKLCH seeds and drop shipped 50–950
  scales.

  Named hues keep `solid` / `muted` / `fg` slots. `neutral` is a hard
  black/white accent. Destructive actions and invalid states use
  `colors.destructive`. Shadows read `{colors.shadow}` via `--color-shadow`.
  Users who want a 50–950 ramp can add Chakra’s.

- 27b8e1a: Fix BreadCrumb link variant underline contrast
- c9769ea: Keep the base tint on `bg.surface`, `bg.elevated` and `bg.overlay`.

  Panels hardcoded their chroma to zero, so they were the one surface with no
  base tint. The interaction, border and inset tokens are translucent overlays
  that contribute almost no chroma of their own, which meant anything layered on
  a panel took its hue from the untinted panel and composited to a flat grey —
  most visibly the hovered row in a select, combobox or menu reading warm
  against a cool trigger. Light panels use lightness `0.995` rather than `1`,
  because sRGB cannot represent chroma at `1` and the tint would be gamut
  clipped into a cyan cast. Light panels are no longer literally `#ffffff`.

- 5e4b520: Add ring variant to Persona
- 9dd10ce: Bump version
- eafbcf4: Add a lightweight OKLCH appearance generator for base, accent, tonal
  sidebar, and solid high-contrast sidebar colors in light and dark mode.
  Appearance seeds distinguish tonal contrast from solid-color foreground tone
  and prevent mixing tonal and solid sidebar options. Subtle badges now include
  a semantic palette border for clearer separation from surrounding surfaces.
  Page headers now use flexible content and footer rows so optional navigation
  and actions do not reserve empty grid cells. Sidebar and Page recipes now
  apply their semantic foreground, border, and background defaults without
  consumer overrides. Line tables inherit their parent surface and use the
  shared interaction hover color. The new inset table variant aligns cell
  content inside padded containers while letting row backgrounds and dividers
  bleed into the surrounding padding. Heading and title recipes now use the
  medium font weight consistently.

  Add a portable CSS appearance contract that derives the same semantic colors
  from complete OKLCH seed colors. Chakra emits the variables through its global
  styles without requiring a CSS import. Panda CSS and Tailwind CSS export the
  same formulas and static semantic-token aliases from the Chakra source. The
  appearance graph uses shared contrast axes and direct semantic formulas
  instead of per-token profile and light/dark intermediate variables.

  The appearance-derived palette is named `base`, keeping `neutral` reserved for
  the absolute black, white, and achromatic gray palette.

- fd7e352: Fix Badge surface variant styles
- cd63f41: Render light-mode `bg.inset` as a translucent foreground overlay
  instead of an opaque grey, so wells inside panels, cards and popovers darken
  their parent surface and keep its tint. `bg.muted` is no longer an alias of
  `bg.inset`: it keeps the previous opaque recessed fill, so page backgrounds,
  fades and pinned table cells that rely on it are unaffected. Dark-mode
  `bg.inset` and `bg.muted` now use the same `c * 0.2` chroma factor as `bg`.
  Ported from the StyleX Blocks theme.

## 0.0.2-next.3

### Patch Changes

- eafbcf4: Add a lightweight OKLCH appearance generator for base, accent, tonal
  sidebar, and solid high-contrast sidebar colors in light and dark mode.
  Appearance seeds distinguish tonal contrast from solid-color foreground tone
  and prevent mixing tonal and solid sidebar options. Subtle badges now include
  a semantic palette border for clearer separation from surrounding surfaces.
  Page headers now use flexible content and footer rows so optional navigation
  and actions do not reserve empty grid cells. Sidebar and Page recipes now
  apply their semantic foreground, border, and background defaults without
  consumer overrides. Line tables inherit their parent surface and use the
  shared interaction hover color. The new inset table variant aligns cell
  content inside padded containers while letting row backgrounds and dividers
  bleed into the surrounding padding. Heading and title recipes now use the
  medium font weight consistently.

  Add a portable CSS appearance contract that derives the same semantic colors
  from complete OKLCH seed colors. Chakra emits the variables through its global
  styles without requiring a CSS import. Panda CSS and Tailwind CSS export the
  same formulas and static semantic-token aliases from the Chakra source. The
  appearance graph uses shared contrast axes and direct semantic formulas
  instead of per-token profile and light/dark intermediate variables.

  The appearance-derived palette is named `base`, keeping `neutral` reserved for
  the absolute black, white, and achromatic gray palette.

## 0.0.2-next.2

### Patch Changes

- acf0596: Improved sidebar flyout behavior on for inset variant

## 0.0.2-next.1

### Patch Changes

- 9dd10ce: Bump version

## 0.0.2-next.0

### Patch Changes

- 918eb59: Fix Button glass variant text shadow to be more subtle for better
  contrast
- e8dc080: Add keyframes to theme
- fd7e352: Fix gray semantic tokens muted and subtle styles consistency
- fd7e352: Add border token to all semantic color tokens
- 5e4b520: Fix Persona out of office styles
- 27b8e1a: Fix BreadCrumb link variant underline contrast
- 5e4b520: Add ring variant to Persona
- fd7e352: Fix Badge surface variant styles
