# @saas-ui/react

## 0.8.0

### Minor Changes

- 385b760: Improved Typescript support for forms, conditionally render form fields with DisplayIf
- f88d99a: Added new OverflowMenu component

### Patch Changes

- Updated dependencies [c7c77c5]
- Updated dependencies [5fbdefc]
- Updated dependencies [385b760]
- Updated dependencies [f88d99a]
  - @saas-ui/menu@0.3.0
  - @saas-ui/layout@0.1.5
  - @saas-ui/forms@0.3.0
  - @saas-ui/data-table@0.1.4
  - @saas-ui/auth@0.4.5
  - @saas-ui/modals@0.2.5

## 0.7.5

### Patch Changes

- AuthProvider now checks if a user is authenticated when logIn or signUp are succesful.
- Updated dependencies
  - @saas-ui/auth@0.4.4

## 0.7.4

### Patch Changes

- Updated dependencies [cedd489]
- Updated dependencies [b57b40b]
  - @saas-ui/collapse@0.2.3
  - @saas-ui/layout@0.1.4
  - @saas-ui/data-table@0.1.3

## 0.7.3

### Patch Changes

- Updated dependencies [a7fc88b]
- Updated dependencies [0456a9f]
  - @saas-ui/data-table@0.1.2
  - @saas-ui/modals@0.2.4

## 0.7.2

### Patch Changes

- 65cd402: Added new FormDialog component
- 4b8a1cb: Improved useCollapse Typescript signature, merge toggle classname and return isCollapsible param.
- 46dd92b: NumberInput stepper can now be hidden and supports custom icons.
- Updated dependencies [65cd402]
- Updated dependencies [4b8a1cb]
- Updated dependencies [44e024f]
- Updated dependencies [46dd92b]
  - @saas-ui/modals@0.2.3
  - @saas-ui/collapse@0.2.2
  - @saas-ui/layout@0.1.3
  - @saas-ui/number-input@0.2.2
  - @saas-ui/data-table@0.1.1
  - @saas-ui/forms@0.2.5
  - @saas-ui/auth@0.4.3

## 0.7.1

### Patch Changes

- Add Magic.link auth service to exports
- Updated dependencies
  - @saas-ui/auth@0.4.2

## 0.7.0

### Minor Changes

- 94a4bd6: Added new DataTable component

### Patch Changes

- b3159a7: Only publish dist and src files
- 2df4438: Add Link component
- Updated dependencies [94a4bd6]
- Updated dependencies [b3159a7]
- Updated dependencies [5e49802]
- Updated dependencies [2df4438]
  - @saas-ui/data-table@0.1.0
  - @saas-ui/auth@0.4.1
  - @saas-ui/button@0.2.1
  - @saas-ui/card@0.2.1
  - @saas-ui/collapse@0.2.1
  - @saas-ui/forms@0.2.4
  - @saas-ui/hooks@0.2.1
  - @saas-ui/hotkeys@0.3.1
  - @saas-ui/input-right-button@0.2.1
  - @saas-ui/layout@0.1.2
  - @saas-ui/list@0.3.2
  - @saas-ui/menu@0.2.6
  - @saas-ui/modals@0.2.2
  - @saas-ui/nprogress@0.2.1
  - @saas-ui/number-input@0.2.1
  - @saas-ui/palette@0.4.1
  - @saas-ui/password-input@0.2.1
  - @saas-ui/persona@0.3.2
  - @saas-ui/pin-input@0.2.1
  - @saas-ui/property@0.2.1
  - @saas-ui/provider@0.2.6
  - @saas-ui/radio@0.2.1
  - @saas-ui/search-input@0.3.1
  - @saas-ui/select@0.2.1
  - @saas-ui/snackbar@0.2.1
  - @saas-ui/system@0.3.1
  - @saas-ui/theme@0.4.3

## 0.6.0

### Minor Changes

- 07d67a6: Finalized the authentication api

### Patch Changes

