# @saas-ui/chakra-preset

## 3.0.0

### Major Changes

- 550e5a6: Upgrade to Chakra v3
- 8e760c5: Added new wide gammut color tokens
- 3e6b10b: Changed Persona composition to an open component

### Minor Changes

- d4ea493: Added `suiAside` and `suiSplitPage` slot recipes for the Aside and
  SplitPage application layouts.
- e9fec88: Added toaster and menu components
- d79c7ca: Add ColorSwatch and Fieldset recipes, new Button, DataList, and Tabs
  variants, and exported recipe keys and variant prop types for registry
  templates.
- 3d46ff3: Add a shared control size track, role radii, and themeable focus and
  motion knobs.

  Buttons, inputs, and other controls now read `sizes.control.*` for height and
  a single `control` / `panel` radius instead of stepping corners per size.
  Cards, dialogs, popovers, and hover cards expose concentric radius variables.
  Focus rings and motion bands are CSS variables on the theme root so density
  and timing can be tuned without forking recipes.

- 4eab2c6: Support Chakra UI 3.38. Adds Saas UI styled slot recipes for Chakra's
  new `Command` palette and `DateInput` components, and raises the
  `@chakra-ui/react` peer dependency to `^3.38.0`, the first version that ships
  both.

  The `DateInput` segment group reuses the `Input` sizes and variants, so it
  lines up with other fields. `Command` items, groups and shortcuts follow the
  `Menu` styles.

  The keyboard shortcut recipe is renamed from `suiCommand` to `suiKbdGroup`
  (`@saas-ui/chakra-preset/recipes/kbd-group`), since `command` now belongs to
  Chakra's palette. The `recipes/command` import path still works but is
  deprecated.

- 70f5c45: Added slot recipes for 10 new Chakra UI components: Carousel, Code
  Block, Color Picker, Date Picker, Floating Panel, Listbox, Marquee, QR Code,
  Scroll Area and Tree View. Requires @chakra-ui/react 3.36 or later to use the
  new components.

  Also fixes two invalid token references in the Tags Input recipe (`sizes.11`
  and `durations.normal` do not exist in the preset scale).

- 8d8ffaa: Translucency and backdrop effect of overlay elements can now be
  configured
- c680574: Added Status component
- 868950d: Added ColorModeProvider
- f85d493: Added Sidebar.Context component that allows you to access sidebar
  context using a render prop
- a2ef175: Added Pagination component
- a635505: Updated to Chakra 3.27.0
- eb02362: Improved GridList recipe
- f85d493: Sidebar mode can now be controlled using the sidebar context
- c680574: Added Badge and Tag components
- 964ffa7: Added Sidebar.Inset component and inset vairant
- 95c8652: Update to Chakra UI 3.2.1
- 6e53bc7: Added Combobox component
- ac2d80d: Improved toaster styles and allow setting global defaults
- 928abff: Added Page and BackButton component
- 757f067: Generate semantic palettes from OKLCH seeds and drop shipped 50–950
  scales.

  Named hues keep `solid` / `muted` / `fg` slots. `neutral` is a hard
  black/white accent. Destructive actions and invalid states use
  `colors.destructive`. Shadows read `{colors.shadow}` via `--color-shadow`.
  Users who want a 50–950 ramp can add Chakra’s.

- 15e093e: Added new components, Accordion, Alert, Checkbox, HoverCard
- 2c0282d: Added Linkbox and LinkOverlay components
- 8d8ffaa: Added FileUpload component
- aac593e: Ship the preset-and-registry transition: portable Chakra templates,
  automated CLI initialization and migration, pre-install diffs,
  `components.json`-tracked updates, shadcn-compatible public and private
  registry namespaces, current forms and the locally owned modal manager
  template.
- cd63f41: Move the `xs`–`lg` radii up one step (`xs` 0.25rem, `sm` 0.375rem,
  `md` 0.5rem, `lg` 0.75rem), matching the StyleX Blocks theme. Controls, panels
  and indicators, and the `l1`–`l3` aliases, are all rounder as a result.
  Override `radii` in your theme to keep the previous scale.
- 71c049d: Added new Chakra UI components
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

- 8d8ffaa: Added Popover component
- 8d8ffaa: Added semantic tokens and scales for control, panel and indicator
- f0f5ab0: Improve Navbar composition

### Patch Changes

- ba3b566: Improved Sidebar contrast
- bab2041: Improved semantic token consistency
- 2285040: Improved avatar and persona sizes
- 64e680e: Update default button colorPalette to gray
- b136ede: Improved dark mode styles for buttons
- dfc8727: Publish the registry compiler and recipe-key metadata for independent
  Pro repository builds.
- 53716c5: Fixed GridList prop forwarding
- 5115e8f: Improved text selection color contrast
- 212a7e6: Add missing focusRing semantic tokens
- 38082d4: Improved horizontal field styles
- a14347d: Fixed tooltip border contrast
- d4fb186: Added Section component
- c4d11e2: Fixed switch recipe
- 27fbc72: Upgrade to Chakra 3.27
- c680574: Changed default Button variant to surface
- b0cc77e: Added recipe utility t ypes
- 918eb59: Fix Button glass variant text shadow to be more subtle for better
  contrast
