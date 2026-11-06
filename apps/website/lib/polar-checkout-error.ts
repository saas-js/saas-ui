import { NextResponse } from 'next/server'

export const POLAR_CHECKOUT_UNAVAILABLE =
  'Checkout is unavailable. Please try again.'

/**
 * Polar's Checkout adapter swallows `checkouts.create` failures as
 * `NextResponse.error()` (empty 500). Surface a safe JSON body and never
 * forward Polar/SDK error details to the client.
 */
export function polarCheckoutClientResponse(response: Response) {
  if (response.status < 500) return response

  console.error('Polar checkout failed', response.status)
  return NextResponse.json(
    { error: POLAR_CHECKOUT_UNAVAILABLE },
    { status: 500 },
  )
}

export function polarCheckoutCaughtResponse() {
  console.error('Polar checkout failed')
  return NextResponse.json(
    { error: POLAR_CHECKOUT_UNAVAILABLE },
    { status: 500 },
  )
}
