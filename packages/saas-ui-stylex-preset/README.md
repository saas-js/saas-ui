# @saas-ui/stylex-preset

Experimental StyleX proof of concept for the Saas UI design system.

It is generated from `@saas-ui/chakra-preset`, using the same translation ideas
as `@saas-ui/panda-preset` and `@saas-ui/tailwind-preset`, then mapped onto
StyleX's compiler constraints (`defineVars`, `createTheme`, static `create()`
styles).

This package is a starting point, not a complete port of every recipe.

## Why StyleX needs a different translation

Panda can keep Chakra recipe objects almost as-is. It replaces
`@chakra-ui/react` helpers with identity `defineRecipe` / `defineTokens`
functions, then lets the Panda codegen understand token paths, conditions, and
recipes.

Tailwind cannot do that. It flattens tokens to CSS custom properties and leaves
recipes to `tailwind-variants`.

StyleX sits between those two, with stricter compile-time rules:

| Chakra / Panda concept                    | StyleX equivalent                                | Notes                                                  |
| ----------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| `defineTokens`                            | `stylex.defineVars` in `*.stylex.ts`             | Vars must be named exports from those files            |
| Token refs `{colors.blue.500}`            | `colors.blue500` or `var(--sui-colors-blue-500)` | Flattened keys, CSS vars for cross-token refs          |
| `defineSemanticTokens` `_light` / `_dark` | `light-dark()`                                   | Same appearance contract as Tailwind                   |
| `colorPalette`                            | `stylex.createTheme(colorPalette, …)`            | One theme per palette, scoped to a tree                |
| `defineRecipe`                            | One `stylex.create()` per axis                   | Index with `variants[variant]`, `sizes[size]`          |
| `defineSlotRecipe`                        | One `create()` per slot axis                     | Same variants pattern per slot                         |
| Conditions `_hover`                       | `:hover`                                         | Descendant conditions like `_icon` cannot be expressed |
| Utilities `px`, `bg`, `focusVisibleRing`  | CSS properties + expanded helpers                | See `src/properties.ts`                                |
| `textStyles` / `layerStyles`              | `stylex.create`                                  | Compiled, not token lookups                            |
| `breakpoints`                             | `stylex.defineConsts`                            | Media query strings                                    |
| `keyframes`                               | `stylex.keyframes`                               | Regular TS, not a `.stylex.ts` file                    |
| Appearance seeds `--sui-base`             | `theme.css`                                      | Shared with Chakra / Tailwind                          |

Chakra's styled-system
([`packages/react/src/styled-system`](https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/styled-system))
is the source of the shorthand and condition maps in this package.

## Installation

```bash
pnpm add @saas-ui/stylex-preset @stylexjs/stylex
```

Import the appearance CSS once, then compile this package with the StyleX Babel
or SWC plugin. Variables must be imported from their `.stylex.ts` files, not
from the package root.

```css
@import '@saas-ui/stylex-preset/reset.css';
@import '@saas-ui/stylex-preset/theme.css';
```

```ts
import { colorPalette } from '@saas-ui/stylex-preset/color-palette.stylex'
import { colors } from '@saas-ui/stylex-preset/tokens/colors.stylex'
```

