import { Box, Heading, VStack } from '@chakra-ui/react'

import Section from '@/components/marketing/section-wrapper'

import ReactMarkdown from 'react-markdown'
import SEO from '@/components/seo'

const License = () => {
  return (
    <Box py={20}>
      <SEO title="Terms of service" titleTemplate="%s - Saas UI" />
      <Heading textAlign="center">Terms of service</Heading>

      <Section innerWidth="xl">
        <VStack
          alignItems="start"
          spacing="4"
          sx={{
            h1: {
              fontWeight: 'bold',
              fontSize: 'xl',
            },
            h2: {
              fontWeight: 'bold',
            },
          }}
        >
          <ReactMarkdown>{terms}</ReactMarkdown>
        </VStack>
      </Section>
    </Box>
  )
}

export default License

const terms = `
Last updated 2nd of Februari, 2021

By accessing our website, you are agreeing to be bound by these terms of service, and agree that you are responsible for compliance with any applicable local laws.

## General Terms
By accessing and placing an order with Saas UI, you confirm that you are in agreement with and bound by the terms and conditions contained in the Terms Of Use outlined below. These terms apply to the entire website and any email or other type of communication between you and Saas UI.

Under no circumstances shall Saas UI team be liable for any direct, indirect, special, incidental or consequential damages, including, but not limited to, loss of data or profit, arising out of the use, or the inability to use, the materials on this site.

## Products
All products and services are delivered by Saas UI. Purchases can be downloaded from a private Github repository.

## Security
Saas UI does not process any order payments through the website. All payments are processed securely through Gumroad, a third party online payment provider.

## Changes about terms
If we change our terms of use we will post those changes on this page.`
