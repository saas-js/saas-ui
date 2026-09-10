# @saas-ui/chakra-preset

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