- 942e9a0: Improved SidebarNavItem positioning
- dd1f9e1: Improved dark mode styles for overlay layers
- a169eb7: Fixed issue where Toast close trigger would render two buttons
- 8d8ffaa: Added ghost variant to tabs recipe
- 6e53bc7: Updated to Chakra UI v3.20
- 53716c5: Fixed issue where Button colorPalette could not be changed using the
  recipe
- 205580d: Added option to customize the Command modifiers
- 7808a76: Restructure slot components and add ui namespaces to recipes
- cb73c00: Upgrade to Chakra 3.30.0
- e7fe684: Export Pagination Context component
- fd7e352: Fix gray semantic tokens muted and subtle styles consistency
- c680574: Rename Drawer and Dialog CloseTrigger to CloseButton
- 8106253: Subtle button variant uses translucent background to blend in better
  with darker background colors
- b51aff9: Improved form components recipes sizing
- 212a7e6: Improved yellow color tokens
- ce8c247: Inputs now use semanti radii tokens
- 19309d4: Improved Sidebar recipe with beter balance and added
  --sidebar-item-icon-color variable
- f774f7a: Improved EmptyState alignment
- ce8c247: SegmentGroup now use semantic radii tokens
- ce8c247: Forward ref to LoadingOverlay.Root
- c680574: Improved Button glass variant hover color
- acf0596: Improved sidebar flyout behavior on for inset variant
- ba3b566: Improved focusRing styles
- 6a8bf46: Decreased default overlay translucency
- fd7e352: Add border token to all semantic color tokens
- 5e4b520: Fix Persona out of office styles
- 8902eec: Fix Popover props
- 8106253: Input, Select, and Textarea outline variants now have solid
  background color
- 0067207: Fixed issue where paddingStart would not apply to grouped inputs
- b51aff9: Fixed passing menu button props to button component
- 205580d: Added size variant to Command
- 9c24d1f: Improved text style tokens and heading line heights
- ba3b566: Added SegmentControl stories and made sizing consistent with buttons
- c9769ea: Keep chroma precision on the neutrals generated by
  `createAppearance`.

  Colors were rounded to three decimals. Neutrals scale the base chroma down to
  a few thousandths, so the ramp collapsed onto two values: the canvas and
  panels rounded down while the foreground and border overlays rounded up,
  leaving the canvas the least tinted surface with over-tinted neutrals drawn on
  it. Chroma now keeps five decimals, which matches what the CSS contract
  already resolved in the browser.

- d638488: Improved combobox sizes
- 4c60a19: Add TagsInput recipe
- dd1f9e1: Added \_rowHover condition
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

- 56b0623: Update with upstream changes
- 2afe09f: Fixed zIndex value of dialog and drawer recipes
- 6a8bf46: Fix dialog backdrop z-index
- f774f7a: EmptyState description now accepts react components
- 6e6def9: Restore unstyled primitives as `@saas-ui/react` (formerly
  `@saas-ui/core`) and have registry Sidebar, Navbar, and GridList templates
  wrap that package.
- 495b0c6: Removed position variant from AppShell recipe in favor of a single
  fullscreen prop for fixed positioning
- 12af33a: Extract appearance and palette generators into a shared
  `@saas-ui/appearance` package.
- 74eec10: Moved theme into separate preset packages
- 5e4b520: Add ring variant to Persona
- c680574: Improved semantic grays and shadows balance
- 78d7999: fix: export Sidebar.Provider props type
- 8ac704a: Improved tag recipe and support status component.
- 6f9f04d: Fixed issue where Sidebar mode could not be controlled
- 8106253: Button subtle variant now always have solid bg
- eb02362: Add missing PaginationPageTextProps export
- 8106253: Fix hovercard border styles
- 5013269: Improved theme inconsistencies
- 8106253: Add xs size to Command recipe
- bab2041: Improved Stat spacing
- 4f78230: Improved dark mode styling and added scrollbar styles
- d638488: Improved card and dialog padding
- 26f5452: Added /preset export that exports the Chakra UI preset
- 56b0623: Fixed issue where backdrop would render on top of dialog and drawer
- 5116c7c: Support external preview identifiers such as Storybook story IDs
  without treating them as local preview modules. External identifiers are
  preserved in registry artifacts and excluded from file/default-export
  validation.

  Restore the public recipe variant type exports consumed by installed registry
  components.

