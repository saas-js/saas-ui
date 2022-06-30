import Logo from '../components/saas-ui'
const baseUrl = 'https://github.com/saas-js/saas-ui'

const siteConfig = {
  logo: Logo,
  copyright: `Copyright © ${new Date().getFullYear()} Appulse Software B.V. All Rights Reserved.`,
  author: {
    name: 'Eelco Wiersma',
    github: 'https://github.com/Pagebakers',
    twitter: 'https://twitter.com/Pagebakers',
    linkedin: 'https://linkedin.com/in/eelcowiersma',
    email: 'hello@saas-ui.dev',
  },
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/main/website/pages`,
    blobUrl: `${baseUrl}/blob/main`,
  },
  discord: {
    url: 'https://discord.gg/saas-ui',
  },
  youtube: 'https://www.youtube.com/channel/UCdCi9VPceeFKYkKpS0K0Pjg',
  seo: {
    title: 'Saas UI',
    titleTemplate: '%s - Saas UI',
    description: 'Advanced UI components for SaaS products.',
    siteUrl: 'https://saas-ui.dev',
    twitter: {
      handle: '@Pagebakers',
      site: '@saas_js',
      cardType: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://saas-ui.dev',
      title: 'Saas UI',
      description: 'An advanced component library for SaaS companies.',
      site_name: 'Saas UI: An advanced component library for SaaS companies.',
      images: [
        {
          url: 'https://saas-ui.dev/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Saas UI: An advanced component library for SaaS companies.',
        },
      ],
    },
  },
}

export default siteConfig
