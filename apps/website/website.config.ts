export const websiteConfig: WebsiteConfig = {
  storybookUrl: 'https://storybook.saas-u.dev',
  copyright: 'Copyright © {{date}} Saas UI B.V. All Rights Reserved.',
  title: 'Saas UI',
  titleTemplate: '%s | Saas UI',
  description: 'The React component library for startups.',
  url: 'https://saas-ui.dev',
  xHandle: '@saas-ui',
  repoUrl: 'https://github.com/saas-js/saas-ui',
  repoBranch: 'v3',
}

interface WebsiteConfig {
  title: string
  titleTemplate: string
  description: string
  storybookUrl: string
  copyright: string
  url: string
  repoUrl: string
  xHandle: string
  repoBranch: string
}

export interface NavItem {
  title: string
  url?: string
  status?: string
  items?: NavItem[]
  external?: boolean
}

export interface FlattenNavItem extends Omit<NavItem, 'items'> {}
