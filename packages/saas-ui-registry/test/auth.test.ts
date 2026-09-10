import { describe, expect, it, vi } from 'vitest'

import {
  createSupabaseAccessTokenVerifier,
  isRegistryRequestAuthorized,
  parseBearerToken,
} from '../src/auth.js'

describe('registry access-token authorization', () => {
  it('accepts only a single Bearer credential', () => {
    expect(parseBearerToken('Bearer access-token')).toBe('access-token')
    expect(parseBearerToken('bearer access-token')).toBe('access-token')
    expect(parseBearerToken('Basic access-token')).toBeNull()
    expect(parseBearerToken('Bearer')).toBeNull()
    expect(parseBearerToken('Bearer one two')).toBeNull()
  })

  it('fails closed when Supabase configuration is missing', async () => {
    const fetchImplementation = vi.fn()
    const verify = createSupabaseAccessTokenVerifier({
      fetch: fetchImplementation,
    })

    await expect(verify('access-token')).resolves.toBe(false)
    expect(fetchImplementation).not.toHaveBeenCalled()
  })

  it('validates the access token with the configured Supabase project', async () => {
    const fetchImplementation = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'user-id' }), {
        status: 200,
      }),
    )
    const verify = createSupabaseAccessTokenVerifier({
      supabaseUrl: 'https://project.supabase.co/',
      supabaseAnonKey: 'anon-key',
      fetch: fetchImplementation,
    })

    await expect(verify('valid-token')).resolves.toBe(true)
    expect(fetchImplementation).toHaveBeenCalledWith(
      'https://project.supabase.co/auth/v1/user',
      {
        method: 'GET',
        headers: {
          apikey: 'anon-key',
          Authorization: 'Bearer valid-token',
        },
        cache: 'no-store',
        redirect: 'error',
      },
    )
  })

  it('rejects tokens Supabase does not recognize', async () => {
    const verify = createSupabaseAccessTokenVerifier({
      supabaseUrl: 'https://project.supabase.co',
      supabaseAnonKey: 'anon-key',
      fetch: vi.fn().mockResolvedValue(new Response(null, { status: 401 })),
    })

    await expect(verify('invalid-token')).resolves.toBe(false)
  })

  it('fails closed when the verifier is unavailable', async () => {
    const verify = vi.fn().mockRejectedValue(new Error('network unavailable'))

    await expect(
      isRegistryRequestAuthorized('Bearer access-token', verify),
    ).resolves.toBe(false)
  })
})
