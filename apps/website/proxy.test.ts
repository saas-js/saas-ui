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
    expect(
      rewrittenPath(proxy(request('/r/index.json', 'saas-ui.dev'))),
    ).toBe('/ui/r/index.json')
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

  it('does not rewrite saas-js.com registry requests', () => {
    expect(rewrittenPath(proxy(request('/r/index.json', 'saas-js.com')))).toBe(
      null,
    )
  })
})
