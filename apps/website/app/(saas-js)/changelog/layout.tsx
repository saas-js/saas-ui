import { FooterSection } from '@/components/saas-js/footer.section'
import { HeaderSection } from '@/components/saas-js/header.section'
import { Stack } from '@saas-ui/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Stack pos="relative" gap="8" overflow="hidden">
      <HeaderSection />
      {children}
      <FooterSection />
    </Stack>
  )
}
