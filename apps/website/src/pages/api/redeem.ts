import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from 'node-fetch'

const sendDiscordNotification = async ({
  licenseKey,
  product,
  githubAccount,
  githubInvited,
}) => {
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
  try {
    if (DISCORD_WEBHOOK) {
      return await fetch(DISCORD_WEBHOOK, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          content: `A license has been activated 🚀`,
          embeds: [
            {
              fields: [
                {
                  name: 'License key',
                  value: licenseKey,
                },
                {
                  name: 'Product',
                  value: product,
                },
                {
                  name: 'Github',
                  value: githubAccount,
                },
                {
                  name: 'Invited',
                  value: githubInvited,
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

const addGithubCollaborator = async (username) => {
  try {
    if (!process.env.GITHUB_PERSONAL_TOKEN) {
      return
    }

    const response = await fetch(
      `https://api.github.com/repos/saas-js/saas-ui-pro/collaborators/${username}`,
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(process.env.GITHUB_PERSONAL_TOKEN).toString('base64'),
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          permission: 'pull',
        }),
      }
    )

    const result = await response.json()

    return !!result.id
  } catch (err) {
    console.error(err)
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const API_KEY = process.env.GUMROAD_API_KEY
  const PRODUCT = process.env.GUMROAD_PRODUCT_PERMALINK
  const DISCORD_INVITE = process.env.DISCORD_INVITE

  const response = await fetch(`https://api.gumroad.com/v2/licenses/verify`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: `accessToken=${API_KEY}&product_permalink=${PRODUCT}&license_key=${req.body.licenseKey}`,
  })

  const result = await response.json()

  let error
  if (response.status === 404) {
    error = 'Invalid license key'
  } else if (response.status !== 200) {
    error = 'Failed to activate your license key'
  } else if (result.uses > 2 || result.uses > result.purchase.quantity) {
    error = 'This license key has already been activated'
  }

  if (!result.success || error) {
    return res
      .status(200)
      .json({ success: false, error: result.message || error })
  }

  const githubInvited = await addGithubCollaborator(req.body.githubAccount)

  await sendDiscordNotification({
    licenseKey: req.body.licenseKey,
    githubAccount: req.body.githubAccount,
    product: result.purchase.product_name,
    githubInvited,
  })

  res.status(200).json({
    success: true,
    discordInvite: DISCORD_INVITE,
    githubInvited,
  })
}

export default handler
