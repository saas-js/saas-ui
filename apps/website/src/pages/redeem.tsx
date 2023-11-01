import { Box } from '@chakra-ui/react'
import { Container, Text, VStack } from '@chakra-ui/react'

import { useRouter } from 'next/router'

import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import ScaleInView from '@/components/motion/scale-in-view'

import SEO from '@/components/seo'

import { RedeemForm } from '@/components/redeem-form'

const Redeem = () => {
  const router = useRouter()
  return (
    <Box>
      <SEO
        title="Redeem your license key"
        description="You can redeem your license key here."
        titleTemplate="%s - The frontend stack for SaaS companies"
      />

      <Box mb={8} w="full">
        <Box>
          <Container maxW="container.xl">
            <Section>
              <ScaleInView>
                <SectionTitle title="Redeem your license key"></SectionTitle>
              </ScaleInView>

              <ScaleInView>
                <VStack fontSize="lg" alignItems="center">
                  <Text textAlign="center" color="muted">
                    {router.query.sale_id
                      ? 'Thanks for your purchase! Activate your license below.'
                      : 'You can find your license key in the purchase confirmation e-mail.'}
                  </Text>

                  <Text textAlign="center" color="muted" mb="10">
                    After activating you will get access to our Github
                    repository and discord channel.
                  </Text>

                  <RedeemForm maxW="xl" />
                </VStack>
              </ScaleInView>
            </Section>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Redeem

export async function getStaticProps() {
  return {
    props: {
      header: {
        position: 'fixed',
        variant: 'dark',
      },
    },
  }
}
