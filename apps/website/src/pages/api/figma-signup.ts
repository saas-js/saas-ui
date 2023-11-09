import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email } = schema.parse(req.body)

    const [firstName, ...lastName] = (name ?? '').split(' ')

    const event = {
      eventName: 'figma_signup',
      email: email,
      firstName,
      lastName: lastName.join(' '),
    }

    const response = await fetch('https://app.loops.so/api/v1/events/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify(event),
    })

    const json = await response.json()

    if (json.success) {
      await sendDiscordNotification({ name, email })
    }

    res.status(200).json({ success: !!json.success })
  } catch (err) {
    console.log(err)

    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}

const sendDiscordNotification = async ({ name, email }) => {
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
  try {
    if (DISCORD_WEBHOOK) {
      const body = JSON.stringify({
        content: `New Figma signup 🚀`,
        embeds: [
          {
            fields: [
              {
                name: 'Name',
                value: name,
              },
              {
                name: 'Email',
                value: email,
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

export default handler
