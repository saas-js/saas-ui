import { getProRegistryIndex } from '@/blocks/components'

export async function GET() {
  const items = await getProRegistryIndex()
  const metadata = items
    .filter((item) => item.type === 'registry:block')
    .map(({ files: _files, ...item }) => item)

  return Response.json(metadata, {
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
    },
  })
}
