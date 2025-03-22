# @saas-ui/react

## 3.0.0-next.2

### Minor Changes

- ec22a57: Re-export all remaining Chakra UI components
- 928abff: Added Page and BackButton component

### Patch Changes

- 26f5452: Added /preset export that exports the Chakra UI preset

## 3.0.0-next.1

### Patch Changes

- f13c1ce: Fixed issue where types were not exported with type prefix

## 3.0.0-next.0

### Major Changes

- 550e5a6: Upgrade to Chakra v3
- 8e760c5: Added new wide gammut color tokens

### Minor Changes

- e9fec88: Added toaster and menu components
- 8d8ffaa: Translucency and backdrop effect of overlay elements can now be configured
- c680574: Added Status component
- f62c3d6: Export all components from root barrel file
- f85d493: Added Sidebar.Context component that allows you to access sidebar context using a render prop
- a2ef175: Added Pagination component
- eb02362: Improved GridList recipe
- f85d493: Sidebar mode can now be controlled using the sidebar context
- c680574: Added Badge and Tag components
- 95c8652: Update to Chakra UI 3.2.1
- ac2d80d: Improved toaster styles and allow setting global defaults
- 15e093e: Added new components, Accordion, Alert, Checkbox, HoverCard
- 8d8ffaa: Added FileUpload component
- 6459de4: Removed src exports and files from packages
- 8d8ffaa: Added Popover component
- 8d8ffaa: Added semantic tokens and scales for control, panel and indicator
- f0f5ab0: Improve Navbar composition

### Patch Changes

- ba3b566: Improved Sidebar contrast
- 2285040: Improved avatar and persona sizes
- 64e680e: Update default button colorPalette to gray
- 53716c5: Fixed GridList prop forwarding
- 5115e8f: Improved text selection color contrast
- 212a7e6: Add missing focusRing semantic tokens
- 38082d4: Improved horizontal field styles
- c680574: Changed default Button variant to surface
- 942e9a0: Improved SidebarNavItem positioning
- 8d8ffaa: Added ghost variant to tabs recipe
- 53716c5: Fixed issue where Button colorPalette could not be changed using the recipe
- 205580d: Added option to customize the Command modifiers
- 7808a76: Restructure slot components and add ui namespaces to recipes
- e7fe684: Export Pagination Context component
- c680574: Rename Drawer and Dialog CloseTrigger to CloseButton
- b51aff9: Improved form components recipes sizing
- 212a7e6: Improved yellow color tokens
- ce8c247: Inputs now use semanti radii tokens
- 19309d4: Improved Sidebar recipe with beter balance and added --sidebar-item-icon-color variable
- ce8c247: SegmentGroup now use semantic radii tokens
- ce8c247: Forward ref to LoadingOverlay.Root
- c680574: Improved Button glass variant hover color
- ba3b566: Improved focusRing styles
- 6a8bf46: Decreased default overlay translucency
- 0067207: Fixed issue where paddingStart would not apply to grouped inputs
- b51aff9: Fixed passing menu button props to button component
- 205580d: Added size variant to Command
- ba3b566: Added SegmentControl stories and made sizing consistent with buttons
- 56b0623: Update with upstream changes
- 6a8bf46: Fix dialog backdrop z-index
- c680574: Improved semantic grays and shadows balance
- 8ac704a: Improved tag recipe and support status component.
- 6f9f04d: Fixed issue where Sidebar mode could not be controlled
- eb02362: Add missing PaginationPageTextProps export
- 56b0623: Fixed issue where backdrop would render on top of dialog and drawer
- c51e12c: Improved radii tokens
- 0067207: Added 4.5 spacing
- 65fac53: Fixed semantic token inconsistencies
- 61ce1b5: Fixed sidebar item end element positioning
- 3a73bc8: Fixed incorrect props type for GridListRoot
- 9d47676: Improved tabs recipe, new pills variant and xs size
- 64e680e: Export Menu.Context
- 2285040: No longer showing presence badge if no presence is set
- ba3b566: Sidebar.Button now renders a div with role="button"
- 19309d4: Improved font size balance
- 727b902: Allow click event on Sidebar.Track to be prevented
- Updated dependencies [f85d493]
- Updated dependencies [f85d493]
- Updated dependencies [550e5a6]
- Updated dependencies [95c8652]
- Updated dependencies [eb02362]
- Updated dependencies [cee2e9c]
- Updated dependencies [6f9f04d]
- Updated dependencies [6459de4]
- Updated dependencies [0f49a18]
  - @saas-ui/core@3.0.0-next.0
  - @saas-ui/hooks@3.0.0-next.0

## 2.11.4

### Patch Changes

- Updated dependencies [091fd38]
  - @saas-ui/forms@2.11.0
  - @saas-ui/modals@2.4.4
  - @saas-ui/data-table@13.0.4

## 2.11.3

### Patch Changes

- Updated dependencies [eb53116]
  - @saas-ui/forms@2.10.0
  - @saas-ui/modals@2.4.3
  - @saas-ui/data-table@13.0.3

## 2.11.2

### Patch Changes

- 862937a: Bump chakra version
- Updated dependencies [862937a]
  - @saas-ui/data-table@13.0.2
  - @saas-ui/nprogress@2.2.1
  - @saas-ui/hotkeys@2.5.1
  - @saas-ui/modals@2.4.2
  - @saas-ui/forms@2.9.1
  - @saas-ui/theme@2.6.1
  - @saas-ui/core@2.8.1

## 2.11.1

### Patch Changes

- Updated dependencies [a69829a]
  - @saas-ui/hooks@2.3.0
  - @saas-ui/modals@2.4.1
  - @saas-ui/data-table@13.0.1

## 2.11.0

### Minor Changes

- 803ede7: Updated Chakra UI version range to >=2.9.0 <3

### Patch Changes

- Updated dependencies [803ede7]
  - @saas-ui/data-table@13.0.0
  - @saas-ui/nprogress@2.2.0
  - @saas-ui/hotkeys@2.5.0
  - @saas-ui/modals@2.4.0
  - @saas-ui/forms@2.9.0
  - @saas-ui/hooks@2.2.0
  - @saas-ui/theme@2.6.0
  - @saas-ui/core@2.8.0

## 2.10.5

### Patch Changes

- c9daf50: Fixed issue where link component prop would not be passed to NavItem
- Updated dependencies [c9daf50]
  - @saas-ui/core@2.7.2
  - @saas-ui/data-table@12.0.5
  - @saas-ui/forms@2.8.2
  - @saas-ui/hotkeys@2.4.2
  - @saas-ui/modals@2.3.5

## 2.10.4

### Patch Changes

- a863a5e: Updated package type to fix next 15 support
- Updated dependencies [a863a5e]
  - @saas-ui/modals@2.3.4
  - @saas-ui/data-table@12.0.4

## 2.10.3

### Patch Changes

- Updated dependencies
  - @saas-ui/modals@2.3.3
  - @saas-ui/data-table@12.0.3

## 2.10.2

### Patch Changes

- 7669720: Fixed publint issues
- Updated dependencies [7669720]
  - @saas-ui/modals@2.3.2
  - @saas-ui/data-table@12.0.2

## 2.10.1

### Patch Changes

- 5e24ec4: Fixed issue where as prop on NavItem would always be overruled by internal Link prop if href is passed
- Updated dependencies [5e24ec4]
  - @saas-ui/core@2.7.1
  - @saas-ui/data-table@12.0.1
  - @saas-ui/forms@2.8.1
  - @saas-ui/hotkeys@2.4.1
  - @saas-ui/modals@2.3.1

## 2.10.0

### Minor Changes

- fc799df: Removed deprecated Chakra UI dependency

### Patch Changes

- Updated dependencies [fc799df]
  - @saas-ui/hotkeys@2.4.0
  - @saas-ui/modals@2.3.0
  - @saas-ui/forms@2.8.0
  - @saas-ui/core@2.7.0
  - @saas-ui/data-table@12.0.0

## 2.9.1

### Patch Changes

- f0ee3db: Updated to Chakra 2.10
- Updated dependencies [f0ee3db]
  - @saas-ui/data-table@11.0.1
  - @saas-ui/nprogress@2.1.1
  - @saas-ui/hotkeys@2.3.1
  - @saas-ui/modals@2.2.1
  - @saas-ui/forms@2.7.1
  - @saas-ui/theme@2.5.1
  - @saas-ui/core@2.6.1

## 2.9.0

### Minor Changes

- 2ac496a: Upgraded to Chakra UI v2.9.3

### Patch Changes

- Updated dependencies [2ac496a]
  - @saas-ui/data-table@11.0.0
  - @saas-ui/nprogress@2.1.0
  - @saas-ui/hotkeys@2.3.0
  - @saas-ui/modals@2.2.0
  - @saas-ui/forms@2.7.0
  - @saas-ui/hooks@2.1.0
  - @saas-ui/theme@2.5.0
  - @saas-ui/core@2.6.0

## 2.8.11

### Patch Changes

- 5e000e0: Removed background color from loading overlay fill variant
- Updated dependencies [5e000e0]
  - @saas-ui/theme@2.4.2
  - @saas-ui/core@2.5.6
  - @saas-ui/data-table@10.0.11
  - @saas-ui/forms@2.6.11
  - @saas-ui/hotkeys@2.2.14
  - @saas-ui/modals@2.1.41

## 2.8.10

### Patch Changes

- Updated dependencies [fc2203a]
  - @saas-ui/forms@2.6.10
  - @saas-ui/modals@2.1.40
  - @saas-ui/data-table@10.0.10

## 2.8.9

### Patch Changes

- Updated dependencies [df5d37f]
  - @saas-ui/forms@2.6.9
  - @saas-ui/modals@2.1.39
  - @saas-ui/data-table@10.0.9

## 2.8.8

### Patch Changes

- Updated dependencies [fc62212]
  - @saas-ui/forms@2.6.8
  - @saas-ui/modals@2.1.38
  - @saas-ui/data-table@10.0.8

## 2.8.7

### Patch Changes

- Updated dependencies [02cac87]
  - @saas-ui/data-table@10.0.7
  - @saas-ui/modals@2.1.37
  - @saas-ui/forms@2.6.7
  - @saas-ui/core@2.5.5
  - @saas-ui/hotkeys@2.2.13

## 2.8.6

### Patch Changes

- 12c35ea: Fixed issue where NavGroup title would always render collapsible state
- b61ff73: Improve styling overrides for EmptyStateIcon
- Updated dependencies [12c35ea]
- Updated dependencies [b61ff73]
  - @saas-ui/core@2.5.4
  - @saas-ui/data-table@10.0.6
  - @saas-ui/forms@2.6.6
  - @saas-ui/hotkeys@2.2.12
  - @saas-ui/modals@2.1.36

## 2.8.5

### Patch Changes

- 29c6fea: Fixed issue where hideLabel would not be passed to base field
- b6ce1bf: Fixed return type of useFormContext
- Updated dependencies [29c6fea]
- Updated dependencies [b6ce1bf]
  - @saas-ui/forms@2.6.5
  - @saas-ui/modals@2.1.35
  - @saas-ui/data-table@10.0.5

## 2.8.4

### Patch Changes

- 4c03ddb: Added support for horizontal form fields
- Updated dependencies [4c03ddb]
  - @saas-ui/forms@2.6.4
  - @saas-ui/theme@2.4.1
  - @saas-ui/modals@2.1.34
  - @saas-ui/core@2.5.3
  - @saas-ui/data-table@10.0.4
  - @saas-ui/hotkeys@2.2.11

## 2.8.3

### Patch Changes

- 5a334e2: Fixed issue where hideLabel prop would be passed to input
- 1cc3e3b: FormLayout now supports theming
- 69f5e66: Removed lost console.log
- Updated dependencies [5a334e2]
- Updated dependencies [1cc3e3b]
- Updated dependencies [69f5e66]
  - @saas-ui/forms@2.6.3
  - @saas-ui/core@2.5.2
  - @saas-ui/modals@2.1.33
  - @saas-ui/data-table@10.0.3
  - @saas-ui/hotkeys@2.2.10

## 2.8.2

### Patch Changes

- 5fb8082: Fixed issue where isInvalid would not be passed down to form control
- 5fb8082: Fixed issue where the SearchInput reset button could be interacted with when disabled
- d94ccec: Fixed issue where long pressed hotkeys would not reset and prevent other keys from triggering
- d94ccec: Fixed aria role of PropertyList
- 06ec4b6: Fixed issue where snackbar promise would not close
- 1ff54a2: Fixed issue where text selection was disabled inside ContextMenuTrigger on mouse devices
- Updated dependencies [5fb8082]
- Updated dependencies [5fb8082]
- Updated dependencies [d94ccec]
- Updated dependencies [d94ccec]
- Updated dependencies [06ec4b6]
- Updated dependencies [1ff54a2]
  - @saas-ui/forms@2.6.2
  - @saas-ui/core@2.5.1
  - @saas-ui/hotkeys@2.2.9
  - @saas-ui/modals@2.1.32
  - @saas-ui/data-table@10.0.2

## 2.8.1

### Patch Changes

- Updated dependencies [b110d4a]
  - @saas-ui/forms@2.6.1
  - @saas-ui/modals@2.1.31
  - @saas-ui/data-table@10.0.1

## 2.8.0

### Minor Changes

- 9fe1899: Improved Select types, value type is now string or string[] depending on the multiple prop
- e75e99b: StructuredListItem now supports isDisabled props

### Patch Changes

- e75e99b: Fixed issue where StructuredListItem would not receive focus
- Updated dependencies [9fe1899]
- Updated dependencies [e75e99b]
- Updated dependencies [e75e99b]
  - @saas-ui/forms@2.6.0
  - @saas-ui/core@2.5.0
  - @saas-ui/theme@2.4.0
  - @saas-ui/modals@2.1.30
  - @saas-ui/data-table@10.0.0
  - @saas-ui/hotkeys@2.2.8

## 2.7.4

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@2.5.4
  - @saas-ui/modals@2.1.29
  - @saas-ui/data-table@9.0.4

## 2.7.3

### Patch Changes

- 20c7175: Added forwardRef to ContextMenuTrigger
- ca911e4: Fixed issue where global toast default options would not apply to snackbar
- 0a218fd: Fixed issue where Field types would not be inferred
- Updated dependencies [20c7175]
- Updated dependencies [ca911e4]
- Updated dependencies [ca911e4]
- Updated dependencies [0a218fd]
- Updated dependencies [0a218fd]
  - @saas-ui/core@2.4.4
  - @saas-ui/forms@2.5.3
  - @saas-ui/data-table@9.0.3
  - @saas-ui/hotkeys@2.2.7
  - @saas-ui/modals@2.1.28

## 2.7.2

### Patch Changes

- d77a5b3: Fixed circular dependency issue
- Updated dependencies [d77a5b3]
  - @saas-ui/forms@2.5.2
  - @saas-ui/core@2.4.3
  - @saas-ui/modals@2.1.27
  - @saas-ui/data-table@9.0.2
  - @saas-ui/hotkeys@2.2.6

## 2.7.1

### Patch Changes

- Updated dependencies
  - @saas-ui/core@2.4.2
  - @saas-ui/data-table@9.0.1
  - @saas-ui/forms@2.5.1
  - @saas-ui/hotkeys@2.2.5
  - @saas-ui/modals@2.1.26

