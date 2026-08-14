import { FooterSection } from '@/components/site/footer.section'
import { HeaderSection } from '@/components/site/header.section'
import { Box } from '@chakra-ui/react'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box>
      <HeaderSection />
      {children}
      <FooterSection />
    </Box>
  )
}
