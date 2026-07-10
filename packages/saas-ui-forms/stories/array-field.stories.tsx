import * as React from 'react'

import { Box, Button, Container } from '@chakra-ui/react'
import { z } from 'zod'

import {
  ArrayField,
  ArrayFieldContainer,
  ArrayFieldRowContainer,
  ArrayFieldRowFields,
  ArrayFieldRows,
  AutoFields,
  Field,
  FormLayout,
  SubmitButton,
  UseArrayFieldReturn,
  useArrayFieldContext,
  useArrayFieldRemoveButton,
  useForm,
  useFormContext,
  useWatch,
} from '../src'
import { zodFieldResolver, zodMeta } from '../zod/src'
import { onSubmit } from './helpers'

export default {
  title: 'Forms/ArrayField',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const postItemSchema = z.object({
  title: z.string().min(1).describe('Title'),
  description: z
    .string()
    .describe(zodMeta({ label: 'Description', type: 'textarea' })),
})

const postsSchema = z.object({
  arrayField: z.array(postItemSchema).describe('Posts'),
})

const arraySchema = z.object({
  arrayField: z
    .array(postItemSchema)
    .min(2)
    .max(4)
    .describe('Array field'),
})

const customArraySchema = z.object({
  arrayField: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      lastName: z.string().min(1),
    }),
  ),
})

const watchArraySchema = z.object({
  arrayField: z.array(
    z.object({
      id: z.number(),
      title: z.string().min(1),
      description: z.string().optional(),
    }),
  ),
})

export const AutoArrayField = {
  render() {
    const form = useForm({
      schema: postsSchema,
      defaultValues: {
        arrayField: [
          {
            title: 'Test',
          },
        ],
      },
      onSubmit,
    })

    return (
      <form.Form>
        <FormLayout>
          <AutoFields fieldResolver={zodFieldResolver(postsSchema)} />
          <SubmitButton />
        </FormLayout>
      </form.Form>
    )
  },
}

export const BasicArrayField = () => {
  const form = useForm({
    schema: postsSchema,
    defaultValues: {
      arrayField: [
        {
          title: 'Test',
          description: '',
        },
        {
          title: 'Test',
          description: '',
        },
      ],
    },
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <form.ArrayField
          name="arrayField"
          label="Comments"
          defaultValue={{
            title: '',
            description: '',
          }}
        >
          <form.Field name="arrayField.$.title" label="Title" />
          <form.Field
            name="arrayField.$.description"
            label="Description"
            type="textarea"
          />
        </form.ArrayField>

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </form.Form>
  )
}

export const AutoZodArrayField = () => {
  const form = useForm({
    schema: arraySchema,
    defaultValues: {
      arrayField: [
        {
          title: 'Test',
        },
      ],
    },
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <AutoFields fieldResolver={zodFieldResolver(arraySchema)} />
        <SubmitButton />
      </FormLayout>
    </form.Form>
  )
}

export const ZodArrayField = () => {
  const form = useForm({
    schema: arraySchema,
    defaultValues: {
      arrayField: [
        {
          title: 'Test',
          description: '',
        },
      ],
    },
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <form.ArrayField name="arrayField" label="Comments" defaultValue={{}}>
          <form.Field name="arrayField.$.title" label="Title" />
          <form.Field
            name="arrayField.$.description"
            label="Description"
            type="textarea"
          />
        </form.ArrayField>

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </form.Form>
  )
}

const AddButton = () => {
  const { append, defaultValue, max, fields } = useArrayFieldContext()

  const isDisabled = !!(max && fields.length >= max)

  return (
    <Button
      onClick={() =>
        append(defaultValue, {
          shouldFocus: true,
          focusName: `arrayField.${fields.length}.id`,
        })
      }
      disabled={isDisabled}
    >
      Add record
    </Button>
  )
}

const RemoveButton = () => {
  return (
    <Button variant="ghost" {...useArrayFieldRemoveButton()}>
      Remove
    </Button>
  )
}

export const CustomArrayField = () => {
  const form = useForm({
    schema: customArraySchema,
    defaultValues: {
      arrayField: [
        {
          id: '123',
          name: 'Eelco',
          lastName: 'Wiersma',
        },
      ],
    },
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <ArrayFieldContainer
          name="arrayField"
          label="Array field composed"
          defaultValue={{}}
          keyName="key"
          min={2}
          max={4}
        >
          <ArrayFieldRows>
            {(fields) => (
              <>
                {fields.map((field, i) => {
                  return (
                    <ArrayFieldRowContainer
                      key={field.key as string}
                      index={i}
                    >
                      <ArrayFieldRowFields columns={3} gap={1}>
                        <form.Field name="arrayField.$.id" placeholder="Id" />
                        <form.Field
                          name="arrayField.$.name"
                          placeholder="Name"
                        />
                        <Box>
                          <form.Field
                            name={`arrayField.${i}.lastName`}
                            placeholder="Last name"
                          />
                        </Box>
                      </ArrayFieldRowFields>
                      <RemoveButton />
                    </ArrayFieldRowContainer>
                  )
                })}
              </>
            )}
          </ArrayFieldRows>
          <AddButton />
        </ArrayFieldContainer>

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </form.Form>
  )
}

export const MinMaxNoSchema = {
  render() {
    const form = useForm({
      defaultValues: {
        arrayField: [
          {
            title: 'Test',
            description: '',
          },
        ],
      },
      onSubmit,
    })

    return (
      <form.Form>
        <FormLayout>
          <form.ArrayField
            name="arrayField"
            label="Array field"
            defaultValue={{}}
            min={1}
            max={3}
          >
            <form.Field
              name="arrayField.$.title"
              label="Title"
              rules={{ required: true }}
            />
            <form.Field
              name="arrayField.$.description"
              label="Description"
              type="textarea"
            />
          </form.ArrayField>

          <SubmitButton>Submit</SubmitButton>
        </FormLayout>
      </form.Form>
    )
  },
}

const MyArrayField = React.forwardRef<UseArrayFieldReturn>((props, ref) => {
  const formState = useFormContext()

  const watch = useWatch({
    name: 'arrayField',
  })

  const [prevState, setPrevState] = React.useState(
    formState.getValues('arrayField'),
  )

  React.useEffect(() => {
    console.log(prevState, watch)

    setPrevState(watch)
  }, [watch])

  return (
    <ArrayField
      name="arrayField"
      label="Array field"
      keyName="_id"
      defaultValue={{}}
      ref={ref}
    >
      <Field name="title" label="Title" />
      <Field name="description" label="Description" type="textarea" />
    </ArrayField>
  )
})

export const WatchArrayField = () => {
  const form = useForm({
    schema: watchArraySchema,
    defaultValues: {
      arrayField: [
        {
          id: 1,
          title: 'Test',
          description: '',
        },
      ],
    },
    onSubmit,
  })

  return (
    <form.Form>
      <FormLayout>
        <MyArrayField />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </form.Form>
  )
}

export const ArrayFieldRef = () => {
  const ref = React.useRef<UseArrayFieldReturn>(null)

  const form = useForm({
    schema: arraySchema,
    defaultValues: {
      arrayField: [
        {
          title: 'Test',
        },
      ],
    },
    onSubmit,
  })

  React.useLayoutEffect(() => {
    console.log(ref.current)
    ref.current?.append({ title: 'Appended using the ref api' })
  }, [ref])

  return (
    <form.Form>
      <FormLayout>
        <MyArrayField ref={ref} />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </form.Form>
  )
}