## 2.7.0

### Minor Changes

- Improved forms to support a global base field override

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@2.5.0
  - @saas-ui/modals@2.1.25
  - @saas-ui/data-table@9.0.0

## 2.6.2

### Patch Changes

- Updated dependencies [0fad607]
  - @saas-ui/modals@2.1.24
  - @saas-ui/data-table@8.0.2

## 2.6.1

### Patch Changes

- 2f32548: Fixed issue where Chakra UI Card sizes would not apply
- 0778d23: Moved all StructuredList styling into theme
- 7db4aee: Fixed issue where ref would not be forwarded to StructuredListHeader
- Updated dependencies [2f32548]
- Updated dependencies [0778d23]
- Updated dependencies [7db4aee]
  - @saas-ui/theme@2.3.4
  - @saas-ui/core@2.4.1
  - @saas-ui/data-table@8.0.1
  - @saas-ui/forms@2.4.1
  - @saas-ui/hotkeys@2.2.4
  - @saas-ui/modals@2.1.23

## 2.6.0

### Minor Changes

- 4a95712: Improved snackbar.promise method to not rethrow error when the error option is a function
- 4a95712: Improved snackbar.promise success prop to accept an optional function callback
- 73d09d9: Added support for leftAddon and rightAddon on number input types
- efca417: Improved ObjectSchema type definitions to be more strict and inherit correct field type props

### Patch Changes

- Updated dependencies [4a95712]
- Updated dependencies [4a95712]
- Updated dependencies [73d09d9]
- Updated dependencies [efca417]
  - @saas-ui/core@2.4.0
  - @saas-ui/forms@2.4.0
  - @saas-ui/data-table@8.0.0
  - @saas-ui/hotkeys@2.2.3
  - @saas-ui/modals@2.1.22

## 2.5.10

### Patch Changes

- 2e7da38: Updated dependencies
- Updated dependencies [2e7da38]
- Updated dependencies [da5167a]
  - @saas-ui/data-table@7.0.10
  - @saas-ui/nprogress@2.0.3
  - @saas-ui/modals@2.1.21
  - @saas-ui/forms@2.3.12
  - @saas-ui/theme@2.3.3
  - @saas-ui/core@2.3.6
  - @saas-ui/hotkeys@2.2.2

## 2.5.9

### Patch Changes

- Updated dependencies [29e5c317]
  - @saas-ui/forms@2.3.11
  - @saas-ui/modals@2.1.20
  - @saas-ui/data-table@7.0.9

## 2.5.8

### Patch Changes

- bc1997b0: Fixed issue where form dialog content would overflow when using using scrollbehavior inside
- Updated dependencies [bc1997b0]
  - @saas-ui/modals@2.1.19
  - @saas-ui/data-table@7.0.8

## 2.5.7

### Patch Changes

- Updated dependencies
  - @saas-ui/hotkeys@2.2.1
  - @saas-ui/data-table@7.0.7

## 2.5.6

### Patch Changes

- 52e7490c: Fixed issue where theming props would be forwarded to form layout element
- Updated dependencies [afb87d86]
- Updated dependencies [836305f8]
- Updated dependencies [52e7490c]
  - @saas-ui/core@2.3.5
  - @saas-ui/hotkeys@2.2.0
  - @saas-ui/forms@2.3.10
  - @saas-ui/data-table@7.0.6
  - @saas-ui/modals@2.1.18

## 2.5.5

### Patch Changes

- d6d7ca3f: Added xl size to IconBadge
- 4e291385: Updated Input lg variant height
- aa3c97a0: Fixed issue where FormStepper separator would render incorrectly
- Updated dependencies [d6d7ca3f]
- Updated dependencies [4e291385]
- Updated dependencies [ac3e7f9f]
- Updated dependencies [2f170bf7]
- Updated dependencies [aa3c97a0]
  - @saas-ui/theme@2.3.2
  - @saas-ui/data-table@7.0.5
  - @saas-ui/forms@2.3.9
  - @saas-ui/core@2.3.4
  - @saas-ui/modals@2.1.17
  - @saas-ui/hotkeys@2.1.15

## 2.5.4

### Patch Changes

- Updated dependencies [bc176848]
- Updated dependencies [bc176848]
- Updated dependencies [829a3364]
- Updated dependencies [90ee13c3]
  - @saas-ui/forms@2.3.8
  - @saas-ui/hooks@2.0.3
  - @saas-ui/data-table@7.0.4
  - @saas-ui/nprogress@2.0.2
  - @saas-ui/hotkeys@2.1.14
  - @saas-ui/modals@2.1.16
  - @saas-ui/core@2.3.3

## 2.5.3

### Patch Changes

- bbd692d4: Improved StructuredList with keyboard navigation support
- 781a1c26: Added long press support to ContextMenu
- Updated dependencies [bbd692d4]
- Updated dependencies [029b9b1c]
- Updated dependencies [029b9b1c]
- Updated dependencies [781a1c26]
  - @saas-ui/core@2.3.2
  - @saas-ui/hotkeys@2.1.13
  - @saas-ui/data-table@7.0.3
  - @saas-ui/forms@2.3.7
  - @saas-ui/modals@2.1.15

## 2.5.2

### Patch Changes

- 042c15f3: Added useScrollPosition hook
- Updated dependencies [042c15f3]
  - @saas-ui/hooks@2.0.2
  - @saas-ui/modals@2.1.14
  - @saas-ui/data-table@7.0.2

## 2.5.1

### Patch Changes

- Updated dependencies [c0f203bf]
- Updated dependencies [c0f203bf]
  - @saas-ui/theme@2.3.1
  - @saas-ui/core@2.3.1
  - @saas-ui/data-table@7.0.1
  - @saas-ui/forms@2.3.6
  - @saas-ui/hotkeys@2.1.12
  - @saas-ui/modals@2.1.13

## 2.5.0

### Minor Changes

- 78bc41d0: Improved timeline behavior so it scales automatically with the icon and ocontent size used.
- 316388b9: Added ghost variant to the Badge theme

### Patch Changes

- 8782a76b: Fixed issue where variant would not be passed to SearchInput
- 8782a76b: Improved Navbar inner padding on small screens
- 8782a76b: Added new left-accent variant to the NavItem theme
- 8782a76b: Added new neutral color scheme to Button theme
- 8782a76b: Updated NavGroup to no longer be collapsible by default
- 8782a76b: Fixed issue where SidebarToggleButton style props would not have any effect
- 8782a76b: Added data-state attribute to SidebarToggleButton
- 8782a76b: NavItem href prop no longer has # as default
- Updated dependencies [8782a76b]
- Updated dependencies [8782a76b]
- Updated dependencies [8782a76b]
- Updated dependencies [8782a76b]
- Updated dependencies [8782a76b]
- Updated dependencies [8782a76b]
- Updated dependencies [8782a76b]
- Updated dependencies [78bc41d0]
- Updated dependencies [8782a76b]
- Updated dependencies [316388b9]
- Updated dependencies [8782a76b]
  - @saas-ui/core@2.3.0
  - @saas-ui/theme@2.3.0
  - @saas-ui/data-table@7.0.0
  - @saas-ui/forms@2.3.5
  - @saas-ui/hotkeys@2.1.11
  - @saas-ui/modals@2.1.12

## 2.4.4

### Patch Changes

- f03246ac: Improved IconBadge sizing
- Updated dependencies [4c81f542]
- Updated dependencies [f03246ac]
  - @saas-ui/modals@2.1.11
  - @saas-ui/theme@2.2.3
  - @saas-ui/core@2.2.4
  - @saas-ui/data-table@6.0.4
  - @saas-ui/forms@2.3.4
  - @saas-ui/hotkeys@2.1.10

## 2.4.3

### Patch Changes

- d5ca55e4: Fixed issue where SubmitButton would not properties from form fields prop
- 537804bf: Fixed NavLink line height
- Updated dependencies [d5ca55e4]
- Updated dependencies [d5ca55e4]
- Updated dependencies [537804bf]
  - @saas-ui/forms@2.3.3
  - @saas-ui/core@2.2.3
  - @saas-ui/theme@2.2.2
  - @saas-ui/modals@2.1.10
  - @saas-ui/data-table@6.0.3
  - @saas-ui/hotkeys@2.1.9

## 2.4.2

### Patch Changes

- Updated dependencies [491315aa]
  - @saas-ui/core@2.2.2
  - @saas-ui/data-table@6.0.2
  - @saas-ui/forms@2.3.2
  - @saas-ui/hotkeys@2.1.8
  - @saas-ui/modals@2.1.9

## 2.4.1

### Patch Changes

- Updated dependencies [4e728c26]
- Updated dependencies [3ddca73d]
  - @saas-ui/theme@2.2.1
  - @saas-ui/core@2.2.1
  - @saas-ui/data-table@6.0.1
  - @saas-ui/forms@2.3.1
  - @saas-ui/hotkeys@2.1.7
  - @saas-ui/modals@2.1.8

## 2.4.0

### Minor Changes

- 31d05ed5: Added new Navbar component 🥳
- ebba8404: Added new IconBadge component
- a3180b02: Removed all Component.defaultProps definitions

### Patch Changes

- dddb3d1a: Fixed issue where width would not be applied to the SearchInput container element
- 91412d77: Fixed SearchInput reset when uncontrolled
- 91412d77: Fixed theme incompatibility with Chakra UI 2.8
- Updated dependencies [31d05ed5]
- Updated dependencies [dddb3d1a]
- Updated dependencies [68995558]
- Updated dependencies [ebba8404]
- Updated dependencies [91412d77]
- Updated dependencies [a3180b02]
- Updated dependencies [91412d77]
  - @saas-ui/theme@2.2.0
  - @saas-ui/core@2.2.0
  - @saas-ui/forms@2.3.0
  - @saas-ui/data-table@6.0.0
  - @saas-ui/hotkeys@2.1.6
  - @saas-ui/modals@2.1.7

## 2.3.1

### Patch Changes

- 1c64bfaf: Fixed issue where Zod or Yup schemas would not validate in FormDialog
- 4a3c9dc7: Fixed issue where ErrorBoundary would not have access to SaasProvider context
- Updated dependencies [1c64bfaf]
- Updated dependencies [4a3c9dc7]
  - @saas-ui/forms@2.2.1
  - @saas-ui/core@2.1.3
  - @saas-ui/modals@2.1.6
  - @saas-ui/data-table@5.0.1
  - @saas-ui/hotkeys@2.1.5

## 2.3.0

### Minor Changes

- 87fcdc2c: FormLayout no longer renders each child in a wrapper div

### Patch Changes

- 9ad407a7: Zod schema enum types now render a Select by default
- bcd6d65c: Fixed issue where closing large models with modals manager would flicker
- 654ad186: Fixed issue where Field would not infer correct onChange handler
- 87fcdc2c: Fixed issue where not all StepForm data would be passed to onSubmit
- 9ad407a7: ZodForm now infers defaultValues from the schema
- be52e785: Fixed issue where placeholder would not be passed to the NumberInputField
- Updated dependencies [9ad407a7]
- Updated dependencies [bcd6d65c]
- Updated dependencies [654ad186]
- Updated dependencies [87fcdc2c]
- Updated dependencies [9ad407a7]
- Updated dependencies [87fcdc2c]
- Updated dependencies [be52e785]
  - @saas-ui/forms@2.2.0
  - @saas-ui/modals@2.1.5
  - @saas-ui/data-table@5.0.0

## 2.2.4

### Patch Changes

- e13ae4cd: Fixed issue where overlay elements inside a vertical stepper would not overflow correctly
- Updated dependencies [e13ae4cd]
  - @saas-ui/core@2.1.2
  - @saas-ui/data-table@4.0.4
  - @saas-ui/forms@2.1.3
  - @saas-ui/hotkeys@2.1.4
  - @saas-ui/modals@2.1.4

## 2.2.3

### Patch Changes

- Fixed all packages index to use named exports
- Updated dependencies
  - @saas-ui/data-table@4.0.3
  - @saas-ui/nprogress@2.0.1
  - @saas-ui/hotkeys@2.1.3
  - @saas-ui/modals@2.1.3
  - @saas-ui/forms@2.1.2
  - @saas-ui/hooks@2.0.1
  - @saas-ui/theme@2.1.1
  - @saas-ui/core@2.1.1

## 2.2.2

### Patch Changes

- 3b12ef4e: Removed client directive from index, fixes app directory compatibility
- 2fec29d4: Added formRef prop to FormDialog to access the internal form state
- Updated dependencies [2fec29d4]
  - @saas-ui/modals@2.1.2
  - @saas-ui/data-table@4.0.2

## 2.2.1

### Patch Changes

- 96b0a058: Fixed select button sizes
- Updated dependencies [96b0a058]
  - @saas-ui/forms@2.1.1
  - @saas-ui/modals@2.1.1
  - @saas-ui/data-table@4.0.1

## 2.2.0

### Minor Changes

- 5a384c28: Updated to Chakra UI 2.8.0
- 5a384c28: Added `use client` directive for better RSC support

### Patch Changes

- Updated dependencies [5a384c28]
  - @saas-ui/data-table@4.0.0
  - @saas-ui/modals@2.1.0
  - @saas-ui/forms@2.1.0
  - @saas-ui/theme@2.1.0
  - @saas-ui/core@2.1.0
  - @saas-ui/hotkeys@2.1.2

## 2.1.1

### Patch Changes

- Updated dependencies [0aecc7ba]
  - @saas-ui/hotkeys@2.1.1
  - @saas-ui/data-table@3.0.1

## 2.1.0

### Minor Changes

- b4808069: useHotkeys now supports a custom targetElement, eg an input

### Patch Changes

- b4808069: Fixed issue where useHotkeys would not reset pressed keys
- Updated dependencies [b4808069]
- Updated dependencies [b4808069]
  - @saas-ui/hotkeys@2.1.0
  - @saas-ui/data-table@3.0.0

## 2.0.6

### Patch Changes

- 493a548a: NavItem now renders an aria-current tag when the item is active.
- 9e848077: Export createStandAloneSnackbar from core package.
- 493a548a: NavItem active state is now compatible with Remix and ReactRouter NavLink
- Updated dependencies [493a548a]
- Updated dependencies [9e848077]
- Updated dependencies [493a548a]
  - @saas-ui/theme@2.0.1
  - @saas-ui/core@2.0.3
  - @saas-ui/auth@2.0.5
  - @saas-ui/data-table@2.0.6
  - @saas-ui/forms@2.0.5
  - @saas-ui/hotkeys@2.0.3
  - @saas-ui/modals@2.0.6

## 2.0.5

### Patch Changes

- 3b5567c6: Fixed issue where StepForm would not render custom fields
- Updated dependencies [3b5567c6]
  - @saas-ui/forms@2.0.4
  - @saas-ui/auth@2.0.4
  - @saas-ui/modals@2.0.5
  - @saas-ui/data-table@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [8c7ee0be]
  - @saas-ui/forms@2.0.3
  - @saas-ui/auth@2.0.3
  - @saas-ui/modals@2.0.4
  - @saas-ui/data-table@2.0.4

## 2.0.3

### Patch Changes

