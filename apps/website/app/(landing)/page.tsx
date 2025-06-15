import { CustomersSection } from '@/components/site/customers.section'
import { DemoSection } from '@/components/site/demo.section'
import { FounderSection } from '@/components/site/founder.section'
import { GetStartedSection } from '@/components/site/get-started.section'
import { HeroSection } from '@/components/site/hero.section'
import { ProductsSection } from '@/components/site/products.section'
import { TestimonialsSection } from '@/components/site/testimonials.section'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <CustomersSection />
      <ProductsSection />
      <FounderSection />
      <TestimonialsSection />
      <GetStartedSection>
        <Button variant="glass" colorPalette="accent" asChild>
          <Link href="/components">Browse components</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/pro/starter-kits">View starter kits</Link>
        </Button>
      </GetStartedSection>
    </>
  )
}
