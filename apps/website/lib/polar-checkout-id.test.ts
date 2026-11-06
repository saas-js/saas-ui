import { describe, expect, it } from 'vitest'

import { polarCheckoutId } from './polar-checkout-id'

describe('polarCheckoutId', () => {
  it('prefers Polar adapter checkoutId', () => {
    expect(
      polarCheckoutId({
        checkoutId: 'chk_polar',
        checkout_id: 'chk_legacy',
      }),
    ).toBe('chk_polar')
  })

  it('falls back to checkout_id', () => {
    expect(polarCheckoutId({ checkout_id: 'chk_legacy' })).toBe('chk_legacy')
  })

  it('returns undefined when neither param is present', () => {
    expect(polarCheckoutId({})).toBeUndefined()
  })
})
