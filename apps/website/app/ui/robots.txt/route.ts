import { robotsTxtResponse } from '@/lib/robots-txt'

/**
 * saas-ui.dev rewrites unmatched paths into `/ui/*` (see proxy.ts).
 * Keep this route so a rewrite still hits host-aware robots.txt.
 */
export function GET(request: Request) {
  return robotsTxtResponse(request.headers.get('host'))
}
