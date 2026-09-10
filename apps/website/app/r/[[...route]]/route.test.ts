import { describe, expect, it, vi } from 'vitest'

import { createRegistryApp } from '../registry-app'

const privateItemUrl = 'http://localhost/r/styles/default/private-item.json'
const publicItemUrl = 'http://localhost/r/styles/default/public-item.json'
const rewrittenPublicItemUrl =
  'http://localhost/ui/r/styles/default/public-item.json'

function createTestApp() {
  const verifyAccessToken = vi.fn(async (token: string) => {
    return token === 'valid-token'
  })

  const app = createRegistryApp({
    verifyAccessToken,
    loadRegistryItem: async (_style, component) => ({
      name: component,
      private: component === 'private-item.json',
      type: 'registry:block',
    }),
  })

  return { app, verifyAccessToken }
}

describe('website registry authorization', () => {
  it('validates registry payloads before trusting private metadata', async () => {
    const verifyAccessToken = vi.fn(async () => true)
    const app = createRegistryApp({
      loadRegistryItem: async () => ({ private: false }),
      verifyAccessToken,
    })

    const response = await app.request(publicItemUrl)

    expect(response.status).toBe(500)
    expect(verifyAccessToken).not.toHaveBeenCalled()
  })

  it('requires bearer credentials for private registry payloads', async () => {
    const { app, verifyAccessToken } = createTestApp()
    const response = await app.request(privateItemUrl)

    expect(response.status).toBe(401)
    expect(response.headers.get('WWW-Authenticate')).toBe('Bearer')
    expect(response.headers.get('Cache-Control')).toBe('private, no-store')
    expect(verifyAccessToken).not.toHaveBeenCalled()
  })

  it('rejects invalid access tokens', async () => {
    const { app, verifyAccessToken } = createTestApp()
    const response = await app.request(privateItemUrl, {
      headers: { Authorization: 'Bearer invalid-token' },
    })

    expect(response.status).toBe(401)
    expect(response.headers.get('WWW-Authenticate')).toBe('Bearer')
    expect(response.headers.get('Cache-Control')).toBe('private, no-store')
    expect(response.headers.get('Vary')).toBe('Authorization, Cookie')
    expect(verifyAccessToken).toHaveBeenCalledWith('invalid-token')
  })

  it('serves validated private payloads without caching them', async () => {
    const { app, verifyAccessToken } = createTestApp()
    const response = await app.request(privateItemUrl, {
      headers: { Authorization: 'Bearer valid-token' },
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('private, no-store')
    expect(response.headers.get('Vary')).toBe('Authorization, Cookie')
    expect(verifyAccessToken).toHaveBeenCalledWith('valid-token')
  })

  it('serves public payloads without authentication', async () => {
    const { app, verifyAccessToken } = createTestApp()
    const response = await app.request(publicItemUrl)

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('max-age=3600')
    expect(verifyAccessToken).not.toHaveBeenCalled()
  })

  it('serves the same public payload after the saas-ui.dev /ui rewrite', async () => {
    const { app, verifyAccessToken } = createTestApp()
    const response = await app.request(rewrittenPublicItemUrl)

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('max-age=3600')
    expect(verifyAccessToken).not.toHaveBeenCalled()
  })
})
