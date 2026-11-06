import { describe, expect, it } from 'vitest'

import {
  AFFONSO_API_BASE,
  AFFONSO_PIXEL_SRC,
  AFFONSO_PROGRAM_ID,
  AFFONSO_PROXY_PREFIX,
  affonsoEmbedSrc,
  applyAffonsoCheckoutMetadata,
} from './affonso'

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
  it('builds the first-party embed URL', () => {
    expect(affonsoEmbedSrc('tok_abc')).toBe(
      '/a/embed/referrals?token=tok_abc&theme=light&lang=en',
    )
  })
})

describe('Affonso first-party constants', () => {
  it('keeps the public program id and /a pixel paths', () => {
    expect(AFFONSO_PROGRAM_ID).toBe('cmgdfoad90006ib7qt4poawok')
    expect(AFFONSO_PROXY_PREFIX).toBe('/a')
    expect(AFFONSO_PIXEL_SRC).toBe('/a/pixel.js')
    expect(AFFONSO_API_BASE).toBe('/a')
  })
})