- 268fa240: Add support for standalone snackbars
- 93736bed: Export createZodStepForm from form package
- Updated dependencies [268fa240]
- Updated dependencies [93736bed]
  - @saas-ui/core@2.0.2
  - @saas-ui/forms@2.0.2
  - @saas-ui/auth@2.0.2
  - @saas-ui/data-table@2.0.3
  - @saas-ui/hotkeys@2.0.2
  - @saas-ui/modals@2.0.3

## 2.0.2

### Patch Changes

- df98007a: Add missing dependency
- 9b609119: Fix issue where Link would not pass props correctly.
- Updated dependencies [9b609119]
  - @saas-ui/core@2.0.1
  - @saas-ui/data-table@2.0.2
  - @saas-ui/auth@2.0.1
  - @saas-ui/forms@2.0.1
  - @saas-ui/hotkeys@2.0.1
  - @saas-ui/modals@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [f29338d0]
  - @saas-ui/modals@2.0.1
  - @saas-ui/data-table@2.0.1

## 2.0.0

### Major Changes

- 772c9868: Updated to Tanstack ReactTable V8
- d7c87a31: Moved form resolvers into a separate package.
- 83f54180: ErrorBoundary errorComponent property renamed to fallback to be consistent with Suspense.
- 37e38165: Auth forms can now be used standalone, to build custom solutions.
- f1e99198: BREAKING: createPalette no longer exported from @saas-ui/react
- 8b82d945: Renamed List to StructuredList
- 532011d6: Restructured the Select component to make it atomic, the new composition is Select, SelectButton, SelectList and SelectOption.
- 83f54180: Secondary button now uses solid variant and gray colorScheme.
- 8b82d945: Removed button package.
- 61b27fa6: Stepper useNext and usePrev hooks renamed to useStepperNextButton and useStepperPrevButton
- 83f54180: Renamed Loader to LoadingOverlay.
- 0a11d7b6: Renamed Sidebar condensed variant to compact.
- f34de7af: Moved Supabase and Magic auth services to separate packages.
- 3a15e8c8: Improve StructuredList API.
- f1e99198: Restructured packages.
- 39e778d8: Form will now render AutoField by default when no children are passed.
- 6236e117: Removed the Divider component in favor of the Chakra UI Divider component.
- 76887bda: Sidebar breakpoints property renamed to toggleBreakpoint. Now expects a single breakpoint or false to disable auto toggle.
- f3b09191: Removed Card component in favor of the new Chakra UI Card component.

### Minor Changes

- ccfce5c1: useHotkeys now supports preventDefault option to prevent default browser events from firing
- 1177329d: Improved MenuDialog position on mobile
- e94ca3c0: Added TimeLine to core components.
- 7ce390e9: Added Sidebar to core packages.
- 532011d6: Select can now supports theming using the SuiSelect theme config.
- a8ea24da: PasswordInput now accepts leftAddon property.
- 84e59fec: Added new createModals method to create typesafe modals managers with support for custom modals
- 83f54180: Added new tertiary button variant.
- 046e42b8: Updated to Chakra UI 2.7
- 2d18cdc2: New createFormDialog function to create Zod or Yup specific FormDialogs
- e52f63fa: useSnackbar promise error option now accepts a function with err param or SnackbarOptions
- a9ca90dd: Updated to Chakra UI 2.6.x
- 2366db6a: ConfirmDialog now supports an async onConfirm prop and shows a spinner when a promise is returned
- 6dd737ce: Select field now renders invalid state.
- c85541cb: AutoForm field props can now be overridden using the fields prop on Form
- 76887bda: AppShell now controls the Sidebar disclosure state.
- 76887bda: SidebarToggleButton can now be used outside of the Sidebar context, using the new AppShell context.
- 27a68bca: useLocalStorage now updates all hook instances on the current page when the value changed
- 826c561a: EmptyState title and description no longer use Header and Text

### Patch Changes

- 189190c6: Fix Card theme tokens
- e23790a8: Fix SnackbarPromiseOptions error type to SnackbarOptions
- d3900eca: button primary, secondary and tertiary variants colorScheme can now be changed.
- ba61612f: Fixed useSnackbar return type, always returns toastId.
- b8be6d41: tooltipProps on NavItem no longer require children
- d725a5da: Fix esm bundle import
- 70af3ead: Select now supports theming props.
- d725a5da: Bump version
- 5ac0e9ba: Fix vertical stepper items not taking up the full parent width.
- a5898c44: Fix Divider label contrast
- 6193c47c: Fixed issue where Sidebar would not get defaultProps from the theme.
- f1e99198: Migrated from microbundle to tsup for builds
- dc435dd5: No longer needed to use Next.js legacyBehavior for the Link component.
- 7027d7c1: Improve Stepper seperator position on all sizes
- 0fda9fee: Fix ContextMenu and OverflowMenu exports.
- a7ef6dd9: Fixed issue where types for exports were not detected
- 6c63217c: object and array field props can now be overridden using the fields prop
- d6e9a39d: Form fields overries types now support array and object type props
- 83f54180: Fix NavItem focus outline color.
- 2b639656: Fixed issue where colorScheme would be passed down to stepper dom element
- b895e5bd: Add Timeline theme to theme package.
- ccfce5c1: Fixed issue where multiple + separators were not parsed correctly in useHotkeys.
- 0319aa57: Bump version
- 166978bd: Fix esm bundle filename.
- 5ac0e9ba: Fix issue where StepForm would not submit when subsequent fields are required.
- Updated dependencies [ccfce5c1]
- Updated dependencies [772c9868]
- Updated dependencies [84e59fec]
- Updated dependencies [d7c87a31]
- Updated dependencies [1563cc9a]
- Updated dependencies [189190c6]
- Updated dependencies [1177329d]
- Updated dependencies [e23790a8]
- Updated dependencies [d236fb75]
- Updated dependencies [83f54180]
- Updated dependencies [d3900eca]
- Updated dependencies [ba61612f]
- Updated dependencies [e94ca3c0]
- Updated dependencies [37e38165]
- Updated dependencies [b8be6d41]
- Updated dependencies [d725a5da]
- Updated dependencies [b521ce10]
- Updated dependencies [70af3ead]
- Updated dependencies [532011d6]
- Updated dependencies [a8ea24da]
- Updated dependencies [6d3f5717]
- Updated dependencies [d725a5da]
- Updated dependencies [5ac0e9ba]
- Updated dependencies [8d6516c2]
- Updated dependencies [84e59fec]
- Updated dependencies [1177329d]
- Updated dependencies [09dd16cc]
- Updated dependencies [e9258592]
- Updated dependencies [a5898c44]
- Updated dependencies [0a2bb91f]
- Updated dependencies [532011d6]
- Updated dependencies [8045baed]
- Updated dependencies [6193c47c]
- Updated dependencies [83f54180]
- Updated dependencies [f1e99198]
- Updated dependencies [01ac442f]
- Updated dependencies [f79376c3]
- Updated dependencies [ffd878b6]
- Updated dependencies [5b9d90e8]
- Updated dependencies [046e42b8]
- Updated dependencies [cc713117]
- Updated dependencies [83f54180]
- Updated dependencies [8b82d945]
- Updated dependencies [2d18cdc2]
- Updated dependencies [7052dad3]
- Updated dependencies [e52f63fa]
- Updated dependencies [61b27fa6]
- Updated dependencies [7027d7c1]
- Updated dependencies [a9ca90dd]
- Updated dependencies [0fda9fee]
- Updated dependencies [2366db6a]
- Updated dependencies [6dd737ce]
- Updated dependencies [a7ef6dd9]
- Updated dependencies [6c63217c]
- Updated dependencies [83f54180]
- Updated dependencies [0a11d7b6]
- Updated dependencies [d6e9a39d]
- Updated dependencies [c85541cb]
- Updated dependencies [aeab9b0b]
- Updated dependencies [b5912297]
- Updated dependencies [83f54180]
- Updated dependencies [2b639656]
- Updated dependencies [b895e5bd]
- Updated dependencies [f34de7af]
- Updated dependencies [3a15e8c8]
- Updated dependencies [ccfce5c1]
- Updated dependencies [f1e99198]
- Updated dependencies [8e155c3b]
- Updated dependencies [76887bda]
- Updated dependencies [39e778d8]
- Updated dependencies [76887bda]
- Updated dependencies [27a68bca]
- Updated dependencies [6236e117]
- Updated dependencies [943f6287]
- Updated dependencies [0319aa57]
- Updated dependencies [76887bda]
- Updated dependencies [826c561a]
- Updated dependencies [166978bd]
- Updated dependencies [5ac0e9ba]
  - @saas-ui/hotkeys@2.0.0
  - @saas-ui/data-table@2.0.0
  - @saas-ui/forms@2.0.0
  - @saas-ui/modals@2.0.0
  - @saas-ui/core@2.0.0
  - @saas-ui/theme@2.0.0
  - @saas-ui/auth@2.0.0
  - @saas-ui/nprogress@2.0.0
  - @saas-ui/hooks@2.0.0

## 2.0.0-rc.34

### Patch Changes

- 70af3ead: Select now supports theming props.
- Updated dependencies [70af3ead]
- Updated dependencies [b5912297]
  - @saas-ui/core@2.0.0-rc.29
  - @saas-ui/forms@2.0.0-rc.32
  - @saas-ui/data-table@2.0.0-rc.34
  - @saas-ui/auth@2.0.0-rc.33
  - @saas-ui/hotkeys@2.0.0-rc.30
  - @saas-ui/modals@2.0.0-rc.32

## 2.0.0-rc.33

### Patch Changes

- Updated dependencies [e9258592]
  - @saas-ui/core@2.0.0-rc.28
  - @saas-ui/auth@2.0.0-rc.32
  - @saas-ui/data-table@2.0.0-rc.33
  - @saas-ui/forms@2.0.0-rc.31
  - @saas-ui/hotkeys@2.0.0-rc.29
  - @saas-ui/modals@2.0.0-rc.31

## 2.0.0-rc.32

### Patch Changes

- Updated dependencies [09dd16cc]
  - @saas-ui/theme@2.0.0-rc.17
  - @saas-ui/core@2.0.0-rc.27
  - @saas-ui/auth@2.0.0-rc.31
  - @saas-ui/data-table@2.0.0-rc.32
  - @saas-ui/forms@2.0.0-rc.30
  - @saas-ui/hotkeys@2.0.0-rc.28
  - @saas-ui/modals@2.0.0-rc.30

## 2.0.0-rc.31

### Patch Changes

- 0fda9fee: Fix ContextMenu and OverflowMenu exports.
- Updated dependencies [0fda9fee]
  - @saas-ui/core@2.0.0-rc.26
  - @saas-ui/data-table@2.0.0-rc.31
  - @saas-ui/auth@2.0.0-rc.30
  - @saas-ui/forms@2.0.0-rc.29
  - @saas-ui/hotkeys@2.0.0-rc.27
  - @saas-ui/modals@2.0.0-rc.29

## 2.0.0-rc.30

### Major Changes

- 6236e117: Removed the Divider component in favor of the Chakra UI Divider component.

### Minor Changes

- 046e42b8: Updated to Chakra UI 2.7

### Patch Changes

- 6193c47c: Fixed issue where Sidebar would not get defaultProps from the theme.
- Updated dependencies [8d6516c2]
- Updated dependencies [6193c47c]
- Updated dependencies [046e42b8]
- Updated dependencies [6236e117]
  - @saas-ui/theme@2.0.0-rc.16
  - @saas-ui/core@2.0.0-rc.25
  - @saas-ui/data-table@2.0.0-rc.30
  - @saas-ui/nprogress@2.0.0-rc.5
  - @saas-ui/hotkeys@2.0.0-rc.26
  - @saas-ui/modals@2.0.0-rc.28
  - @saas-ui/forms@2.0.0-rc.28
  - @saas-ui/hooks@2.0.0-rc.6
  - @saas-ui/auth@2.0.0-rc.29

## 2.0.0-rc.29

### Patch Changes

- d6e9a39d: Form fields overries types now support array and object type props
- b895e5bd: Add Timeline theme to theme package.
- Updated dependencies [d6e9a39d]
- Updated dependencies [b895e5bd]
- Updated dependencies [943f6287]
  - @saas-ui/forms@2.0.0-rc.27
  - @saas-ui/theme@2.0.0-rc.15
  - @saas-ui/core@2.0.0-rc.24
  - @saas-ui/auth@2.0.0-rc.28
  - @saas-ui/modals@2.0.0-rc.27
  - @saas-ui/data-table@2.0.0-rc.29
  - @saas-ui/hotkeys@2.0.0-rc.25

## 2.0.0-rc.28

### Minor Changes

- e52f63fa: useSnackbar promise error option now accepts a function with err param or SnackbarOptions

### Patch Changes

- Updated dependencies [e52f63fa]
  - @saas-ui/core@2.0.0-rc.23
  - @saas-ui/data-table@2.0.0-rc.28
  - @saas-ui/auth@2.0.0-rc.27
  - @saas-ui/forms@2.0.0-rc.26
  - @saas-ui/hotkeys@2.0.0-rc.24
  - @saas-ui/modals@2.0.0-rc.26

## 2.0.0-rc.27

### Minor Changes

- 2366db6a: ConfirmDialog now supports an async onConfirm prop and shows a spinner when a promise is returned

### Patch Changes

- e23790a8: Fix SnackbarPromiseOptions error type to SnackbarOptions
- Updated dependencies [e23790a8]
- Updated dependencies [2366db6a]
  - @saas-ui/core@2.0.0-rc.22
  - @saas-ui/modals@2.0.0-rc.25
  - @saas-ui/data-table@2.0.0-rc.27
  - @saas-ui/auth@2.0.0-rc.26
  - @saas-ui/forms@2.0.0-rc.25
  - @saas-ui/hotkeys@2.0.0-rc.23

## 2.0.0-rc.26

### Patch Changes

- 5ac0e9ba: Fix vertical stepper items not taking up the full parent width.
- 5ac0e9ba: Fix issue where StepForm would not submit when subsequent fields are required.
- Updated dependencies [5ac0e9ba]
- Updated dependencies [5ac0e9ba]
  - @saas-ui/theme@2.0.0-rc.14
  - @saas-ui/forms@2.0.0-rc.24
  - @saas-ui/data-table@2.0.0-rc.26
  - @saas-ui/core@2.0.0-rc.21
  - @saas-ui/auth@2.0.0-rc.25
  - @saas-ui/modals@2.0.0-rc.24
  - @saas-ui/hotkeys@2.0.0-rc.22

## 2.0.0-rc.25

### Patch Changes

- 7027d7c1: Improve Stepper seperator position on all sizes
- Bump version
- Updated dependencies [7027d7c1]
- Updated dependencies
  - @saas-ui/theme@2.0.0-rc.13
  - @saas-ui/core@2.0.0-rc.20
  - @saas-ui/data-table@2.0.0-rc.25
  - @saas-ui/nprogress@2.0.0-rc.4
  - @saas-ui/hotkeys@2.0.0-rc.21
  - @saas-ui/modals@2.0.0-rc.23
  - @saas-ui/forms@2.0.0-rc.23
  - @saas-ui/hooks@2.0.0-rc.5
  - @saas-ui/auth@2.0.0-rc.24

## 2.0.0-rc.24

### Patch Changes

