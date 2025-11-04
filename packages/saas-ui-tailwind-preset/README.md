# @saas-ui/tailwind-preset

A Tailwind CSS 4 preset automatically generated from the Saas UI Chakra preset, providing a comprehensive design system with OKLCH colors, semantic tokens, and theme-aware CSS variables.

## Features

- 🎨 **24 Color Palettes** - All using OKLCH color space for perceptually uniform colors
- 🌗 **Light/Dark Mode** - Built-in theme switching with `light-dark()` CSS function
- 📐 **Complete Design Tokens** - Spacing, typography, radii, shadows, and more
- 🔄 **Semantic Tokens** - Theme-aware tokens for consistent UI (bg, fg, border, etc.)
- 🚀 **CSS-First** - Native CSS variables, no runtime JavaScript needed
- ⚡ **Performance** - Smaller bundle size, better performance than runtime theming

## Installation

```bash
npm install @saas-ui/tailwind-preset
# or
pnpm add @saas-ui/tailwind-preset
# or
yarn add @saas-ui/tailwind-preset
```

## Usage

### Basic Setup

Import the theme in your main CSS file:

```css
/* app.css or globals.css */
@import "tailwindcss";
@import "@saas-ui/tailwind-preset/theme.css";
```

### Using in Components

Use the CSS variables directly in your Tailwind classes:

```tsx
export function Card() {
  return (
    <div className="bg-[var(--colors-bg-panel)] border-[var(--colors-border)] rounded-[var(--radii-lg)] p-[var(--spacing-4)]">
      <h2 className="text-[var(--colors-fg-emphasized)]">Card Title</h2>
      <p className="text-[var(--colors-fg-muted)]">Card content goes here</p>
    </div>
  )
}
```

### Creating Component Layers

For reusable components, use Tailwind's `@layer` directive:

```css
@layer components {
  .card {
    background: var(--colors-bg-panel);
    border: 1px solid var(--colors-border);
    border-radius: var(--radii-lg);
    padding: var(--spacing-4);
  }

  .card-title {
    color: var(--colors-fg-emphasized);
    font-weight: 600;
  }

  .card-content {
    color: var(--colors-fg-muted);
  }
}
```

## Available Tokens

### Colors

#### Base Colors (OKLCH)
- All standard colors: `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`
- Each with 11 shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`
- Special colors: `black`, `white`, `transparent`, `current`
- Alpha variants: `whiteAlpha`, `blackAlpha` (50-950)

```css
var(--colors-blue-500)
var(--colors-gray-900)
var(--colors-white-alpha-500)
```

#### Semantic Colors (Theme-Aware with light-dark())

**Background Colors:**
```css
var(--colors-bg)              /* Default background */
var(--colors-bg-muted)        /* Muted background */
var(--colors-bg-subtle)       /* Subtle background */
var(--colors-bg-emphasized)   /* Emphasized background */
var(--colors-bg-panel)        /* Panel/card background */
var(--colors-bg-overlay)      /* Overlay background */
var(--colors-bg-inverted)     /* Inverted background */
```

**Foreground Colors:**
```css
var(--colors-fg)              /* Default text */
var(--colors-fg-muted)        /* Muted text */
var(--colors-fg-subtle)       /* Subtle text */
var(--colors-fg-emphasized)   /* Emphasized text */
var(--colors-fg-inverted)     /* Inverted text */
```

**Border Colors:**
```css
var(--colors-border)          /* Default border */
var(--colors-border-muted)    /* Muted border */
var(--colors-border-subtle)   /* Subtle border */
var(--colors-border-emphasized) /* Emphasized border */
```

**Status Colors:**
```css
var(--colors-status-success)
var(--colors-status-error)
var(--colors-status-warning)
var(--colors-status-info)
```

**Accent Colors:**
```css
var(--colors-accent-fg)
var(--colors-accent-solid)
var(--colors-accent-muted)
var(--colors-accent-subtle)
```

**Sidebar Colors:**
```css
var(--colors-sidebar-bg)
var(--colors-sidebar-fg)
var(--colors-sidebar-border)
var(--colors-sidebar-accent-bg)
```

### Spacing

```css
var(--spacing-0_5)   /* 0.125rem */
var(--spacing-1)     /* 0.25rem */
var(--spacing-2)     /* 0.5rem */
var(--spacing-4)     /* 1rem */
var(--spacing-8)     /* 2rem */
/* ... up to spacing-96 */
```

### Border Radius

```css
var(--radii-2xs)     /* 0.15rem */
var(--radii-xs)      /* 0.2rem */
var(--radii-sm)      /* 0.25rem */
var(--radii-md)      /* 0.375rem */
var(--radii-lg)      /* 0.5rem */
var(--radii-xl)      /* 0.75rem */
var(--radii-2xl)     /* 1rem */
var(--radii-3xl)     /* 1.5rem */
var(--radii-full)    /* 9999px */
```

### Typography

**Font Sizes:**
```css
var(--font-sizes-2xs)
var(--font-sizes-xs)
var(--font-sizes-sm)
var(--font-sizes-md)
var(--font-sizes-lg)
/* ... up to 9xl */
```

**Font Weights:**
```css
var(--font-weights-thin)       /* 100 */
var(--font-weights-light)      /* 300 */
var(--font-weights-normal)     /* 400 */
var(--font-weights-medium)     /* 500 */
var(--font-weights-semibold)   /* 600 */
var(--font-weights-bold)       /* 700 */
```

**Line Heights:**
```css
var(--line-heights-none)
var(--line-heights-tight)
var(--line-heights-normal)
var(--line-heights-relaxed)
```

## Component Examples

We provide example components in the [examples](./examples) directory using [tailwind-variants](https://www.tailwind-variants.org/) for cleaner, more maintainable code.

### Why tailwind-variants?

- ✨ Cleaner, more declarative API
- 🎯 Full TypeScript support with automatic types
- 🔧 Easy compound variant composition
- 📦 Built-in slots for multi-part components
- ⚡ Optimized performance

See [examples/README.md](./examples/README.md) for detailed patterns and usage.

## Quick Start Example

### Button Component

```tsx
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'inline-flex items-center justify-center font-medium transition-all',
  variants: {
    variant: {
      solid: 'bg-[var(--colors-blue-solid)] text-[var(--colors-blue-contrast)]',
      outline: 'border border-[var(--colors-border)] text-[var(--colors-fg)]',
      ghost: 'text-[var(--colors-fg)] hover:bg-[var(--colors-bg-subtle)]',
    },
    size: {
      sm: 'px-[var(--spacing-3)] py-[var(--spacing-1_5)] text-sm rounded-[var(--radii-sm)]',
      md: 'px-[var(--spacing-4)] py-[var(--spacing-2)] rounded-[var(--radii-md)]',
    }
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  }
})

