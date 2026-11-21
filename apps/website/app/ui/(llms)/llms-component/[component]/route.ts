import { renderPages, textResponse } from '@/lib/llms'

import { BASE_URL, getComponentPages } from '../../shared'

export const dynamic = 'force-static'
export const dynamicParams = false

interface Params {
  component: string
}

export function generateStaticParams(): Params[] {
  return Array.from(getComponentPages().keys()).flatMap((id) => [
    { component: `${id}.txt` },
    { component: `${id}-full.txt` },
  ])
}

export async function GET(_request: Request, ctx: { params: Promise<Params> }) {
  const { component: param } = await ctx.params
  const full = param.endsWith('-full.txt')
  const id = param.replace(/(-full)?\.txt$/, '')
  const page = getComponentPages().get(id)

  if (!page) return new Response('Not found', { status: 404 })

  return textResponse(
    renderPages([page], BASE_URL, {
      minify: !full,
      system: full
        ? `Documentation for the ${page.data.title} component in Saas UI v3.`
        : undefined,
    }),
  )
}
