export const docsConfig: DocsConfig = {
  copyright: 'Copyright © {{date}} Saas UI B.V. All Rights Reserved.',
  title: 'SAAS.JS',
  titleTemplate: '%s | SAAS.JS',
  description: 'Building blocks for SaaS products.',
  // The apex 308s to www; canonicals and OG urls must name the served host.
  url: 'https://www.saas-js.com',
  xHandle: '@saas-ui',
  repoUrl: 'https://github.com/saas-js/saas-js',
  repoBranch: 'main',
  get editUrl() {
    return `${this.repoUrl}/tree/${this.repoBranch}/apps/website/content/saas-js/docs`
  },
}

interface DocsConfig {
  title: string
  titleTemplate: string
  description: string
  copyright: string
  url: string
  repoUrl: string
  editUrl: string
  xHandle: string
  repoBranch: string
}
