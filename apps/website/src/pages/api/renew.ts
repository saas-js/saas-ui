import { createServerClient } from '@/lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from 'node-fetch'

const syncLicense = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerClient(req, res)
  const { data } = await supabase.auth.getUser()

  await supabase.auth.updateUser({
    data: {
      licenses: [
        {
          licenseKey: req.body.licenseKey,
          githubAccount: req.body.githubAccount,
        },
      ].concat(
        (data.user?.user_metadata.licenses || []).filter(
          ({ licenseKey }) => licenseKey !== req.body.licenseKey
        )
      ),
    },
  })
}

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

async function getLicenseOrder(licenseKey: string) {
  const API_KEY = process.env.LEMON_API_KEY

  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/licenses/validate`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      method: 'POST',
      body: `license_key=${licenseKey}`,
    }
  )

  const data = await response.json()

  if (data.meta?.order_id) {
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/orders/${data.meta.order_id}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    )

    const order = await response.json()

    return order
  }

  return null
}

async function createCheckoutSession({
  licenseKey,
  price,
  email,
}: {
  licenseKey: string
  price: number
  email: string
}) {
  const API_KEY = process.env.LEMON_API_KEY

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://saas-ui.dev'
      : 'http://localhost:3020'

  const postData = JSON.stringify({
    data: {
      type: 'checkouts',
      attributes: {
        custom_price: price,
        product_options: {
          name: 'Saas UI Pro renewal',
          description: '1 year renewal of your Saas UI Pro license.',
          redirect_url: `${baseUrl}/account`,
          receipt_link_url: `${baseUrl}/account`,
        },
        checkout_data: {
          email,
          custom: {
            license_key: licenseKey,
          },
        },
      },
      relationships: {
        store: {
          data: {
            type: 'stores',
            id: '10206',
          },
        },
        variant: {
          data: {
            type: 'variants',
            id: process.env.LEMON_SQUEEZY_RENEW_VARIANT_ID,
          },
        },
      },
    },
  })

  const response = await fetch(`https://api.lemonsqueezy.com/v1/checkouts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: postData,
  })

  const data = await response.json()

  if (data.errors) {
    console.error(data.errors)
    throw new Error(data.errors[0].detail)
  }

  return data.data.attributes.url
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body)

    const order = await getLicenseOrder(body.licenseKey)
    console.log(order)
    const price = order.data.attributes.subtotal * 0.6
    const email = order.data.attributes.user_email

    const url = await createCheckoutSession({
      licenseKey: body.licenseKey,
      price,
      email,
    })

    res.status(200).json({
      success: true,
      url,
    })
  } catch (error) {
    console.error(error)
    return res.status(200).json({ success: false, error: error.toString() })
  }
}

export default handler
