import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  POLAR_CHECKOUT_UNAVAILABLE,
  polarCheckoutCaughtResponse,
  polarCheckoutClientResponse,
} from './polar-checkout-error'

describe('polarCheckoutClientResponse', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('passes through redirects and client errors', async () => {
    const redirect = new Response(null, {
      status: 302,
      headers: { location: 'https://polar.sh/checkout/chk_1' },
    })
    expect(polarCheckoutClientResponse(redirect)).toBe(redirect)

    const missing = Response.json(
      { error: 'Missing products in query params' },
      { status: 400 },
    )
    expect(polarCheckoutClientResponse(missing)).toBe(missing)
  })

  it('replaces empty Polar 500s with a safe JSON body', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = polarCheckoutClientResponse(
      new Response(null, { status: 500 }),
    )

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: POLAR_CHECKOUT_UNAVAILABLE })
    expect(error).toHaveBeenCalledWith('Polar checkout failed', 500)
  })
})

describe('polarCheckoutCaughtResponse', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns the same safe message without leaking the thrown value', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = polarCheckoutCaughtResponse()

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: POLAR_CHECKOUT_UNAVAILABLE })
    expect(error).toHaveBeenCalledWith('Polar checkout failed')
  })
})
