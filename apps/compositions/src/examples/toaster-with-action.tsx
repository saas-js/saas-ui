'use client'

import { Button } from '@chakra-ui/react'
import { toast } from '@saas-ui/react'

export const ToasterWithAction = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast.success({
          title: 'Update successful',
          description: 'File saved successfully to the server',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        })
      }
    >
      Click me
    </Button>
  )
}