- 7027d7c1: Improve Stepper seperator position on all sizes
- Updated dependencies [7027d7c1]
  - @saas-ui/theme@2.0.0-rc.12
  - @saas-ui/core@2.0.0-rc.19
  - @saas-ui/data-table@2.0.0-rc.24
  - @saas-ui/auth@2.0.0-rc.23
  - @saas-ui/forms@2.0.0-rc.22
  - @saas-ui/hotkeys@2.0.0-rc.20
  - @saas-ui/modals@2.0.0-rc.22

## 2.0.0-next.23

### Patch Changes

- Updated dependencies [d236fb75]
  - @saas-ui/hotkeys@2.0.0-next.19
  - @saas-ui/data-table@2.0.0-next.23

## 2.0.0-next.22

### Patch Changes

- Updated dependencies [8e155c3b]
  - @saas-ui/theme@2.0.0-next.11
  - @saas-ui/core@2.0.0-next.18
  - @saas-ui/auth@2.0.0-next.22
  - @saas-ui/data-table@2.0.0-next.22
  - @saas-ui/forms@2.0.0-next.21
  - @saas-ui/hotkeys@2.0.0-next.18
  - @saas-ui/modals@2.0.0-next.21

## 2.0.0-next.21

### Minor Changes

- ccfce5c1: useHotkeys now supports preventDefault option to prevent default browser events from firing
- a9ca90dd: Updated to Chakra UI 2.6.x

### Patch Changes

- 2b639656: Fixed issue where colorScheme would be passed down to stepper dom element
- ccfce5c1: Fixed issue where multiple + separators were not parsed correctly in useHotkeys.
- Updated dependencies [ccfce5c1]
- Updated dependencies [a9ca90dd]
- Updated dependencies [2b639656]
- Updated dependencies [ccfce5c1]
  - @saas-ui/hotkeys@2.0.0-next.17
  - @saas-ui/forms@2.0.0-next.20
  - @saas-ui/core@2.0.0-next.17
  - @saas-ui/data-table@2.0.0-next.21
  - @saas-ui/auth@2.0.0-next.21
  - @saas-ui/modals@2.0.0-next.20

## 2.0.0-next.20

### Patch Changes

- Updated dependencies [0a2bb91f]
  - @saas-ui/auth@2.0.0-next.20
  - @saas-ui/data-table@2.0.0-next.20

## 2.0.0-next.19

### Patch Changes

- Updated dependencies [ffd878b6]
- Updated dependencies [aeab9b0b]
  - @saas-ui/auth@2.0.0-next.19
  - @saas-ui/theme@2.0.0-next.10
  - @saas-ui/core@2.0.0-next.16
  - @saas-ui/data-table@2.0.0-next.19
  - @saas-ui/forms@2.0.0-next.19
  - @saas-ui/hotkeys@2.0.0-next.16
  - @saas-ui/modals@2.0.0-next.19

## 2.0.0-next.18

### Patch Changes

- Updated dependencies [01ac442f]
  - @saas-ui/forms@2.0.0-next.18
  - @saas-ui/auth@2.0.0-next.18
  - @saas-ui/modals@2.0.0-next.18
  - @saas-ui/data-table@2.0.0-next.18

## 2.0.0-next.17

### Patch Changes

- a5898c44: Fix Divider label contrast
- Updated dependencies [a5898c44]
- Updated dependencies [8045baed]
  - @saas-ui/theme@2.0.0-next.9
  - @saas-ui/core@2.0.0-next.15
  - @saas-ui/data-table@2.0.0-next.17
  - @saas-ui/auth@2.0.0-next.17
  - @saas-ui/forms@2.0.0-next.17
  - @saas-ui/hotkeys@2.0.0-next.15
  - @saas-ui/modals@2.0.0-next.17

## 2.0.0-next.16

### Patch Changes

- b8be6d41: tooltipProps on NavItem no longer require children
- Updated dependencies [b8be6d41]
- Updated dependencies [cc713117]
  - @saas-ui/core@2.0.0-next.14
  - @saas-ui/modals@2.0.0-next.16
  - @saas-ui/data-table@2.0.0-next.16
  - @saas-ui/auth@2.0.0-next.16
  - @saas-ui/forms@2.0.0-next.16
  - @saas-ui/hotkeys@2.0.0-next.14

## 2.0.0-next.15

### Minor Changes

- 2d18cdc2: New createFormDialog function to create Zod or Yup specific FormDialogs
- 826c561a: EmptyState title and description no longer use Header and Text

### Patch Changes

- Updated dependencies [2d18cdc2]
- Updated dependencies [826c561a]
  - @saas-ui/modals@2.0.0-next.15
  - @saas-ui/forms@2.0.0-next.15
  - @saas-ui/core@2.0.0-next.13
  - @saas-ui/auth@2.0.0-next.15
  - @saas-ui/data-table@2.0.0-next.15
  - @saas-ui/hotkeys@2.0.0-next.13

## 2.0.0-next.14

### Patch Changes

- Fix esm bundle import
- Updated dependencies
  - @saas-ui/data-table@2.0.0-next.14
  - @saas-ui/nprogress@2.0.0-next.3
  - @saas-ui/hotkeys@2.0.0-next.12
  - @saas-ui/modals@2.0.0-next.14
  - @saas-ui/forms@2.0.0-next.14
  - @saas-ui/hooks@2.0.0-next.4
  - @saas-ui/theme@2.0.0-next.8
  - @saas-ui/auth@2.0.0-next.14
  - @saas-ui/core@2.0.0-next.12

## 2.0.0-next.13

### Patch Changes

- d3900eca: button primary, secondary and tertiary variants colorScheme can now be changed.
- Bump version
- dc435dd5: No longer needed to use Next.js legacyBehavior for the Link component.
- 6c63217c: object and array field props can now be overridden using the fields prop
- Updated dependencies [1563cc9a]
- Updated dependencies [d3900eca]
- Updated dependencies
- Updated dependencies [6c63217c]
  - @saas-ui/modals@2.0.0-next.13
  - @saas-ui/theme@2.0.0-next.7
  - @saas-ui/data-table@2.0.0-next.13
  - @saas-ui/nprogress@2.0.0-next.2
  - @saas-ui/hotkeys@2.0.0-next.11
  - @saas-ui/forms@2.0.0-next.13
  - @saas-ui/hooks@2.0.0-next.3
  - @saas-ui/auth@2.0.0-next.13
  - @saas-ui/core@2.0.0-next.11

## 2.0.0-next.12

### Patch Changes

- a7ef6dd9: Fixed issue where types for exports were not detected
- Updated dependencies [a7ef6dd9]
  - @saas-ui/forms@2.0.0-next.12
  - @saas-ui/theme@2.0.0-next.6
  - @saas-ui/core@2.0.0-next.10
  - @saas-ui/auth@2.0.0-next.12
  - @saas-ui/modals@2.0.0-next.12
  - @saas-ui/data-table@2.0.0-next.12
  - @saas-ui/hotkeys@2.0.0-next.10

## 2.0.0-next.11

### Patch Changes

- Updated dependencies [5b9d90e8]
  - @saas-ui/theme@2.0.0-next.5
  - @saas-ui/core@2.0.0-next.9
  - @saas-ui/auth@2.0.0-next.11
  - @saas-ui/data-table@2.0.0-next.11
  - @saas-ui/forms@2.0.0-next.11
  - @saas-ui/hotkeys@2.0.0-next.9
  - @saas-ui/modals@2.0.0-next.11

## 2.0.0-next.10

### Patch Changes

- Updated dependencies [b521ce10]
  - @saas-ui/theme@2.0.0-next.4
  - @saas-ui/core@2.0.0-next.8
  - @saas-ui/auth@2.0.0-next.10
  - @saas-ui/data-table@2.0.0-next.10
  - @saas-ui/forms@2.0.0-next.10
  - @saas-ui/hotkeys@2.0.0-next.8
  - @saas-ui/modals@2.0.0-next.10

## 2.0.0-next.9

### Minor Changes

- 1177329d: Improved MenuDialog position on mobile
- 84e59fec: Added new createModals method to create typesafe modals managers with support for custom modals

### Patch Changes

- 189190c6: Fix Card theme tokens
- Updated dependencies [84e59fec]
- Updated dependencies [189190c6]
- Updated dependencies [1177329d]
- Updated dependencies [84e59fec]
- Updated dependencies [1177329d]
  - @saas-ui/forms@2.0.0-next.9
  - @saas-ui/core@2.0.0-next.7
  - @saas-ui/modals@2.0.0-next.9
  - @saas-ui/auth@2.0.0-next.9
  - @saas-ui/data-table@2.0.0-next.9
  - @saas-ui/hotkeys@2.0.0-next.7

## 2.0.0-next.8

### Patch Changes

- Updated dependencies [6d3f5717]
  - @saas-ui/forms@2.0.0-next.8
  - @saas-ui/auth@2.0.0-next.8
  - @saas-ui/modals@2.0.0-next.8
  - @saas-ui/data-table@2.0.0-next.8

## 2.0.0-next.7

### Patch Changes

- Updated dependencies [7052dad3]
  - @saas-ui/core@2.0.0-next.6
  - @saas-ui/auth@2.0.0-next.7
  - @saas-ui/data-table@2.0.0-next.7
  - @saas-ui/forms@2.0.0-next.7
  - @saas-ui/hotkeys@2.0.0-next.6
  - @saas-ui/modals@2.0.0-next.7

## 2.0.0-next.6

### Major Changes

- 37e38165: Auth forms can now be used standalone, to build custom solutions.
- 532011d6: Restructured the Select component to make it atomic, the new composition is Select, SelectButton, SelectList and SelectOption.
- 39e778d8: Form will now render AutoField by default when no children are passed.

### Minor Changes

- 532011d6: Select can now supports theming using the SuiSelect theme config.
- 6dd737ce: Select field now renders invalid state.
- c85541cb: AutoForm field props can now be overridden using the fields prop on Form

### Patch Changes

- Updated dependencies [37e38165]
- Updated dependencies [532011d6]
- Updated dependencies [532011d6]
- Updated dependencies [6dd737ce]
- Updated dependencies [c85541cb]
- Updated dependencies [39e778d8]
  - @saas-ui/auth@2.0.0-next.6
  - @saas-ui/forms@2.0.0-next.6
  - @saas-ui/data-table@2.0.0-next.6
  - @saas-ui/modals@2.0.0-next.6

## 2.0.0-next.5

### Major Changes

- 61b27fa6: Stepper useNext and usePrev hooks renamed to useStepperNextButton and useStepperPrevButton

### Minor Changes

- a8ea24da: PasswordInput now accepts leftAddon property.

### Patch Changes

- Updated dependencies [a8ea24da]
- Updated dependencies [61b27fa6]
  - @saas-ui/forms@2.0.0-next.5
  - @saas-ui/core@2.0.0-next.5
  - @saas-ui/auth@2.0.0-next.5
  - @saas-ui/modals@2.0.0-next.5
  - @saas-ui/data-table@2.0.0-next.5
  - @saas-ui/hotkeys@2.0.0-next.5

## 2.0.0-next.4

### Major Changes

- 83f54180: ErrorBoundary errorComponent property renamed to fallback to be consistent with Suspense.
- 83f54180: Secondary button now uses solid variant and gray colorScheme.
- 83f54180: Renamed Loader to LoadingOverlay.

### Minor Changes

- 83f54180: Added new tertiary button variant.
- 27a68bca: useLocalStorage now updates all hook instances on the current page when the value changed

### Patch Changes

- ba61612f: Fixed useSnackbar return type, always returns toastId.
- 83f54180: Fix NavItem focus outline color.
- Updated dependencies [83f54180]
- Updated dependencies [ba61612f]
- Updated dependencies [83f54180]
- Updated dependencies [83f54180]
- Updated dependencies [83f54180]
- Updated dependencies [83f54180]
- Updated dependencies [27a68bca]
  - @saas-ui/core@2.0.0-next.4
  - @saas-ui/theme@2.0.0-next.3
  - @saas-ui/hooks@2.0.0-next.2
  - @saas-ui/auth@2.0.0-next.4
  - @saas-ui/data-table@2.0.0-next.4
  - @saas-ui/forms@2.0.0-next.4
  - @saas-ui/hotkeys@2.0.0-next.4
  - @saas-ui/modals@2.0.0-next.4

## 2.0.0-next.3

### Patch Changes

- Updated dependencies [f79376c3]
  - @saas-ui/theme@2.0.0-next.2
  - @saas-ui/core@2.0.0-next.3
  - @saas-ui/auth@2.0.0-next.3
  - @saas-ui/data-table@2.0.0-next.3
  - @saas-ui/forms@2.0.0-next.3
  - @saas-ui/hotkeys@2.0.0-next.3
  - @saas-ui/modals@2.0.0-next.3

## 2.0.0-next.2

### Major Changes

- 0a11d7b6: Renamed Sidebar condensed variant to compact.
- 76887bda: Sidebar breakpoints property renamed to toggleBreakpoint. Now expects a single breakpoint or false to disable auto toggle.

### Minor Changes

- 76887bda: AppShell now controls the Sidebar disclosure state.
- 76887bda: SidebarToggleButton can now be used outside of the Sidebar context, using the new AppShell context.

### Patch Changes

- Updated dependencies [0a11d7b6]
- Updated dependencies [76887bda]
- Updated dependencies [76887bda]
- Updated dependencies [76887bda]
  - @saas-ui/core@2.0.0-next.2
  - @saas-ui/auth@2.0.0-next.2
  - @saas-ui/data-table@2.0.0-next.2
  - @saas-ui/forms@2.0.0-next.2
  - @saas-ui/hotkeys@2.0.0-next.2
  - @saas-ui/modals@2.0.0-next.2

## 2.0.0-next.1

### Patch Changes

- 166978bd: Fix esm bundle filename.
- Updated dependencies [166978bd]
  - @saas-ui/auth@2.0.0-next.1
  - @saas-ui/core@2.0.0-next.1
  - @saas-ui/data-table@2.0.0-next.1
  - @saas-ui/forms@2.0.0-next.1
  - @saas-ui/hooks@2.0.0-next.1
  - @saas-ui/hotkeys@2.0.0-next.1
  - @saas-ui/modals@2.0.0-next.1
  - @saas-ui/nprogress@2.0.0-next.1
  - @saas-ui/theme@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- 772c9868: Updated to Tanstack ReactTable V8
- d7c87a31: Moved form resolvers into a separate package.
- f1e99198: BREAKING: createPalette no longer exported from @saas-ui/react
- 8b82d945: Renamed List to StructuredList
- 8b82d945: Removed button package.
- f34de7af: Moved Supabase and Magic auth services to separate packages.
- 3a15e8c8: Improve StructuredList API.
- f1e99198: Restructured packages.
- f3b09191: Removed Card component in favor of the new Chakra UI Card component.

### Minor Changes

- e94ca3c0: Added TimeLine to core components.
- 7ce390e9: Added Sidebar to core packages.

### Patch Changes

