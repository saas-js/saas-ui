---
'@saas-ui/appearance': patch
'@saas-ui/chakra-preset': patch
'@saas-ui/panda-preset': patch
'@saas-ui/stylex-preset': patch
'@saas-ui/tailwind-preset': patch
---

Render light-mode `bg.inset` (and its `bg.muted` alias) as a translucent foreground overlay instead of an opaque grey, so wells inside panels, cards and popovers darken their parent surface and keep its tint. Dark-mode `bg.inset` now uses the same `c * 0.2` chroma factor as `bg`. Ported from the StyleX Blocks theme.
