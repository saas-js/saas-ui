# @saas-ui/registry

## 0.2.0-next.0

### Minor Changes

- dfc8727: Publish the registry compiler and recipe-key metadata for independent
  Pro repository builds.

### Patch Changes

- 5116c7c: Support external preview identifiers such as Storybook story IDs
  without treating them as local preview modules. External identifiers are
  preserved in registry artifacts and excluded from file/default-export
  validation.

  Restore the public recipe variant type exports consumed by installed registry
  components.
