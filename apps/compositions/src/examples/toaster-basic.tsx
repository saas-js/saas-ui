'use client'

import { Button, toast } from '@saas-ui/react'

export const ToasterBasic = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast.create({
          description: 'File saved successfully',
          type: 'info',
        })
      }
    >
      Show Toast
    </Button>
  )
}
