import type { NextRequest } from 'next/server'

async function loadFromAssets(filename: string) {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    const assets = env?.ASSETS
    if (!assets) return null
    const res = await assets.fetch(
      new Request(`https://assets.local/fonts/${filename}`),
    )
    if (!res.ok) return null
    return res.arrayBuffer()
  } catch {
    return null
  }
}

async function loadFromDisk(filename: string) {
  try {
    const { readFile } = await import('node:fs/promises')
    const { join } = await import('node:path')
    return await readFile(join(process.cwd(), 'public/fonts', filename))
  } catch {
    return null
  }
}

/**
 * Load a `public/fonts` file on Node (Vercel) and Workers.
 * `fetch(new URL(..., import.meta.url))` becomes `file://` after OpenNext
 * bundles the route, which workerd cannot fetch.
 */
export async function loadOgFont(req: NextRequest, filename: string) {
  const fromAssets = await loadFromAssets(filename)
  if (fromAssets) return fromAssets

  const fromDisk = await loadFromDisk(filename)
  if (fromDisk) return fromDisk

  const res = await fetch(new URL(`/fonts/${filename}`, req.nextUrl.origin))
  if (!res.ok) {
    throw new Error(`Failed to load font ${filename}: ${res.status}`)
  }
  return res.arrayBuffer()
}
