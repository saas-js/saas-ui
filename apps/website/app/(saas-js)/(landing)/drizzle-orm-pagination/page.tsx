import { CodeSample, KeywordPage } from '@/components/saas-js/keyword-page'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { Heading, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

export const metadata = createSjsMetadata({
  title: 'Drizzle ORM pagination without the boilerplate',
  description:
    'Paginate Drizzle queries with page, limit, and total counts generated from your schema.',
  path: '/drizzle-orm-pagination',
})

export default function Page() {
  return (
    <KeywordPage
      packageId="drizzle-crud"
      title="Drizzle ORM pagination without the boilerplate"
      description="Drizzle CRUD turns list queries into paginated results: page, limit, total, and totalPages, typed against your schema."
    >
      <Text mb="4" color="fg.subtle">
        Rolling your own offset pagination in Drizzle means repeating the same
        count query, limit/offset math, and return shape on every table. The
        list helper does that once per schema.
      </Text>

      <CodeSample>{`const result = await userCrud.list({
  search: 'ada',
  filters: { isActive: true },
  orderBy: [{ field: 'createdAt', direction: 'desc' }],
  page: 1,
  limit: 20,
})

result.results
result.total
result.page
result.limit
result.totalPages`}</CodeSample>

      <Heading as="h2" textStyle="xl" mt="8" mb="3">
        Limits you can configure
      </Heading>
      <Text mb="4" color="fg.subtle">
        Set a default page size and a max so clients cannot ask for 10,000 rows.
        Soft-deleted rows stay out of the page unless you pass{' '}
        <code>includeDeleted</code>.
      </Text>

      <CodeSample>{`const userCrud = createCrud(users, {
  defaultLimit: 20,
  maxLimit: 100,
  searchFields: ['name', 'email'],
  softDelete: { field: 'deletedAt' },
})`}</CodeSample>

      <Text color="fg.subtle">
        See{' '}
        <Link href="/packages/drizzle-crud/docs/reference/core-operations">
          list options
        </Link>{' '}
        and{' '}
        <Link href="/packages/drizzle-crud">the package</Link>.
      </Text>
    </KeywordPage>
  )
}
