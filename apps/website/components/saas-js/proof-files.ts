export interface ProofFile {
  path: string
  group: 'App' | 'API' | 'Database' | 'Tests'
  language: 'tsx' | 'ts'
  description: string
  code: string
}

export const proofFiles: ProofFile[] = [
  {
    path: 'apps/web/src/routes/_app/$workspace/_dashboard/contacts/index.tsx',
    group: 'App',
    language: 'tsx',
    description:
      'Routes stay thin: they declare the URL contract and hand work to a feature module.',
    code: `import { createFileRoute } from '@tanstack/react-router'

import { ContactsListPage } from '#features/contacts/list/list-page'

export const Route = createFileRoute(
  '/_app/$workspace/_dashboard/contacts/',
)({
  head: () => ({
    meta: [{ title: 'Contacts' }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return <ContactsListPage params={params} />
}`,
  },
  {
    path: 'packages/api/modules/contacts/contacts.router.ts',
    group: 'API',
    language: 'ts',
    description:
      'Workspace-scoped procedures validate input before delegating business logic to services.',
    code: `export const contactsRouter = createTRPCRouter({
  byId: workspaceProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const contact = await getContactById(input)

      if (!contact) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      return contact
    }),
  create: workspaceProcedure
    .input(CreateContactInputSchema)
    .mutation(({ ctx, input }) => {
      return createContact({
        userId: ctx.session.user.id,
        ...input,
      })
    }),
})`,
  },
  {
    path: 'packages/api/modules/contacts/contacts.schema.ts',
    group: 'API',
    language: 'ts',
    description:
      'Schemas are derived from the database model, keeping API inputs and generated types aligned.',
    code: `export const ContactSchema = createSelectSchema(contacts)
export const ContactInsertSchema = createInsertSchema(contacts)

export const CreateContactInputSchema = ContactInsertSchema.omit({
  tags: true,
  firstName: true,
  lastName: true,
  createdAt: true,
  updatedAt: true,
})
  .partial({
    id: true,
    sortOrder: true,
  })
  .and(z.object({ tags: z.string().array().optional() }))

export type CreateContactDTO = z.infer<
  typeof CreateContactInputSchema
>`,
  },
  {
    path: 'packages/api/modules/contacts/contacts.service.ts',
    group: 'API',
    language: 'ts',
    description:
      'Data access and pagination live in service functions instead of leaking into routes.',
    code: `export const getContactById = async (args: {
  workspaceId: string
  id: string
}) => {
  const contact = await db.query.contacts.findFirst({
    where: { workspaceId: args.workspaceId, id: args.id },
  })

  return contact
}

export interface ListArgs extends PaginationArgs {
  workspaceId: string
  type?: ContactModel['type']
}

export const findContactsByType = async (args: ListArgs) => {
  return db.query.contacts.findMany({
    orderBy: { id: 'desc' },
    where: args.type
      ? { workspaceId: args.workspaceId, type: args.type }
      : { workspaceId: args.workspaceId },
    ...getPaginationArgs(args),
  })
}`,
  },
  {
    path: 'packages/db/src/contacts/contacts.sql.ts',
    group: 'Database',
    language: 'ts',
    description:
      'Multi-tenant constraints live in the schema, including workspace-scoped indexes and uniqueness.',
    code: `export const contacts = pgTable(
  'contacts',
  {
    ...workspaceId,
    email: varchar('email', { length: 255 }).notNull(),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    name: varchar('name', { length: 255 }),
    status: contactStatusEnum('status').notNull().default('new'),
    type: contactTypeEnum('type').notNull(),
    tags: jsonb('tags').$type<string[]>(),
    sortOrder: real('sort_order'),
    ...timestamps,
  },
  (table) => [
    index().on(table.workspaceId, table.id),
    unique().on(table.workspaceId, table.email),
  ],
)`,
  },
  {
    path: 'tests/auth.spec.ts',
    group: 'Tests',
    language: 'ts',
    description:
      'Browser tests verify user-visible outcomes so agents get feedback at the behavior boundary.',
    code: `test('login page loads', async ({ page }) => {
  await page.goto('/')

  await page.waitForURL('**/login')

  await expect(page).toHaveTitle(/Login/)
  await expect(
    page.getByRole('heading', { name: /Log in/i }),
  ).toBeVisible()
})`,
  },
]
