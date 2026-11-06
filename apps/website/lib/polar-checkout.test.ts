import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  POLAR_CHECKOUT_NOT_CONFIGURED,
  POLAR_CHECKOUT_SERVER,
  POLAR_CHECKOUT_UNAVAILABLE,
  createPolarCheckoutClient,
  handlePolarCheckoutRequest,
  isPolarSuccessUrl,
  loadPolarCheckoutEnv,
  polarCheckoutCreateInput,
  polarCheckoutDiagnostics,
  resolvePolarCheckoutEnv,
} from './polar-checkout'

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: vi.fn(async () => ({
    env: {
      POLAR_ACCESS_TOKEN: 'from_cf_runtime',
      POLAR_SUCCESS_URL: 'https://www.saas-js.com/success',
    },
  })),
}))

const configuredEnv = {
  accessToken: 'polar_oat_test_token',
  successUrl: 'https://www.saas-js.com/success',
}

function loggedPayload(error: ReturnType<typeof vi.spyOn>) {
  expect(error).toHaveBeenCalled()
  return JSON.parse(String(error.mock.calls[0]?.[0]))
}

describe('resolvePolarCheckoutEnv', () => {
  it('prefers Cloudflare Worker bindings over process.env', () => {
    expect(
      resolvePolarCheckoutEnv({
        cloudflareEnv: {
          POLAR_ACCESS_TOKEN: 'from_cf',
          POLAR_SUCCESS_URL: 'https://cf.example/success',
        },
        processEnv: {
          POLAR_ACCESS_TOKEN: 'from_process',
          POLAR_SUCCESS_URL: 'https://process.example/success',
        },
      }),
    ).toEqual({
      accessToken: 'from_cf',
      successUrl: 'https://cf.example/success',
    })
  })

  it('falls back to process.env when Cloudflare bindings are empty', () => {
    expect(
      resolvePolarCheckoutEnv({
        cloudflareEnv: { POLAR_ACCESS_TOKEN: '  ', POLAR_SUCCESS_URL: '' },
        processEnv: {
          POLAR_ACCESS_TOKEN: 'from_process',
          POLAR_SUCCESS_URL: 'https://process.example/success',
        },
      }),
    ).toEqual({
      accessToken: 'from_process',
      successUrl: 'https://process.example/success',
    })
  })

  it('reads current env on each call instead of capturing module init', () => {
    const first = resolvePolarCheckoutEnv({
      processEnv: { POLAR_ACCESS_TOKEN: 'first' },
    })
    const second = resolvePolarCheckoutEnv({
      processEnv: { POLAR_ACCESS_TOKEN: 'second' },
    })
    expect(first.accessToken).toBe('first')
    expect(second.accessToken).toBe('second')
  })
})

describe('isPolarSuccessUrl', () => {
  it('accepts absolute https URLs', () => {
    expect(isPolarSuccessUrl('https://www.saas-js.com/success')).toBe(true)
  })

  it('accepts localhost http for local development', () => {
    expect(isPolarSuccessUrl('http://localhost:3020/success')).toBe(true)
  })

  it('rejects relative and non-http URLs', () => {
    expect(isPolarSuccessUrl('/success')).toBe(false)
    expect(isPolarSuccessUrl('http://www.saas-js.com/success')).toBe(false)
  })
})

describe('polarCheckoutCreateInput', () => {
  it('appends Polar checkoutId placeholder and forwards metadata', () => {
    const search = new URLSearchParams()
    search.set('products', 'prod_1')
    search.set('metadata', JSON.stringify({ affonso_referral: 'ref_1' }))

    expect(
      polarCheckoutCreateInput(search, 'https://www.saas-js.com/success'),
    ).toMatchObject({
      products: ['prod_1'],
      successUrl: 'https://www.saas-js.com/success?checkoutId={CHECKOUT_ID}',
      metadata: { affonso_referral: 'ref_1' },
    })
  })
})

describe('polarCheckoutDiagnostics', () => {
  it('extracts Polar HTTP status, code, and message without secrets', () => {
    const diagnostics = polarCheckoutDiagnostics(
      {
        statusCode: 401,
        message: `Unauthorized polar_oat_secret`,
        body: JSON.stringify({
          error: 'Unauthorized',
          detail: 'Invalid token',
        }),
      },
      configuredEnv,
    )

    expect(diagnostics).toEqual({
      httpStatus: 401,
      polarCode: 'Unauthorized',
      polarMessage: 'Invalid token',
      hasAccessToken: true,
      hasSuccessUrl: true,
    })
    expect(JSON.stringify(diagnostics)).not.toContain('polar_oat_secret')
    expect(JSON.stringify(diagnostics)).not.toContain(configuredEnv.accessToken)
  })
})

