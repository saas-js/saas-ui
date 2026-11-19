import { FooterSection } from '@/components/site/footer.section'
import { HeaderSection } from '@/components/site/header.section'
import { Stack } from '@chakra-ui/react'

const SAAS_UI_URL = 'https://saas-ui.dev'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Stack pos="relative" gap="8" overflow="hidden">
      <HeaderSection pro saasUiUrl={SAAS_UI_URL} />
      {children}
      <FooterSection saasUiUrl={SAAS_UI_URL} />
    </Stack>
  )
}
