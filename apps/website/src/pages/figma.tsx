import * as React from 'react'

import Script from 'next/script'

import {
  AspectRatio,
  Box,
  Button,
  CardHeader,
  Center,
  IconButton,
  SimpleGrid,
  Tag,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  useColorModeValue,
  Avatar,
  Tooltip,
  Card,
  CardBody,
} from '@chakra-ui/react'

import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import SEO from '@/components/seo'
import { CheckIcon } from '@chakra-ui/icons'
import { ButtonLink } from '@/components/link'

import { Faq } from '@/components/faq'

import { Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import { Br } from '@saas-ui/react'
import { useRouter } from 'next/router'
import CodePanel from '@/components/code-panel/code-panel'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { SignupForm } from '@/components/signup-form'
import { FaFigma } from 'react-icons/fa6'

const FigmaPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The React component library for Startups"
        titleTemplate="%s - Pricing"
      />
      <BackgroundGradientRadial
        top="-30%"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
        pointerEvents="none"
      />
      <Box mb={8} w="full" position="relative" overflow="hidden">
        <Figma />

        <FigmaEmbed />

        <Testimonials />
      </Box>
    </Box>
  )
}

const Figma = () => {
  const figma = useDisclosure()

  return (
    <Section id="pricing" pos="relative" innerWidth="container.xl" py="20">
      <Box zIndex="2" pos="relative">
        <SectionTitle
          title="Saas UI Figma Kit"
          description={
            <>
              <Text fontSize="xl" mb="12">
                Professionally crafted Figma design system for <br /> designing
                beautiful products at any scale.
              </Text>
            </>
          }
          pt={{ base: '8', lg: '20' }}
          sx={{ mb: 0, textAlign: 'center' }}
        />

        <HStack justifyContent="center">
          <Button
            onClick={figma.onOpen}
            variant="primary"
            size="lg"
            leftIcon={<FaFigma />}
          >
            Figma Pro early access
          </Button>
        </HStack>

        <SignupForm isOpen={figma.isOpen} onClose={figma.onClose} />
      </Box>
    </Section>
  )
}

const FigmaEmbed = () => {
  return (
    <Box>
      <Heading textAlign="center" size="md" fontWeight="medium" mb="8">
        Free community library
      </Heading>
      <AspectRatio ratio={16 / 9} w="full" maxW="container.xl" mx="auto">
        <Box
          as="iframe"
          objectFit={'cover'}
          rounded="xl"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FPxBbup77UKMM8ApWacxlCb%2FSaas-UI-Theme-1.1-(Community)%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DD2h54RiMJdxlk72N-1"
        ></Box>
      </AspectRatio>
    </Box>
  )
}

export default FigmaPage

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
