import { describe, expect, it } from 'vitest'

import { resolveSaasUiRedirect } from './saas-ui-redirects'

describe('resolveSaasUiRedirect', () => {
  it('resolves an exact legacy path', () => {
    expect(resolveSaasUiRedirect('/docs/components/layout/app-shell')).toBe(
      '/docs/components/app-shell',
    )
  })

  it('prefers an exact entry over the sub-page fallback', () => {
    expect(resolveSaasUiRedirect('/docs/components/feedback/loader/props')).toBe(
      '/docs/components/spinner',
    )
  })

  it('resolves an unlisted /theming sub-page through its mapped parent', () => {
    // Was 404ing in production and still collecting impressions.
    expect(
      resolveSaasUiRedirect('/docs/components/date-time/date-input/theming'),
    ).toBe('/docs/components/date-picker')
  })

  it('resolves an unlisted /props sub-page through its mapped parent', () => {
    expect(resolveSaasUiRedirect('/docs/components/web3/address/props')).toBe(
      '/docs/components/overview',
    )
  })

  it('falls back to the parent when the parent is a current page', () => {
    expect(resolveSaasUiRedirect('/docs/components/navbar/theming')).toBe(
      '/docs/components/navbar',
    )
  })

  it('leaves current pages alone', () => {
    expect(resolveSaasUiRedirect('/docs/components/navbar')).toBeUndefined()
    expect(resolveSaasUiRedirect('/docs/components/format-date')).toBeUndefined()
    expect(resolveSaasUiRedirect('/')).toBeUndefined()
  })

  it('only applies the sub-page fallback inside /docs', () => {
    expect(resolveSaasUiRedirect('/blocks/theming')).toBeUndefined()
  })

  it('ignores a trailing slash', () => {
    expect(resolveSaasUiRedirect('/docs/components/layout/app-shell/')).toBe(
      '/docs/components/app-shell',
    )
  })
})
