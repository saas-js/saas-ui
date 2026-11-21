import { textResponse } from '@/lib/llms'

import { renderLlmsTxt } from '../shared'

export const dynamic = 'force-static'

export function GET() {
  return textResponse(renderLlmsTxt())
}
