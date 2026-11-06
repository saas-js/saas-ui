import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { proxy } from './proxy'

function request(pathname: string, host: string) {
  return new NextRequest(`https://${host}${pathname}`, {
    headers: { host },
  })
}

function rewrittenPath(response: Response) {
  const rewrite = response.headers.get('x-middleware-rewrite')
  return rewrite ? new URL(rewrite).pathname : null
}

describe('website proxy', () => {
  it('rewrites saas-ui.dev registry requests under /ui/r', () => {
    expect(rewrittenPath(proxy(request('/r', 'saas-ui.dev')))).toBe('/ui/r')
    expect(rewrittenPath(proxy(request('/r/index.json', 'saas-ui.dev')))).toBe(
      '/ui/r/index.json',
    )
    expect(
      rewrittenPath(
        proxy(request('/r/styles/default/button.json', 'saas-ui.dev')),
      ),
    ).toBe('/ui/r/styles/default/button.json')
  })

  it('rewrites saas-ui.dev pages under /ui', () => {
    expect(rewrittenPath(proxy(request('/docs', 'saas-ui.dev')))).toBe(
      '/ui/docs',
    )
  })

  it('does not rewrite host-aware robots.txt on saas-ui.dev', () => {
    expect(rewrittenPath(proxy(request('/robots.txt', 'saas-ui.dev')))).toBe(
      null,
    )
  })

  it('does not rewrite the Affonso affiliate page on saas-ui.dev', () => {
    expect(rewrittenPath(proxy(request('/affiliate', 'saas-ui.dev')))).toBe(
      null,
    )
  })

  it('does not rewrite Polar checkout and success on saas-ui.dev', () => {
    expect(rewrittenPath(proxy(request('/checkout', 'saas-ui.dev')))).toBe(null)
    expect(
      rewrittenPath(
        proxy(
          request(
            '/checkout?products=55ee6a38-3908-4263-ada3-3b99fd68b680',
            'saas-ui.dev',
          ),
        ),
      ),
    ).toBe(null)
    expect(rewrittenPath(proxy(request('/success', 'saas-ui.dev')))).toBe(null)
    expect(
      rewrittenPath(
        proxy(request('/success?checkoutId=chk_123', 'saas-ui.dev')),
      ),
    ).toBe(null)
  })

  it('does not rewrite Polar checkout and success on saas-js.com', () => {
    expect(rewrittenPath(proxy(request('/checkout', 'www.saas-js.com')))).toBe(
      null,
    )
    expect(rewrittenPath(proxy(request('/success', 'www.saas-js.com')))).toBe(
      null,
    )
  })

  it('does not rewrite saas-js.com registry requests', () => {
    expect(rewrittenPath(proxy(request('/r/index.json', 'saas-js.com')))).toBe(
      null,
    )
  })
})
