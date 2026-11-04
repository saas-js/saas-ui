import { describe, expect, it } from 'vitest'

import { isSaasUiHost, robotsTxtForHost } from './robots-txt'

describe('robotsTxtForHost', () => {
  it('points saas-ui hosts at the saas-ui.dev sitemap', () => {
    expect(robotsTxtForHost('saas-ui.dev')).toContain(
      'Sitemap: https://saas-ui.dev/sitemap.xml',
    )
    expect(robotsTxtForHost('www.saas-ui.dev')).toContain(
      'Sitemap: https://saas-ui.dev/sitemap.xml',
    )
    expect(robotsTxtForHost('saas-ui.dev:443')).toContain(
      'Sitemap: https://saas-ui.dev/sitemap.xml',
    )
    expect(isSaasUiHost('saas-ui.dev')).toBe(true)
  })

  it('points saas-js and unknown hosts at the www.saas-js.com sitemap', () => {
    expect(robotsTxtForHost('www.saas-js.com')).toContain(
      'Sitemap: https://www.saas-js.com/sitemap.xml',
    )
    expect(robotsTxtForHost('saas-js.com')).toContain(
      'Sitemap: https://www.saas-js.com/sitemap.xml',
    )
    expect(robotsTxtForHost('localhost:8787')).toContain(
      'Sitemap: https://www.saas-js.com/sitemap.xml',
    )
    expect(robotsTxtForHost(null)).toContain(
      'Sitemap: https://www.saas-js.com/sitemap.xml',
    )
    expect(isSaasUiHost('www.saas-js.com')).toBe(false)
  })

  it('keeps the allow-all crawler rules', () => {
    expect(robotsTxtForHost('saas-ui.dev')).toMatch(/^User-Agent: \*\nAllow: \//)
  })
})
