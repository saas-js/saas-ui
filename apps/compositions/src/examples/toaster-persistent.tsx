'use client'

import { Button } from '@saas-ui/react'
import { toast } from '@saas-ui/react'

export const ToasterPersistent = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast.create({
          description: 'File saved successfully',
          type: 'loading',
        })
      }
    >
      Show Toast
    </Button>
  )
}
