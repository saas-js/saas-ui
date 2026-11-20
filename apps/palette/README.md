# Saas UI Palette

The color palette generator hosted at https://palette.saas-ui.dev.

Pick a brand color and the app derives OKLCH seeds for
[`@saas-ui/appearance`](../../packages/saas-ui-appearance): 50–950 scales,
semantic palettes and a full Saas UI appearance. The whole site is themed
with the result, and the Code tab exports it as a Saas UI preset system,
plain Chakra UI tokens, CSS variables, Tailwind v4 theme variables or JSON.

State lives in the URL (`?color=0d9488&hue=180&tint=0.015`), so links are
shareable.

## Development

```bash
pnpm --filter palette-docs dev   # http://localhost:3030
pnpm --filter palette-docs test
pnpm --filter palette-docs typecheck
```

- `src/lib/color.ts`: hex ↔ OKLCH and WCAG contrast
- `src/lib/palette.ts`: app state → seeds, scales and semantic tokens
- `src/lib/code.ts`: export formats
