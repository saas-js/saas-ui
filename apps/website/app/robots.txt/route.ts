import { robotsTxtResponse } from '@/lib/robots-txt'

export function GET(request: Request) {
  return robotsTxtResponse(request.headers.get('host'))
}
