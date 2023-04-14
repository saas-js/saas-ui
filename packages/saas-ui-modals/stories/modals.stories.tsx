import * as React from 'react'
import { Button, Stack, Container, MenuItem } from '@chakra-ui/react'
// import { ModalsProvider, useModals } from '../src/provider'
import { createModals } from '../src'
import { MenuDialogList } from '../src/menu'

import { Field, FormLayout } from '@saas-ui/forms'
import { BaseModalProps, Modal } from '../src/modal'
import { FormDialog } from '../src/form'

interface CustomModalProps extends BaseModalProps {
  customProp: 'test'
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

const { ModalsProvider, useModals } = createModals({
  modals: {
    custom: CustomModal,
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
        onClick={() =>
          modals.form({
            title: 'Form',
            defaultvalues: {
              title: 'My title',
            },
            children: ({ Field }) => (
              <FormLayout>
                <Field name="title" label="Title" />
              </FormLayout>
            ),
            onSubmit: () => Promise.resolve(),
          })
        }
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
          customProp: 'test',
        })
      }
    >
      Open modal
    </Button>
  )
}

export const CustomFormDialog = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() =>
        modals.open(FormDialog, {
          title: 'My Modal',
          children: ({ Field }) => (
            <FormLayout>
              <Field name="title" label="Title" />
            </FormLayout>
          ),
          defaultValues: {
            title: 'My title',
          },
          onSubmit: () => Promise.resolve(),
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
