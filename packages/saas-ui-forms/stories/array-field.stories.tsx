import { Box, Button, Container } from '@chakra-ui/react'
import * as React from 'react'

import * as Yup from 'yup'

import { Form as YupForm } from '@saas-ui/forms/yup'

import {
  Form,
  FormLayout,
  Field,
  ArrayField,
  ArrayFieldContainer,
  ArrayFieldRows,
  ArrayFieldRow,
  ArrayFieldRowContainer,
  ArrayFieldRowFields,
  useArrayFieldContext,
  useArrayFieldRowContext,
  useArrayFieldAddButton,
  useArrayFieldRemoveButton,
  UseArrayFieldReturn,
  SubmitButton,
  ArrayFieldProps,
  ArrayFieldAddButton,
  useFormContext,
  useWatch,
} from '../src'

import { onSubmit } from './helpers'

export default {
  title: 'Components/Forms/ArrayField',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const subSchema = Yup.object().shape({
  title: Yup.string().required().meta({ placeholder: 'Title' }).label('Title'),
  description: Yup.string().meta({ type: 'textarea' }).label('Description'),
})

const arraySchema = Yup.object().shape({
  arrayField: Yup.array().min(2).max(4).of(subSchema).label('Array field'),
})

export const AutoArrayField = {
  render() {
    return (
      <Form
        defaultValues={{
          arrayField: [
            {
              title: 'Test',
            },
          ],
        }}
        schema={{
          arrayField: {
            type: 'array',
            label: 'Posts',
            items: {
              type: 'object',
              properties: {
                title: {
                  label: 'Title',
                  rules: { required: true },
                },
                description: {
                  label: 'Description',
                  type: 'textarea',
                },
              },
            },
          },
        }}
        onSubmit={onSubmit}
      />
    )
  },
}

export const BasicArrayField = () => {
  return (
    <>
      <Form
        defaultValues={{
          arrayField: [
            {
              title: 'Test',
              description: '',
            },
          ],
        }}
        schema={{
          arrayField: {
            type: 'array',
            label: 'Posts',
            items: {
              type: 'object',
              properties: {
                title: {
                  label: 'Title',
                  rules: { required: true },
                },
                description: {
                  label: 'Description',
                  type: 'textarea',
                },
              },
            },
          },
        }}
        onSubmit={onSubmit}
      >
        {({ Field, ArrayField }) => (
          <FormLayout>
            <ArrayField name="arrayField" label="Comments" defaultValue={{}}>
              <Field name="arrayField.$.title" label="Title" />
              <Field
                name="arrayField.$.description"
                label="Description"
                type="textarea"
              />
            </ArrayField>

            <SubmitButton>Submit</SubmitButton>
          </FormLayout>
        )}
      </Form>
    </>
  )
}

export const AutoYupArrayField = () => {
  return (
    <>
      <YupForm
        schema={arraySchema}
        defaultValues={{
          arrayField: [
            {
              title: 'Test',
            },
          ],
        }}
        onSubmit={onSubmit}
      />
    </>
  )
}

export const YupArrayField = () => (
  <>
    <YupForm
      schema={arraySchema}
      defaultValues={{
        arrayField: [
          {
            title: 'Test',
            description: '',
          },
        ],
      }}
      onSubmit={onSubmit}
    >
      {({ Field, ArrayField }) => (
        <FormLayout>
          <ArrayField name="arrayField" label="Comments" defaultValue={{}}>
            <Field name="arrayField.$.title" label="Title" />
            <Field
              name="arrayField.$.description"
              label="Description"
              type="textarea"
            />
          </ArrayField>

          <SubmitButton>Submit</SubmitButton>
        </FormLayout>
      )}
    </YupForm>
  </>
)

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
      isDisabled={isDisabled}
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

export const CustomArrayField = () => (
  <>
    <YupForm
      schema={Yup.object({
        arrayField: Yup.array().of(
          Yup.object({
            id: Yup.string().required(),
            name: Yup.string().required(),
            lastName: Yup.string().required(),
          })
        ),
      })}
      defaultValues={{
        arrayField: [
          {
            id: '123',
            name: 'Eelco',
            lastName: 'Wiersma',
          },
        ],
      }}
      onSubmit={onSubmit}
    >
      {({ Field, ArrayField }) => (
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
                        <ArrayFieldRowFields columns={3} spacing={1}>
                          <Field name="arrayField.$.id" placeholder="Id" />
                          <Field name="arrayField.$.name" placeholder="Name" />
                          <Box>
                            <Field
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
      )}
    </YupForm>
  </>
)

export const MinMaxNoSchema = {
  render() {
    return (
      <Form
        defaultValues={{
          arrayField: [
            {
              title: 'Test',
              description: '',
            },
          ],
        }}
        onSubmit={onSubmit}
      >
        {({ Field, ArrayField }) => (
          <FormLayout>
            <ArrayField
              name="arrayField"
              label="Array field"
              defaultValue={{}}
              min={1}
              max={3}
            >
              <Field
                name="arrayField.$.title"
                label="Title"
                rules={{ required: true }}
              />
              <Field
                name="arrayField.$.description"
                label="Description"
                type="textarea"
              />
            </ArrayField>

            <SubmitButton>Submit</SubmitButton>
          </FormLayout>
        )}
      </Form>
    )
  },
}

const MyArrayField = React.forwardRef<UseArrayFieldReturn>((props, ref) => {
  const formState = useFormContext()

  const watch = useWatch({
    name: 'arrayField',
  })

  const [prevState, setPrevState] = React.useState(
    formState.getValues('arrayField')
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
  return (
    <YupForm
      schema={Yup.object({
        arrayField: Yup.array().of(
          Yup.object({
            id: Yup.number().required(),
            title: Yup.string().required(),
            description: Yup.string(),
          })
        ),
      })}
      defaultValues={{
        arrayField: [
          {
            id: 1,
            title: 'Test',
            description: '',
          },
        ],
      }}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <MyArrayField />

        <SubmitButton>Submit</SubmitButton>
      </FormLayout>
    </YupForm>
  )
}

export const ArrayFieldRef = () => {
  const ref = React.useRef<UseArrayFieldReturn>(null)

  React.useLayoutEffect(() => {
    console.log(ref.current)
    ref.current?.append({ title: 'Appended using the ref api' })
  }, [ref])

  return (
    <YupForm
      schema={arraySchema}
      defaultValues={{
        arrayField: [
          {
            title: 'Test',
          },
        ],
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <FormLayout>
          <MyArrayField ref={ref} />

          <SubmitButton>Submit</SubmitButton>
        </FormLayout>
      )}
    </YupForm>
  )
}
