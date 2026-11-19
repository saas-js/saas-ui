---
'@saas-ui/appearance': patch
'@saas-ui/chakra-preset': patch
'@saas-ui/panda-preset': patch
'@saas-ui/stylex-preset': patch
'@saas-ui/tailwind-preset': patch
---

Render light-mode `bg.inset` as a translucent foreground overlay instead of an opaque grey, so wells inside panels, cards and popovers darken their parent surface and keep its tint. `bg.muted` is no longer an alias of `bg.inset`: it keeps the previous opaque recessed fill, so page backgrounds, fades and pinned table cells that rely on it are unaffected. Dark-mode `bg.inset` and `bg.muted` now use the same `c * 0.2` chroma factor as `bg`. Ported from the StyleX Blocks theme.
