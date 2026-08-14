import { Button, Container, Stack } from '@chakra-ui/react'
import type { Meta } from '@storybook/react-vite'

import { ModalsProvider, useModals } from './index.ts'

export default {
  title: 'Components/Modals',
  decorators: [
    (Story) => (
      <ModalsProvider>
        <Container py="10">
          <Story />
        </Container>
      </ModalsProvider>
    ),
  ],
} satisfies Meta

export const Basic = {
  render: () => {
    const modals = useModals()

    return (
      <Stack align="start">
        <Button
          onClick={() =>
            modals.open({
              title: 'Project details',
              body: 'Your modal content goes here.',
            })
          }
        >
          Open modal
        </Button>
        <Button
          onClick={() =>
            modals.open({
              type: 'drawer',
              title: 'Project details',
              body: 'Your drawer content goes here.',
            })
          }
        >
          Open drawer
        </Button>
        <Button
          colorPalette="red"
          onClick={() =>
            modals.confirm({
              title: 'Delete project?',
              body: 'This action cannot be undone.',
              slotProps: {
                confirm: { colorPalette: 'red', children: 'Delete' },
              },
            })
          }
        >
          Open confirmation
        </Button>
      </Stack>
    )
  },
}
