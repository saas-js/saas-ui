import { describe, expect, it, vi } from 'vitest'

import {
  getStarterKitLastUpdated,
  pickLatestUpdate,
} from './starter-kit-updated-at'

const now = () => new Date('2026-11-06T12:00:00.000Z')

describe('pickLatestUpdate', () => {
  it('uses the latest starter-kit updated_at', () => {
    expect(
      pickLatestUpdate(
        [
          new Date('2026-01-01T12:00:00.000Z'),
          new Date('2026-10-15T12:00:00.000Z'),
        ],
        now,
      ),
    ).toBe('Oct 15, 2026')
  })

  it('falls back to today when every fetch failed', () => {
    expect(pickLatestUpdate([null, undefined], now)).toBe('Nov 6, 2026')
  })
})

describe('getStarterKitLastUpdated', () => {
  it('skips GitHub when GITHUB_PERSONAL_TOKEN is missing', async () => {
    const getRepo = vi.fn()

    await expect(getStarterKitLastUpdated({ token: '', now })).resolves.toBe(
      'Nov 6, 2026',
    )
    expect(getRepo).not.toHaveBeenCalled()
  })

  it('keeps the successful kit when the other repo throws', async () => {
    const lastUpdated = await getStarterKitLastUpdated({
      token: 'test-token',
      now,
      getRepo: async (repo) => {
        if (repo.repo === 'saas-ui-pro-nextjs-starter-kit') {
          const error = new Error('Not Found') as Error & { status: number }
          error.status = 404
          throw error
        }
        return { updated_at: '2026-09-01T12:00:00.000Z' }
      },
    })

    expect(lastUpdated).toBe('Sep 1, 2026')
  })

  it('falls back to today when GitHub returns 403/404/429', async () => {
    await expect(
      getStarterKitLastUpdated({
        token: 'bad-token',
        now,
        getRepo: async () => {
          const error = new Error('rate limited') as Error & {
            status: number
          }
          error.status = 429
          throw error
        },
      }),
    ).resolves.toBe('Nov 6, 2026')
  })
})
