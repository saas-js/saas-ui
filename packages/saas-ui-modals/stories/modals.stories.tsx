import * as React from 'react'
import { Button, Stack, Container, MenuItem } from '@chakra-ui/react'

import { createModals } from '../src'
import { MenuDialogList } from '../src/menu'

import { FormLayout } from '@saas-ui/forms'
import { BaseModalProps, Modal } from '../src/modal'
import { FormDialog } from '../src/form'
import { createField } from '@saas-ui/forms'
import { createZodForm, createZodFormDialog } from '@saas-ui/forms/zod'

import * as z from 'zod'

const CustomField = createField((props: { customFieldProps: string }) => (
  <div>custom</div>
))

const ZodForm = createZodForm({
  fields: {
    custom: CustomField,
  },
})

const ZodFormDialog = createZodFormDialog(ZodForm)

interface CustomModalProps extends Omit<BaseModalProps, 'children'> {
  customProp: 'test'
  children?: React.ReactNode
}

const CustomModal: React.FC<CustomModalProps> = ({
  title = 'Custom modal',
  footer = 'Custom footer',
  children = 'Modal body',
  ...props
}) => (
  <Modal title={title} footer={footer} {...props}>
    {children}
  </Modal>
)

const { ModalsProvider: ModalsProvider, useModals } = createModals({
  modals: {
    custom: CustomModal,
    form: ZodFormDialog,
  },
})

export default {
  title: 'Components/Overlay/Modals Manager',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <ModalsProvider>
          <Story />
        </ModalsProvider>
      </Container>
    ),
  ],
}

export const Basic = () => {
  const modals = useModals()

  return (
    <Stack alignItems="center">
      <Button
        onClick={() => {
          const id = modals.open({
            title: 'My Modal',
            body: <>My modal</>,
            footer: <Button onClick={() => modals.close(id)}>Close</Button>,
          })
        }}
      >
        Open modal
      </Button>
      <Button
        onClick={() => {
          const id = modals.open({
            title: 'My Modal',
            body: <>My modal</>,
            size: 'xl',
            footer: <Button onClick={() => modals.close(id)}>Close</Button>,
          })
        }}
      >
        Open xl modal
      </Button>
      <Button
        onClick={() =>
          modals.alert({
            title: 'Import finished',
            body: 'Your import has finish and can now be used.',
          })
        }
      >
        Open alert dialog
      </Button>
      <Button
        onClick={() =>
          modals.confirm({
            title: 'Delete user?',
            body: 'Are you sure you want to delete this user?',
            confirmProps: {
              colorScheme: 'red',
              children: 'Delete',
            },
          })
        }
      >
        Open confirm dialog
      </Button>
      <Button
        onClick={() =>
          modals.drawer({
            title: 'My drawer',
            body: (
              <Stack>
                <Button
                  onClick={() =>
                    modals.confirm({
                      title: 'Delete user?',
                      body: 'Are you sure you want to delete this user?',
                      confirmProps: {
                        colorScheme: 'red',
                        children: 'Delete',
                      },
                    })
                  }
                >
                  Open confirm dialog
                </Button>
                <Button
                  onClick={() =>
                    modals.drawer({
                      title: 'Subdrawer',
                      body: (
                        <>
                          <Button onClick={() => modals.closeAll()}>
                            Close all
                          </Button>
                        </>
                      ),
                    })
                  }
                >
                  Open drawer
                </Button>
              </Stack>
            ),
          })
        }
      >
        Open drawer
      </Button>
      <Button
        onClick={() =>
          modals.drawer({
            title: 'My drawer',
            body: 'My drawer',
            placement: 'left',
          })
        }
      >
        Open left drawer
      </Button>
      <Button
        onClick={() =>
          modals.menu({
            title: 'Menu',
            body: (
              <MenuDialogList>
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 1</MenuItem>
              </MenuDialogList>
            ),
          })
        }
      >
        Open menu dialog
      </Button>
      <Button
        onClick={() => {
          modals.form({
            title: 'Form',
            schema: z.object({
              title: z.string(),
            }),
            defaultValues: {
              title: 'My title',
            },
            onError: (error) => console.log(error),
            onSubmit: ({ title }) => Promise.resolve(),
          })
        }}
      >
        Open form dialog
      </Button>
    </Stack>
  )
}

export const Custom = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() =>
        modals.open({
          title: 'My Modal',
          type: 'custom',
          children: 'My modal',
          customProp: 'test',
        })
      }
    >
      Open modal
    </Button>
  )
}

export const Form = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() => {
        const id = modals.form({
          title: 'My Modal',
          schema: z.object({
            title: z.string(),
          }),
          onError: (error) => console.error('error', error),
          onChange: (values) => console.log('change', values),
          children: ({ Field }) => (
            <FormLayout>
              <Field name="title" label="Title" />
            </FormLayout>
          ),
          defaultValues: {
            title: 'My title',
          },
          onSubmit: (data) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(null)
                modals.closeAll()
              }, 2000)
            }),
        })
      }}
    >
      Open modal
    </Button>
  )
}

export const CustomForm = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() =>
        modals.open(FormDialog, {
          title: 'My Modal',
          schema: z.object({
            title: z.string(),
          }),
          onError: (error) => console.error('error', error),
          onChange: (values) => console.log('change', values),
          children: ({ Field }) => (
            <FormLayout>
              <Field name="title" label="Title" />
            </FormLayout>
          ),
          defaultValues: {
            title: 'My title',
          },
          onSubmit: (data) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(null)
                modals.closeAll()
              }, 2000)
            }),
        })
      }
    >
      Open modal
    </Button>
  )
}

export const CustomAsComponent = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() =>
        modals.open(CustomModal, {
          customProp: 'test',
        })
      }
    >
      Open modal
    </Button>
  )
}

export const OnClose = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() =>
        modals.open({
          title: 'My Modal',
          body: <>My modal</>,
          onClose: () => {
            modals.confirm({
              title: 'You closed the modal',
            })
          },
        })
      }
    >
      Open modal
    </Button>
  )
}

export const Multiple = () => {
  const modals = useModals()

  const next = () => {
    const id = modals.open({
      title: 'Modal step 2',
      body: 'Step 2',
      footer: (
        <>
          <Button onClick={() => modals.close(id)} mr="3">
            Back
          </Button>
          <Button onClick={() => modals.closeAll()}>Done</Button>
        </>
      ),
    })
  }

  return (
    <Button
      onClick={() =>
        modals.open({
          title: 'Modal step 1',
          body: 'Step 1',
          footer: (
            <>
              <Button onClick={next}>Next</Button>
            </>
          ),
        })
      }
    >
      Open modal
    </Button>
  )
}

export const AsyncConfirmDialog = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() =>
        modals.confirm({
          title: 'Delete user',
          body: 'Are you sure you want to delete this user?',
          confirmProps: {
            children: 'Delete',
            colorScheme: 'red',
          },
          onConfirm: () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
              }, 2000)
            }),
        })
      }
    >
      Open modal
    </Button>
  )
}
