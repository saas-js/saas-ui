import { SjsDocsPage, getSjsDocsMetadata } from '@/app/(saas-js)/docs/sjs-docs-page'
import { source } from '@/app/(saas-js)/docs/lib/source'
import { isPackageId } from '@/lib/saas-js/packages'

interface Props {
  params: Promise<{ package: string; slug?: string[] }>
}

export default async function Page(props: Props) {
  const params = await props.params
  return <SjsDocsPage slug={[params.package, ...(params.slug ?? [])]} />
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  return getSjsDocsMetadata([params.package, ...(params.slug ?? [])])
}

export async function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => isPackageId(params.slug?.[0]))
    .map((params) => ({
      package: params.slug[0],
      slug: params.slug.slice(1),
    }))
}
