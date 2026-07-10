import * as React from 'react'

import { FormLayout, SubmitButton, useForm } from '@saas-ui/forms'
import { Button, Container, Dialog, Stack, useDisclosure } from '@saas-ui/react'
import { z } from 'zod'

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

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

const titleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
})

type PostFormValues = z.infer<typeof postSchema>
type TitleFormValues = z.infer<typeof titleSchema>

const createOnSubmit =
  (onClose: () => void) => async (data: PostFormValues | TitleFormValues) => {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onClose()
  }

export const Basic = () => {
  const { open, onOpen, onClose, setOpen } = useDisclosure()

  const form = useForm({
    schema: postSchema,
    defaultValues: {
      title: '',
      description: '',
    },
    onSubmit: createOnSubmit(onClose),
  })

  return (
    <Stack alignItems="center">
      <Button onClick={onOpen}>Open form dialog</Button>

      <Dialog.Root
        open={open}
        onOpenChange={({ open }) => {
          setOpen(open)
        }}
      >
        <Dialog.Content>
          <form.Form>
            <Dialog.Header>
              <Dialog.Title>New post</Dialog.Title>
              <Dialog.CloseButton />
            </Dialog.Header>
            <Dialog.Body>
              <FormLayout>
                <form.Field name="title" label="Title" />
                <form.Field
                  name="description"
                  type="textarea"
                  label="Description"
                />
              </FormLayout>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <SubmitButton />
            </Dialog.Footer>
          </form.Form>
        </Dialog.Content>
      </Dialog.Root>
    </Stack>
  )
}

export const FocusFirstInput = () => {
  const { open, onOpen, onClose, setOpen } = useDisclosure()
  const initialRef = React.useRef<HTMLInputElement>(null)

  const form = useForm({
    schema: postSchema,
    defaultValues: {
      title: '',
      description: '',
    },
    onSubmit: createOnSubmit(onClose),
  })

  return (
    <Stack alignItems="center">
      <Button onClick={onOpen}>Open form dialog</Button>

      <Dialog.Root
        open={open}
        onOpenChange={({ open }) => {
          setOpen(open)
        }}
      >
        <Dialog.Content>
          <form.Form>
            <Dialog.Header>
              <Dialog.Title>New post</Dialog.Title>
              <Dialog.CloseButton />
            </Dialog.Header>
            <Dialog.Body>
              <FormLayout>
                <form.Field
                  name="title"
                  label="Title"
                  ref={initialRef}
                />
                <form.Field
                  name="description"
                  type="textarea"
                  label="Description"
                />
              </FormLayout>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <SubmitButton />
            </Dialog.Footer>
          </form.Form>
        </Dialog.Content>
      </Dialog.Root>
    </Stack>
  )
}

export const CustomFooter = () => {
  const { open, onOpen, onClose, setOpen } = useDisclosure()
  const initialRef = React.useRef<HTMLInputElement>(null)

  const form = useForm({
    schema: postSchema,
    defaultValues: {
      title: 'test',
      description: '',
    },
    onSubmit: createOnSubmit(onClose),
  })

  return (
    <Stack alignItems="center">
      <Button onClick={onOpen}>Open form dialog</Button>

      <Dialog.Root
        open={open}
        onOpenChange={({ open }) => {
          setOpen(open)
        }}
      >
        <Dialog.Content>
          <form.Form>
            <Dialog.Header>
              <Dialog.Title>New post</Dialog.Title>
              <Dialog.CloseButton />
            </Dialog.Header>
            <Dialog.Body>
              <FormLayout>
                <form.Field
                  name="title"
                  label="Title"
                  ref={initialRef}
                />
                <form.Field
                  name="description"
                  type="textarea"
                  label="Description"
                />
              </FormLayout>
            </Dialog.Body>
            <Dialog.Footer>
              <SubmitButton>Save post</SubmitButton>
            </Dialog.Footer>
          </form.Form>
        </Dialog.Content>
      </Dialog.Root>
    </Stack>
  )
}

export const ZodSchema = () => {
  const { open, onOpen, onClose, setOpen } = useDisclosure()
  const initialRef = React.useRef<HTMLInputElement>(null)

  const form = useForm({
    schema: titleSchema,
    defaultValues: {
      title: '',
    },
    onSubmit: createOnSubmit(onClose),
  })

  return (
    <Stack alignItems="center">
      <Button onClick={onOpen}>Open form dialog</Button>

      <Dialog.Root
        open={open}
        onOpenChange={({ open }) => {
          setOpen(open)
        }}
      >
        <Dialog.Content>
          <form.Form>
            <Dialog.Header>
              <Dialog.Title>New post</Dialog.Title>
              <Dialog.CloseButton />
            </Dialog.Header>
            <Dialog.Body>
              <FormLayout>
                <form.Field
                  name="title"
                  label="Title"
                  variant="flushed"
                  ref={initialRef}
                />
              </FormLayout>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                colorPalette="red"
                variant="solid"
                onClick={onClose}
              >
                Delete
              </Button>
              <SubmitButton />
            </Dialog.Footer>
          </form.Form>
        </Dialog.Content>
      </Dialog.Root>
    </Stack>
  )
}

export const ZodSchemaWithFields = () => {
  const { open, onOpen, onClose, setOpen } = useDisclosure()
  const initialRef = React.useRef<HTMLInputElement>(null)

  const form = useForm({
    schema: titleSchema,
    defaultValues: {
      title: '',
    },
    onSubmit: createOnSubmit(onClose),
  })

  return (
    <Stack alignItems="center">
      <Button onClick={onOpen}>Open form dialog</Button>

      <Dialog.Root
        open={open}
        onOpenChange={({ open }) => {
          setOpen(open)
        }}
      >
        <Dialog.Content>
          <form.Form>
            <Dialog.Header>
              <Dialog.Title>New post</Dialog.Title>
              <Dialog.CloseButton />
            </Dialog.Header>
            <Dialog.Body>
              <FormLayout>
                <form.Field
                  name="title"
                  label="Title"
                  ref={initialRef}
                />
              </FormLayout>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <SubmitButton />
            </Dialog.Footer>
          </form.Form>
        </Dialog.Content>
      </Dialog.Root>
    </Stack>
  )
}