- Updated dependencies [07d67a6]
  - @saas-ui/auth@0.4.0

## 0.5.3

### Patch Changes

- Update dependencies
- Updated dependencies [d3edc56]
- Updated dependencies [60173ca]
  - @saas-ui/theme@0.4.2
  - @saas-ui/auth@0.3.0
  - @saas-ui/provider@0.2.5
  - @saas-ui/menu@0.2.5

## 0.5.2

### Patch Changes

- Add supabase service to package entries
- Bump version
- Updated dependencies
- Updated dependencies
  - @saas-ui/auth@0.2.3
  - @saas-ui/layout@0.1.1
  - @saas-ui/forms@0.2.3
  - @saas-ui/list@0.3.1
  - @saas-ui/menu@0.2.4
  - @saas-ui/modals@0.2.1
  - @saas-ui/provider@0.2.4
  - @saas-ui/theme@0.4.1

## 0.5.1

### Patch Changes

- Set default value on FormProps generic type
- Updated dependencies
  - @saas-ui/forms@0.2.2
  - @saas-ui/auth@0.2.2

## 0.5.0

### Minor Changes

- 638a054: Added new layout package with EmptyState and Loading components
- 4733b8f: Added new MenuDialog component

### Patch Changes

- Updated dependencies [638a054]
- Updated dependencies [76f5e46]
- Updated dependencies [4733b8f]
  - @saas-ui/theme@0.4.0
  - @saas-ui/layout@0.1.0
  - @saas-ui/menu@0.2.3
  - @saas-ui/modals@0.2.0
  - @saas-ui/provider@0.2.3

## 0.4.1

### Patch Changes

- Fix modals build script
- Updated dependencies
  - @saas-ui/modals@0.1.1

## 0.4.0

### Minor Changes

- Release list component

### Patch Changes

- Updated dependencies
  - @saas-ui/list@0.3.0
  - @saas-ui/theme@0.3.0
  - @saas-ui/provider@0.2.2
  - @saas-ui/menu@0.2.2

## 0.3.0

### Minor Changes

- Initial release of modals manager

### Patch Changes

- Updated dependencies
  - @saas-ui/modals@0.1.0

## 0.2.1

### Patch Changes

- 7141944: Improve button color accesibility
- e448f31: Saas UI theme now longer shows outlines when buttons/links are focused with a mouse click
- 6c55bef: Now using semantic tokens for presence colors
- 9673005: Improved typescript support and fixed issue with invalid states
- Updated dependencies [7141944]
- Updated dependencies [e448f31]
- Updated dependencies [6c55bef]
- Updated dependencies [9673005]
  - @saas-ui/theme@0.2.1
  - @saas-ui/persona@0.3.1
  - @saas-ui/forms@0.2.1
  - @saas-ui/provider@0.2.1
  - @saas-ui/auth@0.2.1
  - @saas-ui/menu@0.2.1

## 0.2.0

### Minor Changes

- Upgrade to Chakra UI 1.8.1

### Patch Changes

- Updated dependencies
- Updated dependencies
- Updated dependencies
  - @saas-ui/provider@0.2.0
  - @saas-ui/auth@0.2.0
  - @saas-ui/collapse@0.2.0
  - @saas-ui/forms@0.2.0
  - @saas-ui/hotkeys@0.3.0
  - @saas-ui/input-right-button@0.2.0
  - @saas-ui/menu@0.2.0
  - @saas-ui/nprogress@0.2.0
  - @saas-ui/number-input@0.2.0
  - @saas-ui/palette@0.4.0
  - @saas-ui/persona@0.3.0
  - @saas-ui/pin-input@0.2.0
  - @saas-ui/radio@0.2.0
  - @saas-ui/search-input@0.3.0
  - @saas-ui/select@0.2.0
  - @saas-ui/snackbar@0.2.0
  - @saas-ui/theme@0.2.0
  - @saas-ui/button@0.2.0
  - @saas-ui/card@0.2.0
  - @saas-ui/hooks@0.2.0
  - @saas-ui/password-input@0.2.0
  - @saas-ui/property@0.2.0
  - @saas-ui/system@0.3.0

