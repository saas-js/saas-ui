import { PageHeader } from '@/components/page-header'
import { Prose } from '@/components/prose'
import { Box, Container } from '@saas-ui/react'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'Read the Saas UI Terms of service',
}

const Terms = () => {
  return (
    <Box py={20}>
      <Container maxW="2xl">
        <PageHeader title="Terms of service" />
        <Prose>
          <ReactMarkdown>{terms}</ReactMarkdown>
        </Prose>
      </Container>
    </Box>
  )
}

export default Terms

const terms = `
Last updated 6th of April, 2025

By accessing our website, you are agreeing to be bound by these terms of service, and agree that you are responsible for compliance with any applicable local laws.

## General Terms
By accessing and placing an order with Saas UI, you confirm that you are in agreement with and bound by the terms and conditions contained in the Terms Of Use outlined below. These terms apply to the entire website and any email or other type of communication between you and Saas UI.

Under no circumstances shall Saas UI team be liable for any direct, indirect, special, incidental or consequential damages, including, but not limited to, loss of data or profit, arising out of the use, or the inability to use, the materials on this site.

## Products
All products and services are delivered by Saas UI B.V.
Purchases can be downloaded from a private Github repository, or one of our other distribution channels, Lemon Squeezy and Gumroad.

## Security
Saas UI does not process any order payments through the website. All payments are processed securely through third party online payment providers, Lemon Squeezy and Gumroad.

## Changes about terms
If we change our terms of use we will post those changes on this page.

## Contact

If you have any questions about these terms, please contact us at hello@saas-ui.dev.`
