import {
  AFFONSO_REFERRAL_COOKIE,
  applyAffonsoCheckoutMetadata,
} from '@/lib/affonso'
import { Checkout } from '@polar-sh/nextjs'
import { NextRequest } from 'next/server'

const polarCheckout = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.POLAR_SUCCESS_URL,
  server: 'production',
})

export const GET = (request: NextRequest) => {
  const url = request.nextUrl.clone()
  applyAffonsoCheckoutMetadata(
    url.searchParams,
    request.cookies.get(AFFONSO_REFERRAL_COOKIE)?.value,
  )
  if (url.search !== request.nextUrl.search) {
    return polarCheckout(
      new NextRequest(url, {
        headers: request.headers,
        method: request.method,
      }),
    )
  }
  return polarCheckout(request)
}
