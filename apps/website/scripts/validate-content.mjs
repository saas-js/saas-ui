/**
 * Validates all content collections (docs, blog, changelog) by running the
 * content-collections builder and failing on any document-level error.
 *
 * The Next.js build skips documents that fail to compile instead of failing,
 * so a broken MDX file or invalid frontmatter silently drops the page from
 * the site. This script turns those errors into a non-zero exit code.
 *
 * Run from apps/website: `pnpm test:content`
 */
import { createBuilder } from '@content-collections/core'

const builder = await createBuilder('./content-collections.ts')

const errorEvents = [
  'collector:read-error',
  'collector:parse-error',
  'transformer:validation-error',
  'transformer:result-error',
  'transformer:error',
]

let errors = 0
for (const name of errorEvents) {
  builder.on(name, (event) => {
    errors++
    console.error(`ERROR [${name}]:`, event.error ?? event)
  })
}

await builder.build()

if (errors > 0) {
  console.error(`Content validation failed with ${errors} error(s)`)
  process.exit(1)
}
console.log('Content collections built with zero document errors')
