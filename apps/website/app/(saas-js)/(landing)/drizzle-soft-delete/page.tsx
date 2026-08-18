import { CodeSample, KeywordPage } from '@/components/saas-js/keyword-page'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { Heading, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

export const metadata = createSjsMetadata({
  title: 'Soft deletes in Drizzle ORM',
  description:
    'Add soft delete, restore, and permanent delete to Drizzle tables from a single timestamp field.',
  path: '/drizzle-soft-delete',
})

export default function Page() {
  return (
    <KeywordPage
      packageId="drizzle-crud"
      title="Soft deletes in Drizzle ORM"
      description="Point Drizzle CRUD at a deletedAt column. deleteOne writes a timestamp, list hides those rows, restore clears it, and permanentDelete still exists when you mean it."
    >
      <Text mb="4" color="fg.subtle">
        A `deletedAt` timestamp is the usual Drizzle pattern. Wiring every query
        to skip those rows, and every delete to set the column, is where the
        bugs live. Configure it once on the table helper.
      </Text>

      <CodeSample>{`const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  deletedAt: timestamp('deleted_at'),
})

const userCrud = createCrud(users, {
  softDelete: { field: 'deletedAt' },
})

await userCrud.deleteOne('123')
await userCrud.restore('123')
await userCrud.permanentDelete('123')`}</CodeSample>

      <Heading as="h2" textStyle="xl" mt="8" mb="3">
        List and find skip deleted rows
      </Heading>
      <Text mb="4" color="fg.subtle">
        <code>list</code> and <code>findById</code> ignore soft-deleted records
        unless you pass <code>includeDeleted: true</code>. Restore and bulk
        restore are available only when soft delete is configured.
      </Text>

      <Text color="fg.subtle">
        Full API on{' '}
        <Link href="/packages/drizzle-crud/docs/reference/core-operations">
          core operations
        </Link>
        .
      </Text>
    </KeywordPage>
  )
}
