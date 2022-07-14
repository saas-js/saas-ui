import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from 'node-fetch'

const sendDiscordNotification = async ({ page, rating }) => {
  const DISCORD_WEBHOOK = process.env.DISCORD_FEEDBACK
  try {
    if (DISCORD_WEBHOOK) {
      const body = JSON.stringify({
        content: `New documentation feedback.`,
        embeds: [
          {
            fields: [
              {
                name: 'Page',
                value: page,
              },
              {
                name: 'Rating',
                value: rating,
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isValid =
      ['😃', '😐', '😞'].includes(req.body.rating) && req.body.page

    if (!isValid) {
      throw new Error('Invalid feedback request')
    }

    await sendDiscordNotification({
      page: req.body.page,
      rating: req.body.rating,
    })

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(200).json({ success: false, error: error.toString() })
  }
}

export default handler
