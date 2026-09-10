import { QrCode } from '@chakra-ui/react'

export const QrCodeBasic = () => {
  return (
    <QrCode.Root value="https://saas-ui.dev">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  )
}