## 0.1.16

### Patch Changes

- Remove Next dependency
- Updated dependencies
  - @saas-ui/nprogress@0.1.6

## 0.1.15

### Patch Changes

- Removed unused isOptional option
- Updated dependencies
  - @saas-ui/auth@0.1.9
  - @saas-ui/forms@0.1.9

## 0.1.14

### Patch Changes

- Update radio dependencies
- Updated dependencies
  - @saas-ui/forms@0.1.8
  - @saas-ui/radio@0.1.5
  - @saas-ui/auth@0.1.8

## 0.1.13

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@0.1.7
  - @saas-ui/number-input@0.1.4
  - @saas-ui/password-input@0.1.7
  - @saas-ui/persona@0.2.6
  - @saas-ui/pin-input@0.1.4
  - @saas-ui/radio@0.1.4
  - @saas-ui/search-input@0.2.4
  - @saas-ui/select@0.1.5
  - @saas-ui/auth@0.1.7
  - @saas-ui/hotkeys@0.2.6

## 0.1.12

### Patch Changes

- Update card dependencies
- Updated dependencies
  - @saas-ui/card@0.1.6
  - @saas-ui/hotkeys@0.2.5
  - @saas-ui/system@0.2.5
  - @saas-ui/theme@0.1.6
  - @saas-ui/auth@0.1.6
  - @saas-ui/button@0.1.6
  - @saas-ui/menu@0.1.6
  - @saas-ui/nprogress@0.1.5
  - @saas-ui/persona@0.2.5
  - @saas-ui/snackbar@0.1.5
  - @saas-ui/provider@0.1.6
  - @saas-ui/forms@0.1.6
  - @saas-ui/input-right-button@0.1.6
  - @saas-ui/password-input@0.1.6

## 0.1.11

### Patch Changes

- Update correct dependencies
- Updated dependencies
  - @saas-ui/provider@0.1.5
  - @saas-ui/theme@0.1.5

## 0.1.9

### Patch Changes

- Add React to collapse dependencies
- Updated dependencies
  - @saas-ui/collapse@0.1.5

## 0.1.8

### Patch Changes

- Add select & search-input

## 0.1.6

### Patch Changes

- Version bump

## 0.1.5

### Patch Changes

- Updated dependencies
  - @saas-ui/hotkeys@0.2.4
  - @saas-ui/system@0.2.4
  - @saas-ui/forms@0.1.5
  - @saas-ui/property@0.1.3
  - @saas-ui/auth@0.1.5
  - @saas-ui/button@0.1.5
  - @saas-ui/card@0.1.5
  - @saas-ui/menu@0.1.5
  - @saas-ui/nprogress@0.1.4
  - @saas-ui/persona@0.2.4
  - @saas-ui/snackbar@0.1.4
  - @saas-ui/theme@0.1.4
  - @saas-ui/input-right-button@0.1.5
  - @saas-ui/provider@0.1.4
  - @saas-ui/password-input@0.1.5

## 0.1.4

### Patch Changes

- Updated dependencies
  - @saas-ui/auth@0.1.4
  - @saas-ui/button@0.1.4
  - @saas-ui/card@0.1.4
  - @saas-ui/collapse@0.1.4
  - @saas-ui/forms@0.1.4
  - @saas-ui/input-right-button@0.1.4
  - @saas-ui/menu@0.1.4
  - @saas-ui/password-input@0.1.4

## 0.1.3

### Patch Changes

