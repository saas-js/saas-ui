import { FooterSection } from '@/components/site/footer.section'
import { HeaderSection } from '@/components/site/header.section'
import { Stack } from '@chakra-ui/react'

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
