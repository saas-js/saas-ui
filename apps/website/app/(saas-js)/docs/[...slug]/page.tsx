import { SjsDocsPage, getSjsDocsMetadata } from '../sjs-docs-page'
import { source } from '../lib/source'
import { isPackageId } from '@/lib/saas-js/packages'

interface Props {
  params: Promise<{ slug?: string[] }>
}

export default async function Page(props: Props) {
  const params = await props.params
  return <SjsDocsPage slug={params.slug ?? []} />
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  return getSjsDocsMetadata(params.slug)
}

export async function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => !isPackageId(params.slug?.[0]))
}
