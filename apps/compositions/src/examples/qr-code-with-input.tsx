'use client'

import { useState } from 'react'

import { Input, QrCode, Stack } from '@chakra-ui/react'

export const QrCodeWithInput = () => {
  const [value, setValue] = useState('https://saas-ui.dev')
  return (
    <Stack maxW="240px" gap="4">
      <QrCode.Root value={value}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Stack>
  )
}
