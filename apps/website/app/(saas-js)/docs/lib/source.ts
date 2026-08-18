import { getSjsDocsUrl } from '@/lib/saas-js/docs-url'
import { createMDXSource } from '@fumadocs/content-collections'
import {
  allSJSDocs as allDocs,
  allSJSMetas as allMetas,
} from 'content-collections'
import { loader } from 'fumadocs-core/source'

export const source = loader({
  baseUrl: '/docs',
  url: (slugs) => getSjsDocsUrl(slugs),
  source: createMDXSource(allDocs, allMetas),
})
