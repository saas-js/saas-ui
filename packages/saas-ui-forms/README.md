# Forms Manager

Powerfull forms library for Chakra UI.
Create typesafe React forms with speed.

Supports Zod, Yup and AJV for validation and form generation.

- [Docs](https://www.saas-ui.dev/docs/forms/form)

## Installation

```sh
$ yarn add @saas-ui/forms

#or

$ npm i @saas-ui/forms  --save
```

## Usage with Zod

### AutoForm

Generate forms from schema.

```tsx
import { createZodForm } from '@saas-ui/forms/zod'

const { AutoForm } = createZodForm()

const schema = z.object({
  name: z.string(),
})

function App() {
  const onSubmit = (data: z.infer<typeof schema>) => {}
  return <AutoForm schema={schema} onSubmit={onSubmit} />
}
```

### Form

Create custom typesafe forms.

```tsx
import { FormLayout, createZodForm } from '@saas-ui/forms/zod'

const { Form, SubmitButton } = createZodForm()

const schema = z.object({
  name: z.string()
})

function App() {
  const onSubmit = (data: z.infer<typeof schema>) => {}

  return (
    <Form schema={schema} onSubmit={onSubmit}>
        {({ Field }) => (
            <FormLayout>
                <Field name="name" type="text" />
                <SubmitButton>Save</SubmitButton>
            </FormLayotu>
        )}
    </Form>
  )
}
```

## Source

https://github.com/saas-js/saas-ui/tree/next/packages/saas-ui-forms

## License

MIT - Appulse Software
