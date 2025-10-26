import React from 'react'

import { Button, HStack } from '@chakra-ui/react'

import { Toaster, toast } from './index.ts'

export default {
  title: 'Components/Toaster',
  decorators: [
    (Story) => (
      <>
        <Toaster overlap />
        <Story />
      </>
    ),
  ],
}

export const Default = () => {
  return (
    <HStack>
      <Button
        onClick={() => toast.create({ title: 'Changes saved successfully' })}
      >
        Default toast
      </Button>
      <Button
        onClick={() => toast.success({ title: 'Changes saved successfully' })}
      >
        Success toast
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: 'Something went wrong',
            description:
              'Please try again or contact support if the issue persists.',
          })
        }
      >
        Error toast
      </Button>
      <Button
        onClick={() =>
          toast.create({
            type: 'warning',
            title: 'Connection disrupted',
            description: 'Please check your internet connection.',
          })
        }
      >
        Warning toast
      </Button>
      <Button
        onClick={() =>
          toast.success({
            title: 'Task created',
            description: 'TSK-123456',
            action: { label: 'View task', onClick: () => alert('Clicked') },
          })
        }
      >
        Toast with action
      </Button>
      <Button
        onClick={() =>
          toast.promise(
            new Promise((resolve) => {
              setTimeout(() => resolve('Task created'), 1000)
            }),
            {
              loading: {
                title: 'Creating your account',
              },
              success: {
                title: 'Account created',
              },
              error: {
                title: 'Error',
              },
            },
          )
        }
      >
        Promise
      </Button>
    </HStack>
  )
}
