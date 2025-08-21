import { HeaderSection } from '@/components/pro/header.section'
import { FooterSection } from '@/components/site/footer.section'
import { Stack } from '@saas-ui/react'

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Stack gap="8" bg="bg.muted" _dark={{ bg: 'bg' }}>
      <HeaderSection />

      {props.children}

      <FooterSection />
    </Stack>
  )
}
