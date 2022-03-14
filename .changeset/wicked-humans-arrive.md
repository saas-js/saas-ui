---
'@saas-ui/auth': minor
'@saas-ui/button': minor
'@saas-ui/card': minor
'@saas-ui/data-table': minor
'@saas-ui/forms': minor
'@saas-ui/hooks': minor
'@saas-ui/hotkeys': minor
'@saas-ui/layout': minor
'@saas-ui/list': minor
'@saas-ui/menu': minor
'@saas-ui/modals': minor
'@saas-ui/nprogress': minor
'@saas-ui/persona': minor
'@saas-ui/react': minor
'@saas-ui/search-input': minor
'@saas-ui/select': minor
'@saas-ui/snackbar': minor
'@saas-ui/stepper': minor
'@saas-ui/theme': minor
'@saas-ui/props-docs': minor
---

BREAKING: Removed yup dependency from forms and fixed peer dependency issues.

<Form> doesn't accept a Yup `schema` any more by default.

Use a schema resolver to use schema support. All hookform resolvers are supported.

```
import {yupResolver} from '@hookform/resolvers/yup'

<Form resolver={yupResolver(schema)} />
```

AutoForm only supports Yup for now and has a new API.

```
import { yupForm } from '@saas-ui/forms/yup'

<AutoForm {...yupForm(schema)} />
```
