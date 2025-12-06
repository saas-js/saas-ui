import { FooterSection } from '@/components/saas-js/footer.section'
import { HeaderSection } from '@/components/saas-js/header.section'
import { Container, SkipNavContent, SkipNavLink } from '@chakra-ui/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <HeaderSection />
      <main>
        <Container display="flex">
          <SkipNavContent />
          {children}
        </Container>
      </main>
      <FooterSection />
    </>
  )
}
