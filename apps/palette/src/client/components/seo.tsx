import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'

export interface SEOProps extends NextSeoProps {}

const openGraph = {
  type: 'website',
  locale: 'en_US',
  url: 'https://palette.saas-ui.dev',
  title: 'Saas UI: Color Palette Generator',
  description: 'Quickly generate custom color palettes for Chakra UI.',
  site_name: 'Saas UI: Color Palette Generator for Chakra UI.',
  images: [
    {
      url: 'https://palette.saas-ui.dev/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Saas UI: Color Palette Generator for Chakra UI.',
    },
    {
      url: 'https://palette.saas-ui.com/twitter-og-image.jpg',
      width: 1012,
      height: 506,
      alt: 'Saas UI: Color Palette Generator for Chakra UI.',
    },
  ],
}

const SEO = ({ title, description, ...props }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={openGraph}
    {...props}
  />
)

export default SEO
