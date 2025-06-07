import { source } from '@/lib/source'
import { createFromSource } from 'fumadocs-core/search/server'

export const revalidate = false
export const { staticGET: GET } = createFromSource(source, {
  buildIndex(page) {
    console.log(page.data)
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
    }
  },
})
