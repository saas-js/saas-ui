import { CodeSample, KeywordPage } from '@/components/saas-js/keyword-page'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { Heading, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

export const metadata = createSjsMetadata({
  title: 'Filtering Drizzle ORM queries',
  description:
    'JSON-serializable filters, operators, and OR/AND logic on top of Drizzle.',
  path: '/drizzle-filtering',
})

export default function Page() {
  return (
    <KeywordPage
      packageId="drizzle-crud"
      title="Filtering Drizzle ORM queries"
      description="Pass a filters object to list(). Root keys AND together; nested OR/AND arrays build the rest. Operators cover eq, gt, in, ilike, and more."
    >
      <Text mb="4" color="fg.subtle">
        Drizzle gives you a typed SQL builder. What most list endpoints need is
        a serializable filter from the query string — something you can store,
        send across the wire, and turn back into WHERE clauses without
        hand-writing each operator.
      </Text>

      <CodeSample>{`const users = await userCrud.list({
  filters: {
    isActive: true,
    age: { op: 'gte', value: 18 },
    status: { op: 'in', value: ['active', 'pending'] },
    OR: [{ name: 'Ada' }, { name: 'Grace' }],
  },
})`}</CodeSample>

      <Heading as="h2" textStyle="xl" mt="8" mb="3">
        Operators
      </Heading>
      <Text mb="4" color="fg.subtle">
        eq, ne, gt, gte, lt, lte, in, like, and ilike. Combine them with OR and
        AND arrays. Restrict which fields clients may filter with{' '}
        <code>allowedFilters</code> so a query string cannot touch every column.
      </Text>

      <Text color="fg.subtle">
        Details in{' '}
        <Link href="/packages/drizzle-crud/docs/advanced/filtering">
          advanced filtering
        </Link>
        .
      </Text>
    </KeywordPage>
  )
}
