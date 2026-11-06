import {
  AFFONSO_REFERRAL_COOKIE,
  applyAffonsoCheckoutMetadata,
} from '@/lib/affonso'
import {
  handlePolarCheckoutRequest,
  loadPolarCheckoutEnv,
} from '@/lib/polar-checkout'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (request: NextRequest) => {
  const url = request.nextUrl.clone()
  applyAffonsoCheckoutMetadata(
    url.searchParams,
    request.cookies.get(AFFONSO_REFERRAL_COOKIE)?.value,
  )

  return handlePolarCheckoutRequest({
    requestUrl: url,
    env: await loadPolarCheckoutEnv(),
  })
}