- fd7e352: Fix Badge surface variant styles
- c51e12c: Improved radii tokens
- 0067207: Added 4.5 spacing
- 5c032b5: Added --label-width css var to change data list label width
- cd63f41: Render light-mode `bg.inset` as a translucent foreground overlay
  instead of an opaque grey, so wells inside panels, cards and popovers darken
  their parent surface and keep its tint. `bg.muted` is no longer an alias of
  `bg.inset`: it keeps the previous opaque recessed fill, so page backgrounds,
  fades and pinned table cells that rely on it are unaffected. Dark-mode
  `bg.inset` and `bg.muted` now use the same `c * 0.2` chroma factor as `bg`.
  Ported from the StyleX Blocks theme.
- 65fac53: Fixed semantic token inconsistencies
- 61ce1b5: Fixed sidebar item end element positioning
- 3a73bc8: Fixed incorrect props type for GridListRoot
- 9d47676: Improved tabs recipe, new pills variant and xs size
- 64e680e: Export Menu.Context
- f995ba3: Fixed zIndex prop value
- 2285040: No longer showing presence badge if no presence is set
- 042ec4f: Added start and endElement props to Menu.CheckboxItem and RadioItem
- ba3b566: Sidebar.Button now renders a div with role="button"
- 19309d4: Improved font size balance
- 727b902: Allow click event on Sidebar.Track to be prevented
- a14347d: Fixed segment control indicator position
- Updated dependencies [c9769ea]
- Updated dependencies [c9769ea]
- Updated dependencies [12af33a]
- Updated dependencies [cd63f41]
  - @saas-ui/appearance@0.1.0

## 3.0.0-rc.1

### Minor Changes

- d4ea493: Added `suiAside` and `suiSplitPage` slot recipes for the Aside and
  SplitPage application layouts.
- 70f5c45: Added slot recipes for 10 new Chakra UI components: Carousel, Code
  Block, Color Picker, Date Picker, Floating Panel, Listbox, Marquee, QR Code,
  Scroll Area and Tree View. Requires @chakra-ui/react 3.36 or later to use the
  new components.

  Also fixes two invalid token references in the Tags Input recipe (`sizes.11`
  and `durations.normal` do not exist in the preset scale).

## 3.0.0-rc.0

### Minor Changes

- d79c7ca: Add ColorSwatch and Fieldset recipes, new Button, DataList, and Tabs
  variants, and exported recipe keys and variant prop types for registry
  templates.

### Patch Changes

- 6e6def9: Restore unstyled primitives as `@saas-ui/react` (formerly
  `@saas-ui/core`) and have registry Sidebar, Navbar, and GridList templates
  wrap that package.

## 3.0.0-next.11

### Patch Changes

- a2c1e38: Fix select content max height

## 3.0.0-next.10

### Minor Changes

- aac593e: Ship the preset-and-registry transition: portable Chakra templates,
  automated CLI initialization and migration, pre-install diffs,
  `components.json`-tracked updates, shadcn-compatible public and private
  registry namespaces, current forms and the locally owned modal manager
  template.
- d79c7ca: Add ColorSwatch and Fieldset recipes, new Button, DataList, and Tabs
  variants, and exported recipe keys and variant prop types for registry
  templates.

### Patch Changes

- dfc8727: Publish the registry compiler and recipe-key metadata for independent
  Pro repository builds.
- 5116c7c: Support external preview identifiers such as Storybook story IDs
  without treating them as local preview modules. External identifiers are
  preserved in registry artifacts and excluded from file/default-export
  validation.

  Restore the public recipe variant type exports consumed by installed registry
  components.

## 3.0.0-next.9

### Minor Changes

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

## 3.0.0-next.8

### Patch Changes

- acf0596: Improved sidebar flyout behavior on for inset variant

## 3.0.0-next.7

### Patch Changes

- 8106253: Subtle button variant uses translucent background to blend in better
  with darker background colors
- 8106253: Input, Select, and Textarea outline variants now have solid
  background color
- 8106253: Button subtle variant now always have solid bg
- 8106253: Fix hovercard border styles
- 8106253: Add xs size to Command recipe

## 3.0.0-next.6

### Patch Changes

- 918eb59: Fix Button glass variant text shadow to be more subtle for better
  contrast
- fd7e352: Fix gray semantic tokens muted and subtle styles consistency
- fd7e352: Add border token to all semantic color tokens
- 5e4b520: Fix Persona out of office styles
- 27b8e1a: Fix BreadCrumb link variant underline contrast
- 5e4b520: Add ring variant to Persona
- fd7e352: Fix Badge surface variant styles

## 3.0.0-next.5

### Patch Changes

- cb73c00: Upgrade to Chakra 3.30.0

## 3.0.0-next.4

### Patch Changes

- a14347d: Fixed tooltip border contrast
- a14347d: Fixed segment control indicator position

## 3.0.0-next.3

### Patch Changes

- c4d11e2: Fixed switch recipe

## 3.0.0-next.2

### Patch Changes

- 4c60a19: Add TagsInput recipe

## 3.0.1-next.1

### Patch Changes

- b0cc77e: Added recipe utility t ypes

## 3.0.1-next.0

### Patch Changes

- 74eec10: Moved theme into separate preset packages
