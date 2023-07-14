import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from 'node-fetch'

const sendDiscordNotification = async ({
  licenseKey,
  product,
  githubAccount,
  githubInvited,
  npmAccount,
}) => {
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
  try {
    if (DISCORD_WEBHOOK) {
      const body = JSON.stringify({
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

const sendDiscordError = async ({ licenseKey, githubAccount, error }) => {
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
  try {
    if (DISCORD_WEBHOOK) {
      return await fetch(DISCORD_WEBHOOK, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          content: `Redeem failed 🤯`,
          embeds: [
            {
              fields: [
                {
                  name: 'License key',
                  value: licenseKey,
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

const isLemonLicense = (licenseKey) => {
  return !!licenseKey.match(
    /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
  )
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

const isGumroadLicense = (licenseKey) => {
  return !!licenseKey.match(
    /^[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}$/i
  )
}

const redeemGumroad = async (licenseKey) => {
  const API_KEY = process.env.GUMROAD_API_KEY
  const PRODUCT = process.env.GUMROAD_PRODUCT_PERMALINK
  const response = await fetch(`https://api.gumroad.com/v2/licenses/verify`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: `accessToken=${API_KEY}&product_permalink=${PRODUCT}&license_key=${licenseKey}`,
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

  return {
    email: result?.purchase?.email,
    product: result?.purchase?.product_name,
    error,
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const DISCORD_INVITE = process.env.DISCORD_INVITE
    const TEST_LICENSE = process.env.GUMROAD_TEST_LICENSE

    const isTest = req.body.licenseKey === TEST_LICENSE

    let result
    if (isGumroadLicense(req.body.licenseKey)) {
      result = await redeemGumroad(req.body.licenseKey)
    } else if (isLemonLicense(req.body.licenseKey)) {
      result = await redeemLemon(req.body.licenseKey, req.body.githubAccount)
    }

    if (!isTest && result.error) {
      sendDiscordError({
        licenseKey: req.body.licenseKey,
        githubAccount: req.body.githubAccount,
        error: result.error,
      })
      return res.status(200).json({ success: false, error: result.error })
    }

    const githubInvited = await addGithubCollaborator(req.body.githubAccount)

    const npmAccount = await addNpmAccount(
      req.body.githubAccount.toLowerCase(),
      req.body.licenseKey,
      result.email
    )

    await sendDiscordNotification({
      licenseKey: req.body.licenseKey,
      githubAccount: req.body.githubAccount,
      product: result.product,
      githubInvited,
      npmAccount,
    })

    res.status(200).json({
      success: true,
      discordInvite: DISCORD_INVITE,
      githubInvited,
    })
  } catch (error) {
    sendDiscordError({
      licenseKey: req.body.licenseKey,
      githubAccount: req.body.githubAccount,
      error,
    })
    return res.status(200).json({ success: false, error: error.toString() })
  }
}

const addNpmAccount = async (username, key, email) => {
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
        password: key,
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
