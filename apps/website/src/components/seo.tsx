import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import siteConfig from '@/data/site-config'

export interface SEOProps extends NextSeoProps {}

const SEO = ({ title, description, ...props }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ ...siteConfig.seo.openGraph, title, description }}
    titleTemplate={siteConfig.seo.titleTemplate}
    {...props}
  />
)

export default SEO
