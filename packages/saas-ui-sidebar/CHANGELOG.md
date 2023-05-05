# @saas-ui/sidebar

## 0.9.1

### Patch Changes

- b2302a3: Add types to package.json exports
- Updated dependencies [b2302a3]
  - @saas-ui/collapse@1.4.1
  - @saas-ui/provider@1.2.2
  - @saas-ui/react-utils@1.2.1

## 0.9.0

### Minor Changes

- aea16c7: BREAKING: Improved Sidebar behavior and theme. Remove deprecated label prop on NavItem.

### Patch Changes

- @saas-ui/provider@1.2.1

## 0.8.0

### Minor Changes

- 1f074c98: Upgrade to Chakra 2.4.8. Using .mjs for esm bundles.

### Patch Changes

- Updated dependencies [1f074c98]
  - @saas-ui/collapse@1.4.0
  - @saas-ui/provider@1.2.0
  - @saas-ui/react-utils@1.2.0

## 0.7.0

### Minor Changes

- ec868e2: NavItem now supports tooltipProps to customize all tooltip props.

## 0.6.1

### Patch Changes

- 5dd6af5: Fix issue where component would be in error state when no Sidebar theme is configured.

## 0.6.0

### Minor Changes

- 4b388f8: Fixed toggle button spacing.

### Patch Changes

- 54a38a4: Do not render tooltip for regular sidebar items, unless the tooltip prop is added.
  - @saas-ui/provider@1.1.8

## 0.5.5

### Patch Changes

- Fixed issue where SSR on mobile devices would not render properly.

## 0.5.4

### Patch Changes

- 7cf5223: Improved toggle button rendering and behavior with ssr / mobile screens.
- Updated dependencies [7cf5223]
  - @saas-ui/react-utils@1.1.2
  - @saas-ui/provider@1.1.7

## 0.5.3

### Patch Changes

- Only set tooltip label if children is a string.

## 0.5.2

### Patch Changes

- Fix SSR variant value.

## 0.5.1

### Patch Changes

- ddb0019: Fix React hydration error with condensed variant

## 0.5.0

### Minor Changes

- d92f516: Updated to Chakra UI 2.4.1

### Patch Changes

- Updated dependencies [d92f516]
  - @saas-ui/collapse@1.3.0
  - @saas-ui/provider@1.1.6

## 0.4.0

### Minor Changes

- 0a77fc0: Cleaned up NavItem theme.
- 0a77fc0: Added classNames to all NavItem components.

### Patch Changes

- @saas-ui/provider@1.1.5

## 0.3.2

### Patch Changes

- 92f3e73: Sidebar now supports responsive variant value
- Updated dependencies [92f3e73]
  - @saas-ui/react-utils@1.1.1

## 0.3.1

### Patch Changes

- Updated dependencies [065e94d]
  - @saas-ui/provider@1.1.4

## 0.3.0

### Minor Changes

- 466b3ca: Updated to Chakra UI 2.3.6

### Patch Changes

- Updated dependencies [466b3ca]
  - @saas-ui/collapse@1.2.0
  - @saas-ui/provider@1.1.3

## 0.2.0

### Minor Changes

- 7f8798b: Add new motionPreset property, sidebar animation can be disabled with motionPreset="none"

### Patch Changes

- @saas-ui/provider@1.1.2

## 0.1.2

### Patch Changes

- 5ebf39f: useSidebarContext no longer throws an error when no context is available.
- 5ebf39f: SidebarToggleButton icon now supports a renderProp

## 0.1.1

### Patch Changes

- 3ec9d75: Forward ref to Sidebar container

## 0.1.0

### Minor Changes

- 40a9465: Added Sidebar component to core

### Patch Changes

- Updated dependencies [40a9465]
  - @saas-ui/collapse@1.1.1