- f1e99198: Migrated from microbundle to tsup for builds
- Updated dependencies [772c9868]
- Updated dependencies [d7c87a31]
- Updated dependencies [e94ca3c0]
- Updated dependencies [f1e99198]
- Updated dependencies [8b82d945]
- Updated dependencies [f34de7af]
- Updated dependencies [3a15e8c8]
- Updated dependencies [f1e99198]
  - @saas-ui/data-table@2.0.0-next.0
  - @saas-ui/forms@2.0.0-next.0
  - @saas-ui/core@2.0.0-next.0
  - @saas-ui/auth@2.0.0-next.0
  - @saas-ui/hooks@2.0.0-next.0
  - @saas-ui/hotkeys@2.0.0-next.0
  - @saas-ui/modals@2.0.0-next.0
  - @saas-ui/nprogress@2.0.0-next.0
  - @saas-ui/theme@2.0.0-next.0

## 1.9.3

### Patch Changes

- Updated dependencies
  - @saas-ui/app-shell@1.1.2
  - @saas-ui/auth@1.7.6
  - @saas-ui/banner@1.4.2
  - @saas-ui/button@1.4.2
  - @saas-ui/card@1.5.2
  - @saas-ui/collapse@1.4.2
  - @saas-ui/data-table@1.4.3
  - @saas-ui/forms@1.5.5
  - @saas-ui/hooks@1.2.2
  - @saas-ui/hotkeys@1.4.2
  - @saas-ui/input-right-button@1.4.2
  - @saas-ui/layout@1.4.3
  - @saas-ui/list@1.4.2
  - @saas-ui/menu@1.4.3
  - @saas-ui/modals@1.5.7
  - @saas-ui/nprogress@1.4.2
  - @saas-ui/number-input@1.4.2
  - @saas-ui/palette@1.3.2
  - @saas-ui/password-input@1.4.2
  - @saas-ui/persona@1.4.2
  - @saas-ui/pin-input@1.4.2
  - @saas-ui/property@1.4.2
  - @saas-ui/provider@1.2.3
  - @saas-ui/radio@1.4.3
  - @saas-ui/search-input@1.4.2
  - @saas-ui/select@1.4.2
  - @saas-ui/snackbar@1.2.2
  - @saas-ui/stepper@1.4.2
  - @saas-ui/theme@1.8.2

## 1.9.2

### Patch Changes

- b2302a3: Add types to package.json exports
- Updated dependencies [f9234fc]
- Updated dependencies [b2302a3]
  - @saas-ui/persona@1.4.1
  - @saas-ui/app-shell@1.1.1
  - @saas-ui/auth@1.7.5
  - @saas-ui/banner@1.4.1
  - @saas-ui/button@1.4.1
  - @saas-ui/card@1.5.1
  - @saas-ui/collapse@1.4.1
  - @saas-ui/data-table@1.4.2
  - @saas-ui/forms@1.5.4
  - @saas-ui/hooks@1.2.1
  - @saas-ui/hotkeys@1.4.1
  - @saas-ui/input-right-button@1.4.1
  - @saas-ui/layout@1.4.2
  - @saas-ui/list@1.4.1
  - @saas-ui/menu@1.4.2
  - @saas-ui/modals@1.5.6
  - @saas-ui/nprogress@1.4.1
  - @saas-ui/number-input@1.4.1
  - @saas-ui/palette@1.3.1
  - @saas-ui/password-input@1.4.1
  - @saas-ui/pin-input@1.4.1
  - @saas-ui/property@1.4.1
  - @saas-ui/provider@1.2.2
  - @saas-ui/radio@1.4.2
  - @saas-ui/search-input@1.4.1
  - @saas-ui/select@1.4.1
  - @saas-ui/snackbar@1.2.1
  - @saas-ui/stepper@1.4.1
  - @saas-ui/theme@1.8.1

## 1.9.1

### Patch Changes

- 382e095: InputRightButton no longer exported from forms package to prevent conflicts.
- Updated dependencies [382e095]
  - @saas-ui/forms@1.5.3
  - @saas-ui/auth@1.7.4
  - @saas-ui/modals@1.5.5

## 1.9.0

### Minor Changes

- aea16c7: BREAKING: Improved Sidebar behavior and theme. Remove deprecated label prop on NavItem.

### Patch Changes

- Updated dependencies [aea16c7]
  - @saas-ui/theme@1.8.0
  - @saas-ui/provider@1.2.1
  - @saas-ui/layout@1.4.1
  - @saas-ui/menu@1.4.1
  - @saas-ui/auth@1.7.3
  - @saas-ui/data-table@1.4.1
  - @saas-ui/modals@1.5.4

## 1.8.3

### Patch Changes

- fc2581b: Fix issue where ConfirmDialog label could not be changed.
- Updated dependencies [fc2581b]
  - @saas-ui/modals@1.5.3

## 1.8.2

### Patch Changes

- d424898: Prevent input error in FormDialog to block cancel/close the modal.
- Updated dependencies [d424898]
- Updated dependencies [335acba]
  - @saas-ui/modals@1.5.2
  - @saas-ui/forms@1.5.2
  - @saas-ui/radio@1.4.1
  - @saas-ui/auth@1.7.2

## 1.8.1

### Patch Changes

- bff22b0: Removed deprecated type
- Updated dependencies [bff22b0]
  - @saas-ui/forms@1.5.1
  - @saas-ui/auth@1.7.1
  - @saas-ui/modals@1.5.1

## 1.8.0

### Minor Changes

- 1f074c98: Upgrade to Chakra 2.4.8. Using .mjs for esm bundles.

### Patch Changes

- Updated dependencies [1f074c98]
  - @saas-ui/app-shell@1.1.0
  - @saas-ui/auth@1.7.0
  - @saas-ui/banner@1.4.0
  - @saas-ui/button@1.4.0
  - @saas-ui/card@1.5.0
  - @saas-ui/collapse@1.4.0
  - @saas-ui/data-table@1.4.0
  - @saas-ui/forms@1.5.0
  - @saas-ui/hooks@1.2.0
  - @saas-ui/hotkeys@1.4.0
  - @saas-ui/input-right-button@1.4.0
  - @saas-ui/layout@1.4.0
  - @saas-ui/list@1.4.0
  - @saas-ui/menu@1.4.0
  - @saas-ui/modals@1.5.0
  - @saas-ui/nprogress@1.4.0
  - @saas-ui/number-input@1.4.0
  - @saas-ui/palette@1.3.0
  - @saas-ui/password-input@1.4.0
  - @saas-ui/persona@1.4.0
  - @saas-ui/pin-input@1.4.0
  - @saas-ui/property@1.4.0
  - @saas-ui/provider@1.2.0
  - @saas-ui/radio@1.4.0
  - @saas-ui/search-input@1.4.0
  - @saas-ui/select@1.4.0
  - @saas-ui/snackbar@1.2.0
  - @saas-ui/stepper@1.4.0
  - @saas-ui/theme@1.7.0

## 1.7.4

### Patch Changes

- 523b5ca: Fixed default value for Switch fields.
- a050ea1: Support disable sorting on individual columns in DataTable
- c8f7b32: Fixed issue where closing dialogs opened by the modals manager to flicker, due to config reset before closing animation was finished.
- Updated dependencies [523b5ca]
- Updated dependencies [a050ea1]
- Updated dependencies [c8f7b32]
  - @saas-ui/forms@1.4.2
  - @saas-ui/data-table@1.3.3
  - @saas-ui/modals@1.4.3
  - @saas-ui/auth@1.6.4

## 1.7.3

### Patch Changes

- Updated dependencies [91fbab7]
  - @saas-ui/auth@1.6.3

## 1.7.2

### Patch Changes

- Updated dependencies [69d328f]
- Updated dependencies [2b14fa2]
  - @saas-ui/theme@1.6.2
  - @saas-ui/auth@1.6.2
  - @saas-ui/provider@1.1.8
  - @saas-ui/layout@1.3.2
  - @saas-ui/menu@1.3.2
  - @saas-ui/data-table@1.3.2
  - @saas-ui/modals@1.4.2

## 1.7.1

### Patch Changes

- Updated dependencies [7cf5223]
  - @saas-ui/theme@1.6.1
  - @saas-ui/forms@1.4.1
  - @saas-ui/stepper@1.3.1
  - @saas-ui/provider@1.1.7
  - @saas-ui/auth@1.6.1
  - @saas-ui/modals@1.4.1
  - @saas-ui/layout@1.3.1
  - @saas-ui/menu@1.3.1
  - @saas-ui/data-table@1.3.1

## 1.7.0

### Minor Changes

- e670761: AppShell is out of beta and now part of the core.
- d92f516: Updated to Chakra UI 2.4.1

### Patch Changes

- Updated dependencies [d92f516]
- Updated dependencies [e670761]
  - @saas-ui/app-shell@1.0.0
  - @saas-ui/auth@1.6.0
  - @saas-ui/banner@1.3.0
  - @saas-ui/button@1.3.0
  - @saas-ui/card@1.4.0
  - @saas-ui/collapse@1.3.0
  - @saas-ui/data-table@1.3.0
  - @saas-ui/forms@1.4.0
  - @saas-ui/hotkeys@1.3.0
  - @saas-ui/input-right-button@1.3.0
  - @saas-ui/layout@1.3.0
  - @saas-ui/list@1.3.0
  - @saas-ui/menu@1.3.0
  - @saas-ui/modals@1.4.0
  - @saas-ui/nprogress@1.3.0
  - @saas-ui/number-input@1.3.0
  - @saas-ui/password-input@1.3.0
  - @saas-ui/persona@1.3.0
  - @saas-ui/pin-input@1.3.0
  - @saas-ui/property@1.3.0
  - @saas-ui/radio@1.3.0
  - @saas-ui/search-input@1.3.0
  - @saas-ui/select@1.3.0
  - @saas-ui/stepper@1.3.0
  - @saas-ui/theme@1.6.0
  - @saas-ui/provider@1.1.6

## 1.6.2

### Patch Changes

- 7b426e8: Fixed issue where PersonaAvatar would throw an error when unsupported presence value is passed.
- Updated dependencies [7b426e8]
- Updated dependencies [0a77fc0]
- Updated dependencies [bc1f403]
  - @saas-ui/persona@1.2.1
  - @saas-ui/theme@1.5.0
  - @saas-ui/provider@1.1.5
  - @saas-ui/layout@1.2.2
  - @saas-ui/menu@1.2.2
  - @saas-ui/auth@1.5.2
  - @saas-ui/data-table@1.2.2
  - @saas-ui/modals@1.3.3

## 1.6.1

### Patch Changes

- @saas-ui/forms@1.3.1
- @saas-ui/stepper@1.2.1
- @saas-ui/auth@1.5.1
- @saas-ui/modals@1.3.2

## 1.6.0

### Minor Changes

- 065e94d: Supabase auth service updated to v2, thanks to @KeKs0r

### Patch Changes

- 065e94d: Improved usePromise type signature.
- Updated dependencies [065e94d]
- Updated dependencies [065e94d]
- Updated dependencies [065e94d]
  - @saas-ui/hooks@1.1.2
  - @saas-ui/auth@1.5.0
  - @saas-ui/provider@1.1.4
  - @saas-ui/layout@1.2.1
  - @saas-ui/menu@1.2.1
  - @saas-ui/data-table@1.2.1
  - @saas-ui/modals@1.3.1

## 1.5.0

### Minor Changes

- 466b3ca: Updated to Chakra UI 2.3.6

### Patch Changes

- Updated dependencies [466b3ca]
  - @saas-ui/auth@1.4.0
  - @saas-ui/banner@1.2.0
  - @saas-ui/button@1.2.0
  - @saas-ui/card@1.3.0
  - @saas-ui/collapse@1.2.0
  - @saas-ui/data-table@1.2.0
  - @saas-ui/forms@1.3.0
  - @saas-ui/hotkeys@1.2.0
  - @saas-ui/input-right-button@1.2.0
  - @saas-ui/layout@1.2.0
  - @saas-ui/list@1.2.0
  - @saas-ui/menu@1.2.0
  - @saas-ui/modals@1.3.0
  - @saas-ui/nprogress@1.2.0
  - @saas-ui/number-input@1.2.0
  - @saas-ui/palette@1.2.0
  - @saas-ui/password-input@1.2.0
  - @saas-ui/persona@1.2.0
  - @saas-ui/pin-input@1.2.0
  - @saas-ui/property@1.2.0
  - @saas-ui/radio@1.2.0
  - @saas-ui/search-input@1.2.0
  - @saas-ui/select@1.2.0
  - @saas-ui/stepper@1.2.0
  - @saas-ui/theme@1.4.0
  - @saas-ui/provider@1.1.3

## 1.4.5

### Patch Changes

- Updated dependencies [fd41596]
  - @saas-ui/theme@1.3.1
  - @saas-ui/provider@1.1.2
  - @saas-ui/layout@1.1.2
  - @saas-ui/menu@1.1.2
  - @saas-ui/auth@1.3.4
  - @saas-ui/data-table@1.1.2
  - @saas-ui/modals@1.2.4

## 1.4.4

### Patch Changes

