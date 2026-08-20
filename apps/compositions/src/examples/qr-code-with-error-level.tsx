'use client'

import { useState } from 'react'

import { QrCode, SegmentGroup, Stack } from '@chakra-ui/react'

type ErrorLevel = 'L' | 'M' | 'Q' | 'H'

export const QrCodeWithErrorLevel = () => {
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('L')
  return (
    <Stack align="flex-start">
      <QrCode.Root
        value="https://saas-ui.dev"
        size="xl"
        encoding={{ ecc: errorLevel }}
      >
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
      <SegmentGroup.Root
        size="sm"
        defaultValue="L"
        onValueChange={(e) => setErrorLevel(e.value as ErrorLevel)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={['L', 'M', 'Q', 'H']} />
      </SegmentGroup.Root>
    </Stack>
  )
}