- Improved exports configuration
- Updated dependencies
  - @saas-ui/auth@0.1.3
  - @saas-ui/button@0.1.3
  - @saas-ui/card@0.1.3
  - @saas-ui/collapse@0.1.3
  - @saas-ui/forms@0.1.3
  - @saas-ui/hooks@0.1.3
  - @saas-ui/hotkeys@0.2.3
  - @saas-ui/input-right-button@0.1.3
  - @saas-ui/menu@0.1.3
  - @saas-ui/nprogress@0.1.3
  - @saas-ui/number-input@0.1.3
  - @saas-ui/palette@0.3.2
  - @saas-ui/password-input@0.1.3
  - @saas-ui/persona@0.2.3
  - @saas-ui/pin-input@0.1.3
  - @saas-ui/property@0.1.3
  - @saas-ui/provider@0.1.3
  - @saas-ui/radio@0.1.3
  - @saas-ui/snackbar@0.1.3
  - @saas-ui/system@0.2.3
  - @saas-ui/theme@0.1.3

## 0.1.2

### Patch Changes

- Republish with correct deps
- Updated dependencies
  - @saas-ui/auth@0.1.2
  - @saas-ui/button@0.1.2
  - @saas-ui/card@0.1.2
  - @saas-ui/collapse@0.1.2
  - @saas-ui/forms@0.1.2
  - @saas-ui/hooks@0.1.2
  - @saas-ui/hotkeys@0.2.2
  - @saas-ui/input-right-button@0.1.2
  - @saas-ui/menu@0.1.2
  - @saas-ui/nprogress@0.1.2
  - @saas-ui/number-input@0.1.2
  - @saas-ui/palette@0.3.1
  - @saas-ui/password-input@0.1.2
  - @saas-ui/persona@0.2.2
  - @saas-ui/pin-input@0.1.2
  - @saas-ui/property@0.1.2
  - @saas-ui/provider@0.1.2
  - @saas-ui/radio@0.1.2
  - @saas-ui/snackbar@0.1.2
  - @saas-ui/system@0.2.2
  - @saas-ui/theme@0.1.2

## 0.1.1

### Patch Changes

- Fix version mismatch
- Updated dependencies
  - @saas-ui/provider@0.1.1
  - @saas-ui/snackbar@0.1.1
  - @saas-ui/auth@0.1.1
  - @saas-ui/button@0.1.1
  - @saas-ui/card@0.1.1
  - @saas-ui/collapse@0.1.1
  - @saas-ui/forms@0.1.1
  - @saas-ui/hooks@0.1.1
  - @saas-ui/hotkeys@0.2.1
  - @saas-ui/input-right-button@0.1.1
  - @saas-ui/menu@0.1.1
  - @saas-ui/nprogress@0.1.1
  - @saas-ui/number-input@0.1.1
  - @saas-ui/password-input@0.1.1
  - @saas-ui/persona@0.2.1
  - @saas-ui/pin-input@0.1.1
  - @saas-ui/property@0.1.1
  - @saas-ui/radio@0.1.1
  - @saas-ui/system@0.2.1
  - @saas-ui/theme@0.1.1

## 0.1.0

### Minor Changes

- Initial release of Saas UI Core

### Patch Changes

- Updated dependencies
  - @saas-ui/auth@0.1.0
  - @saas-ui/button@0.1.0
  - @saas-ui/card@0.1.0
  - @saas-ui/collapse@0.1.0
  - @saas-ui/forms@0.1.0
  - @saas-ui/hooks@0.1.0
  - @saas-ui/hotkeys@0.2.0
  - @saas-ui/input-right-button@0.1.0
  - @saas-ui/menu@0.1.0
  - @saas-ui/nprogress@0.1.0
  - @saas-ui/number-input@0.1.0
  - @saas-ui/password-input@0.1.0
  - @saas-ui/persona@0.2.0
  - @saas-ui/pin-input@0.1.0
  - @saas-ui/property@0.1.0
  - @saas-ui/provider@0.1.0
  - @saas-ui/radio@0.1.0
  - @saas-ui/snackbar@0.1.0
  - @saas-ui/system@0.2.0
  - @saas-ui/theme@0.1.0
