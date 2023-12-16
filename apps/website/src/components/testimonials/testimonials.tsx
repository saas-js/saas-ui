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
            name="Ahmed"
            description={
              <>
                Founder -{' '}
                <a href="https://localxpose.io/" target="_blank">
                  LocalXpose
                </a>
              </>
            }
            fontSize="md"
          >
            “I really recommend SaaSUI to any developer or team seeking a
            robust, visually appealing, and easy-to-implement UI framework. The
            support and updates from the SaaSUI team were exceptional, Thank
            you. ”
          </Testimonial>
          <Testimonial
            name="Makenna Smutz"
            description="Founder - Heron"
            avatar="https://pbs.twimg.com/profile_images/1672077486082101251/oYuIjezD_normal.jpg"
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
          <Testimonial
            name="Juyoung"
            description="Frontend developer"
            fontSize="md"
          >
            “Thanks to SaaS UI, frontend web development has become much faster,
            allowing me to focus more on business logic, which is fantastic. I
            have a feeling that it will significantly grow in the coming years.
            Thank you.”
          </Testimonial>
        </Stack>

        <Stack spacing="8">
          <Testimonial
            name="Kai Pradel"
            description={
              <>
                Founder - <a href="https://inkubator.dev">Inkubator</a>
              </>
            }
            avatar="https://senjaio.b-cdn.net/public/avatar/48bd839c-bbab-4290-ae39-a3731486d63e_IMG_6039%20%281%29.jpg?width=102&height=102&format=webp"
            fontSize="md"
          >
            “At Inkubator we build Saas companies and SaasUI is our go-to UI kit
            at the beginning of every project. Not only are the components
            beautiful and intuitive but the community is also highly engaged and
            supportive.”
          </Testimonial>
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
