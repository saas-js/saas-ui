import * as React from 'react'

import { Button, Container, Stack } from '@chakra-ui/react'

import { createModals } from '../src'
import { BaseModalProps, Modal } from '../src/modal'

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
  },
})

export default {
  title: 'Modals/Modals Manager',
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
            placement: 'end',
          })
        }
      >
        Open left drawer
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
