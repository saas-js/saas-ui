import { Section } from '#components/ui/section'
import { SimpleGrid } from '@chakra-ui/react'

import { Testimonial } from './testimonial'

export function Testimonials() {
  return (
    <Section.Root>
      <Section.Title
        as="h2"
        textStyle="4xl"
        lineHeight="1.2"
        textAlign="center"
        mb="12"
      >
        What developers value in the foundation
      </Section.Title>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <Testimonial
          name="Tien Thinh"
          description="Software Engineer"
          fontSize="md"
        >
          “Saas UI is the ONLY template out there that does the code structure
          that I think can scale 😄”
        </Testimonial>

        <Testimonial
          name="Michael Andreuzza"
          avatar="https://cdn.senja.io/public/avatar/5e93a8cc-0204-422a-a509-546cd0a634a6_actual.png?width=100"
          description="Founder, Lexington Themes"
          fontSize="md"
        >
          “I&apos;ve watched Saas UI grow over time, and you can really see the
          care that goes into it. Every update feels purposeful. It&apos;s the
          kind of product you instantly recognize as being built by someone who
          truly gets SaaS.”
        </Testimonial>

        <Testimonial
          name="Milan van Schaik"
          description="CTO, CultureKit"
          avatar="https://pbs.twimg.com/profile_images/1608930465422970881/a8C9V6Tx_400x400.jpg"
          fontSize="md"
        >
          “In order to be able to build beautiful portals in an efficient way,
          we were we looking for a turnkey solution, with enough flexibility.
          SaaS UI is exactly what we were looking for. Eelco is very thoughtful.
          We had factored in that early adopting comes with some risk - but so
          far all any issues are quickly remedied and there are almost weekly
          new useful features for us!”
        </Testimonial>
      </SimpleGrid>
    </Section.Root>
  )
}
