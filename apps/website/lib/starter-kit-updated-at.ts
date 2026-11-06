import { Octokit } from '@octokit/rest'

const STARTER_KITS = [
  { owner: 'saas-js', repo: 'saas-ui-pro-nextjs-starter-kit' },
  { owner: 'saas-js', repo: 'vite-tanstack-router-starter-kit' },
] as const

export type StarterKitRepo = (typeof STARTER_KITS)[number]

export function formatLastUpdated(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function pickLatestUpdate(
  dates: Array<Date | null | undefined>,
  now: () => Date = () => new Date(),
) {
  const timestamps = dates
    .filter(
      (date): date is Date =>
        date instanceof Date && !Number.isNaN(date.getTime()),
    )
    .map((date) => date.getTime())

  return formatLastUpdated(
    timestamps.length > 0 ? new Date(Math.max(...timestamps)) : now(),
  )
}

export async function getStarterKitLastUpdated(options?: {
  token?: string | undefined
  now?: () => Date
  getRepo?: (repo: StarterKitRepo) => Promise<{ updated_at?: string | null }>
}) {
  const token = options?.token ?? process.env.GITHUB_PERSONAL_TOKEN
  const now = options?.now
  let getRepo = options?.getRepo

  if (!getRepo) {
    if (!token) return pickLatestUpdate([], now)
    const octokit = new Octokit({ auth: token })
    getRepo = async (repo: StarterKitRepo) => {
      const result = await octokit.repos.get(repo)
      return result.data
    }
  }

  const dates = await Promise.all(
    STARTER_KITS.map(async (kit) => {
      try {
        const data = await getRepo(kit)
        return data.updated_at ? new Date(data.updated_at) : null
      } catch {
        return null
      }
    }),
  )

  return pickLatestUpdate(dates, now)
}
