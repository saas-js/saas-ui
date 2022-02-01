import * as React from 'react'
import { Stack, Container } from '@chakra-ui/react'
import { ModalsProvider, useModals } from '../src/provider'

import { Button } from '@saas-ui/button'

const CustomModal: React.FC<{ title: string }> = ({ title, children }) => (
  <div>
    {title} - {children}
  </div>
)

const modals = {
  custom: CustomModal,
}

export default {
  title: 'Components/Overlay/Modals',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <ModalsProvider modals={modals}>
          <Story />
        </ModalsProvider>
      </Container>
    ),
  ],
}

export const basic = () => {
  const modals = useModals()

  return (
    <Stack>
      <Button
        onClick={() => {
          const id = modals.open({
            title: 'My Modal',
            body: <>My modal</>,
            footer: <Button onClick={() => modals.close(id)} label="Close" />,
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
              label: 'Delete',
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
                        label: 'Delete',
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
                          <Button
                            onClick={() => modals.closeAll()}
                            label="Close all"
                          >
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
    </Stack>
  )
}

export const custom = () => {
  const modals = useModals()

  return (
    <Button
      onClick={() =>
        modals.open({
          title: 'My Modal',
          body: <>My modal</>,
          type: 'custom',
        })
      }
    >
      Open modal
    </Button>
  )
}

export const onClose = () => {
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
