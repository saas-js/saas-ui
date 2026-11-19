---
'@saas-ui/chakra-preset': minor
---

Support Chakra UI 3.38. Adds Saas UI styled slot recipes for Chakra's new `Command` palette and `DateInput` components, and raises the `@chakra-ui/react` peer dependency to `^3.38.0`, the first version that ships both.

The `DateInput` segment group reuses the `Input` sizes and variants, so it lines up with other fields. `Command` items, groups and shortcuts follow the `Menu` styles.

The keyboard shortcut recipe is renamed from `suiCommand` to `suiKbdGroup` (`@saas-ui/chakra-preset/recipes/kbd-group`), since `command` now belongs to Chakra's palette. The `recipes/command` import path still works but is deprecated.
