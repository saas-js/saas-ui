import { source as sjsSource } from '@/app/(saas-js)/docs/lib/source'
import { source as suiSource } from '@/lib/source'
import { createFromSource } from 'fumadocs-core/search/server'

export const revalidate = false

const sjsSearch = createFromSource(sjsSource, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
    }
  },
})

const suiSearch = createFromSource(suiSource, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
    }
  },
})

export function GET(request: Request) {
  const host = new URL(request.url).host
  const search = host.includes('saas-ui') ? suiSearch : sjsSearch
  return search.staticGET()
}
