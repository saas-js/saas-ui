---
'@saas-ui/forms': minor
'@saas-ui/react': minor
---

BREAKING: Removed Yup dependency, you now need to configure default Form resolvers

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
