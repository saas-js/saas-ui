import { SeoLanding } from '@/components/saas-js/seo-landing'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { seoLandingPages } from '@/lib/saas-js/seo-pages'
import type { Metadata } from 'next'

const content = seoLandingPages['tanstack-start-saas-boilerplate']

export const metadata: Metadata = createSjsMetadata({
  title: content.title,
  description: content.description,
  path: '/tanstack-start-saas-boilerplate',
})

export default function Page() {
  return <SeoLanding content={content} />
}
