import { NextRequest, NextResponse } from 'next/server'

import { resolveSaasUiRedirect } from '@/lib/seo/saas-ui-redirects'

export function proxy(request: NextRequest) {
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

  // Legal pages live outside `app/ui`, so rewriting them into `/ui` 404s them
  // on saas-ui.dev. They are host-neutral — serve the shared route as-is.
  const isSharedRoute = ['/license', '/privacy', '/terms'].includes(pathname)

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
  if (isSaasUi && !isSharedRoute) {
    // Legacy URLs from before the v3 docs restructure. Middleware runs ahead of
    // next.config redirects, and by the time the rewrite below has run the
    // original path is gone, so these have to be resolved here.
    const redirect = resolveSaasUiRedirect(pathname)
    if (redirect) {
      const destination = redirect.startsWith('http')
        ? new URL(redirect)
        : new URL(redirect, request.nextUrl.origin)
      destination.search = request.nextUrl.search
      return NextResponse.redirect(destination, 308)
    }

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
    '/((?!api|_next/static|_next/image|img|og|favicon.ico).*)',
  ],
}
