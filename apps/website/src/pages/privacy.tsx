import { Box, Heading, VStack } from '@chakra-ui/layout'

import Section from '@/components/marketing/section-wrapper'

const PrivacyPolicy = () => {
  return (
    <Box py={20}>
      <Heading textAlign="center">Privacy Policy</Heading>

      <Section innerWidth="xl">
        <VStack alignItems="start" spacing="4">
          <p>
            Saas UI is part of the Appulse Holding B.V. This privacy policy will
            explain how our organization uses the personal data we collect from
            you when you use our website.
          </p>
          <p>Topics:</p>
          <ul>
            <li>What data do we collect?</li>
            <li>How do we collect your data?</li>
            <li>How will we use your data?</li>
            <li>How do we store your data?</li>
            <li>Marketing</li>
            <li>What are your data protection rights?</li>
            <li>What are cookies?</li>
            <li>How do we use cookies?</li>
            <li>What types of cookies do we use?</li>
            <li>How to manage your cookies</li>
            <li>Privacy policies of other websites</li>
            <li>Changes to our privacy policy</li>
            <li>How to contact us</li>
            <li>How to contact the appropriate authorities</li>
          </ul>
          <h3>What data do we collect?</h3>
          <p>Appulse Holding B.V. collects the following data:</p>
          <ul>
            <li>
              Personal identification information (Name, email address, phone
              number, etc.)
            </li>
          </ul>
          <h3>How do we collect your data?</h3>
          <p>
            You directly provide Appulse Holding B.V. with most of the data we
            collect. We collect data and process data when you:
          </p>
          <ul>
            <li>
              Register online or place an order for any of our products or
              services.
            </li>
            <li>
              Voluntarily complete a customer survey or provide feedback on any
              of our websites or via email.
            </li>
            <li>Use or view our website via your browser’s cookies.</li>
          </ul>
          <p>
            Appulse Holding B.V. may also receive your data indirectly from the
            following sources:
          </p>
          <ul>
            <li>Gumroad.com</li>
          </ul>
          <h3>How will we use your data?</h3>
          <p>Appulse Holding B.V. collects your data so that we can:</p>
          <ul>
            <li>Process your order and manage your account.</li>
            <li>
              Email you with special offers on other products and services we
              think you might like.
            </li>
          </ul>
          <p>
            When Appulse Holding B.V. processes your order, it may send your
            data to, and also use the resulting information from, credit
            reference agencies to prevent fraudulent purchases.
          </p>
          <h3>How do we store your data?</h3>
          <p>
            Appulse Holding B.V. securely stores your data at our infrastructure
            partner Supabase.
          </p>
          <p>
            Appulse Holding B.V. will keep your contact information as long as
            your are an active customer. Once you terminate your account, we
            will delete your data.
          </p>
          <h3>What are your data protection rights?</h3>
          <p>
            Appulse Holding B.V. would like to make sure you are fully aware of
            all of your data protection rights. Every user is entitled to the
            following:
          </p>
          <p>
            <strong>The right to access</strong> – You have the right to request
            Appulse Holding B.V. for copies of your personal data. We may charge
            you a small fee for this service.
          </p>
          <p>
            <strong>The right to rectification</strong> – You have the right to
            request that Appulse Holding B.V. correct any information you
            believe is inaccurate. You also have the right to request Appulse
            Holding B.V. to complete the information you believe is incomplete.
          </p>
          <p>
            <strong>The right to erasure</strong> – You have the right to
            request that Appulse Holding B.V. erase your personal data, under
            certain conditions.
          </p>
          <p>
            <strong>The right to restrict processing</strong> – You have the
            right to request that Appulse Holding B.V. restrict the processing
            of your personal data, under certain conditions.
          </p>
          <p>
            <strong>The right to object to processing</strong> – You have the
            right to object to Appulse Holding B.V.’s processing of your
            personal data, under certain conditions.
          </p>
          <p>
            <strong>The right to data portability</strong> – You have the right
            to request that Appulse Holding B.V. transfer the data that we have
            collected to another organization, or directly to you, under certain
            conditions.
          </p>
          <h3>Cookies</h3>
          <p>
            Cookies are text files placed on your computer to collect standard
            Internet log information and visitor behavior information. When you
            visit our websites, we may collect information from you
            automatically through cookies or similar technology
          </p>
          <p>For further information, visit allaboutcookies.org.</p>
          <h3>How do we use cookies?</h3>
          <p>
            Appulse Holding B.V. uses cookies in a range of ways to improve your
            experience on our website, including:
          </p>
          <ul>
            <li>Keeping you signed in</li>
            <li>Understanding how you use our website</li>
          </ul>
          <h3>What types of cookies do we use?</h3>
          <p>
            There are a number of different types of cookies, however, our
            website uses:
          </p>
          <ul>
            <li>
              Functionality – Appulse Holding B.V. uses these cookies so that we
              recognize you on our website and remember your previously selected
              preferences. These could include what language you prefer and
              location you are in. A mix of first-party and third-party cookies
              are used.
            </li>
          </ul>
          <h3>How to manage cookies</h3>
          <p>
            You can set your browser not to accept cookies, and the above
            website tells you how to remove cookies from your browser. However,
            in a few cases, some of our website features may not function as a
            result.
          </p>
          <h3>Privacy policies of other websites</h3>
          <p>
            The Appulse Holding B.V. website contains links to other websites.
            Our privacy policy applies only to our website, so if you click on a
            link to another website, you should read their privacy policy.
          </p>
          <h3>Changes to our privacy policy</h3>
          <p>
            Appulse Holding B.V. keeps its privacy policy under regular review
            and places any updates on this web page. This privacy policy was
            last updated on 13 December 2021.
          </p>
          <h3>How to contact us</h3>
          <p>
            If you have any questions about Appulse Holding B.V.’s privacy
            policy, the data we hold on you, or you would like to exercise one
            of your data protection rights, please do not hesitate to contact
            us.
          </p>
          <p>Email us at: hello@saas-ui.dev</p>
        </VStack>
      </Section>
    </Box>
  )
}

export default PrivacyPolicy
