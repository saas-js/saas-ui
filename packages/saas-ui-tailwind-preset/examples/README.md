# Component Examples

This directory contains example implementations using [tailwind-variants](https://www.tailwind-variants.org/) for cleaner, more maintainable variant management.

## Why tailwind-variants?

Tailwind-variants provides:
- ✨ **Better DX** - Cleaner, more declarative API
- 🎯 **Type Safety** - Full TypeScript support with `VariantProps`
- 🔧 **Compound Variants** - Easy multi-variant compositions
- 📦 **Slots** - Built-in support for multi-part components
- ⚡ **Performance** - Optimized class name generation
- 🎨 **Default Variants** - Set sensible defaults

## Available Examples

### [Button](./button.tsx)
**Features:**
- Uses `tv()` for variant definition
- Compound variants for all combinations
- Automatic TypeScript types via `VariantProps`
- Clean, declarative syntax

**Before:**
```tsx
const variants = {
  solid: {
    accent: 'bg-accent-solid...',
  }
}
```

**After:**
```tsx
const button = tv({
  variants: { variant: { solid: '' } },
  compoundVariants: [
    { variant: 'solid', colorScheme: 'accent', class: '...' }
  ]
})
```

### [Card](./card.tsx)
**Features:**
- Uses `slots` for multi-part components
- Each slot (root, header, title, body, footer) has its own styles
- Variants automatically apply to relevant slots
- Cleaner compound component implementation

**Key Pattern:**
```tsx
const card = tv({
  slots: {
    root: '...',
    header: '...',
    title: '...',
  },
  variants: {
    variant: {
      elevated: {
        root: 'shadow-md',
        title: 'font-bold',
      }
    }
  }
})
```

### [Badge](./badge.tsx)
Simple component showing clean variant composition with compound variants.

### [Input](./input.tsx)
Form input with variant-based styling and a Field wrapper using slots.

### [Alert](./alert.tsx)
Compound component using slots for icon, content, title, and description parts.

## Key Patterns

### 1. Simple Component with Variants

```tsx
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'px-4 py-2 rounded',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  }
})

interface ButtonProps extends VariantProps<typeof button> {
  children: ReactNode
}

function Button({ color, size, children }: ButtonProps) {
  return <button className={button({ color, size })}>{children}</button>
}
```

### 2. Compound Variants

```tsx
const button = tv({
  variants: {
    color: { primary: '', secondary: '' },
    disabled: { true: '' }
  },
  compoundVariants: [
    {
      color: 'primary',
      disabled: true,
      class: 'opacity-50 cursor-not-allowed'
    }
  ]
})
```

### 3. Multi-Part Components (Slots)

```tsx
const card = tv({
  slots: {
    root: 'rounded-lg',
    header: 'border-b',
    body: 'p-4',
  },
  variants: {
    variant: {
      outlined: {
        root: 'border',
        header: 'bg-gray-50'
      }
    }
  }
})

function Card({ variant }) {
  const { root, header, body } = card({ variant })
  return (
    <div className={root()}>
      <div className={header()}>Header</div>
      <div className={body()}>Body</div>
    </div>
  )
}
```

### 4. TypeScript Integration

```tsx
import { type VariantProps } from 'tailwind-variants'

const button = tv({ /* ... */ })

// Automatic types from variants
interface ButtonProps extends VariantProps<typeof button> {
  children: ReactNode
}
```

## Comparison

### Old Approach (Manual)
```tsx
const variants = {
  solid: {
    accent: 'bg-accent-solid text-accent-contrast',
    red: 'bg-red-solid text-red-contrast',
  }
}

const classes = [
  'base-classes',
  variants[variant][colorScheme],
  sizes[size],
  className,
].join(' ')
```

### New Approach (tailwind-variants)
```tsx
const button = tv({
  base: 'base-classes',
  variants: { variant: { solid: '' } },
  compoundVariants: [
    { variant: 'solid', colorScheme: 'accent', class: '...' }
  ],
  defaultVariants: { variant: 'solid', size: 'md' }
})

const classes = button({ variant, size, colorScheme, className })
```

## Benefits

1. **Less Boilerplate** - No manual class joining
2. **Better Organization** - Variants grouped logically
3. **Type Safety** - `VariantProps` generates types automatically
4. **Compound Variants** - Easy to define multi-variant rules
5. **Slots** - Built-in multi-part component support
6. **Default Values** - Set defaults declaratively
7. **Performance** - Optimized class name generation

## Installation

```bash
npm install tailwind-variants
# or
pnpm add tailwind-variants
```

## Usage in Your Project

1. **Copy examples** - Use as starting point
2. **Customize variants** - Adjust colors, sizes, etc.
3. **Add more variants** - Extend with your needs
4. **Build library** - Create your component system

## Installation

All components require `tailwind-variants`:

```bash
npm install tailwind-variants
# or
pnpm add tailwind-variants
```
