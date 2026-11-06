import { Polar } from '@polar-sh/sdk'
import type { CheckoutCreate } from '@polar-sh/sdk/models/components/checkoutcreate.js'
import { NextResponse } from 'next/server'

import { type PolarCheckoutEnv, isPolarSuccessUrl } from './polar-checkout-env'

export {
  isPolarSuccessUrl,
  loadPolarCheckoutEnv,
  resolvePolarCheckoutEnv,
  type PolarCheckoutEnv,
} from './polar-checkout-env'

/**
 * `@polar-sh/nextjs@0.4.11` CheckoutConfig uses `server`, not `environment`.
 * `@polar-sh/sdk@0.41.5` Polar constructor matches that option.
 */
export const POLAR_CHECKOUT_SERVER = 'production' as const

export const POLAR_CHECKOUT_UNAVAILABLE =
  'Checkout is unavailable. Please try again.'
export const POLAR_CHECKOUT_NOT_CONFIGURED = 'Checkout is not configured'

export type PolarCheckoutDiagnostics = {
  httpStatus?: number
  polarCode?: string
  polarMessage?: string
  hasAccessToken: boolean
  hasSuccessUrl: boolean
}

export type PolarCheckoutCreateInput = {
  products: string[]
  successUrl: string
  customerId?: string
  externalCustomerId?: string
  customerEmail?: string
  customerName?: string
  customerBillingAddress?: unknown
  customerTaxId?: string
  customerIpAddress?: string
  customerMetadata?: unknown
  allowDiscountCodes?: boolean
  discountId?: string
  metadata?: unknown
}

export type PolarCheckoutCreateFn = (
  input: PolarCheckoutCreateInput,
) => Promise<{ url: string }>

export function createPolarCheckoutClient(accessToken: string) {
  return new Polar({
    accessToken,
    server: POLAR_CHECKOUT_SERVER,
  })
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value
  }
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
}

function looksLikeSecret(value: string) {
  return /polar_(?:oat|at|org)_/i.test(value)
}

function sanitizeDiagnosticText(value?: string) {
  if (!value || looksLikeSecret(value)) return undefined
  return value
}

function polarDetailMessage(detail: unknown): string | undefined {
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        const rec = asRecord(item)
        return firstString(rec?.msg, rec?.message)
      })
      .filter((part): part is string => Boolean(part))
    return parts.length > 0 ? parts.join('; ') : undefined
  }
  return firstString(asRecord(detail)?.message)
}

export function polarCheckoutDiagnostics(
  error: unknown,
  env: PolarCheckoutEnv,
): PolarCheckoutDiagnostics {
  const polarError = asRecord(error) ?? {}
  const statusCode = polarError.statusCode ?? polarError.status
  const httpStatus = typeof statusCode === 'number' ? statusCode : undefined

  let parsedBody = asRecord(polarError.body)
  if (typeof polarError.body === 'string') {
    try {
      parsedBody = asRecord(JSON.parse(polarError.body))
    } catch {
      parsedBody = undefined
    }
  }

  return {
    httpStatus,
    polarCode: sanitizeDiagnosticText(
      firstString(
        parsedBody?.error,
        parsedBody?.code,
        parsedBody?.type,
        polarError.code,
      ),
    ),
    polarMessage: sanitizeDiagnosticText(
      polarDetailMessage(parsedBody?.detail) ??
        firstString(parsedBody?.message, polarError.message),
    ),
    hasAccessToken: Boolean(env.accessToken),
    hasSuccessUrl: Boolean(env.successUrl),
  }
}

export function logPolarCheckoutFailure(
  message: string,
  diagnostics: PolarCheckoutDiagnostics,
) {
  console.error(
    JSON.stringify({
      message,
      httpStatus: diagnostics.httpStatus ?? null,
      polarCode: diagnostics.polarCode ?? null,
      polarMessage: diagnostics.polarMessage ?? null,
      hasAccessToken: diagnostics.hasAccessToken,
      hasSuccessUrl: diagnostics.hasSuccessUrl,
    }),
  )
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

function parseJsonParam(search: URLSearchParams, key: string) {
  if (!search.has(key)) return undefined
  return JSON.parse(search.get(key) ?? '{}')
}

export function polarCheckoutCreateInput(
  search: URLSearchParams,
  successUrl: string,
): PolarCheckoutCreateInput {
  const success = new URL(successUrl)
  success.searchParams.set('checkoutId', '{CHECKOUT_ID}')

  return {
    products: search.getAll('products').filter(Boolean),
    successUrl: decodeURI(success.toString()),
    customerId: search.get('customerId') ?? undefined,
    externalCustomerId: search.get('customerExternalId') ?? undefined,
    customerEmail: search.get('customerEmail') ?? undefined,
    customerName: search.get('customerName') ?? undefined,
    customerBillingAddress: parseJsonParam(search, 'customerBillingAddress'),
    customerTaxId: search.get('customerTaxId') ?? undefined,
    customerIpAddress: search.get('customerIpAddress') ?? undefined,
    customerMetadata: parseJsonParam(search, 'customerMetadata'),
    allowDiscountCodes: search.has('allowDiscountCodes')
      ? search.get('allowDiscountCodes') === 'true'
      : undefined,
    discountId: search.get('discountId') ?? undefined,
    metadata: parseJsonParam(search, 'metadata'),
  }
}

function defaultCreateCheckout(accessToken: string): PolarCheckoutCreateFn {
  return async (input) => {
    const result = await createPolarCheckoutClient(
      accessToken,
    ).checkouts.create(input as CheckoutCreate)
    return { url: result.url }
  }
}

export async function handlePolarCheckoutRequest(options: {
  requestUrl: string | URL
  env: PolarCheckoutEnv
  createCheckout?: PolarCheckoutCreateFn
}) {
  const url = new URL(options.requestUrl)
  const products = url.searchParams.getAll('products').filter(Boolean)

  if (products.length === 0) {
    return jsonError('Missing products in query params', 400)
  }

  const { accessToken, successUrl } = options.env
  if (!accessToken || !successUrl || !isPolarSuccessUrl(successUrl)) {
    logPolarCheckoutFailure(POLAR_CHECKOUT_NOT_CONFIGURED, {
      hasAccessToken: Boolean(accessToken),
      hasSuccessUrl: Boolean(successUrl),
    })
    return jsonError(POLAR_CHECKOUT_NOT_CONFIGURED, 503)
  }

  const createCheckout =
    options.createCheckout ?? defaultCreateCheckout(accessToken)

  try {
    const result = await createCheckout(
      polarCheckoutCreateInput(url.searchParams, successUrl),
    )
    return NextResponse.redirect(result.url)
  } catch (error) {
    logPolarCheckoutFailure(
      'Polar checkout create failed',
      polarCheckoutDiagnostics(error, options.env),
    )
    return jsonError(POLAR_CHECKOUT_UNAVAILABLE, 500)
  }
}
