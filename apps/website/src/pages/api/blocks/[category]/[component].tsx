import { createServerClient } from '@supabase/ssr'

import { getComponent } from '../../../../data/blocks/components'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.cookies

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies[name]
        },
      },
    }
  )

  const { data, error } = await supabase.auth.getSession()

  const { category, component } = req.query

  const categoryName = category?.toString()
  const componentName = component?.toString()

  if (!categoryName || !componentName) {
    return res.status(404).json({ error: 'Missing component name' })
  }

  const attributes = getComponent(
    categoryName,
    componentName,
    process.env.TEMPLATE_ROOT
  )

  if ((!attributes?.attributes.public && !data.session) || error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  res.status(200).json(attributes)
}
