import * as React from 'react'
import { Stack, Container, useDisclosure, ModalFooter } from '@chakra-ui/react'

import { Button } from '@saas-ui/button'
import { FormLayout, Field, SubmitButton } from '@saas-ui/forms'

import { FormDialog } from '../src/form'

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

export const basic = () => {
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

export const focusFirstInput = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>()

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

export const customFooter = () => {
  const disclosure = useDisclosure()

  const initialRef = React.useRef<HTMLInputElement>()

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
