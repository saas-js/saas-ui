const baseUrl = 'https://github.com/AppulseSoftware/saas-ui'

const siteConfig = {
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
      handle: '@SaasUI_Dev-uidev',
      site: '@SaasUI_Dev',
      cardType: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://saas-ui.dev',
      title: 'Saas UI',
      description: 'Advanced UI components for SaaS products.',
      site_name: 'Saas UI: Advanced UI components for SaaS products.',
      images: [
        {
          url: 'https://chakra-ui.com/og-image.png',
          width: 1240,
          height: 480,
          alt: 'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.',
        },
        {
          url: 'https://chakra-ui.com/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt: 'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.',
        },
      ],
    },
  },
}

export default siteConfig
