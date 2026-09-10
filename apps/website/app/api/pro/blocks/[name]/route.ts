import { getProRegistryIndex, getProRegistryItem } from '@/blocks/components'
import { highlightCode } from '@/lib/highlight-code'
import { getProAccess } from '@/lib/pro-access'

function removeReact(input: string) {
  const lines = input.split('\n')
  if (lines[0]?.includes("import React from 'react';")) {
    lines.shift()
  } else if (lines[0]?.includes('import React')) {
    lines[0] = lines[0].replace(/import React[^;]+;/, '')
  }
  return lines.join('\n')
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
    return Response.json({ error: 'Invalid block name' }, { status: 400 })
  }

  const access = await getProAccess()
  const metadata = (await getProRegistryIndex()).find(
    (entry) => entry.name === name && entry.type === 'registry:block',
  )
  if (!metadata) {
    return Response.json({ error: 'Block unavailable' }, { status: 404 })
  }
  if (metadata.private && !access.entitled) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Cache-Control': 'private, no-store',
        Vary: 'Authorization, Cookie',
      },
    })
  }

  const item = await getProRegistryItem(name, {
    authorization: access.authorization,
  })

  if (!item) {
    return Response.json({ error: 'Block unavailable' }, { status: 404 })
  }
  if (item.private && !access.entitled) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Cache-Control': 'private, no-store',
        Vary: 'Authorization, Cookie',
      },
    })
  }
  const code = await Promise.all(
    (item.files ?? [])
      .filter((file) => typeof file !== 'string' && file.content)
      .map(async (file) => {
        if (typeof file === 'string' || !file.content) return null
        const content = removeReact(file.content)
        return {
          fileName: file.path.split('/').pop() ?? file.path,
          language: file.path.endsWith('.css') ? 'css' : 'tsx',
          code: content,
          highlighted: await highlightCode(content),
        }
      }),
  )

  return Response.json(
    { name: item.name, code: code.filter(Boolean) },
    {
      headers: item.private
        ? {
            'Cache-Control': 'private, no-store',
            Vary: 'Authorization, Cookie',
          }
        : { 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
    },
  )
}
