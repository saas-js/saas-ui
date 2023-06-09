import * as React from 'react'
import {
  Stack,
  Button,
  Container,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/react'

import { Form, FormLayout, SubmitButton, createField } from '@saas-ui/forms'
import {
  createZodForm,
  createZodFormDialog,
  Form as DefaultZodForm,
  FormDialog as DefaultZodFormDialog,
} from '@saas-ui/forms/zod'
import {
  createYupForm,
  createYupFormDialog,
  FormDialog as DefaultYupFormDialog,
} from '@saas-ui/forms/yup'

import { FormDialog, createFormDialog } from '../src/form'

import * as yup from 'yup'
import * as zod from 'zod'

const CustomField = createField((props: { customFieldProps: string }) => (
  <div>custom</div>
))

const ZodForm = createZodForm({
  fields: {
    custom: CustomField,
  },
})

const ZodFormDialog = createZodFormDialog(ZodForm)

const YupForm = createYupForm({
  fields: {
    custom: CustomField,
  },
})

const YupFormDialog = createYupFormDialog(YupForm)

export default {
  title: 'Components/Overlay/FormDialog',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const onSubmit = ({ onClose }: any) => {
  return (data: any) => {
    return new Promise((resolve) => {
      console.log(data)
      setTimeout(() => {
        onClose()
        resolve(true)
      }, 2000)
    })
  }
}

export const Basic = () => {
  const disclosure = useDisclosure()

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open form dialog
      </Button>

      <FormDialog
        title="New post"
        defaultValues={{
          title: '',
          description: '',
        }}
        {...disclosure}
        onSubmit={onSubmit(disclosure)}
      >
        {({ Field }) => (
          <FormLayout>
            <Field
              name="title"
              label="Title"
              rules={{ required: 'Title is required' }}
            />
            <Field name="description" type="textarea" label="Description" />
          </FormLayout>
        )}
      </FormDialog>
    </Stack>
  )
}

export const FocusFirstInput = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>(null)

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open form dialog
      </Button>

      <FormDialog
        title="New post"
        defaultValues={{
          title: '',
          description: '',
        }}
        {...disclosure}
        onSubmit={onSubmit(disclosure)}
        initialFocusRef={initialRef}
      >
        {({ Field }) => (
          <FormLayout>
            <Field
              name="title"
              label="Title"
              rules={{ required: 'Title is required' }}
              ref={initialRef}
            />
            <Field name="description" type="textarea" label="Description" />
          </FormLayout>
        )}
      </FormDialog>
    </Stack>
  )
}

export const CustomFooter = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>(null)

  const footer = (
    <ModalFooter>
      <SubmitButton>Save post</SubmitButton>
    </ModalFooter>
  )

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open form dialog
      </Button>

      <FormDialog
        title="New post"
        defaultValues={{
          title: 'test',
          description: '',
        }}
        {...disclosure}
        onSubmit={onSubmit(disclosure)}
        initialFocusRef={initialRef}
        footer={footer}
      >
        {({ Field }) => (
          <FormLayout>
            <Field
              name="title"
              label="Title"
              rules={{ required: 'Title is required' }}
              ref={initialRef}
            />
            <Field name="description" type="textarea" label="Description" />
          </FormLayout>
        )}
      </FormDialog>
    </Stack>
  )
}

const zodSchema = zod.object({
  title: zod.string().nonempty('Title is required'),
})

export const ZodSchema = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>(null)

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open form dialog
      </Button>

      <ZodFormDialog
        title="New post"
        schema={zodSchema}
        {...disclosure}
        defaultValues={{
          title: '',
        }}
        fields={{
          title: {
            label: 'Title',
            variant: 'flushed',
          },
          cancel: {
            colorScheme: 'red',
            children: 'Delete',
            variant: 'solid',
          },
        }}
        onSubmit={({ title }) => {
          return onSubmit(disclosure)({ title })
        }}
        initialFocusRef={initialRef}
      />
    </Stack>
  )
}

export const ZodSchemaWithFields = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>(null)

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open form dialog
      </Button>

      <ZodFormDialog
        title="New post"
        schema={zodSchema}
        {...disclosure}
        defaultValues={{
          title: '',
        }}
        onSubmit={({ title }) => {
          return onSubmit(disclosure)({ title })
        }}
        initialFocusRef={initialRef}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="title" label="Title" />
          </FormLayout>
        )}
      </ZodFormDialog>
    </Stack>
  )
}

const yupSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
})

export const YupSchema = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>(null)

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open form dialog
      </Button>

      <YupFormDialog
        title="New post"
        schema={yupSchema}
        {...disclosure}
        defaultValues={{
          title: '',
        }}
        fields={{
          title: {
            label: 'Title',
            variant: 'flushed',
          },
          cancel: {
            colorScheme: 'red',
            children: 'Delete',
            variant: 'solid',
          },
        }}
        onSubmit={({ title }) => {
          return onSubmit(disclosure)({ title })
        }}
        initialFocusRef={initialRef}
      />
    </Stack>
  )
}

export const YupSchemaWithFields = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>(null)

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        Open form dialog
      </Button>

      <YupFormDialog
        title="New post"
        schema={yupSchema}
        {...disclosure}
        defaultValues={{
          title: '',
        }}
        onSubmit={({ title }) => {
          return onSubmit(disclosure)({ title })
        }}
        initialFocusRef={initialRef}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="title" label="Title" />
          </FormLayout>
        )}
      </YupFormDialog>
    </Stack>
  )
}
