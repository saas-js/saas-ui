# Migration Guide: Chakra UI to Tailwind 4

This guide helps you migrate from `@saas-ui/chakra-preset` to `@saas-ui/tailwind-preset`.

## Key Differences

### 1. Theme Definition

**Before (Chakra):**
```typescript
import { ChakraProvider } from '@chakra-ui/react'
import { createSystem, defaultConfig } from '@chakra-ui/react'
import preset from '@saas-ui/chakra-preset'

const system = createSystem(defaultConfig, preset)

function App() {
  return (
    <ChakraProvider value={system}>
      {/* ... */}
    </ChakraProvider>
  )
}
```

**After (Tailwind 4):**
```css
/* app.css */
@import "tailwindcss";
@import "@saas-ui/tailwind-preset/theme.css";
```

### 2. Component Styling

**Before (Chakra):**
```tsx
import { Box, Text } from '@chakra-ui/react'

function Card() {
  return (
    <Box bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="lg" p="4">
      <Text color="fg.emphasized" fontWeight="semibold">Title</Text>
      <Text color="fg.muted">Description</Text>
    </Box>
  )
}
```

**After (Tailwind 4):**
```tsx
function Card() {
  return (
    <div className="bg-[var(--colors-bg-panel)] border border-[var(--colors-border)] rounded-[var(--radii-lg)] p-[var(--spacing-4)]">
      <p className="text-[var(--colors-fg-emphasized)] font-semibold">Title</p>
      <p className="text-[var(--colors-fg-muted)]">Description</p>
    </div>
  )
}
```

### 3. Token References

| Chakra | Tailwind 4 |
|--------|------------|
| `bg="blue.500"` | `className="bg-[var(--colors-blue-500)]"` |
| `color="fg.muted"` | `className="text-[var(--colors-fg-muted)]"` |
| `borderRadius="md"` | `className="rounded-[var(--radii-md)]"` |
| `p="4"` | `className="p-[var(--spacing-4)]"` |

### 4. Dark Mode

**Before (Chakra):**
```tsx
const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          value: { _light: 'white', _dark: 'black' }
        }
      }
    }
  }
})
```

**After (Tailwind 4):**
```css
/* Automatically handled via light-dark() */
--colors-bg: light-dark(var(--colors-white), var(--colors-black));
```

Toggle with:
```tsx
document.documentElement.style.colorScheme = 'dark' // or 'light'
```

### 5. Color Palettes

**Before (Chakra):**
```tsx
<Box colorPalette="blue">
  <Badge colorPalette="blue" />
</Box>
```

**After (Tailwind 4):**
```tsx
<div style={{ '--color-palette': 'blue' }}>
  {/* Use blue palette tokens */}
  <span className="bg-[var(--colors-blue-500)]">Badge</span>
</div>
```

## Token Mapping Reference

### Background Tokens

| Chakra | Tailwind 4 |
|--------|------------|
| `bg` | `--colors-bg` |
| `bg.muted` | `--colors-bg-muted` |
| `bg.subtle` | `--colors-bg-subtle` |
| `bg.panel` | `--colors-bg-panel` |
| `bg.emphasized` | `--colors-bg-emphasized` |

### Foreground Tokens

| Chakra | Tailwind 4 |
|--------|------------|
| `fg` | `--colors-fg` |
| `fg.muted` | `--colors-fg-muted` |
| `fg.subtle` | `--colors-fg-subtle` |
| `fg.emphasized` | `--colors-fg-emphasized` |

### Spacing Tokens

| Chakra | Tailwind 4 |
|--------|------------|
| `spacing.1` | `--spacing-1` |
| `spacing.2` | `--spacing-2` |
| `spacing.4` | `--spacing-4` |
| `spacing.2.5` | `--spacing-2_5` |

### Border Radius

| Chakra | Tailwind 4 |
|--------|------------|
| `radii.sm` | `--radii-sm` |
| `radii.md` | `--radii-md` |
| `radii.lg` | `--radii-lg` |
| `radii.full` | `--radii-full` |

## Creating Reusable Components

Instead of inline classes, use `@layer` for better reusability:

```css
@layer components {
  .card {
    background: var(--colors-bg-panel);
    border: 1px solid var(--colors-border);
    border-radius: var(--radii-lg);
    padding: var(--spacing-4);
  }

  .btn-primary {
    background: var(--colors-accent-solid);
    color: var(--colors-accent-contrast);
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--radii-md);
    font-weight: 500;
  }

  .btn-primary:hover {
    opacity: 0.9;
  }
}
```

Then use in components:

```tsx
function MyCard() {
  return (
    <div className="card">
      <button className="btn-primary">Click me</button>
    </div>
  )
}
```

## Recipe Migration

Chakra recipes need to be converted to component classes or variants:

**Before (Chakra Recipe):**
```typescript
export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: 'medium',
    borderRadius: 'md',
  },
  variants: {
    variant: {
      solid: {
        bg: 'colorPalette.solid',
        color: 'colorPalette.contrast',
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'border',
      }
    }
  }
})
```

**After (Tailwind Component):**
```css
@layer components {
  .btn {
    font-weight: 500;
    border-radius: var(--radii-md);
  }

  .btn-solid {
    background: var(--colors-accent-solid);
    color: var(--colors-accent-contrast);
  }

  .btn-outline {
    border: 1px solid var(--colors-border);
  }
}
```

Or use a variant system:

```tsx
const buttonVariants = {
  solid: 'bg-[var(--colors-accent-solid)] text-[var(--colors-accent-contrast)]',
  outline: 'border border-[var(--colors-border)]',
}

function Button({ variant = 'solid' }) {
  return (
    <button className={`font-medium rounded-[var(--radii-md)] ${buttonVariants[variant]}`}>
      Click me
    </button>
  )
}
```

## Benefits of Migration

1. **Smaller Bundle Size** - No runtime theme system needed
2. **Better Performance** - Pure CSS, no JavaScript overhead
3. **Standard CSS** - Works with any framework or vanilla JS
4. **Better Caching** - CSS is cacheable by browsers
5. **Simpler Setup** - Just import CSS, no provider needed

## Potential Challenges

1. **No TypeScript Autocomplete** - CSS variables don't have type safety
2. **Longer Class Names** - Using `var()` can be verbose
3. **Browser Support** - `light-dark()` requires modern browsers
4. **Recipe Conversion** - Recipes need manual conversion to CSS classes

## Gradual Migration Strategy

You can use both presets during migration:

1. Keep Chakra components that work well
2. Use Tailwind preset for new components
3. Gradually migrate old components
4. Remove Chakra when ready

```tsx
// Mixed approach
<ChakraProvider value={system}>
  <div className="bg-[var(--colors-bg)]"> {/* Tailwind */}
    <Box bg="bg.panel"> {/* Chakra */}
      Mixed content
    </Box>
  </div>
</ChakraProvider>
```

## Need Help?

- Check the [README](./README.md) for full token reference
- See [examples](./examples) for common patterns
- Open an issue on GitHub for questions
