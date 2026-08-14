---
'@saas-ui/registry': patch
'@saas-ui/chakra-preset': patch
---

Support external preview identifiers such as Storybook story IDs without
treating them as local preview modules. External identifiers are preserved in
registry artifacts and excluded from file/default-export validation.

Restore the public recipe variant type exports consumed by installed registry
components.
