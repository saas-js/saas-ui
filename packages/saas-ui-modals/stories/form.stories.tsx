import * as React from 'react'
import { Stack, Container, useDisclosure, ModalFooter } from '@chakra-ui/react'

import { Button } from '@saas-ui/button'
import { FormLayout, Field, SubmitButton } from '@saas-ui/forms'

import { FormDialog } from '../src/form'

import { yupForm } from '@saas-ui/forms/yup'
import * as yup from 'yup'

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

const onSubmit = ({ onClose }) => {
  return (data) => {
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
        {...disclosure}
        onSubmit={onSubmit(disclosure)}
      >
        <FormLayout>
          <Field
            name="title"
            label="Title"
            rules={{ required: 'Title is required' }}
          />
          <Field name="description" type="textarea" label="Description" />
        </FormLayout>
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
        {...disclosure}
        onSubmit={onSubmit(disclosure)}
        initialFocusRef={initialRef}
      >
        <FormLayout>
          <Field
            name="title"
            label="Title"
            rules={{ required: 'Title is required' }}
            ref={initialRef}
          />
          <Field name="description" type="textarea" label="Description" />
        </FormLayout>
      </FormDialog>
    </Stack>
  )
}

export const CustomFooter = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>(null)

  const footer = (
    <ModalFooter>
      <SubmitButton label="Save post" />
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
        {...disclosure}
        onSubmit={onSubmit(disclosure)}
        initialFocusRef={initialRef}
        footer={footer}
      >
        <FormLayout>
          <Field
            name="title"
            label="Title"
            rules={{ required: 'Title is required' }}
            ref={initialRef}
          />
          <Field name="description" type="textarea" label="Description" />
        </FormLayout>
      </FormDialog>
    </Stack>
  )
}

const yupSchema = yup.object({
  title: yup.string().required('Title is required'),
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

      <FormDialog
        title="New post"
        {...disclosure}
        defaultValues={{
          title: '',
        }}
        onSubmit={onSubmit(disclosure)}
        initialFocusRef={initialRef}
        {...yupForm(yupSchema)}
      />
    </Stack>
  )
}
