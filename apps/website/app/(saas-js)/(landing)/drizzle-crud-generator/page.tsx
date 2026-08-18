import { CodeSample, KeywordPage } from '@/components/saas-js/keyword-page'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { Heading, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

export const metadata = createSjsMetadata({
  title: 'A CRUD generator for Drizzle ORM',
  description:
    'Generate type-safe create, read, update, and delete operations from your Drizzle schema.',
  path: '/drizzle-crud-generator',
})

export default function Page() {
  return (
    <KeywordPage
      packageId="drizzle-crud"
      title="A CRUD generator for Drizzle ORM"
      description="Pass a Drizzle table to drizzleCrud. You get typed create, findById, list, update, and delete — plus the filters and hooks you opt into."
    >
      <Text mb="4" color="fg.subtle">
        Most Drizzle apps copy the same insert/select/update/delete helpers per
        table. A generator keeps the schema as the source of truth and types
        every operation from it.
      </Text>

      <CodeSample>{`import { drizzleCrud } from 'drizzle-crud'
import { zod } from 'drizzle-crud/zod'

const createCrud = drizzleCrud(db, { validation: zod() })

const userCrud = createCrud(users, {
  searchFields: ['name', 'email'],
  allowedFilters: ['isActive'],
})

const user = await userCrud.create({
  name: 'Ada Lovelace',
  email: 'ada@example.com',
})`}</CodeSample>

      <Heading as="h2" textStyle="xl" mt="8" mb="3">
        What gets generated
      </Heading>
      <Text mb="4" color="fg.subtle">
        create, findById, list, update, deleteOne, optional restore, bulk
        variants, and lifecycle hooks. Validation uses Standard Schema, so Zod
        is one adapter rather than a hard dependency of the core.
      </Text>

      <Text color="fg.subtle">
        Start with{' '}
        <Link href="/packages/drizzle-crud/docs/getting-started/basic-usage">
          basic usage
        </Link>
        .
      </Text>
    </KeywordPage>
  )
}