Configure the StyleX plugin to compile `node_modules/@saas-ui/stylex-preset`.
See the
[StyleX theming rules](https://stylexjs.com/docs/learn/theming/defining-variables).

## Usage

```tsx
import * as stylex from '@stylexjs/stylex'
import { ThemeProvider } from '@saas-ui/stylex-preset'
import {
  buttonSizes,
  buttonStyles,
  buttonVariants,
} from '@saas-ui/stylex-preset'
import { bluePalette } from '@saas-ui/stylex-preset'

export function SaveButton() {
  return (
    <ThemeProvider colorMode="light" colorPalette="gray">
      <button
        type="button"
        {...stylex.props(
          bluePalette,
          buttonStyles.base,
          buttonSizes.md,
          buttonVariants.solid,
        )}
      >
        Save
      </button>
    </ThemeProvider>
  )
}
```

Variants follow the StyleX pattern of one `create()` per axis, then
`sizes[size]` / `variants[variant]`. See
[StyleX variants](https://stylexjs.com/docs/learn/recipes/variants).

`ThemeProvider` sets `color-scheme`, which is how `light-dark()` semantic tokens
switch. Palette themes override the `colorPalette.*` vars used by recipes.

## Appearance CLI

StyleX does not run `createAppearance()` in the browser. Generate a theme from
the same seeds instead:

```bash
pnpm --filter @saas-ui/stylex-preset appearance -- \
  --name ocean \
  --base 225,0.01 \
  --accent 0.53,0.18,235 \
  --format css \
  --out src/themes/ocean.css
```

`--format css` writes the `--sui-base` / `--sui-accent` CSS variables. Import that file
next to `theme.css` and the existing StyleX tokens resolve from those seeds.

`--format stylex` bakes `createAppearance()` into a static `createTheme()`
module you can pass to `stylex.props()`:

```bash
pnpm --filter @saas-ui/stylex-preset appearance -- \
  --in ocean.json \
  --format stylex \
  --out src/themes/ocean.stylex.ts
```

JSON input is the Chakra `AppearanceOptions` shape (`base`, `accent`,
`sidebar`), plus an optional `name`.

## Generating from Chakra

```bash
pnpm --filter @saas-ui/stylex-preset generate
```

The generator:

1. Reads `packages/saas-ui-chakra-preset/src/theme/tokens`
2. Reads semantic tokens and appearance CSS
3. Flattens `{ value }` trees into `defineVars`
4. Rewrites `{colors.blue.500}` to `var(--sui-colors-blue-500)`
5. Converts `_light` / `_dark` pairs to `light-dark()`
6. Emits color-palette themes via `createTheme`
7. Emits breakpoints, keyframes, and text styles
8. Reads `defineRecipe` / `defineSlotRecipe` configs and emits StyleX variant maps

Recipes are generated in the same shape as the StyleX variants docs: one
`stylex.create()` per axis (`buttonStyles`, `buttonSizes`, `buttonVariants`),
`textStyle` lookups into `textStyles`, single-axis compounds folded into that
variant, and two-axis compounds as a last-wins map (`buttonWhenVariantSurface`).

Panda's `scripts/sync.ts` copies Chakra files and swaps the `define*` imports.
This generator is closer to the Tailwind exporter: it materializes a
StyleX-native artifact instead of keeping Chakra objects.

## What is in the PoC

- All primitive token categories
- Semantic colors, radii, and shadows
- Color palette themes (`gray`, `blue`, `accent`, …)
- Appearance CSS (`--sui-base`, `--sui-accent`, sidebar seeds)
- Preflight reset (`reset.css`) so UA button/input chrome does not leak
- Recipe translator (`transformStyleObject`) and recipe emitter (`generate-recipe.ts`)
- Generated recipes from the Chakra preset (`src/recipes`, `src/slot-recipes`)

`_icon`, `& .dot`, and `& svg` become descendant variables on the parent plus
a child map that reads them
([StyleX descendant styles](https://stylexjs.com/docs/learn/recipes/descendant-styles)).

Not ported yet: `_pressable`, some Chakra selectors StyleX cannot express, and
a few token aliases.

## Storybook

```bash
pnpm --filter @saas-ui/stylex-preset storybook
```

Opens on port 6008 with the button and card examples.

## Token keys

Chakra paths become camelCase StyleX keys:

| Chakra             | StyleX key  | CSS variable (for refs)  |
| ------------------ | ----------- | ------------------------ |
| `colors.blue.500`  | `blue500`   | `--sui-colors-blue-500`  |
| `colors.bg`        | `bg`        | `--sui-colors-bg`        |
| `colors.bg.muted`  | `bgMuted`   | `--sui-colors-bg-muted`  |
| `spacing.2`        | `_2`        | `--sui-spacing-2`        |
| `radii.control.md` | `controlMd` | `--sui-radii-control-md` |

## License

MIT
