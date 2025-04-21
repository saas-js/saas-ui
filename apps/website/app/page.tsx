import { CustomersSection } from '@/components/site/customers.section'
import { DemoSection } from '@/components/site/demo.section'
import { FooterSection } from '@/components/site/footer.section'
import { HeaderSection } from '@/components/site/header.section'
import { HeroSection } from '@/components/site/hero.section'
import { Stack } from '@chakra-ui/react'

export default function Page() {
  return (
    <Stack gap="8" bg="bg.muted">
      <HeaderSection />
      <HeroSection />
      <DemoSection />
      <CustomersSection />
      <FooterSection />
    </Stack>
  )
}
