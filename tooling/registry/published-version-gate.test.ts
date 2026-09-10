import { describe, expect, test, vi } from 'vitest'

import {
  NPM_REGISTRY_ORIGIN,
  PublishedVersionCollisionError,
  lookupPublishedVersion,
  verifyPublishedVersionAvailability,
} from './published-version-gate'

const candidates = [
  { name: '@saas-ui/cli', version: '0.1.0-next.2' },
  { name: '@saas-ui/chakra-preset', version: '3.0.0-next.10' },
  { name: '@saas-ui/react', version: '3.0.0-next.56' },
] as const

describe('published version gate', () => {
  test('accepts the transition only when every exact target is unpublished', async () => {
    const lookup = vi.fn(async () => false)

    await expect(
      verifyPublishedVersionAvailability({
        candidates,
        lookup,
        mode: 'planned',
      }),
    ).resolves.toEqual({
      checked: candidates,
      mode: 'planned',
      skipped: false,
      stage: 'target-versions-available',
    })
    expect(lookup).toHaveBeenCalledTimes(3)
  })

  test('skips the early plan lookup after the transition changeset is consumed', async () => {
    const lookup = vi.fn(async () => false)
    await expect(
      verifyPublishedVersionAvailability({
        lookup,
        mode: 'planned-if-pending',
        repositoryRoot: '/definitely/missing/repository',
      }),
    ).resolves.toEqual({
      checked: [],
      mode: 'planned-if-pending',
      skipped: true,
      stage: 'target-versions-available',
    })
    expect(lookup).not.toHaveBeenCalled()
  })

  test('fails closed and reports every occupied target version', async () => {
    const lookup = vi.fn(
      async ({ name }: { name: string }) => name !== '@saas-ui/cli',
    )

    const result = verifyPublishedVersionAvailability({ candidates, lookup })
    await expect(result).rejects.toBeInstanceOf(PublishedVersionCollisionError)
    await expect(result).rejects.toMatchObject({
      collisions: [candidates[1], candidates[2]],
    })
    await expect(result).rejects.toThrow('@saas-ui/react@3.0.0-next.56')
  })

  test('rejects missing, duplicate, or unexpected package candidates', async () => {
    const lookup = vi.fn(async () => false)
    await expect(
      verifyPublishedVersionAvailability({
        candidates: candidates.slice(0, 2),
        lookup,
      }),
    ).rejects.toThrow('must check exactly')
    await expect(
      verifyPublishedVersionAvailability({
        candidates: [candidates[0], candidates[0], candidates[2]],
        lookup,
      }),
    ).rejects.toThrow('must check exactly')
  })

  test('treats a 404 as available and validates published metadata', async () => {
    const missing = vi.fn(async () => new Response(null, { status: 404 }))
    await expect(
      lookupPublishedVersion(candidates[0], missing as typeof fetch),
    ).resolves.toBe(false)
    expect(missing).toHaveBeenCalledWith(
      `${NPM_REGISTRY_ORIGIN}/%40saas-ui%2Fcli/0.1.0-next.2`,
      expect.objectContaining({ redirect: 'error' }),
    )

    const existing = vi.fn(
      async () =>
        new Response(JSON.stringify(candidates[0]), {
          headers: { 'content-type': 'application/json' },
          status: 200,
        }),
    )
    await expect(
      lookupPublishedVersion(candidates[0], existing as typeof fetch),
    ).resolves.toBe(true)
  })

  test('fails closed on registry errors and mismatched metadata', async () => {
    const unavailable = vi.fn(
      async () =>
        new Response(null, { status: 503, statusText: 'Unavailable' }),
    )
    await expect(
      lookupPublishedVersion(candidates[0], unavailable as typeof fetch),
    ).rejects.toThrow('503 Unavailable')

    const mismatch = vi.fn(
      async () =>
        new Response(
          JSON.stringify({ name: '@saas-ui/cli', version: '0.1.0-next.1' }),
          { status: 200 },
        ),
    )
    await expect(
      lookupPublishedVersion(candidates[0], mismatch as typeof fetch),
    ).rejects.toThrow('mismatched metadata')
  })
})
