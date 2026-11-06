import {
  proxyAffonsoRequest,
  resolveAffonsoUpstream,
} from '@/lib/affonso-proxy'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function handleAffonsoProxy(request: NextRequest) {
  const upstream = resolveAffonsoUpstream(
    request.nextUrl.pathname,
    request.nextUrl.search,
  )
  if (!upstream) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return proxyAffonsoRequest(request, upstream)
}

export const GET = handleAffonsoProxy
export const HEAD = handleAffonsoProxy
export const POST = handleAffonsoProxy
export const PUT = handleAffonsoProxy
export const PATCH = handleAffonsoProxy
export const DELETE = handleAffonsoProxy
export const OPTIONS = handleAffonsoProxy
