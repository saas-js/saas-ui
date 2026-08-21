---
'@saas-ui/chakra-preset': minor
'@saas-ui/panda-preset': patch
'@saas-ui/tailwind-preset': patch
'@saas-ui/stylex-preset': patch
---

Generate semantic palettes from OKLCH seeds and drop shipped 50–950 scales.

Named hues keep `solid` / `muted` / `fg` slots. `neutral` is a hard black/white accent. Destructive actions and invalid states use `colors.destructive`. Shadows read `{colors.shadow}` via `--color-shadow`. Users who want a 50–950 ramp can add Chakra’s.
