import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  affonsoProxyHeaders,
  isAffonsoProxyPath,
  proxyAffonsoRequest,
  resolveAffonsoUpstream,
  rewriteAffonsoLocation,
  visitorIp,
} from './affonso-proxy'

describe('isAffonsoProxyPath', () => {
  it('matches /a and nested Affonso paths only', () => {
    expect(isAffonsoProxyPath('/a')).toBe(true)
    expect(isAffonsoProxyPath('/a/pixel.js')).toBe(true)
    expect(isAffonsoProxyPath('/a/embed/referrals')).toBe(true)
    expect(isAffonsoProxyPath('/about')).toBe(false)
    expect(isAffonsoProxyPath('/affiliate')).toBe(false)
    expect(isAffonsoProxyPath('/r/index.json')).toBe(false)
  })
})

describe('resolveAffonsoUpstream', () => {
  it('maps pixel, psl, track, and signups to Affonso hosts', () => {
    expect(resolveAffonsoUpstream('/a/pixel.js')?.toString()).toBe(
      'https://cdn.affonso.io/js/pixel.min.js',
    )
    expect(resolveAffonsoUpstream('/a/psl.min.js')?.toString()).toBe(
      'https://cdn.affonso.io/js/psl.min.js',
    )
    expect(resolveAffonsoUpstream('/a/track', '?atp=test')?.toString()).toBe(
      'https://api.affonso.io/v1/track?atp=test',
    )
    expect(resolveAffonsoUpstream('/a/signups')?.toString()).toBe(
      'https://api.affonso.io/v1/signups',
    )
  })

  it('maps embed paths and query strings to affonso.io/embed', () => {
    expect(
      resolveAffonsoUpstream(
        '/a/embed/referrals',
        '?token=tok&theme=light&lang=en',
      )?.toString(),
    ).toBe('https://affonso.io/embed/referrals?token=tok&theme=light&lang=en')
    expect(
      resolveAffonsoUpstream('/a/embed/_next/static/chunk.js')?.toString(),
    ).toBe('https://affonso.io/embed/_next/static/chunk.js')
  })

  it('does not claim registry or unknown /a paths', () => {
    expect(resolveAffonsoUpstream('/r/pixel.js')).toBeNull()
    expect(resolveAffonsoUpstream('/r/index.json')).toBeNull()
    expect(resolveAffonsoUpstream('/a')).toBeNull()
    expect(resolveAffonsoUpstream('/a/unknown')).toBeNull()
    expect(resolveAffonsoUpstream('/about')).toBeNull()
  })
})

describe('visitorIp and proxy headers', () => {
  it('prefers Cloudflare connecting IP', () => {
    const headers = new Headers({
      'cf-connecting-ip': '203.0.113.9',
      'x-forwarded-for': '198.51.100.1, 10.0.0.1',
      'x-real-ip': '192.0.2.1',
    })
    expect(visitorIp(headers)).toBe('203.0.113.9')
  })

  it('forwards trusted IP headers and strips cookies', () => {
    const request = new Request('https://www.saas-js.com/a/track', {
      method: 'POST',
      headers: {
        host: 'www.saas-js.com',
        cookie: 'session=secret',
        authorization: 'Bearer secret',
        'content-type': 'application/json',
        'cf-connecting-ip': '203.0.113.9',
      },
    })
    const headers = affonsoProxyHeaders(
      request,
      new URL('https://api.affonso.io/v1/track'),
    )

    expect(headers.get('host')).toBe('api.affonso.io')
    expect(headers.get('cookie')).toBeNull()
    expect(headers.get('authorization')).toBeNull()
    expect(headers.get('content-type')).toBe('application/json')
    expect(headers.get('cf-connecting-ip')).toBe('203.0.113.9')
    expect(headers.get('x-real-ip')).toBe('203.0.113.9')
    expect(headers.get('x-forwarded-host')).toBe('www.saas-js.com')
    expect(headers.get('x-forwarded-proto')).toBe('https')
  })
})

describe('rewriteAffonsoLocation', () => {
  it('rewrites embed redirects onto /a', () => {
    expect(rewriteAffonsoLocation('https://affonso.io/embed/referrals')).toBe(
      '/a/embed/referrals',
    )
    expect(rewriteAffonsoLocation('/embed/referrals?token=tok')).toBe(
      '/a/embed/referrals?token=tok',
    )
    expect(
      rewriteAffonsoLocation('https://cdn.affonso.io/js/pixel.min.js'),
    ).toBe(null)
  })
})

describe('proxyAffonsoRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('POSTs the body to the mapped track endpoint', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ cid: 'click_1' }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const response = await proxyAffonsoRequest(
      new Request('https://www.saas-js.com/a/track', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cf-connecting-ip': '203.0.113.9',
          cookie: 'session=secret',
        },
        body: JSON.stringify({ programId: 'cmgdfoad90006ib7qt4poawok' }),
      }),
      new URL('https://api.affonso.io/v1/track'),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ cid: 'click_1' })
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0] as [
      URL,
      RequestInit & { duplex?: string },
    ]
    expect(url.toString()).toBe('https://api.affonso.io/v1/track')
    expect(init.method).toBe('POST')
    expect(init.duplex).toBe('half')
    expect(init.body).toBeTruthy()
    const headers = new Headers(init.headers)
    expect(headers.get('cookie')).toBeNull()
    expect(headers.get('cf-connecting-ip')).toBe('203.0.113.9')
  })
})
