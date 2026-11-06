import { describe, expect, it } from 'vitest'

import { affonsoEmbedSrc, applyAffonsoCheckoutMetadata } from './affonso'

describe('applyAffonsoCheckoutMetadata', () => {
  it('adds Polar metadata from the Affonso cookie', () => {
    const search = applyAffonsoCheckoutMetadata(
      new URLSearchParams('products=abc'),
      'ref_123',
    )
    expect(search.get('metadata')).toBe(
      JSON.stringify({ affonso_referral: 'ref_123' }),
    )
  })

  it('keeps client-supplied metadata', () => {
    const existing = JSON.stringify({ affonso_referral: 'from_query' })
    const search = new URLSearchParams()
    search.set('metadata', existing)
    expect(
      applyAffonsoCheckoutMetadata(search, 'from_cookie').get('metadata'),
    ).toBe(existing)
  })

  it('does nothing without a cookie', () => {
    const search = applyAffonsoCheckoutMetadata(
      new URLSearchParams('products=abc'),
      null,
    )
    expect(search.has('metadata')).toBe(false)
  })
})

describe('affonsoEmbedSrc', () => {
  it('builds the hosted embed URL', () => {
    expect(affonsoEmbedSrc('tok_abc')).toBe(
      'https://affonso.io/embed/referrals?token=tok_abc&theme=light&lang=en',
    )
  })
})
