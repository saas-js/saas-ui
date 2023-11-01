import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers['x-signature'] !== process.env.LEMON_SQUEEZY_WEBHOOK_SECRET) {
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
}

export default handler
