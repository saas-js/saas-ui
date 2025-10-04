import { getComponent } from '@/blocks/components'
import { createServerClient } from '@supabase/ssr'
import { pascalCase } from 'change-case'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

const isDev = process.env.NODE_ENV === 'development'

const schema = z.object({
  category: z.string().regex(/^[a-z0-9-]+$/i),
  component: z.string().regex(/^[a-z0-9-]+$/i),
})

export const GET = async function handler(
  req: NextRequest,
  ctx: RouteContext<'/api/blocks/[category]/[component]'>,
) {
  const { category, component } = await ctx.params

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    },
  )

  const { data } = await supabase.auth.getUser()

  const hasLicense = true //!!data.user?.user_metadata.licenses?.length

  let attributes
  if (isDev) {
    attributes = await getComponent(category, component)
  } else {
    attributes = await getComponentFromRepo(category, component)
  }

  if (!attributes?.attributes.public && !hasLicense) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    })
  }

  return new Response(JSON.stringify(attributes), {
    status: 200,
    headers: {
      'Cache-Control': isDev
        ? 'no-cache'
        : 'max-age=604800, stale-while-revalidate=86400',
    },
  })
}

const getComponentFromRepo = async (
  categoryName: string,
  componentName: string,
) => {
  const token = Buffer.from(process.env.GITHUB_PERSONAL_TOKEN!).toString(
    'base64',
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
      },
    ),
    fetch(
      `https://raw.githubusercontent.com/${templateRoot}/${categoryName}/${componentName}/attributes.json`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
        redirect: 'follow',
      },
    ),
  ])

  if (!codeResponse.ok) {
    throw new Error(
      `Component not found: ${templateRoot}/${categoryName}/${componentName}/${componentName}.tsx`,
      {
        cause: {
          status: codeResponse.status,
          statusText: codeResponse.statusText,
        },
      },
    )
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
