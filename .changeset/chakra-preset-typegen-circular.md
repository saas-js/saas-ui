---
---

Fix `@saas-ui/chakra-preset` build failing due to a circular typegen ordering:
the `_groupCollapsible` custom-condition key in the sidebar slot recipe is typed
via augmentations produced by `chakra typegen`, which itself depends on building
this preset. Suppressed the resulting type error so the preset builds from a
clean state.
