const docsLinks: NavItem = {
  title: 'Docs',
  url: 'pro/docs',
  items: [
    {
      title: 'Getting Started',
      url: 'getting-started',
      items: [
        {
          title: 'Overview',
          items: [
            { title: 'Introduction', url: 'introduction' },
            { title: 'CLI', url: 'cli' },
            { title: 'Contributing', url: 'contributing' },
          ],
        },
      ],
    },
  ],
}

export const docsConfig: DocsConfig = {
  storybookUrl: 'https://storybook.saas-u.pro',
  copyright: 'Copyright © {{date}} Saas UI B.V. All Rights Reserved.',
  title: 'Saas UI Pro',
  titleTemplate: '%s | Saas UI Pro',
  description: 'The React toolkit for building SaaS products.',
  url: 'https://saas-ui.dev/pro',
  xHandle: '@saas-ui',
  repoUrl: 'https://github.com/saas-js/saas-ui',
  repoBranch: 'v3',
  get editUrl() {
    return `${this.repoUrl}/tree/${this.repoBranch}/apps/website/content/docs`
  },
  navigation: [
    docsLinks,
    { title: 'Resources', url: 'resources' },
    { title: 'Showcase', url: 'showcase' },
  ],
}

interface DocsConfig {
  title: string
  titleTemplate: string
  description: string
  storybookUrl: string
  copyright: string
  url: string
  repoUrl: string
  editUrl: string
  xHandle: string
  navigation: NavItem[]
  repoBranch: string
}

export interface NavItem {
  title: string
  url?: string
  status?: string
  items?: NavItem[]
}

export interface FlattenNavItem extends Omit<NavItem, 'items'> {}
