# Indigo Themes for Shiki.js

Beautiful light and dark themes for Shiki.js syntax highlighting using OKLCH
color space for modern, vibrant colors.

## Features

### **Light Theme** (`indigo-light`)

- **Background**: gray.50 (`oklch(0.985 0.002 247.839)`) - Ultra-light gray
  background
- **Keywords**: gray.600 for subtle import/export statements
- **Primary syntax**: Indigo color palette for functions and syntax elements

### **Dark Theme** (`indigo-dark`)

- **Background**: gray.900 (`oklch(0.21 0.020 264.665)`) - Deep dark background
- **Keywords**: gray.400 for subtle import/export statements
- **Primary syntax**: Lighter indigo variants for excellent contrast

### **Shared Features**

- **Accent colors**:
  - Emerald for strings and constants
  - Amber for numbers and literals
  - Rose for errors and warnings
- **Modern OKLCH colors**: Perceptually uniform color space for consistent
  visual appearance

## Usage

```typescript
import { codeToHtml } from 'shiki'

import { indigoDarkTheme } from './shiki-theme-indigo-dark'
import { indigoLightTheme } from './shiki-theme-indigo-light'

// Single theme usage
const lightHtml = await codeToHtml(code, {
  lang: 'typescript',
  theme: indigoLightTheme,
})

const darkHtml = await codeToHtml(code, {
  lang: 'typescript',
  theme: indigoDarkTheme,
})

// Dual theme usage (automatic theme switching)
const dualHtml = await codeToHtml(code, {
  lang: 'typescript',
  themes: {
    light: 'indigo-light',
    dark: 'indigo-dark',
  },
})
```

## Color Palette

### Primary Colors (Indigo & Gray)

- **Keywords & Storage**: `gray.600` (normal) - import, export, const, etc.
- **Functions & Methods**: `indigo.600`
- **Operators & Punctuation**: `indigo.600`
- **Tags & Elements**: `indigo.600` (normal)
- **Attributes**: `indigo.500` (italic)
- **Language Methods**: `gray.600` (italic) - this, super, etc.

### Accent Colors

- **Strings**: `emerald.600`
- **Numbers & Constants**: `amber.600`
- **Comments**: `gray.500` (italic)
- **Variables**: `gray.800`
- **HTML/JSX Text Content**: `gray.600`
- **Errors**: `rose.600`

### Background Colors

- **Editor Background**: `gray.50`
- **Line Highlights**: `gray.100`
- **Selections**: `indigo.100`

## Language Support

The theme provides excellent syntax highlighting for:

- TypeScript/JavaScript
- React/JSX
- HTML/CSS
- JSON
- Markdown
- And many more languages supported by Shiki.js

## Example Code

```tsx
// React component example
import React, { useState } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  children,
}) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s ease',
      }}
    >
      {children}
    </button>
  )
}
```
