import { createServerClient } from '@supabase/ssr'

import { getComponent } from '../../../../data/blocks/components'
import { NextApiRequest, NextApiResponse } from 'next'
import { pascalCase } from 'change-case'
import { z } from 'zod'

const isDev = process.env.NODE_ENV === 'development'

const schema = z.object({
  category: z.string().regex(/^[a-z0-9-]+$/i),
  component: z.string().regex(/^[a-z0-9-]+$/i),
})

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

  const { data, error } = await supabase.auth.getUser()

  const hasLicense = !!data.user?.user_metadata.licenses?.length

  const { category, component } = schema.parse(req.query)

  let attributes
  if (isDev) {
    attributes = getComponent(category, component)
  } else {
    attributes = await getComponentFromRepo(category, component)
  }

  if ((!attributes?.attributes.public && !hasLicense) || error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  res.setHeader('Cache-Control', 'max-age=604800, stale-while-revalidate=86400')

  res.status(200).json(attributes)
}

const getComponentFromRepo = async (
  categoryName: string,
  componentName: string
) => {
  const token = Buffer.from(process.env.GITHUB_PERSONAL_TOKEN!).toString(
    'base64'
  )
  const templateRoot = process.env.GITHUB_TEMPLATES_ROOT ?? '/'

  const [codeResponse, attrResponse] = await Promise.all([
    fetch(
      `https://raw.githubusercontent.com/${templateRoot}/${categoryName}/${componentName}/${componentName}.tsx`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },

        redirect: 'follow',
      }
    ),
    fetch(
      `https://raw.githubusercontent.com/${templateRoot}/${categoryName}/${componentName}/attributes.json`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
        redirect: 'follow',
      }
    ),
  ])

  if (!codeResponse.ok) {
    throw new Error('Component not found')
  }

  const code = await codeResponse.text()

  let attributes = {}
  try {
    const attr = await attrResponse.text()
    attributes = JSON.parse(attr)
  } catch {}

  return {
    component: pascalCase(componentName),
    slug: componentName,
    code: [
      {
        fileName: `${componentName}.tsx`,
        language: 'tsx',
        code: code,
      },
    ],
    attributes,
  }
}
