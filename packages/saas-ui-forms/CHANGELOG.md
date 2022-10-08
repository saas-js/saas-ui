# @saas-ui/forms

## 1.2.2

### Patch Changes

- ad47180: FormStepper now supports theming props.

## 1.2.1

### Patch Changes

- dfd61ed: Custom Field onChange and onBlur handlers will no longer override the internal HookForm handlers.
  - @saas-ui/stepper@1.1.2

## 1.2.0

### Minor Changes

- d003608: Form now accepts a render function with form state props.
- d003608: Re-export all React Hook Form types and hooks
- d003608: New onChange prop for Form that triggers when the form state is changed.

## 1.1.2

### Patch Changes

- bef671d: Field variant now passed down to the internal Input.

## 1.1.1

### Patch Changes

- @saas-ui/stepper@1.1.1

## 1.1.0

### Minor Changes

- f6ec7dc: Fixed issue where Next.js would not resolve Chakra UI components correctly.

### Patch Changes

- Updated dependencies [f6ec7dc]
  - @saas-ui/button@1.1.0
  - @saas-ui/input-right-button@1.1.0
  - @saas-ui/number-input@1.1.0
  - @saas-ui/password-input@1.1.0
  - @saas-ui/pin-input@1.1.0
  - @saas-ui/radio@1.1.0
  - @saas-ui/react-utils@1.1.0
  - @saas-ui/select@1.1.0
  - @saas-ui/stepper@1.1.0

## 1.0.3

### Patch Changes

- e14c2e1: Make sure FormStep onSubmit does not throw an error when no promise is returned.
- Updated dependencies [8d03628]
  - @saas-ui/password-input@1.0.2

## 1.0.2

### Patch Changes

- fe754e6: Fixed Hook Form 7.33 compatibility.
- Updated dependencies [fe1e333]
  - @saas-ui/input-right-button@1.0.1
  - @saas-ui/password-input@1.0.1

## 1.0.1

### Patch Changes

- 3ce1dee: Support JSONSchema title in field resolvers
- 150efb2: Select field focus styles now consistent with Input fields.
- 3f928c2: FormDialog with AutoForm now sets focus on first field by default.

## 1.0.0

### Major Changes

- 1db5bf9: Initial release candidate

### Minor Changes

- 3ae6be1: breaking: Updated to Chakra UI 2.1
- 532a7d4: Updated to Chakra UI 2.2.1
- 7a16ef7: Updated to Chakra UI 2.2.1
- 3ae6be1: breaking: React 18 support.

### Patch Changes

