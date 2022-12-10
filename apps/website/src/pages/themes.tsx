import * as React from 'react'

import { Box } from '@chakra-ui/layout'
import { Stack, Flex } from '@chakra-ui/react'

import SEO from '@/components/seo'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import Section from '@/components/marketing/section-wrapper'
import Hero from '@/components/marketing/hero'
import { FallInPlace } from '@/components/motion/fall-in-place'

import { Br } from '@saas-ui/react'

const ThemesPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="Professionally crafted Chakra UI themes"
        titleTemplate="%s - Themes"
      />
      <BackgroundGradientRadial
        top="-1000px"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
      />
      <Box mb={8} w="full" position="relative" overflow="hidden" zIndex="1">
        <Section id="pricing" pos="relative" innerWidth="container.xl" pb="10">
          <Hero
            as={Stack}
            id="home"
            alignItems="center"
            textAlign="center"
            title={
              <FallInPlace textAlign="center" initialInView>
                Professionally crafted <Br /> Chakra UI themes
              </FallInPlace>
            }
            description={
              <FallInPlace
                delay={0.4}
                fontWeight="medium"
                textAlign="center"
                initialInView
              >
                Designed to be compatible with Chakra UI &amp; Saas UI projects.
              </FallInPlace>
            }
          />
        </Section>
        <Flex height="800px">
          <iframe
            height="100%"
            width="100%"
            src="https://storybook.saas-ui.dev/iframe.html?args=&globals=&id=themes-glass--glass&viewMode=story"
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default ThemesPage

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