- d690b18: Export all Snackbar types. (#88)
- ad47180: FormStepper now supports theming props.
- Updated dependencies [d690b18]
- Updated dependencies [ad47180]
  - @saas-ui/snackbar@1.1.1
  - @saas-ui/forms@1.2.2
  - @saas-ui/auth@1.3.3
  - @saas-ui/modals@1.2.3

## 1.4.3

### Patch Changes

- 1195fc2: SearchInput reset button is now working when uncontrolled.
- Updated dependencies [1195fc2]
  - @saas-ui/search-input@1.1.1
  - @saas-ui/hotkeys@1.1.2

## 1.4.2

### Patch Changes

- b88c087: Added missing onChange handler on FormDialog, thanks to @eliandersoh
- 62f3d4c: AuthProvider / useAuth now accept a generic User type to support custom user types.
- 62f3d4c: User.email now is optional
- Updated dependencies [b88c087]
- Updated dependencies [62f3d4c]
- Updated dependencies [62f3d4c]
  - @saas-ui/modals@1.2.2
  - @saas-ui/auth@1.3.2

## 1.4.1

### Patch Changes

- dfd61ed: Custom Field onChange and onBlur handlers will no longer override the internal HookForm handlers.
- Updated dependencies [dfd61ed]
- Updated dependencies [0d83ca5]
- Updated dependencies [40a9465]
- Updated dependencies [40a9465]
  - @saas-ui/forms@1.2.1
  - @saas-ui/theme@1.3.0
  - @saas-ui/collapse@1.1.1
  - @saas-ui/auth@1.3.1
  - @saas-ui/modals@1.2.1
  - @saas-ui/provider@1.1.1
  - @saas-ui/stepper@1.1.2
  - @saas-ui/layout@1.1.1
  - @saas-ui/menu@1.1.1
  - @saas-ui/data-table@1.1.1

## 1.4.0

### Minor Changes

- d003608: Form now accepts a render function with form state props.
- d003608: Re-export all React Hook Form types and hooks
- d003608: New onChange prop for Form that triggers when the form state is changed.

### Patch Changes

- Updated dependencies [d003608]
- Updated dependencies [d003608]
- Updated dependencies [d003608]
  - @saas-ui/auth@1.3.0
  - @saas-ui/forms@1.2.0
  - @saas-ui/modals@1.2.0

## 1.3.3

### Patch Changes

- b7f169b: Removed fontSize from HotkeysListItem base styles.
- 935a47c: useLocalStorage now returns the correct type.
- bef671d: Field variant now passed down to the internal Input.
- Updated dependencies [b7f169b]
- Updated dependencies [935a47c]
- Updated dependencies [bef671d]
  - @saas-ui/hotkeys@1.1.1
  - @saas-ui/hooks@1.1.1
  - @saas-ui/forms@1.1.2
  - @saas-ui/auth@1.2.2
  - @saas-ui/modals@1.1.2

## 1.3.2

### Patch Changes

- Updated dependencies
  - @saas-ui/collapse@1.1.0
  - @saas-ui/stepper@1.1.1
  - @saas-ui/forms@1.1.1
  - @saas-ui/auth@1.2.1
  - @saas-ui/modals@1.1.1

## 1.3.1

### Patch Changes

- Updated dependencies
  - @saas-ui/card@1.2.0

## 1.3.0

### Minor Changes

- f6ec7dc: Fixed issue where Next.js would not resolve Chakra UI components correctly.

### Patch Changes

- be064d7: Only show list item outline when it is focused with keyboard nav
- Updated dependencies [f6ec7dc]
- Updated dependencies [be064d7]
  - @saas-ui/auth@1.2.0
  - @saas-ui/banner@1.1.0
  - @saas-ui/button@1.1.0
  - @saas-ui/card@1.1.0
  - @saas-ui/data-table@1.1.0
  - @saas-ui/forms@1.1.0
  - @saas-ui/hooks@1.1.0
  - @saas-ui/hotkeys@1.1.0
  - @saas-ui/input-right-button@1.1.0
  - @saas-ui/layout@1.1.0
  - @saas-ui/list@1.1.0
  - @saas-ui/menu@1.1.0
  - @saas-ui/modals@1.1.0
  - @saas-ui/nprogress@1.1.0
  - @saas-ui/number-input@1.1.0
  - @saas-ui/palette@1.1.0
  - @saas-ui/password-input@1.1.0
  - @saas-ui/persona@1.1.0
  - @saas-ui/pin-input@1.1.0
  - @saas-ui/property@1.1.0
  - @saas-ui/provider@1.1.0
  - @saas-ui/radio@1.1.0
  - @saas-ui/search-input@1.1.0
  - @saas-ui/select@1.1.0
  - @saas-ui/snackbar@1.1.0
  - @saas-ui/stepper@1.1.0
  - @saas-ui/theme@1.2.0

## 1.2.2

### Patch Changes

- Updated dependencies [d88b04d]
  - @saas-ui/hooks@1.0.2
  - @saas-ui/auth@1.1.2

## 1.2.1

### Patch Changes

- Fall back to label prop in password forms
- Updated dependencies
  - @saas-ui/auth@1.1.1

## 1.2.0

### Minor Changes

- 1ff5f3a: Auth forms field labels can now be customized, thanks to @nadiles.

### Patch Changes

- e14c2e1: Make sure FormStep onSubmit does not throw an error when no promise is returned.
- 273c10d: Fixed a typo in the AuthForm styles provider.
- 8d03628: PasswordInput width now applied to the FormGroup element.
- Updated dependencies [1ff5f3a]
- Updated dependencies [e14c2e1]
- Updated dependencies [273c10d]
- Updated dependencies [8d03628]
  - @saas-ui/auth@1.1.0
  - @saas-ui/forms@1.0.3
  - @saas-ui/password-input@1.0.2
  - @saas-ui/modals@1.0.5

## 1.1.2

### Patch Changes

- Updated dependencies [7bb5d3f]
  - @saas-ui/provider@1.0.2
  - @saas-ui/layout@1.0.2
  - @saas-ui/menu@1.0.2
  - @saas-ui/auth@1.0.5
  - @saas-ui/data-table@1.0.2
  - @saas-ui/modals@1.0.4

## 1.1.1

### Patch Changes

- 7298059: Added new useSteps hook.
- Updated dependencies [7298059]
  - @saas-ui/hooks@1.0.1
  - @saas-ui/auth@1.0.4

## 1.1.0

### Minor Changes

- 2c058b4: The Saas UI theme now uses InterVariable instead of Inter by default.

### Patch Changes

- Updated dependencies [2c058b4]
- Updated dependencies [cf99f38]
  - @saas-ui/theme@1.1.0
  - @saas-ui/hotkeys@1.0.1
  - @saas-ui/provider@1.0.1
  - @saas-ui/layout@1.0.1
  - @saas-ui/menu@1.0.1
  - @saas-ui/auth@1.0.3
  - @saas-ui/data-table@1.0.1
  - @saas-ui/modals@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies [fe754e6]
- Updated dependencies [fe1e333]
  - @saas-ui/forms@1.0.2
  - @saas-ui/input-right-button@1.0.1
  - @saas-ui/auth@1.0.2
  - @saas-ui/modals@1.0.2
  - @saas-ui/password-input@1.0.1

## 1.0.1

### Patch Changes

- fe10fc8: BannerContent flexDirection set to column on small screens.
- 3ce1dee: Support JSONSchema title in field resolvers
- 150efb2: Select field focus styles now consistent with Input fields.
- 4a37ca7: Fixed @chakra-ui/system dependency version.
- Updated dependencies [fe10fc8]
- Updated dependencies [3ce1dee]
- Updated dependencies [150efb2]
- Updated dependencies [3f928c2]
  - @saas-ui/banner@1.0.1
  - @saas-ui/forms@1.0.1
  - @saas-ui/modals@1.0.1
  - @saas-ui/auth@1.0.1

## 1.0.0

### Major Changes

- 3ae6be1: breaking: Updated to Chakra UI 2.1
- 3ae6be1: breaking: React 18 support.
- 532a7d4: Updated to Chakra UI 2.2.1

### Patch Changes

- 68c7b62: Card now has a isHoverable property to support hover styles.
- c8621b8: NativeSelect now accepts chilren and doesn't throw if no options are passed.
- fca06e4: Added Json Schema (ajv) support for AutoForm.
- da3c4e4: Added ErrorBoundary component.
- de0dce2: Scale reset button icon based on the input size.
- 6cc9343: Add exports entry for ajv
- 15c3960: Re-publish.
- 1744543: Updated dependencies.
- bd3438d: FormStep now supports an onSubmit handler.
- 6133901: No longer passing down label to input fields.
- dc6376f: Updated all readme files, added better descriptions and links to docs and source code.
- 43dff99: Option labels are now optional.
- 4bb613c: Added new RouterProvider and useActivePath now uses Router context.
- d4afda3: ArrayFieldRowFields now accepts all FormLayout props (#48).
- 9e9c601: Stepper now accepts an onChange handler.
- ddec417: ArrayField no longer passing down items to the container element.
- 43dff99: Field is now correctly typed based on the field type.
- 5a1b92b: Fix vertical orientation for FormStepper.
- 1fdf52a: Modern bundles now use .mjs extension.
- 38f7171: #50 - Fixed StepForm render prop types.
- 2ec8c91: Fixed vertical divider rendering incorrectly.
- 8f3f948: Removed redundant ThemeProvider / CSSReset and GlobalStyles components.
- 5f80cea: AutoForm now renders children.
- 532a7d4: Fixed all theme onconsistencies.
- 42beaa4: Added missing dependency.
- 3dee538: Spacing between pin inputs can now be configured.
- 1c247cb: InputField now has type="text" by default.
- 07491fd: ContextMenu now passing down all props to the internal Menu.
- d1fb472: Select now renders a hidden input with the current value.
- 870db1f: New primary and secondary Button variant.
- 68f5d3b: Removed isPrimary and isSecondary Button properties, use variant="primary" instead.
- Updated dependencies [68c7b62]
- Updated dependencies [3ae6be1]
- Updated dependencies [c8621b8]
- Updated dependencies [fca06e4]
- Updated dependencies [de0dce2]
- Updated dependencies [6cc9343]
- Updated dependencies [15c3960]
- Updated dependencies [532a7d4]
- Updated dependencies [1744543]
- Updated dependencies [bd3438d]
- Updated dependencies [6133901]
- Updated dependencies [a8fa78a]
- Updated dependencies [dc6376f]
- Updated dependencies [43dff99]
- Updated dependencies [87d3fdc]
- Updated dependencies [ae47cbd]
- Updated dependencies [4bb613c]
- Updated dependencies [d4afda3]
- Updated dependencies [9e9c601]
- Updated dependencies [ddec417]
- Updated dependencies [a134a6f]
- Updated dependencies [1db5bf9]
- Updated dependencies [4fc04d7]
- Updated dependencies [43dff99]
- Updated dependencies [5a1b92b]
- Updated dependencies [1fdf52a]
- Updated dependencies [1744543]
- Updated dependencies [7a16ef7]
- Updated dependencies [38f7171]
- Updated dependencies [a134a6f]
- Updated dependencies [9043639]
- Updated dependencies [8f3f948]
- Updated dependencies [5f80cea]
- Updated dependencies [532a7d4]
- Updated dependencies [42beaa4]
- Updated dependencies [3dee538]
- Updated dependencies [1c247cb]
- Updated dependencies [07491fd]
- Updated dependencies [d1fb472]
- Updated dependencies [870db1f]
- Updated dependencies [3ae6be1]
- Updated dependencies [4fd1fb3]
- Updated dependencies [68f5d3b]
  - @saas-ui/card@1.0.0
  - @saas-ui/auth@1.0.0
  - @saas-ui/banner@1.0.0
  - @saas-ui/button@1.0.0
  - @saas-ui/collapse@1.0.0
  - @saas-ui/data-table@1.0.0
  - @saas-ui/forms@1.0.0
  - @saas-ui/hooks@1.0.0
  - @saas-ui/hotkeys@1.0.0
  - @saas-ui/input-right-button@1.0.0
  - @saas-ui/layout@1.0.0
  - @saas-ui/list@1.0.0
  - @saas-ui/menu@1.0.0
  - @saas-ui/modals@1.0.0
  - @saas-ui/nprogress@1.0.0
  - @saas-ui/number-input@1.0.0
  - @saas-ui/palette@1.0.0
  - @saas-ui/password-input@1.0.0
  - @saas-ui/persona@1.0.0
  - @saas-ui/pin-input@1.0.0
  - @saas-ui/property@1.0.0
  - @saas-ui/provider@1.0.0
  - @saas-ui/radio@1.0.0
  - @saas-ui/search-input@1.0.0
  - @saas-ui/select@1.0.0
  - @saas-ui/snackbar@1.0.0
  - @saas-ui/stepper@1.0.0
  - @saas-ui/theme@1.0.0

## 1.0.0-rc.15

### Patch Changes

- Updated dependencies
  - @saas-ui/theme@1.0.0-rc.5
  - @saas-ui/provider@1.0.0-rc.8
  - @saas-ui/layout@1.0.0-rc.8
  - @saas-ui/menu@1.0.0-rc.8
  - @saas-ui/auth@1.0.0-rc.14
  - @saas-ui/data-table@1.0.0-rc.8
  - @saas-ui/modals@1.0.0-rc.13

## 1.0.0-rc.14

### Patch Changes

- Updated dependencies [a134a6f]
- Updated dependencies [a134a6f]
  - @saas-ui/hotkeys@1.0.0-rc.5
  - @saas-ui/collapse@1.0.0-rc.5
  - @saas-ui/stepper@1.0.0-rc.6
  - @saas-ui/forms@1.0.0-rc.12
  - @saas-ui/auth@1.0.0-rc.13
  - @saas-ui/modals@1.0.0-rc.12

## 1.0.0-rc.13

### Patch Changes

- 1744543: Updated dependencies.
- Updated dependencies [1744543]
- Updated dependencies [1744543]
  - @saas-ui/auth@1.0.0-rc.12
  - @saas-ui/banner@1.0.0-rc.5
  - @saas-ui/button@1.0.0-rc.5
  - @saas-ui/card@1.0.0-rc.5
  - @saas-ui/collapse@1.0.0-rc.4
  - @saas-ui/data-table@1.0.0-rc.7
  - @saas-ui/forms@1.0.0-rc.11
  - @saas-ui/hooks@1.0.0-rc.4
  - @saas-ui/hotkeys@1.0.0-rc.4
  - @saas-ui/input-right-button@1.0.0-rc.5
  - @saas-ui/layout@1.0.0-rc.7
  - @saas-ui/list@1.0.0-rc.5
  - @saas-ui/menu@1.0.0-rc.7
  - @saas-ui/modals@1.0.0-rc.11
  - @saas-ui/nprogress@1.0.0-rc.4
  - @saas-ui/number-input@1.0.0-rc.4
  - @saas-ui/palette@1.0.0-rc.4
  - @saas-ui/password-input@1.0.0-rc.5
  - @saas-ui/persona@1.0.0-rc.6
  - @saas-ui/pin-input@1.0.0-rc.5
  - @saas-ui/property@1.0.0-rc.6
  - @saas-ui/provider@1.0.0-rc.7
  - @saas-ui/radio@1.0.0-rc.4
  - @saas-ui/search-input@1.0.0-rc.4
  - @saas-ui/select@1.0.0-rc.4
  - @saas-ui/snackbar@1.0.0-rc.4
  - @saas-ui/stepper@1.0.0-rc.5
  - @saas-ui/theme@1.0.0-rc.4

## 1.0.0-rc.12

### Patch Changes

- Added missing dependency.
- Updated dependencies
  - @saas-ui/persona@1.0.0-rc.5

## 1.0.0-rc.11

### Patch Changes

- da3c4e4: Added ErrorBoundary component.
- bd3438d: FormStep now supports an onSubmit handler.
- 2ec8c91: Fixed vertical divider rendering incorrectly.
- Updated dependencies [bd3438d]
- Updated dependencies [ae47cbd]
  - @saas-ui/forms@1.0.0-rc.10
  - @saas-ui/property@1.0.0-rc.5
  - @saas-ui/provider@1.0.0-rc.6
  - @saas-ui/auth@1.0.0-rc.11
  - @saas-ui/modals@1.0.0-rc.10
  - @saas-ui/layout@1.0.0-rc.6
  - @saas-ui/menu@1.0.0-rc.6
  - @saas-ui/data-table@1.0.0-rc.6

## 1.0.0-rc.10

### Patch Changes

- 68c7b62: Card now has a isHoverable property to support hover styles.
- 43dff99: Option labels are now optional.
- d4afda3: ArrayFieldRowFields now accepts all FormLayout props (#48).
- 43dff99: Field is now correctly typed based on the field type.
- 38f7171: #50 - Fixed StepForm render prop types.
- 870db1f: New primary and secondary Button variant.
- Updated dependencies [68c7b62]
- Updated dependencies [43dff99]
- Updated dependencies [87d3fdc]
- Updated dependencies [d4afda3]
- Updated dependencies [43dff99]
- Updated dependencies [38f7171]
- Updated dependencies [870db1f]
  - @saas-ui/card@1.0.0-rc.4
  - @saas-ui/forms@1.0.0-rc.9
  - @saas-ui/provider@1.0.0-rc.5
  - @saas-ui/button@1.0.0-rc.4
  - @saas-ui/auth@1.0.0-rc.10
  - @saas-ui/modals@1.0.0-rc.9
  - @saas-ui/layout@1.0.0-rc.5
  - @saas-ui/menu@1.0.0-rc.5
  - @saas-ui/banner@1.0.0-rc.4
  - @saas-ui/input-right-button@1.0.0-rc.4
  - @saas-ui/list@1.0.0-rc.4
  - @saas-ui/data-table@1.0.0-rc.5
  - @saas-ui/password-input@1.0.0-rc.4
  - @saas-ui/property@1.0.0-rc.4

## 1.0.0-rc.9

### Patch Changes

- de0dce2: Scale reset button icon based on the input size.
- dc6376f: Updated all readme files, added better descriptions and links to docs and source code.
- 68f5d3b: Removed isPrimary and isSecondary Button properties, use variant="primary" instead.
- Updated dependencies [de0dce2]
- Updated dependencies [dc6376f]
- Updated dependencies [68f5d3b]
  - @saas-ui/search-input@1.0.0-rc.3
  - @saas-ui/auth@1.0.0-rc.9
  - @saas-ui/banner@1.0.0-rc.3
  - @saas-ui/button@1.0.0-rc.3
  - @saas-ui/card@1.0.0-rc.3
  - @saas-ui/collapse@1.0.0-rc.3
  - @saas-ui/data-table@1.0.0-rc.4
  - @saas-ui/forms@1.0.0-rc.8
  - @saas-ui/hooks@1.0.0-rc.3
  - @saas-ui/hotkeys@1.0.0-rc.3
  - @saas-ui/input-right-button@1.0.0-rc.3
  - @saas-ui/layout@1.0.0-rc.4
  - @saas-ui/list@1.0.0-rc.3
  - @saas-ui/menu@1.0.0-rc.4
  - @saas-ui/modals@1.0.0-rc.8
  - @saas-ui/nprogress@1.0.0-rc.3
  - @saas-ui/number-input@1.0.0-rc.3
  - @saas-ui/palette@1.0.0-rc.3
  - @saas-ui/password-input@1.0.0-rc.3
  - @saas-ui/persona@1.0.0-rc.4
  - @saas-ui/pin-input@1.0.0-rc.4
  - @saas-ui/property@1.0.0-rc.3
  - @saas-ui/provider@1.0.0-rc.4
  - @saas-ui/radio@1.0.0-rc.3
  - @saas-ui/select@1.0.0-rc.3
  - @saas-ui/snackbar@1.0.0-rc.3
  - @saas-ui/stepper@1.0.0-rc.4
  - @saas-ui/theme@1.0.0-rc.3

## 1.0.0-rc.8

### Patch Changes

- Fix vertical orientation for FormStepper.
- Updated dependencies
  - @saas-ui/forms@1.0.0-rc.7
  - @saas-ui/auth@1.0.0-rc.8
  - @saas-ui/modals@1.0.0-rc.7

## 1.0.0-rc.7

### Patch Changes

- Add exports entry for ajv
- Updated dependencies
  - @saas-ui/forms@1.0.0-rc.6
  - @saas-ui/auth@1.0.0-rc.7
  - @saas-ui/modals@1.0.0-rc.6

## 1.0.0-rc.6

### Patch Changes

- fca06e4: Added Json Schema (ajv) support for AutoForm.
- Updated dependencies [fca06e4]
  - @saas-ui/forms@1.0.0-rc.5
  - @saas-ui/auth@1.0.0-rc.6
  - @saas-ui/modals@1.0.0-rc.5

## 1.0.0-rc.5

### Patch Changes

- 9e9c601: Stepper now accepts an onChange handler.
- Updated dependencies [9e9c601]
  - @saas-ui/stepper@1.0.0-rc.3
  - @saas-ui/forms@1.0.0-rc.4
  - @saas-ui/auth@1.0.0-rc.5
  - @saas-ui/modals@1.0.0-rc.4

## 1.0.0-rc.4

### Minor Changes

- 532a7d4: Updated to Chakra UI 2.2.1
- 7a16ef7: Updated to Chakra UI 2.2.1

### Patch Changes

- c8621b8: NativeSelect now accepts chilren and doesn't throw if no options are passed.
- 6133901: No longer passing down label to input fields.
- ddec417: ArrayField no longer passing down items to the container element.
- 5f80cea: AutoForm now renders children.
- 532a7d4: Fixed all theme onconsistencies.
- 1c247cb: InputField now has type="text" by default.
- d1fb472: Select now renders a hidden input with the current value.
- Updated dependencies [c8621b8]
- Updated dependencies [532a7d4]
- Updated dependencies [6133901]
- Updated dependencies [ddec417]
- Updated dependencies [7a16ef7]
- Updated dependencies [5f80cea]
- Updated dependencies [532a7d4]
- Updated dependencies [1c247cb]
- Updated dependencies [d1fb472]
  - @saas-ui/select@1.0.0-rc.2
  - @saas-ui/auth@1.0.0-rc.4
  - @saas-ui/banner@1.0.0-rc.2
  - @saas-ui/button@1.0.0-rc.2
  - @saas-ui/card@1.0.0-rc.2
  - @saas-ui/collapse@1.0.0-rc.2
  - @saas-ui/data-table@1.0.0-rc.3
  - @saas-ui/forms@1.0.0-rc.3
  - @saas-ui/hooks@1.0.0-rc.2
  - @saas-ui/hotkeys@1.0.0-rc.2
  - @saas-ui/input-right-button@1.0.0-rc.2
  - @saas-ui/layout@1.0.0-rc.3
  - @saas-ui/list@1.0.0-rc.2
  - @saas-ui/menu@1.0.0-rc.3
  - @saas-ui/modals@1.0.0-rc.3
  - @saas-ui/nprogress@1.0.0-rc.2
  - @saas-ui/number-input@1.0.0-rc.2
  - @saas-ui/palette@1.0.0-rc.2
  - @saas-ui/password-input@1.0.0-rc.2
  - @saas-ui/persona@1.0.0-rc.3
  - @saas-ui/pin-input@1.0.0-rc.3
  - @saas-ui/property@1.0.0-rc.2
  - @saas-ui/provider@1.0.0-rc.3
  - @saas-ui/radio@1.0.0-rc.2
  - @saas-ui/search-input@1.0.0-rc.2
  - @saas-ui/snackbar@1.0.0-rc.2
  - @saas-ui/stepper@1.0.0-rc.2
  - @saas-ui/theme@1.0.0-rc.2

## 1.0.0-rc.3

### Patch Changes

- Re-publish.
- Updated dependencies
  - @saas-ui/auth@1.0.0-rc.3
  - @saas-ui/banner@1.0.0-rc.1
  - @saas-ui/button@1.0.0-rc.1
  - @saas-ui/card@1.0.0-rc.1
  - @saas-ui/collapse@1.0.0-rc.1
  - @saas-ui/data-table@1.0.0-rc.2
  - @saas-ui/forms@1.0.0-rc.2
  - @saas-ui/hooks@1.0.0-rc.1
  - @saas-ui/hotkeys@1.0.0-rc.1
  - @saas-ui/input-right-button@1.0.0-rc.1
  - @saas-ui/layout@1.0.0-rc.2
  - @saas-ui/list@1.0.0-rc.1
  - @saas-ui/menu@1.0.0-rc.2
  - @saas-ui/modals@1.0.0-rc.2
  - @saas-ui/nprogress@1.0.0-rc.1
  - @saas-ui/number-input@1.0.0-rc.1
  - @saas-ui/palette@1.0.0-rc.1
  - @saas-ui/password-input@1.0.0-rc.1
  - @saas-ui/persona@1.0.0-rc.2
  - @saas-ui/pin-input@1.0.0-rc.2
  - @saas-ui/property@1.0.0-rc.1
  - @saas-ui/provider@1.0.0-rc.2
  - @saas-ui/radio@1.0.0-rc.1
  - @saas-ui/search-input@1.0.0-rc.1
  - @saas-ui/select@1.0.0-rc.1
  - @saas-ui/snackbar@1.0.0-rc.1
  - @saas-ui/stepper@1.0.0-rc.1
  - @saas-ui/theme@1.0.0-rc.1

## 1.0.0-rc.2

### Patch Changes

- 4bb613c: Added new RouterProvider and useActivePath now uses Router context.
- 8f3f948: Removed redundant ThemeProvider / CSSReset and GlobalStyles components.
- 3dee538: Spacing between pin inputs can now be configured.
- 07491fd: ContextMenu now passing down all props to the internal Menu.
- Updated dependencies [4bb613c]
- Updated dependencies [4fc04d7]
- Updated dependencies [8f3f948]
- Updated dependencies [3dee538]
- Updated dependencies [07491fd]
  - @saas-ui/provider@1.0.0-rc.1
  - @saas-ui/persona@1.0.0-rc.1
  - @saas-ui/pin-input@1.0.0-rc.1
  - @saas-ui/menu@1.0.0-rc.1
  - @saas-ui/layout@1.0.0-rc.1
  - @saas-ui/forms@1.0.0-rc.1
  - @saas-ui/modals@1.0.0-rc.1
  - @saas-ui/auth@1.0.0-rc.2
  - @saas-ui/data-table@1.0.0-rc.1

## 1.0.0-rc.1

### Patch Changes

- Updated dependencies [9043639]
  - @saas-ui/auth@1.0.0-rc.1

## 1.0.0-rc.0

### Major Changes

- 1db5bf9: Initial release candidate

### Minor Changes

- 3ae6be1: breaking: Updated to Chakra UI 2.1
- 3ae6be1: breaking: React 18 support.

### Patch Changes

- 1fdf52a: Modern bundles now use .mjs extension.
- Updated dependencies [3ae6be1]
- Updated dependencies [a8fa78a]
- Updated dependencies [1db5bf9]
- Updated dependencies [1fdf52a]
- Updated dependencies [3ae6be1]
  - @saas-ui/auth@1.0.0-rc.0
  - @saas-ui/banner@1.0.0-rc.0
  - @saas-ui/button@1.0.0-rc.0
  - @saas-ui/card@1.0.0-rc.0
  - @saas-ui/collapse@1.0.0-rc.0
  - @saas-ui/data-table@1.0.0-rc.0
  - @saas-ui/forms@1.0.0-rc.0
  - @saas-ui/hooks@1.0.0-rc.0
  - @saas-ui/hotkeys@1.0.0-rc.0
  - @saas-ui/input-right-button@1.0.0-rc.0
  - @saas-ui/layout@1.0.0-rc.0
  - @saas-ui/list@1.0.0-rc.0
  - @saas-ui/menu@1.0.0-rc.0
  - @saas-ui/modals@1.0.0-rc.0
  - @saas-ui/nprogress@1.0.0-rc.0
  - @saas-ui/number-input@1.0.0-rc.0
  - @saas-ui/palette@1.0.0-rc.0
  - @saas-ui/password-input@1.0.0-rc.0
  - @saas-ui/persona@1.0.0-rc.0
  - @saas-ui/pin-input@1.0.0-rc.0
  - @saas-ui/property@1.0.0-rc.0
  - @saas-ui/provider@1.0.0-rc.0
  - @saas-ui/radio@1.0.0-rc.0
  - @saas-ui/search-input@1.0.0-rc.0
  - @saas-ui/select@1.0.0-rc.0
  - @saas-ui/snackbar@1.0.0-rc.0
  - @saas-ui/stepper@1.0.0-rc.0
  - @saas-ui/theme@1.0.0-rc.0

## 0.13.9

### Patch Changes

- 7e9e6dc: Fixed issue where the Snackbar spinner would always be white.
- Updated dependencies [7e9e6dc]
  - @saas-ui/snackbar@0.4.3
  - @saas-ui/theme@0.8.2
  - @saas-ui/provider@0.3.11
  - @saas-ui/layout@0.3.6
  - @saas-ui/menu@0.5.7
  - @saas-ui/auth@0.7.15
  - @saas-ui/data-table@0.3.6
  - @saas-ui/modals@0.5.15

## 0.13.8

### Patch Changes

- Updated Chakra UI version range not to include 2.x
- Updated dependencies
  - @saas-ui/auth@0.7.14
  - @saas-ui/banner@0.0.4
  - @saas-ui/button@0.4.2
  - @saas-ui/card@0.4.2
  - @saas-ui/collapse@0.3.1
  - @saas-ui/data-table@0.3.5
  - @saas-ui/forms@0.7.10
  - @saas-ui/hooks@0.4.1
  - @saas-ui/hotkeys@0.6.3
  - @saas-ui/input-right-button@0.3.3
  - @saas-ui/layout@0.3.5
  - @saas-ui/list@0.5.2
  - @saas-ui/menu@0.5.6
  - @saas-ui/modals@0.5.14
  - @saas-ui/nprogress@0.4.1
  - @saas-ui/number-input@0.3.1
  - @saas-ui/palette@0.5.1
  - @saas-ui/password-input@0.3.4
  - @saas-ui/persona@0.5.2
  - @saas-ui/pin-input@0.3.1
  - @saas-ui/property@0.3.3
  - @saas-ui/provider@0.3.10
  - @saas-ui/radio@0.3.1
  - @saas-ui/search-input@0.5.2
  - @saas-ui/select@0.4.1
  - @saas-ui/snackbar@0.4.2
  - @saas-ui/stepper@0.2.3
  - @saas-ui/theme@0.8.1

## 0.13.7

### Patch Changes

- 0930600: Snackbar promise error options are now passed down correctly.
- 0930600: Snackbar.promise now returns the promise and re-throws errors.
- Updated dependencies [0930600]
- Updated dependencies [0930600]
  - @saas-ui/snackbar@0.4.1

## 0.13.6

### Patch Changes

- 94c217d: Added appropriate autoComplete values to Auth forms.
- 0dbec1a: #36 Fixed issue where SubmitButton label would always render Submit
- Updated dependencies [94c217d]
- Updated dependencies [0dbec1a]
  - @saas-ui/auth@0.7.13
  - @saas-ui/button@0.4.1
  - @saas-ui/banner@0.0.3
  - @saas-ui/card@0.4.1
  - @saas-ui/forms@0.7.9
  - @saas-ui/input-right-button@0.3.2
  - @saas-ui/list@0.5.1
  - @saas-ui/menu@0.5.5
  - @saas-ui/modals@0.5.13
  - @saas-ui/password-input@0.3.3
  - @saas-ui/property@0.3.2

## 0.13.5

### Patch Changes

- f14fa4e: Fixed issue where the resolver was not passed down to the Form.
- Updated dependencies [f14fa4e]
  - @saas-ui/modals@0.5.12

## 0.13.4

### Patch Changes

- Updated dependencies [8f68188]
  - @saas-ui/search-input@0.5.1
  - @saas-ui/hotkeys@0.6.2

## 0.13.3

### Patch Changes

- Updated dependencies [391e21a]
  - @saas-ui/forms@0.7.8
  - @saas-ui/auth@0.7.12
  - @saas-ui/modals@0.5.11

## 0.13.2

### Patch Changes

- Updated dependencies [c0b3dc9]
  - @saas-ui/forms@0.7.7
  - @saas-ui/auth@0.7.11
  - @saas-ui/modals@0.5.10

## 0.13.1

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@0.7.6
  - @saas-ui/auth@0.7.10
  - @saas-ui/modals@0.5.9

## 0.13.0

### Minor Changes

- 9abc079: Saas UI theme colors no longer generated on the fly.

### Patch Changes

- Updated dependencies [77b2860]
- Updated dependencies [22a30dc]
- Updated dependencies [77b2860]
- Updated dependencies [9abc079]
- Updated dependencies [a76c184]
  - @saas-ui/auth@0.7.9
  - @saas-ui/forms@0.7.5
  - @saas-ui/theme@0.8.0
  - @saas-ui/modals@0.5.8
  - @saas-ui/provider@0.3.9
  - @saas-ui/layout@0.3.4
  - @saas-ui/menu@0.5.4
  - @saas-ui/data-table@0.3.4

## 0.12.12

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@0.7.4
  - @saas-ui/auth@0.7.8
  - @saas-ui/modals@0.5.7

## 0.12.11

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@0.7.2
  - @saas-ui/auth@0.7.7
  - @saas-ui/modals@0.5.6

## 0.12.10

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@0.7.2
  - @saas-ui/auth@0.7.6
  - @saas-ui/modals@0.5.5

## 0.12.9

### Patch Changes

- Added Zod field resolver for AutoForm
- Updated dependencies
  - @saas-ui/forms@0.7.1
  - @saas-ui/auth@0.7.5
  - @saas-ui/modals@0.5.4

## 0.12.8

### Patch Changes

- Updated dependencies [f6269cb]
- Updated dependencies [96336cd]
- Updated dependencies [bab579f]
  - @saas-ui/password-input@0.3.2
  - @saas-ui/hotkeys@0.6.1
  - @saas-ui/forms@0.7.0
  - @saas-ui/auth@0.7.4
  - @saas-ui/modals@0.5.3

## 0.12.7

### Patch Changes

- Updated dependencies [44c4dd3]
  - @saas-ui/hotkeys@0.6.0

## 0.12.6

### Patch Changes

- Updated dependencies [6696203]
  - @saas-ui/forms@0.6.2
  - @saas-ui/auth@0.7.3
  - @saas-ui/modals@0.5.2

## 0.12.5

### Patch Changes

- e7375a9: Moved @chakra-ui/system to dependencies
- Updated dependencies [42f4655]
  - @saas-ui/provider@0.3.8
  - @saas-ui/layout@0.3.3
  - @saas-ui/menu@0.5.3
  - @saas-ui/data-table@0.3.3

## 0.12.4

### Patch Changes

- Updated dependencies
  - @saas-ui/forms@0.6.1
  - @saas-ui/auth@0.7.2
  - @saas-ui/modals@0.5.1

## 0.12.3

### Patch Changes

- Updated dependencies [a396394]
- Updated dependencies [c1c556c]
  - @saas-ui/stepper@0.2.2
  - @saas-ui/theme@0.7.2
  - @saas-ui/persona@0.5.1
  - @saas-ui/provider@0.3.7
  - @saas-ui/layout@0.3.2
  - @saas-ui/menu@0.5.2
  - @saas-ui/data-table@0.3.2

## 0.12.2

### Patch Changes

- Updated dependencies [0024834]
- Updated dependencies [4939649]
- Updated dependencies [a36ac06]
- Updated dependencies [29a7479]
  - @saas-ui/theme@0.7.1
  - @saas-ui/auth@0.7.1
  - @saas-ui/stepper@0.2.1
  - @saas-ui/modals@0.5.0
  - @saas-ui/provider@0.3.6
  - @saas-ui/layout@0.3.1
  - @saas-ui/menu@0.5.1
  - @saas-ui/data-table@0.3.1

## 0.12.1

### Patch Changes

- Fixed issue where the ModalFooter would not render.
- Updated dependencies
  - @saas-ui/modals@0.4.1

## 0.12.0

### Minor Changes

- 0e81abd: BREAKING: Removed Yup dependency, you now need to configure default Form resolvers

  <Form> no longer accepts a Yup `schema` by default.

  Use a schema resolver to use schema support. All hookform resolvers are supported.

  ```ts
  import { yupResolver } from '@hookform/resolvers/yup'

  const form = <Form resolver={yupResolver(schema)} />
  ```

  AutoForm only supports Yup for now and has a new API.

  ```ts
  import { yupForm } from '@saas-ui/forms/yup'

  const form = <AutoForm {...yupForm(schema)} />
  ```

  Alternatively you can configure a default resolver for all forms.
  Add this somewhere in the root of your project.

  ```ts
  import { yupFieldResolver, yupResolver } from '@saas-ui/forms/yup'
  import { Form } from '@saas-ui/react'
  // yupResolver is exported from here as well for convenience.
  import { AnyObjectSchema } from 'yup'

  Form.getResolver = (schema: AnyObjectSchema) => yupResolver(schema) // @hookform/resolvers
  Form.getFieldResolver = (schema: AnyObjectSchema) => yupFieldResolver(schema) // AutoForm field resolver
  ```

- 9391c44: Fixed peer dependency issues.

### Patch Changes

- bf66fdf: Improved Auth forms types
- Updated dependencies [0e81abd]
- Updated dependencies [bf66fdf]
- Updated dependencies [9391c44]
  - @saas-ui/forms@0.6.0
  - @saas-ui/auth@0.7.0
  - @saas-ui/button@0.4.0
  - @saas-ui/card@0.4.0
  - @saas-ui/data-table@0.3.0
  - @saas-ui/hooks@0.4.0
  - @saas-ui/hotkeys@0.5.0
  - @saas-ui/layout@0.3.0
  - @saas-ui/list@0.5.0
  - @saas-ui/menu@0.5.0
  - @saas-ui/modals@0.4.0
  - @saas-ui/nprogress@0.4.0
  - @saas-ui/persona@0.5.0
  - @saas-ui/search-input@0.5.0
  - @saas-ui/select@0.4.0
  - @saas-ui/snackbar@0.4.0
  - @saas-ui/stepper@0.2.0
  - @saas-ui/theme@0.7.0
  - @saas-ui/banner@0.0.2
  - @saas-ui/input-right-button@0.3.1
  - @saas-ui/property@0.3.1
  - @saas-ui/provider@0.3.5
  - @saas-ui/password-input@0.3.1

## 0.11.8

### Patch Changes

- a268365: Fixed AuthToken type
- Updated dependencies [a268365]
  - @saas-ui/auth@0.6.6

## 0.11.7

### Patch Changes

- 99f3e33: Custom modal components can now be directly passed to modals.open
- Updated dependencies [99f3e33]
  - @saas-ui/modals@0.3.5

## 0.11.6

### Patch Changes

- 70340f0: useModal now has the correct types
- 9245460: Make sure Field ref is focusable
- 6c78c30: FormDialog type is now generic and accepts FieldValues / form context ref
- Updated dependencies [70340f0]
- Updated dependencies [9245460]
- Updated dependencies [6c78c30]
  - @saas-ui/modals@0.3.4
  - @saas-ui/forms@0.5.3
  - @saas-ui/auth@0.6.5

## 0.11.5

### Patch Changes

- Updated dependencies
  - @saas-ui/stepper@0.1.2

## 0.11.4

### Patch Changes

- 8b731d8: usePromise errors are now re-thrown
- Updated dependencies [8b731d8]
  - @saas-ui/hooks@0.3.1
  - @saas-ui/auth@0.6.4

## 0.11.3

### Patch Changes

- Updated dependencies [0f67f76]
  - @saas-ui/forms@0.5.2
  - @saas-ui/auth@0.6.3
  - @saas-ui/modals@0.3.3

## 0.11.2

### Patch Changes

- 2fd9917: Fixed a type issue
- 4606dd5: useLink now uses correct type and improved performance.
- df5cd27: Pass down the inferred type to useTable
- a26aa7c: ArrayField context can now be accessed using ref.
- Updated dependencies [c610881]
- Updated dependencies [2fd9917]
- Updated dependencies [4606dd5]
- Updated dependencies [df5cd27]
- Updated dependencies [a26aa7c]
  - @saas-ui/forms@0.5.1
  - @saas-ui/modals@0.3.2
  - @saas-ui/provider@0.3.4
  - @saas-ui/data-table@0.2.4
  - @saas-ui/auth@0.6.2
  - @saas-ui/layout@0.2.4
  - @saas-ui/menu@0.4.4

## 0.11.1

### Patch Changes

- 6513d26: No longer rendering StepperCompleted in StepperContent
- Updated dependencies [6513d26]
  - @saas-ui/stepper@0.1.1

## 0.11.0

### Minor Changes

- 9d11ba5: Added StepForm and Stepper components

### Patch Changes

- Updated dependencies [9d11ba5]
  - @saas-ui/forms@0.5.0
  - @saas-ui/stepper@0.1.0
  - @saas-ui/theme@0.6.0
  - @saas-ui/auth@0.6.1
  - @saas-ui/modals@0.3.1
  - @saas-ui/provider@0.3.3
  - @saas-ui/layout@0.2.3
  - @saas-ui/menu@0.4.3
  - @saas-ui/data-table@0.2.3

## 0.10.3

### Patch Changes

- 87b29a8: Renamed Loading to Loader. Loading will be removed in 1.0
- Updated dependencies [87b29a8]
  - @saas-ui/layout@0.2.2
  - @saas-ui/theme@0.5.2
  - @saas-ui/data-table@0.2.2
  - @saas-ui/provider@0.3.2
  - @saas-ui/menu@0.4.2

## 0.10.2

### Patch Changes

- Updated dependencies [4aef278]
  - @saas-ui/palette@0.5.0
  - @saas-ui/theme@0.5.1
  - @saas-ui/provider@0.3.1
  - @saas-ui/layout@0.2.1
  - @saas-ui/menu@0.4.1
  - @saas-ui/data-table@0.2.1

## 0.10.1

### Patch Changes

- ce66628: Added Banner component
- Updated dependencies [ce66628]
  - @saas-ui/banner@0.0.1

## 0.10.0

### Minor Changes

- e511ffd: Added a11y testing to all packages

### Patch Changes

- d66f8ce: Added ContextMenu component
- Updated dependencies [e511ffd]
- Updated dependencies [d66f8ce]
  - @saas-ui/auth@0.6.0
  - @saas-ui/button@0.3.0
  - @saas-ui/card@0.3.0
  - @saas-ui/data-table@0.2.0
  - @saas-ui/layout@0.2.0
  - @saas-ui/list@0.4.0
  - @saas-ui/menu@0.4.0
  - @saas-ui/modals@0.3.0
  - @saas-ui/nprogress@0.3.0
  - @saas-ui/number-input@0.3.0
  - @saas-ui/pin-input@0.3.0
  - @saas-ui/property@0.3.0
  - @saas-ui/radio@0.3.0
  - @saas-ui/search-input@0.4.0
  - @saas-ui/select@0.3.0
  - @saas-ui/collapse@0.3.0
  - @saas-ui/forms@0.4.0
  - @saas-ui/hooks@0.3.0
  - @saas-ui/hotkeys@0.4.0
  - @saas-ui/input-right-button@0.3.0
  - @saas-ui/password-input@0.3.0
  - @saas-ui/persona@0.4.0
  - @saas-ui/provider@0.3.0
  - @saas-ui/snackbar@0.3.0
  - @saas-ui/system@0.4.0
  - @saas-ui/theme@0.5.0

## 0.9.3

### Patch Changes

- Updated dependencies [09ef6fb]
  - @saas-ui/auth@0.5.2

## 0.9.2

### Patch Changes

- 09d4167: Added PropertyList component and improved a11y
- 16c82e6: Dont override autoComplete when in password mode
- Updated dependencies [09d4167]
- Updated dependencies [16c82e6]
  - @saas-ui/list@0.3.5
  - @saas-ui/property@0.2.2
  - @saas-ui/theme@0.4.11
  - @saas-ui/password-input@0.2.2
  - @saas-ui/provider@0.2.14
  - @saas-ui/forms@0.3.4
  - @saas-ui/layout@0.1.13
  - @saas-ui/menu@0.3.10
  - @saas-ui/auth@0.5.1
  - @saas-ui/modals@0.2.10
  - @saas-ui/data-table@0.1.12

## 0.9.1

### Patch Changes

- Updated dependencies
  - @saas-ui/list@0.3.4
  - @saas-ui/theme@0.4.10
  - @saas-ui/provider@0.2.13
  - @saas-ui/layout@0.1.12
  - @saas-ui/menu@0.3.9
  - @saas-ui/data-table@0.1.11

## 0.9.0

### Minor Changes

- a467d50: Added Forgot- and UpdatePassword views and i11y improvements.

### Patch Changes

- 1ce9ba9: Improved ObjectField semantics and styles
- Updated dependencies [a6842fd]
- Updated dependencies [d3da8ef]
- Updated dependencies [a467d50]
- Updated dependencies [1190a53]
- Updated dependencies [52688c1]
- Updated dependencies [1ce9ba9]
  - @saas-ui/forms@0.3.3
  - @saas-ui/auth@0.5.0
  - @saas-ui/snackbar@0.2.2
  - @saas-ui/list@0.3.3
  - @saas-ui/theme@0.4.9
  - @saas-ui/modals@0.2.9
  - @saas-ui/provider@0.2.12
  - @saas-ui/layout@0.1.11
  - @saas-ui/menu@0.3.8
  - @saas-ui/data-table@0.1.10

## 0.8.8

### Patch Changes

- Updated dependencies [7e316aa]
- Updated dependencies [be249e2]
  - @saas-ui/layout@0.1.10
  - @saas-ui/theme@0.4.8
  - @saas-ui/data-table@0.1.9
  - @saas-ui/provider@0.2.11
  - @saas-ui/menu@0.3.7

## 0.8.7

### Patch Changes

- Updated dependencies [4eba003]
  - @saas-ui/theme@0.4.7
  - @saas-ui/provider@0.2.10
  - @saas-ui/layout@0.1.9
  - @saas-ui/menu@0.3.6
  - @saas-ui/data-table@0.1.8

## 0.8.6

### Patch Changes

- Updated dependencies
  - @saas-ui/card@0.2.3
  - @saas-ui/theme@0.4.6
  - @saas-ui/provider@0.2.9
  - @saas-ui/layout@0.1.8
  - @saas-ui/menu@0.3.5
  - @saas-ui/data-table@0.1.7

## 0.8.5

### Patch Changes

- Updated dependencies
  - @saas-ui/theme@0.4.5
  - @saas-ui/provider@0.2.8
  - @saas-ui/layout@0.1.7
  - @saas-ui/menu@0.3.4
  - @saas-ui/data-table@0.1.6

## 0.8.4

### Patch Changes

- Updated dependencies [bae6cf9]
- Updated dependencies [afc15d8]
  - @saas-ui/modals@0.2.8
  - @saas-ui/card@0.2.2
  - @saas-ui/theme@0.4.4
  - @saas-ui/provider@0.2.7
  - @saas-ui/layout@0.1.6
  - @saas-ui/menu@0.3.3
  - @saas-ui/data-table@0.1.5

## 0.8.3

### Patch Changes

- Updated dependencies [676eefa]
  - @saas-ui/menu@0.3.2
  - @saas-ui/select@0.2.2
  - @saas-ui/forms@0.3.2
  - @saas-ui/auth@0.4.7
  - @saas-ui/modals@0.2.7

## 0.8.2

### Patch Changes

- Updated dependencies [e691413]
  - @saas-ui/forms@0.3.1
  - @saas-ui/auth@0.4.6
  - @saas-ui/modals@0.2.6

## 0.8.1

### Patch Changes

- Updated dependencies [7b87e43]
  - @saas-ui/menu@0.3.1

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
