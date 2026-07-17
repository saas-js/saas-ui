import { getLatestChangelog } from '@/lib/get-latest-changelog'

import { HeroTanStackSection, HeroUI, NextjsHeroUI } from './hero.ui'

const starterKitProducts = ['tanstack', 'tanstack-start', 'nextjs']

function toChangelogLink(changelog: { title: string; slug: string } | null) {
  if (!changelog) return null

  return {
    title: changelog.title,
    link: `/changelog/${changelog.slug}`,
  }
}

export const HeroSection = () => {
  const latestChangelog = toChangelogLink(
    getLatestChangelog(starterKitProducts),
  )

  return <HeroUI latestChangelog={latestChangelog} />
}

export const NextjsSection = () => {
  const latestChangelog = toChangelogLink(getLatestChangelog(['nextjs']))

  return <NextjsHeroUI latestChangelog={latestChangelog} />
}

export { HeroTanStackSection }
