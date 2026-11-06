import {
  AFFONSO_REFERRAL_COOKIE,
  applyAffonsoCheckoutMetadata,
} from '@/lib/affonso'
import {
  polarCheckoutCaughtResponse,
  polarCheckoutClientResponse,
} from '@/lib/polar-checkout-error'
import { Checkout } from '@polar-sh/nextjs'
import { NextRequest } from 'next/server'

const polarCheckout = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.POLAR_SUCCESS_URL,
  server: 'production',
})

export const GET = async (request: NextRequest) => {
  const url = request.nextUrl.clone()
  applyAffonsoCheckoutMetadata(
    url.searchParams,
    request.cookies.get(AFFONSO_REFERRAL_COOKIE)?.value,
  )
  const polarRequest =
    url.search !== request.nextUrl.search
      ? new NextRequest(url, {
          headers: request.headers,
          method: request.method,
        })
      : request

  try {
    return polarCheckoutClientResponse(await polarCheckout(polarRequest))
  } catch {
    return polarCheckoutCaughtResponse()
  }
}
