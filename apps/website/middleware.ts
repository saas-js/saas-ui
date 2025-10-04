import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Detect which site based on subdomain or domain
  const isSaasJs =
    host.includes('saas-js') ||
    host === 'saas-js.com' ||
    host === 'www.saas-js.com'

  const isSaasUi =
    host.includes('saas-ui') ||
    host === 'saas-ui.dev' ||
    host === 'www.saas-ui.dev'

  // Handle /ui routes on saas-js (proxy to saas-ui content)
  if (isSaasJs && pathname.startsWith('/ui')) {
    // In production, redirect to saas-ui.dev
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(
        `https://saas-ui.dev${pathname.replace('/ui', '')}`,
      )
    }

    // In development, proxy to saas-ui content by rewriting the path
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace('/ui', '')

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-site', 'saas-ui')

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Handle saas-ui requests - rewrite to /ui path
  if (isSaasUi) {
    const url = request.nextUrl.clone()
    url.pathname = `/ui${pathname}`

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-site', 'saas-ui')

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  // saas-js requests (default)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site', 'saas-js')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