interface ButtonProps extends VariantProps<typeof button> {
  children: React.ReactNode
}

export function Button({ variant, size, children }: ButtonProps) {
  return <button className={button({ variant, size })}>{children}</button>
}
```

### Card with Semantic Tokens

```tsx
export function ProfileCard() {
  return (
    <div className="
      bg-[var(--colors-bg-panel)]
      border border-[var(--colors-border)]
      rounded-[var(--radii-xl)]
      p-[var(--spacing-6)]
      shadow-lg
    ">
      <h3 className="text-[var(--colors-fg-emphasized)] font-semibold text-lg mb-[var(--spacing-2)]">
        John Doe
      </h3>
      <p className="text-[var(--colors-fg-muted)] mb-[var(--spacing-4)]">
        Software Developer
      </p>
      <div className="flex gap-[var(--spacing-2)]">
        <span className="
          bg-[var(--colors-accent-subtle)]
          text-[var(--colors-accent-fg)]
          px-[var(--spacing-2)]
          py-[var(--spacing-1)]
          rounded-[var(--radii-sm)]
          text-sm
        ">
          React
        </span>
      </div>
    </div>
  )
}
```

## Building from Source

This preset is automatically generated from the `@saas-ui/chakra-preset` package:

```bash
pnpm build
```

This will:
1. Read all tokens from the Chakra preset
2. Convert them to CSS variables
3. Transform semantic tokens to use `light-dark()`
4. Generate `src/theme.css`

## Differences from Chakra Preset

| Feature | Chakra Preset | Tailwind Preset |
|---------|---------------|-----------------|
| Runtime | JavaScript | CSS-only |
| Theme Switching | Conditions API | `light-dark()` |
| Type Safety | TypeScript | None |
| Bundle Size | Larger | Smaller |
| Performance | Good | Better |
| Browser Support | Modern | Modern (light-dark requires recent browsers) |

## Browser Support

The `light-dark()` CSS function is supported in:
- Chrome 123+
- Safari 17.5+
- Firefox 120+

For older browsers, consider a polyfill or use explicit light/dark mode classes.

## License

MIT

## Related Packages

- [@saas-ui/chakra-preset](../saas-ui-chakra-preset) - Original Chakra UI preset
- [@saas-ui/panda-preset](../saas-ui-panda-preset) - Panda CSS preset
- [@saas-ui/react](../saas-ui-react) - React component library
