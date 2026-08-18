export interface NpmPackageStats {
  version?: string
  weeklyDownloads?: number
  lastUpdated?: Date
}

interface NpmPackument {
  'dist-tags'?: { latest?: string }
  time?: Record<string, string>
}

interface NpmDownloadsPoint {
  downloads?: number
}

export async function getNpmPackageStats(
  name: string,
): Promise<NpmPackageStats> {
  const encoded = encodeURIComponent(name)

  const [packument, downloads] = await Promise.all([
    fetchNpmJson<NpmPackument>(`https://registry.npmjs.org/${encoded}`),
    fetchNpmJson<NpmDownloadsPoint>(
      `https://api.npmjs.org/downloads/point/last-week/${encoded}`,
    ),
  ])

  const version = packument?.['dist-tags']?.latest
  const modified =
    packument?.time?.[version ?? 'modified'] ?? packument?.time?.modified

  return {
    version,
    weeklyDownloads:
      typeof downloads?.downloads === 'number'
        ? downloads.downloads
        : undefined,
    lastUpdated: modified ? new Date(modified) : undefined,
  }
}

export function formatWeeklyDownloads(count: number) {
  const formatted =
    count >= 1_000_000
      ? `${trimDecimal(count / 1_000_000)}M`
      : count >= 1_000
        ? `${trimDecimal(count / 1_000)}K`
        : String(count)

  return `${formatted} weekly`
}

export function formatRelativeDate(date: Date) {
  const days = Math.round((Date.now() - date.getTime()) / 86_400_000)

  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`

  const months = Math.round(days / 30)
  if (months === 1) return 'a month ago'
  if (months < 12) return `${months} months ago`

  const years = Math.round(days / 365)
  return years === 1 ? 'a year ago' : `${years} years ago`
}

function trimDecimal(value: number) {
  return value >= 10 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, '')
}

async function fetchNpmJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 86_400 },
      headers: { accept: 'application/json' },
    })

    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}
