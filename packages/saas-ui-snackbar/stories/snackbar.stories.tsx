import { Container, Button, VStack } from '@chakra-ui/react'
import * as React from 'react'

import { useSnackbar } from '../'

export default {
  title: 'Components/Feedback/Snackbar',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => {
  const snackbar = useSnackbar()

  return (
    <VStack>
      <Button onClick={() => snackbar.info('Info')}>Show info</Button>
      <Button onClick={() => snackbar.success('Success!')}>Show success</Button>
      <Button onClick={() => snackbar.error('Error!')}>Show error</Button>
    </VStack>
  )
}

export const WithDescription = () => {
  const snackbar = useSnackbar()

  return (
    <VStack>
      <Button
        onClick={() =>
          snackbar.info({
            title: 'Info',
            description: 'Info snackbar',
          })
        }
      >
        Show info
      </Button>
      <Button
        onClick={() =>
          snackbar.success({
            title: 'Success!',
            description: 'Success snackbar',
          })
        }
      >
        Show success
      </Button>
      <Button
        onClick={() =>
          snackbar.error({
            title: 'Error!',
            description: 'Error snackbar',
          })
        }
      >
        Show error
      </Button>
    </VStack>
  )
}

export const WithCloseButton = () => {
  const snackbar = useSnackbar()

  return (
    <Button
      onClick={() =>
        snackbar.info({
          title: 'Account created',
          description: 'Your account has been created.',
          isClosable: true,
        })
      }
    >
      Show snackbar
    </Button>
  )
}

export const WithAction = () => {
  const snackbar = useSnackbar()

  return (
    <Button
      onClick={() =>
        snackbar.success({
          title: 'Email sent',
          description: 'Your email has been sent.',
          action: <Button>Undo</Button>,
        })
      }
    >
      Show snackbar
    </Button>
  )
}

export const WithPromise = () => {
  const snackbar = useSnackbar()

  return (
    <VStack>
      <Button
        onClick={() =>
          snackbar.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
              loading: 'Creating your account...',
              success: 'Your account has been created.',
              error: "Your account couldn't be created.",
            }
          )
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          snackbar
            .promise(
              new Promise((resolve, reject) =>
                setTimeout(() => reject(new Error('403 Error')), 2000)
              ),
              {
                loading: 'Creating your account...',
                success: 'Your account has been created.',
                error: "Your account couldn't be created.",
              }
            )
            .catch((e) => {
              console.error(e)
            })
        }
      >
        Error
      </Button>
    </VStack>
  )
}
