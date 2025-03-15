import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import siteConfig from '@/data/site-config'

export interface SEOProps extends NextSeoProps {}

const SEO = ({ title, description, openGraph, ...props }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{
      ...siteConfig.seo.openGraph,
      title,
      description,
      ...openGraph,
    }}
    titleTemplate={siteConfig.seo.titleTemplate}
    twitter={siteConfig.seo.twitter}
    {...props}
  />
)

export default SEO
