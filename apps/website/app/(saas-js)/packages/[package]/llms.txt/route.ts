import {
  getDocGroups,
  groupResponse,
} from '@/app/(saas-js)/(llms)/shared'

export const dynamic = 'force-static'
export const dynamicParams = false

interface Params {
  package: string
}

export function generateStaticParams(): Params[] {
  return getDocGroups()
    .filter((group) => group.kind === 'package')
    .map((group) => ({ package: group.key }))
}

export async function GET(_request: Request, ctx: { params: Promise<Params> }) {
  const { package: id } = await ctx.params
  return groupResponse(id)
}
