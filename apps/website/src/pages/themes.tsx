import * as React from 'react'

import { Stack, Flex, Box, Text } from '@chakra-ui/react'

import SEO from '@/components/seo'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import Section from '@/components/marketing/section-wrapper'
import Hero from '@/components/marketing/hero'
import { FallInPlace } from '@/components/motion/fall-in-place'

import { Br } from '@saas-ui/react'
import SectionTitle from '@/components/marketing/section-title'

const ThemesPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="Professionally crafted Chakra UI themes"
        titleTemplate="Professionally crafted Chakra UI themes"
      />
      <BackgroundGradientRadial
        top="-1000px"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
      />
      <Box mb={8} w="full" position="relative" overflow="hidden" zIndex="1">
        <Section id="pricing" pos="relative" innerWidth="container.xl" pb="10">
          <SectionTitle
            alignItems="center"
            textAlign="center"
            py="20"
            title={<Text lineHeight="short">Chakra UI themes</Text>}
            description={
              <Box>
                <Text
                  fontSize="xl"
                  fontWeight="normal"
                  maxW="container.sm"
                  mb="4"
                >
                  A collection of clean and minimalist Chakra UI themes
                  <Br />
                  that help you build modern and visually pleasing interfaces.{' '}
                </Text>
                <Text fontSize="sm">
                  Compatible with Chakra UI &amp; Saas UI projects.
                </Text>
              </Box>
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