- fca06e4: Added Json Schema (ajv) support for AutoForm.
- 6cc9343: Add exports entry for ajv
- 15c3960: Re-publish.
- 1744543: Updated dependencies.
- bd3438d: FormStep now supports an onSubmit handler.
- 6133901: No longer passing down label to input fields.
- dc6376f: Updated all readme files, added better descriptions and links to docs and source code.
- 43dff99: Option labels are now optional.
- d4afda3: ArrayFieldRowFields now accepts all FormLayout props (#48).
- ddec417: ArrayField no longer passing down items to the container element.
- 43dff99: Field is now correctly typed based on the field type.
- 5a1b92b: Fix vertical orientation for FormStepper.
- 1fdf52a: Modern bundles now use .mjs extension.
- 38f7171: #50 - Fixed StepForm render prop types.
- 5f80cea: AutoForm now renders children.
- 532a7d4: Fixed all theme onconsistencies.
- 1c247cb: InputField now has type="text" by default.
- d1fb472: Select now renders a hidden input with the current value.
- 68f5d3b: Removed isPrimary and isSecondary Button properties, use colorScheme="primary" instead.
- Updated dependencies [3ae6be1]
- Updated dependencies [c8621b8]
- Updated dependencies [15c3960]
- Updated dependencies [532a7d4]
- Updated dependencies [1744543]
- Updated dependencies [dc6376f]
- Updated dependencies [9e9c601]
- Updated dependencies [1db5bf9]
- Updated dependencies [1fdf52a]
- Updated dependencies [7a16ef7]
- Updated dependencies [532a7d4]
- Updated dependencies [3dee538]
- Updated dependencies [870db1f]
- Updated dependencies [3ae6be1]
- Updated dependencies [68f5d3b]
  - @saas-ui/button@1.0.0
  - @saas-ui/input-right-button@1.0.0
  - @saas-ui/number-input@1.0.0
  - @saas-ui/password-input@1.0.0
  - @saas-ui/pin-input@1.0.0
  - @saas-ui/radio@1.0.0
  - @saas-ui/react-utils@1.0.0
  - @saas-ui/select@1.0.0
  - @saas-ui/stepper@1.0.0

## 1.0.0-rc.12

### Patch Changes

- @saas-ui/stepper@1.0.0-rc.6

## 1.0.0-rc.11

### Patch Changes

- 1744543: Updated dependencies.
- Updated dependencies [1744543]
  - @saas-ui/button@1.0.0-rc.5
  - @saas-ui/input-right-button@1.0.0-rc.5
  - @saas-ui/number-input@1.0.0-rc.4
  - @saas-ui/password-input@1.0.0-rc.5
  - @saas-ui/pin-input@1.0.0-rc.5
  - @saas-ui/radio@1.0.0-rc.4
  - @saas-ui/react-utils@1.0.0-rc.4
  - @saas-ui/select@1.0.0-rc.4
  - @saas-ui/stepper@1.0.0-rc.5

## 1.0.0-rc.10

### Patch Changes

- bd3438d: FormStep now supports an onSubmit handler.

## 1.0.0-rc.9

### Patch Changes

- 43dff99: Option labels are now optional.
- d4afda3: ArrayFieldRowFields now accepts all FormLayout props (#48).
- 43dff99: Field is now correctly typed based on the field type.
- 38f7171: #50 - Fixed StepForm render prop types.
- Updated dependencies [870db1f]
  - @saas-ui/button@1.0.0-rc.4
  - @saas-ui/input-right-button@1.0.0-rc.4
  - @saas-ui/password-input@1.0.0-rc.4

## 1.0.0-rc.8

### Patch Changes

- dc6376f: Updated all readme files, added better descriptions and links to docs and source code.
- 68f5d3b: Removed isPrimary and isSecondary Button properties, use colorScheme="primary" instead.
- Updated dependencies [dc6376f]
- Updated dependencies [68f5d3b]
  - @saas-ui/button@1.0.0-rc.3
  - @saas-ui/input-right-button@1.0.0-rc.3
  - @saas-ui/number-input@1.0.0-rc.3
  - @saas-ui/password-input@1.0.0-rc.3
  - @saas-ui/pin-input@1.0.0-rc.4
  - @saas-ui/radio@1.0.0-rc.3
  - @saas-ui/react-utils@1.0.0-rc.3
  - @saas-ui/select@1.0.0-rc.3
  - @saas-ui/stepper@1.0.0-rc.4

## 1.0.0-rc.7

### Patch Changes

- Fix vertical orientation for FormStepper.

## 1.0.0-rc.6

### Patch Changes

- Add exports entry for ajv

## 1.0.0-rc.5

### Patch Changes

- fca06e4: Added Json Schema (ajv) support for AutoForm.

## 1.0.0-rc.4

### Patch Changes

- Updated dependencies [9e9c601]
  - @saas-ui/stepper@1.0.0-rc.3

## 1.0.0-rc.3

### Minor Changes

- 532a7d4: Updated to Chakra UI 2.2.1
- 7a16ef7: Updated to Chakra UI 2.2.1

### Patch Changes

- 6133901: No longer passing down label to input fields.
- ddec417: ArrayField no longer passing down items to the container element.
- 5f80cea: AutoForm now renders children.
- 532a7d4: Fixed all theme onconsistencies.
- 1c247cb: InputField now has type="text" by default.
- d1fb472: Select now renders a hidden input with the current value.
- Updated dependencies [c8621b8]
- Updated dependencies [532a7d4]
- Updated dependencies [7a16ef7]
- Updated dependencies [532a7d4]
  - @saas-ui/select@1.0.0-rc.2
  - @saas-ui/button@1.0.0-rc.2
  - @saas-ui/input-right-button@1.0.0-rc.2
  - @saas-ui/number-input@1.0.0-rc.2
  - @saas-ui/password-input@1.0.0-rc.2
  - @saas-ui/pin-input@1.0.0-rc.3
  - @saas-ui/radio@1.0.0-rc.2
  - @saas-ui/react-utils@1.0.0-rc.2
  - @saas-ui/stepper@1.0.0-rc.2

## 1.0.0-rc.2

### Patch Changes

- Re-publish.
- Updated dependencies
  - @saas-ui/button@1.0.0-rc.1
  - @saas-ui/input-right-button@1.0.0-rc.1
  - @saas-ui/number-input@1.0.0-rc.1
  - @saas-ui/password-input@1.0.0-rc.1
  - @saas-ui/pin-input@1.0.0-rc.2
  - @saas-ui/radio@1.0.0-rc.1
  - @saas-ui/react-utils@1.0.0-rc.1
  - @saas-ui/select@1.0.0-rc.1
  - @saas-ui/stepper@1.0.0-rc.1

## 1.0.0-rc.1

### Patch Changes

- Updated dependencies [3dee538]
  - @saas-ui/pin-input@1.0.0-rc.1

## 1.0.0-rc.0

### Major Changes

- 1db5bf9: Initial release candidate

### Minor Changes

- 3ae6be1: breaking: Updated to Chakra UI 2.1
- 3ae6be1: breaking: React 18 support.

### Patch Changes

- 1fdf52a: Modern bundles now use .mjs extension.
- Updated dependencies [3ae6be1]
- Updated dependencies [1db5bf9]
- Updated dependencies [1fdf52a]
- Updated dependencies [3ae6be1]
  - @saas-ui/button@1.0.0-rc.0
  - @saas-ui/input-right-button@1.0.0-rc.0
  - @saas-ui/number-input@1.0.0-rc.0
  - @saas-ui/password-input@1.0.0-rc.0
  - @saas-ui/pin-input@1.0.0-rc.0
  - @saas-ui/radio@1.0.0-rc.0
  - @saas-ui/react-utils@1.0.0-rc.0
  - @saas-ui/select@1.0.0-rc.0
  - @saas-ui/stepper@1.0.0-rc.0

## 0.7.10

### Patch Changes

- Updated Chakra UI version range not to include 2.x
- Updated dependencies
  - @saas-ui/button@0.4.2
  - @saas-ui/input-right-button@0.3.3
  - @saas-ui/number-input@0.3.1
  - @saas-ui/password-input@0.3.4
  - @saas-ui/pin-input@0.3.1
  - @saas-ui/radio@0.3.1
  - @saas-ui/select@0.4.1
  - @saas-ui/stepper@0.2.3

## 0.7.9

### Patch Changes

- Updated dependencies [0dbec1a]
  - @saas-ui/button@0.4.1
  - @saas-ui/input-right-button@0.3.2
  - @saas-ui/password-input@0.3.3

## 0.7.8

### Patch Changes

- 391e21a: Field id now passed down to the internal FormControl for better a11y.

## 0.7.7

### Patch Changes

- c0b3dc9: Improved StepForm typings

## 0.7.6

### Patch Changes

- Fix zod resolver build

## 0.7.5

### Patch Changes

- 22a30dc: Added displayName to form components
- a76c184: Fixed FormStepper default styles.

## 0.7.4

### Patch Changes

- Fixed npm publish

## 0.7.2

### Patch Changes

- Publish resolver files to npm

## 0.7.2

### Patch Changes

- Fixed typings

## 0.7.1

### Patch Changes

- Added Zod field resolver for AutoForm

## 0.7.0

### Minor Changes

- bab579f: Added Zod resolver for AutoForm

### Patch Changes

- Updated dependencies [f6269cb]
  - @saas-ui/password-input@0.3.2

## 0.6.2

### Patch Changes

- 6696203: Fixed Yup resolver types

## 0.6.1

### Patch Changes

- Release an updated build

## 0.6.0

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
  import { Form } from '@saas-ui/react'
  import { yupResolver, yupFieldResolver } from '@saas-ui/forms/yup' // yupResolver is exported from here as well for convenience.
  import { AnyObjectSchema } from 'yup'

  Form.getResolver = (schema: AnyObjectSchema) => yupResolver(schema) // @hookform/resolvers
  Form.getFieldResolver = (schema: AnyObjectSchema) => yupFieldResolver(schema) // AutoForm field resolver
  ```

- 9391c44: Fixed peer dependency issues.

### Patch Changes

- Updated dependencies [9391c44]
  - @saas-ui/button@0.4.0
  - @saas-ui/select@0.4.0
  - @saas-ui/input-right-button@0.3.1
  - @saas-ui/password-input@0.3.1

## 0.5.3

### Patch Changes

- 9245460: Make sure Field ref is focusable

## 0.5.2

### Patch Changes

- 0f67f76: Fixed circular dependency

## 0.5.1

### Patch Changes

- c610881: Fixed a type error
- a26aa7c: ArrayField context can now be accessed using ref.

## 0.5.0

### Minor Changes

- 9d11ba5: Added StepForm and Stepper components

### Patch Changes

- Updated dependencies [9d11ba5]
  - @saas-ui/react-utils@0.1.0

## 0.4.0

### Minor Changes

- e511ffd: Added a11y testing to all packages

### Patch Changes

- Updated dependencies [e511ffd]
  - @saas-ui/button@0.3.0
  - @saas-ui/number-input@0.3.0
  - @saas-ui/pin-input@0.3.0
  - @saas-ui/radio@0.3.0
  - @saas-ui/select@0.3.0
  - @saas-ui/input-right-button@0.3.0
  - @saas-ui/password-input@0.3.0

## 0.3.4

### Patch Changes

- Updated dependencies [16c82e6]
  - @saas-ui/password-input@0.2.2

## 0.3.3

### Patch Changes

- a6842fd: Re-export UseFormReturn
- d3da8ef: Don't set isRequired when required is true
- 1ce9ba9: Improved ObjectField semantics and styles

## 0.3.2

### Patch Changes

- Updated dependencies [676eefa]
  - @saas-ui/select@0.2.2

## 0.3.1

### Patch Changes

- e691413: DisplayIf now check if value is set by default, set isRequired on fields when required = true

## 0.3.0

### Minor Changes

- 385b760: Improved Typescript support for forms, conditionally render form fields with DisplayIf

## 0.2.5

### Patch Changes

- Updated dependencies [46dd92b]
  - @saas-ui/number-input@0.2.2

## 0.2.4

### Patch Changes

- b3159a7: Only publish dist and src files
- Updated dependencies [b3159a7]
  - @saas-ui/button@0.2.1
  - @saas-ui/input-right-button@0.2.1
  - @saas-ui/number-input@0.2.1
  - @saas-ui/password-input@0.2.1
  - @saas-ui/pin-input@0.2.1
  - @saas-ui/radio@0.2.1
  - @saas-ui/select@0.2.1

## 0.2.3

### Patch Changes

- Bump version

## 0.2.2

### Patch Changes

- Set default value on FormProps generic type

## 0.2.1

### Patch Changes

- 9673005: Improved typescript support and fixed issue with invalid states

## 0.2.0

### Minor Changes

- Upgrade to Chakra UI 1.8.1

### Patch Changes

- Updated dependencies
  - @saas-ui/input-right-button@0.2.0
  - @saas-ui/number-input@0.2.0
  - @saas-ui/pin-input@0.2.0
  - @saas-ui/radio@0.2.0
  - @saas-ui/select@0.2.0
  - @saas-ui/button@0.2.0
  - @saas-ui/password-input@0.2.0

## 0.1.9

### Patch Changes

- Removed unused isOptional option

## 0.1.8

### Patch Changes

- Update radio dependencies
- Updated dependencies
  - @saas-ui/radio@0.1.5

## 0.1.7

### Patch Changes

- Update dependencies
- Updated dependencies
  - @saas-ui/number-input@0.1.4
  - @saas-ui/password-input@0.1.7
  - @saas-ui/pin-input@0.1.4
  - @saas-ui/radio@0.1.4
  - @saas-ui/select@0.1.5

## 0.1.6

### Patch Changes

- @saas-ui/button@0.1.6
- @saas-ui/input-right-button@0.1.6
- @saas-ui/password-input@0.1.6

## 0.1.5

### Patch Changes

- Updated dependencies
  - @saas-ui/select@0.1.4
  - @saas-ui/button@0.1.5
  - @saas-ui/input-right-button@0.1.5
  - @saas-ui/password-input@0.1.5

## 0.1.4

### Patch Changes

- Updated dependencies
  - @saas-ui/button@0.1.4
  - @saas-ui/input-right-button@0.1.4
  - @saas-ui/password-input@0.1.4

## 0.1.3

### Patch Changes

- Improved exports configuration
- Updated dependencies
  - @saas-ui/button@0.1.3
  - @saas-ui/input-right-button@0.1.3
  - @saas-ui/number-input@0.1.3
  - @saas-ui/password-input@0.1.3
  - @saas-ui/pin-input@0.1.3
  - @saas-ui/radio@0.1.3
  - @saas-ui/select@0.1.3

## 0.1.2

### Patch Changes

- Republish with correct deps
- Updated dependencies
  - @saas-ui/button@0.1.2
  - @saas-ui/input-right-button@0.1.2
  - @saas-ui/number-input@0.1.2
  - @saas-ui/password-input@0.1.2
  - @saas-ui/pin-input@0.1.2
  - @saas-ui/radio@0.1.2
  - @saas-ui/select@0.1.2

## 0.1.1

### Patch Changes

- Fix version mismatch
- Updated dependencies
  - @saas-ui/button@0.1.1
  - @saas-ui/input-right-button@0.1.1
  - @saas-ui/number-input@0.1.1
  - @saas-ui/password-input@0.1.1
  - @saas-ui/pin-input@0.1.1
  - @saas-ui/radio@0.1.1
  - @saas-ui/select@0.1.1

## 0.1.0

### Minor Changes

- Initial release of Saas UI Core

### Patch Changes

- Updated dependencies
  - @saas-ui/button@0.1.0
  - @saas-ui/input-right-button@0.1.0
  - @saas-ui/number-input@0.1.0
  - @saas-ui/password-input@0.1.0
  - @saas-ui/pin-input@0.1.0
  - @saas-ui/radio@0.1.0
  - @saas-ui/select@0.1.0
