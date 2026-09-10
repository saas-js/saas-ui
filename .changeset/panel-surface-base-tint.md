---
'@saas-ui/appearance': patch
'@saas-ui/chakra-preset': patch
'@saas-ui/panda-preset': patch
'@saas-ui/tailwind-preset': patch
'@saas-ui/stylex-preset': patch
---

Keep the base tint on `bg.surface`, `bg.elevated` and `bg.overlay`.

Panels hardcoded their chroma to zero, so they were the one surface with no base tint. The interaction, border and inset tokens are translucent overlays that contribute almost no chroma of their own, which meant anything layered on a panel took its hue from the untinted panel and composited to a flat grey — most visibly the hovered row in a select, combobox or menu reading warm against a cool trigger. Light panels use lightness `0.995` rather than `1`, because sRGB cannot represent chroma at `1` and the tint would be gamut clipped into a cyan cast. Light panels are no longer literally `#ffffff`.
