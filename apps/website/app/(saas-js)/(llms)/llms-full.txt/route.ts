import { renderPages, textResponse } from '@/lib/llms'

import { BASE_URL, getPages } from '../shared'

export const dynamic = 'force-static'

export function GET() {
  return textResponse(
    renderPages(getPages(), BASE_URL, {
      system:
        'The complete Saas JS documentation: open-source TypeScript packages and SaaS starter kits.',
    }),
  )
}
