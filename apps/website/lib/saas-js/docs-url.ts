import { isPackageId } from './packages'

export function getSjsDocsUrl(slugs: string[] = []) {
  const [first, ...rest] = slugs

  if (isPackageId(first)) {
    const suffix = rest.length ? `/${rest.join('/')}` : ''
    return `/packages/${first}/docs${suffix}`
  }

  return `/docs/${slugs.join('/')}`
}
