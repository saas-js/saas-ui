import { createServerClient } from '@/lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from 'node-fetch'

const syncLicense = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerClient(req, res)
  const { data } = await supabase.auth.getUser()

  const result = await supabase.auth.updateUser({
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

const isLemonLicense = (licenseKey) => {
  return !!licenseKey.match(
    /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
  )
}

const verifyLemon = async (licenseKey, githubAccount) => {
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

const verifyGumroad = async (licenseKey) => {
  const API_KEY = process.env.GUMROAD_API_KEY
  const PRODUCT = process.env.GUMROAD_PRODUCT_PERMALINK
  const response = await fetch(`https://api.gumroad.com/v2/licenses/verify`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: `accessToken=${API_KEY}&product_permalink=${PRODUCT}&license_key=${licenseKey}&increment_uses_count=false`,
  })

  const result = await response.json()

  let error
  if (response.status === 404) {
    error = 'Invalid license key'
  } else if (response.status !== 200) {
    error = 'Failed to verify your license key'
  }

  return {
    email: result?.purchase?.email,
    product: result?.purchase?.product_name,
    error,
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const TEST_LICENSE = process.env.GUMROAD_TEST_LICENSE

    const isTest = req.body.licenseKey === TEST_LICENSE

    let result
    if (isGumroadLicense(req.body.licenseKey)) {
      result = await verifyGumroad(req.body.licenseKey)
    } else if (isLemonLicense(req.body.licenseKey)) {
      result = await verifyLemon(req.body.licenseKey, req.body.githubAccount)
    }

    if (!isTest && result.error) {
      return res.status(200).json({ success: false, error: result.error })
    }

    try {
      syncLicense(req, res)
    } catch (err) {
      console.error('[Supabase]', err)
    }

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(200).json({ success: false, error: error.toString() })
  }
}

export default handler
