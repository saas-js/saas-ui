import { chakra, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import SectionTitle from '../marketing/section-title'
import Section from '../marketing/section-wrapper'

export const Faq = () => {
  return (
    <Section id="faq">
      <SectionTitle title="Frequently asked questions" />

      <SimpleGrid columns={[1, null, 2]} spacing={10}>
        <FaqItem
          question="How many products can I use Saas UI Pro for?"
          answer={
            <>
              The single license can be used for one commercial application or
              SaaS product and unlimited internal tools. You can buy as many
              licenses as you need. <br /> The unlimited license does not have
              any restrictions.
            </>
          }
        />
        <FaqItem
          question="Can I use Saas UI Pro for client work?"
          answer="Yes, that's totally up to you, as long as it fits the license you purchase."
        />
        <FaqItem
          question="Can I use Saas UI Pro for Open Source projects?"
          answer="No currently not. A large part of Saas UI is already released under MIT license. We try to give back to the community as much as possible."
        />
        <FaqItem
          question="Does Saas UI include Figma, Sketch or other design files?"
          answer="No, Saas UI does not include any design assets. Maintaining design resources costs a lot of extra effort. We believe small teams can move much faster by designing directly in code, with help of Storybooks."
        />
        <FaqItem
          question="Does Saas UI have a Javascript version?"
          answer="No, we believe Typescript is the way to go in order to produce highly productive and qualitative code that scales."
        />
        <FaqItem
          question="What does 'lifetime access' mean?"
          answer="Saas UI Pro is a one-time purchase, with no recurring subscription. You will have access to all assets of the Saas UI library forever."
        />
        <FaqItem
          question="What does '1 year of updates' include?"
          answer={
            <>
              We&apos;ll add new components and improvements to the library as
              we get new ideas and feedback, you will receive these updates
              during the first year. After that you can renew your license for a
              reduced fee.
              <br />
              <br />
              We might release different stacks, for example for Vue and
              backends, these will be sold seperately.
            </>
          }
        />
        <FaqItem
          question="I'm not satisfied, can I get my money back?"
          answer="Yeah, no hard feelings. Saas UI is opinionated and might not suit your style, let us know within 14 days of your purchase and we'll refund your money."
        />
        <FaqItem
          question="Do you offer technical support?"
          answer={
            <>
              Once you sign up you get access to our Discord community, where
              you can ask questions, report bugs or feature requests and get
              help from other customers. <br />
              <br />
              If you require more specialised support or consultancy contact us
              at <Link href="mailto:hello@saas-ui.dev">hello@saas-ui.dev</Link>
            </>
          }
        />
      </SimpleGrid>
    </Section>
  )
}

const FaqItem = ({ question, answer }: any) => {
  return (
    <chakra.dl>
      <chakra.dt fontWeight="semibold">{question}</chakra.dt>
      <chakra.dd color={useColorModeValue('gray.500', 'gray.400')}>
        {answer}
      </chakra.dd>
    </chakra.dl>
  )
}
