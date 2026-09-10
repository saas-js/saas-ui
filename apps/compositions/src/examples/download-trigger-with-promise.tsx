'use client'

import { Button, DownloadTrigger } from '@chakra-ui/react'
import { LuDownload } from 'react-icons/lu'

const getData = async () => {
  return JSON.stringify({ name: 'Saas UI', type: 'design-system' }, null, 2)
}

export const DownloadTriggerWithPromise = () => {
  return (
    <DownloadTrigger
      data={getData}
      fileName="data.json"
      mimeType="application/json"
      asChild
    >
      <Button variant="outline">
        <LuDownload /> Download json
      </Button>
    </DownloadTrigger>
  )
}
