import { Section } from '#components/ui/section'
import { SimpleGrid, Stack } from '@chakra-ui/react'

import { Testimonial } from './testimonial'

export const Testimonials = () => {
  return (
    <Section.Root>
      <Section.Title
        as="h3"
        textStyle="4xl"
        lineHeight="1.2"
        textAlign="center"
        mb="16"
      >
        Loved by developers and designers
      </Section.Title>
      <SimpleGrid columns={[1, 1, 2, 3]} gap="8">
        <Stack gap="8">
          <Testimonial
            name="Simon Høiberg"
            avatar="https://senjaio.b-cdn.net/public/avatar/33d3d3ac-530d-4a2a-a2a9-93621e00bb1d_1698499800957.jpg?width=40"
            description={
              <>
                Founder -{' '}
                <a href="https://aidbase.ai/" target="_blank">
                  Aidbase
                </a>
              </>
            }
            fontSize="md"
          >
            “At Aidbase, we&apos;re developing a framework-agnostic component
            library to support our various chatbots, ticket forms, and other
            widgets. It&apos;s challenging building something that&apos;s a
            great developer experience and performing well at the same time.
            SaaS UI has been a massive help in this.”
          </Testimonial>

          <Testimonial
            name="Muhammad Saad Naeem"
            avatar="https://cdn.senja.io/public/avatar/b2347c74-be08-4548-b74e-8a9a852b9226_dpmain.jpeg?width=40"
            description={
              <>
                <a href="https://sovanza.com/" target="_blank">
                  Sovanza
                </a>
              </>
            }
            fontSize="md"
          >
            “What I love most about Saas UI is the fantastic customer support
            and seamless integration. Their support team is responsive and
            genuinely helpful, always ready to assist whenever I needed guidance
            or ran into any issues. This level of support made a huge
            difference, giving me confidence and peace of mind as I worked
            through my project. The component library is not only extensive but
            also incredibly intuitive, which allowed me to focus on creating
            great features rather than worrying about UI complexities. Saas UI
            helped me launch my project faster than I expected without
            sacrificing quality or design. If you're looking to elevate your
            project’s UI with the backing of an amazing support team, I highly
            recommend Saas UI!”
          </Testimonial>

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
            avatar="https://pbs.twimg.com/profile_images/1811466062195576832/i3ZWxctd_400x400.jpg"
            fontSize="md"
            href="https://twitter.com/KenzSmutz/status/1531625230011088898"
          >
            “Amazingly well thought-out set of components. I snagged them and
            have been able to create beautiful and functional UI super quick!
            This filter UI is some of my favorite 🤤”
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
        </Stack>
        <Stack gap="8">
          <Testimonial
            name="Michael Andreuzza"
            avatar="https://cdn.senja.io/public/avatar/5e93a8cc-0204-422a-a509-546cd0a634a6_actual.png?width=100"
            description={
              <>
                Founder -{' '}
                <a href="https://lexingtonthemes.com" target="_blank">
                  Lexington Themes
                </a>
              </>
            }
            fontSize="md"
          >
            “I&apos;ve watched Saas UI grow over time, and you can really see
            the care that goes into it. Every update feels purposeful. It&apos;s
            the kind of product you instantly recognize as being built by
            someone who truly gets SaaS.”
          </Testimonial>

          <Testimonial
            name="Ilia Kulikov "
            description="Founder"
            avatar="https://cdn.senja.io/public/avatar/26a287f8-03bb-41fd-80bb-e802a75ee1c8_1000023914.jpg?width=40"
            fontSize="md"
          >
            “Working with Saas UI and Eelco is amazing: straightforward process,
            friendly and professional, at an affordable pricing. Delivery time
            is excellent. Highly recommend SaaS UI and Eelco as a professional
            developer and one of the best boilerplates out there. ”
          </Testimonial>

          <Testimonial
            name="Tien Thinh"
            description="Software Engineer"
            avatar="/testimonials/turbothinh.png"
            fontSize="md"
          >
            “Saas UI is the ONLY template out there that does the code structure
            that I think can scale 😄”
          </Testimonial>
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
            avatar="https://pbs.twimg.com/profile_images/1745449170293702657/3lqSo1oy_400x400.png"
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

        <Stack gap="8">
          <Testimonial
            name="JuanPablo B."
            description="UX Designer & Front-end Developer"
            avatar="https://cdn.senja.io/public/avatar/660ebe99-0c37-4fc3-8396-fd24dcf7afd1_Avatar%20512x512.jpg?width=40"
            fontSize="md"
          >
            “What SaaS UI exceeds at, is that it is not a project fully based on
            commercial purposes but real passion for user interfaces. You can
            tell that from the get go. Nowadays it is really hard to find
            projects that are pixel-perfect oriented and crafted with so much
            care and attention to detail. Most projects are run by code
            developers and not so much from skilled designers.”
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
            name="@simonweniger"
            description="Software Engineer - Mintgate"
            avatar="https://avatars.githubusercontent.com/u/43147663?v=4"
            fontSize="md"
          >
            “SaasUI is really great and helps me to focus on the core part for
            the mvp instead of spending time on the framework. I really enjoyed
            the dev experience in the first days.”
          </Testimonial>
          <Testimonial
            name="Jacob Leuthardt"
            description="Founder - Frantic Software"
            avatar="https://senjaio.b-cdn.net/public/avatar/d0ae3c9a-6c33-4d34-9c55-b73b202d1eff_PXL_20240103_031225981.PORTRAIT.jpg?width=200"
            fontSize="md"
            href="https://www.frantic-software.com/"
          >
            “SaaS UI has let my business hit the ground running. Good UI is the
            foundation of good software and SaaS UI is what makes good software.
            Before SaaS UI, my UI was hand written in plain HTML/CSS/JS. Now
            it&apos;s an eye-catching experience that turns heads.”
          </Testimonial>
        </Stack>
      </SimpleGrid>
    </Section.Root>
  )
}
