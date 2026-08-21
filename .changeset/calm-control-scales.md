---
'@saas-ui/chakra-preset': minor
'@saas-ui/panda-preset': patch
'@saas-ui/tailwind-preset': patch
---

Add a shared control size track, role radii, and themeable focus and motion knobs.

Buttons, inputs, and other controls now read `sizes.control.*` for height and a single `control` / `panel` radius instead of stepping corners per size. Cards, dialogs, popovers, and hover cards expose concentric radius variables. Focus rings and motion bands are CSS variables on the theme root so density and timing can be tuned without forking recipes.
