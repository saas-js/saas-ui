import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'node:crypto'
import type { Readable } from 'node:stream'

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks: Array<Buffer> = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const buf = await getRawBody(req)
    const rawBody = buf.toString('utf8')

    if (process.env.LEMON_SQUEEZY_WEBHOOK_SECRET) {
      const hmac = crypto.createHmac(
        'sha256',
        process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
      )
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
      const signature = Buffer.from(
        (req.headers['x-signature'] as string) || '',
        'utf8'
      )

      if (!crypto.timingSafeEqual(digest, signature)) {
        return res.status(401).json({ success: false, error: 'Unauthorized' })
      }
    }

    const json = JSON.parse(rawBody)

    const { meta, data } = json

    const licenseKey = meta.custom_data?.license_key

    if (meta.event_name === 'order_created' && licenseKey) {
      await handleRenewOrder(licenseKey)
    } else if (meta.event_name === 'order_created') {
      await handleNewOrder(data)
    }

    res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)

    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}

async function handleRenewOrder(licenseKey) {
  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/licenses/validate`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      method: 'POST',
      body: `license_key=${licenseKey}`,
    }
  )

  const result = await response.json()

  if (!result?.license_key) {
    console.log('Error renewing license', result)
    return
  }

  const updatedResponse = await fetch(
    `https://api.lemonsqueezy.com/v1/license-keys/${result.license_key.id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'license-keys',
          id: String(result.license_key.id),
          attributes: {
            expires_at: new Date(
              Date.now() + 365 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
        },
      }),
    }
  )

  const updatedResult = await updatedResponse.json()

  console.log('Updated license', updatedResult)
}

async function handleNewOrder(eventData: any) {
  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/customers/${eventData.attributes.customer_id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
        Accept: 'application/json',
      },
      method: 'GET',
    }
  )

  const json = await response.json()

  const attr = json?.data?.attributes

  if (!attr) {
    console.log('No customer attributes found', json)
    return
  }

  const [firstName, ...lastName] = attr.name.split(' ')

  const event = {
    eventName: 'order_created',
    email: attr.email,
    firstName,
    lastName: lastName.join(' '),
    license: eventData?.attributes?.first_order_item?.product_name,
  }

  fetch('https://app.loops.so/api/v1/events/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    },
    body: JSON.stringify(event),
  })
}

export default handler
