import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'
import { SimpleGrid, Stack } from '@chakra-ui/react'

import { Testimonial } from './testimonial'

export const Testimonials = () => {
  return (
    <Section innerWidth="container.xl">
      <SectionTitle title="Loved by developers and designers" />
      <SimpleGrid columns={[1, 2, 3]} spacing="8">
        <Stack spacing="8">
          <Testimonial
            name="Makenna Smutz"
            description="Founder - Heron"
            avatar="https://pbs.twimg.com/profile_images/1484504135189909506/qYryiQ-S_normal.jpg"
            fontSize="md"
            href="https://twitter.com/KenzSmutz/status/1531625230011088898"
          >
            “Amazingly well thought-out set of components. I snagged them and
            have been able to create beautiful and functional UI super quick!
            This filter UI is some of my favorite 🤤”
          </Testimonial>
        </Stack>
        <Stack spacing="8">
          <Testimonial
            name="Milan van Schaik"
            description="CTO - CultureKit"
            avatar="https://pbs.twimg.com/profile_images/1485532765814669314/EGBzTkkg_normal.jpg"
            fontSize="md"
          >
            “In order to be able to build beautiful portals in an efficient way,
            we were we looking for a turnkey solution, with enough flexibility.
            SaaS UI is exactly what we were looking for. Eelco is very
            thoughtful. We had factored in that early adopting comes with some
            risk - but so far all any issues are quickly remedied and there are
            almost weekly new useful features for us!”
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
        </Stack>
      </SimpleGrid>
    </Section>
  )
}
