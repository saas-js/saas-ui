# @saas-ui/cli

## 3.0.0

### Minor Changes

- 30c6eb5: Update to use new registry
- aac593e: Ship the preset-and-registry transition: portable Chakra templates,
  automated CLI initialization and migration, pre-install diffs,
  `components.json`-tracked updates, shadcn-compatible public and private
  registry namespaces, current forms and the locally owned modal manager
  template.
- c140d5f: Support icons

### Patch Changes

- dfc8727: Publish the registry compiler and recipe-key metadata for independent
  Pro repository builds.
- 80a1d79: Emit the CLI bin at `lib/cli.js` so `npx @saas-ui/cli` can start.
- 4eab2c6: The `command` registry item is now `kbd-group`, exporting `KbdGroup`.
  `migrate react-to-registry` maps legacy `Command` imports from
  `@saas-ui/react` to `KbdGroup`. `KbdGroup` also accepts `Kbd` children and
  passes its `size` and `variant` to each key.
- 6e6def9: Restore unstyled primitives as `@saas-ui/react` (formerly
  `@saas-ui/core`) and have registry Sidebar, Navbar, and GridList templates
  wrap that package.

## 0.1.0-rc.1

### Patch Changes

- 80a1d79: Emit the CLI bin at `lib/cli.js` so `npx @saas-ui/cli` can start.

## 0.1.0-rc.0

### Patch Changes

- 6e6def9: Restore unstyled primitives as `@saas-ui/react` (formerly
  `@saas-ui/core`) and have registry Sidebar, Navbar, and GridList templates
  wrap that package.

## 0.1.0-next.2

### Minor Changes

- aac593e: Ship the preset-and-registry transition: portable Chakra templates,
  automated CLI initialization and migration, pre-install diffs,
  `components.json`-tracked updates, shadcn-compatible public and private
  registry namespaces, current forms and the locally owned modal manager
  template.

### Patch Changes

- dfc8727: Publish the registry compiler and recipe-key metadata for independent
  Pro repository builds.

## 0.1.0-next.1

### Minor Changes

- c140d5f: Support icons

## 0.1.0-next.0

### Minor Changes

- 30c6eb5: Update to use new registry