describe('handlePolarCheckoutRequest', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns 400 when products are missing', async () => {
    const createCheckout = vi.fn()
    const response = await handlePolarCheckoutRequest({
      requestUrl: 'https://www.saas-js.com/checkout',
      env: {},
      createCheckout,
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: 'Missing products in query params',
    })
    expect(createCheckout).not.toHaveBeenCalled()
  })

  it('returns 503 JSON when the Polar token or success URL is missing', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const createCheckout = vi.fn()
    const response = await handlePolarCheckoutRequest({
      requestUrl: 'https://www.saas-js.com/checkout?products=prod_1',
      env: { successUrl: configuredEnv.successUrl },
      createCheckout,
    })

    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({
      error: POLAR_CHECKOUT_NOT_CONFIGURED,
    })
    expect(createCheckout).not.toHaveBeenCalled()
    expect(loggedPayload(error)).toEqual({
      message: POLAR_CHECKOUT_NOT_CONFIGURED,
      httpStatus: null,
      polarCode: null,
      polarMessage: null,
      hasAccessToken: false,
      hasSuccessUrl: true,
    })
  })

  it('returns 503 JSON when the success URL is not absolute https', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await handlePolarCheckoutRequest({
      requestUrl: 'https://www.saas-js.com/checkout?products=prod_1',
      env: { accessToken: 'polar_oat_test_token', successUrl: '/success' },
      createCheckout: vi.fn(),
    })

    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({
      error: POLAR_CHECKOUT_NOT_CONFIGURED,
    })
    expect(loggedPayload(error).hasSuccessUrl).toBe(true)
    expect(JSON.stringify(error.mock.calls)).not.toContain(
      'polar_oat_test_token',
    )
  })

  it('creates Polar checkout per request and redirects', async () => {
    const createCheckout = vi.fn(async (input) => {
      expect(input).toMatchObject({
        products: ['prod_1'],
        successUrl: 'https://www.saas-js.com/success?checkoutId={CHECKOUT_ID}',
        metadata: { affonso_referral: 'ref_1' },
      })
      return { url: 'https://buy.polar.sh/chk_1' }
    })

    const response = await handlePolarCheckoutRequest({
      requestUrl:
        'https://www.saas-js.com/checkout?products=prod_1&metadata=%7B%22affonso_referral%22%3A%22ref_1%22%7D',
      env: configuredEnv,
      createCheckout,
    })

    expect(createCheckout).toHaveBeenCalledOnce()
    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('https://buy.polar.sh/chk_1')
  })

  it('logs Polar create failures and returns a safe JSON 500', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await handlePolarCheckoutRequest({
      requestUrl: 'https://www.saas-js.com/checkout?products=prod_1',
      env: configuredEnv,
      createCheckout: async () => {
        throw {
          statusCode: 401,
          body: JSON.stringify({
            error: 'Unauthorized',
            detail: 'Invalid token polar_oat_test_token',
          }),
        }
      },
    })

    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({
      error: POLAR_CHECKOUT_UNAVAILABLE,
    })
    expect(loggedPayload(error)).toEqual({
      message: 'Polar checkout create failed',
      httpStatus: 401,
      polarCode: 'Unauthorized',
      polarMessage: null,
      hasAccessToken: true,
      hasSuccessUrl: true,
    })
    expect(JSON.stringify(error.mock.calls)).not.toContain(
      configuredEnv.accessToken,
    )
  })
})

describe('POLAR_CHECKOUT_SERVER', () => {
  it('uses the production server option for @polar-sh/nextjs@0.4.11', () => {
    expect(POLAR_CHECKOUT_SERVER).toBe('production')
  })

  it('constructs Polar with server production, not environment', () => {
    const polar = createPolarCheckoutClient('polar_oat_test_token')
    expect(polar._options.server).toBe('production')
    expect(polar._options.serverURL).toBeUndefined()
  })
})

describe('loadPolarCheckoutEnv', () => {
  it('reads Worker bindings from getCloudflareContext at request time', async () => {
    vi.stubEnv('POLAR_ACCESS_TOKEN', 'from_process')
    const env = await loadPolarCheckoutEnv()
    expect(env.accessToken).toBe('from_cf_runtime')
    expect(env.successUrl).toBe('https://www.saas-js.com/success')
    vi.unstubAllEnvs()
  })
})
