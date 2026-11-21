import { BASE_URL, componentFileUrl, getComponentPages } from '../shared'

export const dynamic = 'force-static'

export function GET() {
  const components = Array.from(getComponentPages(), ([id, page]) => ({
    id,
    title: page.data.title,
    url: `${BASE_URL}${page.url}`,
    path: componentFileUrl(id),
    fullPath: componentFileUrl(id, true),
  }))

  return Response.json(components, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  })
}
