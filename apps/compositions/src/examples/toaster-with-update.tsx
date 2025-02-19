'use client'

import { Button, HStack } from '@chakra-ui/react'
import { toast } from '@saas-ui/react'

export const ToasterWithUpdate = () => {
  const id = 'login-error-toast'

  const show = () => {
    if (toast.isVisible(id)) return
    toast.loading({
      id,
      title: 'Error Connecting...',
      description: 'You do not have permissions to perform this action.',
    })
  }

  const update = () => {
    toast.update(id, {
      title: 'Hooray 🥳🥳🥳!!!',
      description: 'You now have permissions to perform this action.',
      type: 'success',
      duration: 3000,
    })
  }

  return (
    <HStack>
      <Button variant="outline" size="sm" onClick={show}>
        Show Toast
      </Button>
      <Button variant="outline" size="sm" onClick={update}>
        Update Toast
      </Button>
    </HStack>
  )
}
