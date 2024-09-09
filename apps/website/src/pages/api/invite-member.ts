import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from 'node-fetch'

const sendDiscordNotification = async ({
  licenseKey,
  team,
  githubAccount,
  githubInvited,
  npmAccount,
}) => {
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
  try {
    if (DISCORD_WEBHOOK) {
      const body = JSON.stringify({
        content: `A member has been added`,
        embeds: [
          {
            fields: [
              {
                name: 'License key',
                value: licenseKey,
              },
              {
                name: 'Team',
                value: team,
              },
              {
                name: 'Github',
                value: githubAccount,
              },
              {
                name: 'Github Invited',
                value: githubInvited || 'Failed',
              },
              {
                name: 'Npm account',
                value: npmAccount?.id || npmAccount?.message || 'Failed',
              },
            ],
          },
        ],
      })
      const result = await fetch(DISCORD_WEBHOOK, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      })
      return result
    }
  } catch (err) {
    console.error(err)
  }
}

const sendDiscordError = async ({ licenseKey, githubAccount, team, error }) => {
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
  try {
    if (DISCORD_WEBHOOK) {
      return await fetch(DISCORD_WEBHOOK, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          content: `Add member failed 🤯`,
          embeds: [
            {
              fields: [
                {
                  name: 'License key',
                  value: licenseKey,
                },
                {
                  name: 'Team',
                  value: team,
                },
                {
                  name: 'Github',
                  value: githubAccount,
                },
                {
                  name: 'Error',
                  value: error.toString(),
                },
              ],
            },
          ],
        }),
      })
    }
  } catch (err) {
    console.error(err)
  }
}

const inviteGithubTeamMember = async (username: string, team: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/orgs/saas-js/teams/${team}/memberships/${username}`,
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(process.env.GITHUB_PERSONAL_TOKEN!).toString('base64'),
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          role: 'member',
        }),
      }
    )

    return response.status === 200
  } catch (err) {
    console.error(err)
  }
}

const redeemLemon = async (licenseKey, githubAccount) => {
  const API_KEY = process.env.LEMON_API_KEY

  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/licenses/activate`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      method: 'POST',
      body: `instance_name=${githubAccount}&license_key=${licenseKey}`,
    }
  )

  const result = await response.json()

  return {
    email: result.meta?.customer_email,
    product: result.meta?.variant_name,
    error: result.error,
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await redeemLemon(
      req.body.licenseKey,
      req.body.githubAccount
    )

    if (result.error) {
      sendDiscordError({
        licenseKey: req.body.licenseKey,
        team: req.body.team,
        githubAccount: req.body.githubAccount,
        error: result.error,
      })
      return res.status(200).json({ success: false, error: result.error })
    }

    const githubInvited = await inviteGithubTeamMember(
      req.body.githubAccount,
      req.body.team
    )

    const npmUsername = req.body.githubAccount.toLowerCase()
    const npmPassword = randomUUID()

    const npmAccount = await addNpmAccount(
      npmUsername,
      npmPassword,
      req.body.email
    )

    await sendDiscordNotification({
      licenseKey: req.body.licenseKey,
      githubAccount: req.body.githubAccount,
      team: req.body.team,
      githubInvited,
      npmAccount,
    })

    res.status(200).json({
      success: true,
      npm: npmAccount?.id
        ? {
            username: npmUsername,
            password: npmPassword,
          }
        : {
            error: npmAccount?.message,
          },
    })
  } catch (error) {
    sendDiscordError({
      licenseKey: req.body.licenseKey,
      githubAccount: req.body.githubAccount,
      team: req.body.team,
      error,
    })
    return res.status(200).json({ success: false, error: error.toString() })
  }
}

const addNpmAccount = async (username, password, email) => {
  try {
    if (!process.env.CLOUDRON_URL) {
      return
    }

    const response = await fetch(`${process.env.CLOUDRON_URL}/api/v1/users`, {
      headers: {
        Authorization: 'Bearer ' + process.env.CLOUDRON_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        username,
        displayName: username.toLowerCase(),
        password,
        admin: false,
      }),
    })

    const result = await response.json()

    return result
  } catch (err) {
    console.error(err)
  }
}

export default handler
