import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import type { Readable } from 'stream'

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks: Array<Buffer> = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rawBody = await getRawBody(req)
    const hmac = crypto.createHmac(
      'sha256',
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!
    )
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
    const signature = Buffer.from(
      (req.headers['x-signature'] as string) || '',
      'utf8'
    )

    if (!crypto.timingSafeEqual(digest, signature)) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const { meta, data } = req.body

    if (meta.event_name === 'order_created') {
      const response = await fetch(
        `https://api.lemonsqueezy.com/v1/orders/${data.id}/customer`,
        {
          headers: {
            Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
            Accept: 'application/json',
          },
          method: 'GET',
        }
      )

      const customer = await response.json()
      const attr = customer.data.attributes

      const [firstName, ...lastName] = attr.name.split(' ')

      const event = {
        eventName: 'order_created',
        email: attr.email,
        firstName,
        lastName: lastName.join(' '),
        license: data.attributes.first_order_item.product_name,
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

    res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)

    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}

export default handler
