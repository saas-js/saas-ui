import { Box, Container } from '@chakra-ui/layout'
import * as React from 'react'

import * as Yup from 'yup'

import { useFormContext, useWatch } from 'react-hook-form'

import {
  Form,
  AutoForm,
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
  SubmitButton,
} from '../src'

import { Button } from '@saas-ui/button'

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

export const autoArrayField = () => {
  return (
    <>
      <AutoForm
        defaultValues={{
          arrayField: [
            {
              title: 'Test',
            },
          ],
        }}
        schema={arraySchema}
        onSubmit={onSubmit}
      />
    </>
  )
}

export const arrayField = () => (
  <>
    <Form
      defaultValues={{
        arrayField: [
          {
            title: 'Test',
          },
        ],
      }}
      schema={arraySchema}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <ArrayField name="arrayField" label="Array field" defaultValue={{}}>
          <Field name="title" placeholder="Title" />
          <Field name="description" type="textarea" />
        </ArrayField>

        <SubmitButton label="Submit" />
      </FormLayout>
    </Form>
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

export const customArrayField = () => (
  <>
    <Form
      defaultValues={{
        arrayField: [
          {
            id: '123',
            name: 'Eelco',
            lastName: 'Wiersma',
          },
        ],
      }}
      schema={arraySchema}
      onSubmit={onSubmit}
    >
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
                    <ArrayFieldRowContainer key={field.key as string} index={i}>
                      <ArrayFieldRowFields columns={3} spacing={1}>
                        <Field name="id" placeholder="Id" />
                        <Field name="name" placeholder="Name" />
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

        <SubmitButton label="Submit" />
      </FormLayout>
    </Form>
  </>
)

export const minMaxNoSchema = () => (
  <>
    <Form
      defaultValues={{
        arrayField: [
          {
            title: 'Test',
          },
        ],
      }}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <ArrayField
          name="arrayField"
          label="Array field"
          defaultValue={{}}
          min={1}
          max={3}
        >
          <Field name="title" placeholder="Title" rules={{ required: true }} />
          <Field name="description" type="textarea" />
        </ArrayField>

        <SubmitButton label="Submit" />
      </FormLayout>
    </Form>
  </>
)

const MyArrayField = () => {
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
    >
      <Field name="title" placeholder="Title" />
      <Field name="description" type="textarea" />
    </ArrayField>
  )
}

export const WatchArrayField = () => {
  return (
    <Form
      defaultValues={{
        arrayField: [
          {
            id: 1,
            title: 'Test',
            description: '',
          },
        ],
      }}
      schema={arraySchema}
      onSubmit={onSubmit}
    >
      <FormLayout>
        <MyArrayField />

        <SubmitButton label="Submit" />
      </FormLayout>
    </Form>
  )
}
