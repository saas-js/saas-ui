import * as React from 'react'

import { Button, Container, Stack } from '@chakra-ui/react'
import { createModals } from '@saas-ui/modals-provider'

import { ModalsProvider, useModals } from '../src/index.ts'
import { Modal, ModalProps } from '../src/modal.tsx'

interface CustomModalProps extends Omit<ModalProps, 'children'> {
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

const custom = createModals({
  modals: {
    custom: CustomModal,
  },
})

export default {
  title: 'Modals/Modals Manager',
  parameters: {
    layout: 'fullscreen',
  },
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
            children: <>My modal</>,
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
            children: <>My modal</>,
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
            children: 'Your import has finish and can now be used.',
          })
        }
      >
        Open alert dialog
      </Button>
      <Button
        onClick={() =>
          modals.confirm({
            title: 'Delete user?',
            children: 'Are you sure you want to delete this user?',
            slotProps: {
              confirm: {
                colorPalette: 'red',
                children: 'Delete',
              },
            },
          })
        }
      >
        Open confirm dialog
      </Button>
      <Button
        onClick={() =>
          modals.open({
            type: 'drawer',
            title: 'My drawer',
            body: (
              <Stack>
                <Button
                  onClick={() =>
                    modals.confirm({
                      title: 'Delete user?',
                      body: 'Are you sure you want to delete this user?',
                      slotProps: {
                        confirm: {
                          colorPalette: 'red',
                          children: 'Delete',
                        },
                      },
                    })
                  }
                >
                  Open confirm dialog
                </Button>
                <Button
                  onClick={() =>
                    modals.open({
                      type: 'drawer',
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
          modals.open({
            type: 'drawer',
            title: 'My drawer',
            body: 'My drawer',
            placement: 'start',
          })
        }
      >
        Open left drawer
      </Button>
    </Stack>
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
          translations: {
            confirm: 'Delete',
          },
          slotProps: {
            confirm: {
              colorPalette: 'red',
            },
          },
          onConfirm: () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(void 0)
              }, 2000)
            }),
        })
      }
    >
      Open modal
    </Button>
  )
}
