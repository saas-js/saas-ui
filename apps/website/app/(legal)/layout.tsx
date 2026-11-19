import { FooterSection } from '@/components/site/footer.section'
import { HeaderSection } from '@/components/site/header.section'
import { Box } from '@chakra-ui/react'
import { headers } from 'next/headers'

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Legal pages are served on both hosts (see proxy.ts shared routes). Keep
  // Saas UI links relative on saas-ui.dev, absolute on saas-js.com.
  const host = (await headers()).get('host') ?? ''
  const saasUiUrl = host.includes('saas-js') ? 'https://saas-ui.dev' : ''

  return (
    <Box>
      <HeaderSection saasUiUrl={saasUiUrl} />
      {children}
      <FooterSection saasUiUrl={saasUiUrl} />
    </Box>
  )
}
