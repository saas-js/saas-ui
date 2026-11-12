import { readdir } from 'node:fs/promises'
import { join, resolve, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

import { resolveSaasUiRedirect, saasUiRedirects } from './saas-ui-redirects'
import { starterKitPages } from './starter-kit-pages'

const websiteRoot = resolve(import.meta.dirname, '../..')
const SAAS_JS = 'https://www.saas-js.com'

function isRouteGroup(segment: string) {
  return segment.startsWith('(') && segment.endsWith(')')
}

async function listFiles(dir: string) {
  const entries = await readdir(dir, { recursive: true })
  return entries.map((entry) =>
    typeof entry === 'string' ? entry : entry.toString(),
  )
}

async function saasUiDestinations() {
  const destinations = new Set<string>()

  const docsRoot = join(websiteRoot, 'content/saas-ui/docs')
  for (const rel of await listFiles(docsRoot)) {
    if (!rel.endsWith('.mdx')) continue
    const parts = rel.split(sep).filter((part) => !isRouteGroup(part))
    const file = parts.pop()
    if (!file) continue
    const slug = file.slice(0, -'.mdx'.length)
    const segments = slug === 'index' ? parts : [...parts, slug]
    destinations.add(segments.length ? `/docs/${segments.join('/')}` : '/docs')
  }

  const appRoot = join(websiteRoot, 'app/ui')
  for (const rel of await listFiles(appRoot)) {
    const parts = rel.split(sep).filter((part) => !isRouteGroup(part))
    const file = parts.pop()
    if (file !== 'page.tsx' && file !== 'route.ts') continue
    if (parts.some((part) => part.includes('['))) continue
    destinations.add(parts.length ? `/${parts.join('/')}` : '/')
  }

  return destinations
}

async function kitSubpaths(kit: string) {
  const dir = join(websiteRoot, 'content/saas-js/docs/starter-kits', kit)
  const subpaths: string[] = []
  for (const rel of await listFiles(dir)) {
    if (!rel.endsWith('.mdx')) continue
    const parts = rel.split(sep)
    const file = parts.pop()
    if (!file) continue
    const slug = file.slice(0, -'.mdx'.length)
    const segments = slug === 'index' ? parts : [...parts, slug]
    if (segments.length) subpaths.push(segments.join('/'))
  }
  return subpaths.sort()
}

describe('resolveSaasUiRedirect', () => {
  it('resolves an exact legacy path', () => {
    expect(resolveSaasUiRedirect('/docs/components/layout/app-shell')).toBe(
      '/docs/components/app-shell',
    )
  })

  it('prefers an exact entry over the sub-page fallback', () => {
    expect(
      resolveSaasUiRedirect('/docs/components/feedback/loader/props'),
    ).toBe('/docs/components/spinner')
  })

  it('resolves an unlisted /theming sub-page through its mapped parent', () => {
    // Was 404ing in production and still collecting impressions.
    expect(
      resolveSaasUiRedirect('/docs/components/date-time/date-input/theming'),
    ).toBe('/docs/components/date-picker')
  })

  it('resolves an unlisted /props sub-page through its mapped parent', () => {
    expect(resolveSaasUiRedirect('/docs/components/web3/address/props')).toBe(
      '/docs/components/overview',
    )
  })

  it('falls back to the parent when the parent is a current page', () => {
    expect(resolveSaasUiRedirect('/docs/components/navbar/theming')).toBe(
      '/docs/components/navbar',
    )
  })

  it('leaves current pages alone', () => {
    expect(resolveSaasUiRedirect('/docs/components/navbar')).toBeUndefined()
    expect(
      resolveSaasUiRedirect('/docs/components/format-date'),
    ).toBeUndefined()
    expect(resolveSaasUiRedirect('/')).toBeUndefined()
  })

  it('only applies the sub-page fallback inside /docs', () => {
    expect(resolveSaasUiRedirect('/blocks/theming')).toBeUndefined()
  })

  it('sends both kit URLs to saas-js.com, where the kits live', () => {
    expect(resolveSaasUiRedirect('/nextjs')).toBe(
      'https://www.saas-js.com/nextjs',
    )
    expect(resolveSaasUiRedirect('/tanstack-start')).toBe(
      'https://www.saas-js.com/',
    )
  })

  it('ignores a trailing slash', () => {
    expect(resolveSaasUiRedirect('/docs/components/layout/app-shell/')).toBe(
      '/docs/components/app-shell',
    )
  })

  it('sends legacy Search Console URLs to the closest current page', () => {
    const cases: Array<[string, string]> = [
      ['/docs/components/overlay/menu-dialog', '/docs/components/menu'],
      [
        '/docs/core/theming/customize-theme',
        '/docs/theming/customization/overview',
      ],
      ['/docs/components/data-display/persona', '/docs/components/persona'],
      ['/docs/components/engagement/tour', '/docs/components/overview'],
      ['/docs/components/engagement/tour-dialog', '/docs/components/overview'],
      ['/docs/components/forms/array-field', '/docs/forms/fields'],
      ['/docs/hooks/use-collapse', '/docs/components/collapsible'],
      ['/docs/components/engagement/benefits-modal', '/docs/components/dialog'],
      ['/docs/components/layout/page', '/docs/components/page'],
      ['/docs/components/visualization/sparkline', '/docs/charts/overview'],
      ['/docs/components/visualization/bar-chart', '/docs/charts/bar'],
      [
        '/docs/components/date-time/date-range-picker',
        '/docs/components/date-picker',
      ],
      [
        '/docs/components/date-time/date-picker-static',
        '/docs/components/date-picker',
      ],
      [
        '/docs/guides/auth/custom-auth-service',
        `${SAAS_JS}/docs/starter-kits/nextjs/authentication/better-auth`,
      ],
      ['/docs/guides', '/docs/getting-started/introduction'],
      ['/docs/core/upgrading-to-v2', '/docs/getting-started/migration'],
      ['/docs/components/layout/split-page', '/docs/components/split-page'],
      ['/docs/components/data-display/command', '/docs/components/overview'],
      ['/docs/components/overlay/responsive-menu', '/docs/components/menu'],
      ['/docs/components/layout/section', '/docs/components/page'],
      ['/docs/feedback/nprogress', '/docs/components/progress'],
      ['/login', `${SAAS_JS}/`],
      ['/redeem', `${SAAS_JS}/`],
      ['/pro/starter-kits', `${SAAS_JS}/`],
      ['/pro/figma', '/figma'],
      ['/pro/blocks', '/blocks'],
      ['/resources', '/'],
    ]

    expect(cases.map(([from]) => [from, resolveSaasUiRedirect(from)])).toEqual(
      cases,
    )
  })

  it('resolves an unlisted /usage sub-page through its mapped parent', () => {
    expect(
      resolveSaasUiRedirect('/docs/components/date-time/date-picker/usage'),
    ).toBe('/docs/components/date-picker')
    expect(
      resolveSaasUiRedirect(
        '/docs/components/date-time/date-range-input/usage',
      ),
    ).toBe('/docs/components/date-picker')
    expect(
      resolveSaasUiRedirect('/docs/components/date-time/date-input/usage'),
    ).toBe('/docs/components/date-picker')
    expect(
      resolveSaasUiRedirect('/docs/components/data-display/empty-state/usage'),
    ).toBe('/docs/components/empty-state')
  })

  it('maps missing starter-kit sections onto the page that exists for that kit', () => {
    const next = `${SAAS_JS}/docs/starter-kits/nextjs`
    const tanstack = `${SAAS_JS}/docs/starter-kits/tanstack-start`
    const cases: Array<[string, string]> = [
      [
        '/docs/nextjs-starter-kit/authentication/supabase',
        `${next}/authentication/better-auth`,
      ],
      [
        '/docs/nextjs-starter-kit/authentication/authjs',
        `${next}/authentication/better-auth`,
      ],
      [
        '/docs/nextjs-starter-kit/authentication',
        `${next}/authentication/better-auth`,
      ],
      [
        '/docs/nextjs-starter-kit/installation',
        `${next}/installation/clone-repository`,
      ],
      [
        '/docs/nextjs-starter-kit/installation/using-pnpm',
        `${next}/installation/clone-repository`,
      ],
      ['/docs/nextjs-starter-kit/database', `${next}/database/overview`],
      [
        '/docs/tanstack-router-starter-kit/authentication/supabase',
        `${tanstack}/authentication/better-auth`,
      ],
      [
        '/docs/tanstack-router-starter-kit/authentication',
        `${tanstack}/authentication/better-auth`,
      ],
      [
        '/docs/tanstack-router-starter-kit/installation/using-pnpm',
        `${tanstack}/installation`,
      ],
      ['/docs/tanstack-router-starter-kit/database', `${tanstack}/database`],
    ]

    expect(cases.map(([from]) => [from, resolveSaasUiRedirect(from)])).toEqual(
      cases,
    )
  })

  it('copies a starter-kit subpath that still exists', () => {
    expect(
      resolveSaasUiRedirect(
        '/docs/nextjs-starter-kit/installation/clone-repository',
      ),
    ).toBe(`${SAAS_JS}/docs/starter-kits/nextjs/installation/clone-repository`)
    expect(
      resolveSaasUiRedirect(
        '/docs/tanstack-router-starter-kit/database/schema',
      ),
    ).toBe(`${SAAS_JS}/docs/starter-kits/tanstack-start/database/schema`)
  })

  it('falls back to the kit root when a starter-kit subpath has no page', () => {
    expect(
      resolveSaasUiRedirect('/docs/nextjs-starter-kit/theming/does-not-exist'),
    ).toBe(`${SAAS_JS}/docs/starter-kits/nextjs`)
    expect(
      resolveSaasUiRedirect(
        '/docs/tanstack-router-starter-kit/billing/not-a-page',
      ),
    ).toBe(`${SAAS_JS}/docs/starter-kits/tanstack-start`)
  })

  it('still copies blog posts onto saas-js.com', () => {
    expect(resolveSaasUiRedirect('/blog/some-post')).toBe(
      `${SAAS_JS}/blog/some-post`,
    )
  })

  it('points every relative redirect at a page that exists', async () => {
    const destinations = await saasUiDestinations()
    const missing = Object.entries(saasUiRedirects)
      .filter(([, to]) => to.startsWith('/'))
      .filter(([, to]) => !destinations.has(to))
      .map(([from, to]) => `${from} -> ${to}`)

    expect(missing).toEqual([])
  })

  it('keeps the starter-kit page list aligned with the docs', async () => {
    expect([...starterKitPages.nextjs].sort()).toEqual(
      await kitSubpaths('nextjs'),
    )
    expect([...starterKitPages['tanstack-start']].sort()).toEqual(
      await kitSubpaths('tanstack-start'),
    )
  })
})
