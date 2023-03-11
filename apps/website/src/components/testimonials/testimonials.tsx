import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'
import { SimpleGrid, Stack } from '@chakra-ui/react'

import { Testimonial } from './testimonial'

export const Testimonials = () => {
  return (
    <Section innerWidth="container.xl">
      <SectionTitle title="Loved by developers and designers" />
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="8">
        <Stack spacing="8">
          <Testimonial
            name="Makenna Smutz"
            description="Founder - Heron"
            avatar="https://pbs.twimg.com/profile_images/1580198717109551104/tPsHzf7X_normal.jpg"
            fontSize="md"
            href="https://twitter.com/KenzSmutz/status/1531625230011088898"
          >
            “Amazingly well thought-out set of components. I snagged them and
            have been able to create beautiful and functional UI super quick!
            This filter UI is some of my favorite 🤤”
          </Testimonial>
          <Testimonial
            name="João Tosto"
            description="Founder - Startec"
            avatar="https://avatars.githubusercontent.com/u/48574634?v=4"
            fontSize="md"
            href="https://startecjobs.com/"
          >
            “Saas UI is one of the most exciting dev tools I&apos;ve tried so
            far. The pre-built components allow me and my team to develop our
            products much more easily and faster than traditional ways. If you
            are a single developer, a startup trying to launch a new product or
            even a scaling-up company, I strongly recommend Saas UI.”
          </Testimonial>
        </Stack>
        <Stack spacing="8">
          <Testimonial
            name="Milan van Schaik"
            description="CTO - CultureKit"
            avatar="https://pbs.twimg.com/profile_images/1608930465422970881/a8C9V6Tx_400x400.jpg"
            fontSize="md"
          >
            “In order to be able to build beautiful portals in an efficient way,
            we were we looking for a turnkey solution, with enough flexibility.
            SaaS UI is exactly what we were looking for. Eelco is very
            thoughtful. We had factored in that early adopting comes with some
            risk - but so far all any issues are quickly remedied and there are
            almost weekly new useful features for us!”
          </Testimonial>
          <Testimonial
            name="Felipe Barcelos"
            description="CTO - NotifyLog"
            avatar="https://pbs.twimg.com/profile_images/1547957562120609796/9IhP_Vug_400x400.jpg"
            href="https://notifylog.com/"
            fontSize="md"
          >
            “The SaaS UI was key to building my SaaS platform on NextJS. It
            allowed me to create my platform&apos;s UI quickly and easily, with
            many pre-made components that saved me a lot of development time.
            Also, the SaaS UI is very flexible and can be easily customized to
            suit my specific needs.”
          </Testimonial>
        </Stack>

        <Stack spacing="8">
          <Testimonial
            name="@moshyfawn"
            description="Software Engineer - React Hook Form"
            avatar="https://pbs.twimg.com/profile_images/1518679972281466888/6iy5ls8Q_normal.png"
            fontSize="md"
            href="https://twitter.com/moshyfawn/status/1542477407675883520"
          >
            “Imagine a well thought out SaaS UI with super cool integrations
            like @HookForm @chakra_ui and @date_fns that power the whole thing!
            Like WAT?!”
          </Testimonial>
          <Testimonial
            name="@simonweniger"
            description="Software Engineer - Mintgate"
            avatar="https://avatars.githubusercontent.com/u/43147663?v=4"
            fontSize="md"
          >
            “SaasUI is really great and helps me to focus on the core part for
            the mvp instead of spending time on the framework. I really enjoyed
            the dev experience in the first days.”
          </Testimonial>
        </Stack>
      </SimpleGrid>
    </Section>
  )
}
