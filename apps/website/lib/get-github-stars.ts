import { Octokit } from '@octokit/rest'

import { numberFormatter } from './number-formatter'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function getGithubStars() {
  let count: number

  try {
    const repo = await octokit.repos.get({
      owner: 'saas-js',
      repo: 'saas-ui',
    })
    count = repo.data.stargazers_count
  } catch (error) {
    count = 1500
  }

  return {
    count,
    prettyCount: numberFormatter.format(count),
  }
}
