import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from 'node-fetch'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const API_KEY = process.env.GUMROAD_API_KEY

  const response = await fetch(
    `https://api.gumroad.com/v2/sales/${req.body.saleId}?access_token=${API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'GET',
    }
  )

  const result = await response.json()

  if (!result.success) {
    return res.status(200).json({ success: false, error: result.message })
  }

  res.status(200).json({
    success: true,
    licenseKey: result.sale.license_key,
    githubAccount: result.sale.custom_fields?.['Github account'],
  })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export default handler
