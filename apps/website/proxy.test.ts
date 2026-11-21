import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { proxy } from './proxy'

function request(
  pathname: string,
  host: string,
  headers: Record<string, string> = {},
) {
  return new NextRequest(`https://${host}${pathname}`, {
    headers: { host, ...headers },
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

  it('does not rewrite the first-party Affonso proxy on saas-ui.dev', () => {
    expect(rewrittenPath(proxy(request('/a/pixel.js', 'saas-ui.dev')))).toBe(
      null,
    )
    expect(rewrittenPath(proxy(request('/a/track', 'saas-ui.dev')))).toBe(null)
    expect(
      rewrittenPath(
        proxy(request('/a/embed/referrals?token=tok', 'saas-ui.dev')),
      ),
    ).toBe(null)
  })

  it('does not treat /about as the Affonso proxy prefix', () => {
    expect(rewrittenPath(proxy(request('/about', 'saas-ui.dev')))).toBe(
      '/ui/about',
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

  it('rewrites saas-ui.dev /llms.txt under /ui and leaves saas-js.com alone', () => {
    expect(rewrittenPath(proxy(request('/llms.txt', 'saas-ui.dev')))).toBe(
      '/ui/llms.txt',
    )
    expect(
      rewrittenPath(proxy(request('/llms-full.txt', 'www.saas-ui.dev'))),
    ).toBe('/ui/llms-full.txt')
    expect(rewrittenPath(proxy(request('/llms.txt', 'www.saas-js.com')))).toBe(
      null,
    )
    expect(
      rewrittenPath(proxy(request('/llms-full.txt', 'saas-js.com'))),
    ).toBe(null)
  })

  it('does not rewrite the shared API catalog into /ui', () => {
    expect(
      rewrittenPath(
        proxy(request('/.well-known/api-catalog', 'saas-ui.dev')),
      ),
    ).toBe(null)
    expect(
      rewrittenPath(
        proxy(request('/.well-known/api-catalog', 'www.saas-js.com')),
      ),
    ).toBe(null)
  })

  it('rewrites docs to markdown when Accept prefers text/markdown', () => {
    expect(
      rewrittenPath(
        proxy(
          request('/docs/components/button', 'saas-ui.dev', {
            accept: 'text/markdown',
          }),
        ),
      ),
    ).toBe('/ui/md/docs/components/button')
    expect(
      rewrittenPath(
        proxy(
          request('/', 'saas-ui.dev', {
            accept: 'text/markdown, text/html;q=0.9',
          }),
        ),
      ),
    ).toBe('/ui/md')
    expect(
      rewrittenPath(
        proxy(
          request('/packages/conditions/docs', 'www.saas-js.com', {
            accept: 'text/markdown',
          }),
        ),
      ),
    ).toBe('/md/packages/conditions/docs')
    expect(
      rewrittenPath(
        proxy(request('/', 'www.saas-js.com', { accept: 'text/markdown' })),
      ),
    ).toBe('/md')
  })

  it('keeps HTML as the default for docs requests', () => {
    expect(
      rewrittenPath(
        proxy(
          request('/docs/components/button', 'saas-ui.dev', {
            accept: 'text/html, text/markdown;q=0.1',
          }),
        ),
      ),
    ).toBe('/ui/docs/components/button')
    expect(
      rewrittenPath(
        proxy(
          request('/docs/starter-kits/nextjs', 'www.saas-js.com', {
            accept: 'text/html',
          }),
        ),
      ),
    ).toBe(null)
    expect(
      rewrittenPath(
        proxy(
          request('/llms.txt', 'saas-ui.dev', { accept: 'text/markdown' }),
        ),
      ),
    ).toBe('/ui/llms.txt')
  })

  it('advertises llms.txt, the API catalog, and the docs on HTML pages', () => {
    for (const host of ['saas-ui.dev', 'www.saas-js.com']) {
      const response = proxy(request('/', host))
      const link = response.headers.get('link') ?? ''
      expect(link).toContain('</llms.txt>; rel="describedby"')
      expect(link).toContain('</.well-known/api-catalog>; rel="api-catalog"')
      expect(link).toContain('</docs>; rel="service-doc"')
      expect(response.headers.get('vary')).toContain('Accept')
    }

    const asset = proxy(request('/llms.txt', 'saas-ui.dev'))
    expect(asset.headers.get('link')).toBeNull()
  })
})
