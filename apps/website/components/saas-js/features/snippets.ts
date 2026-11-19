// Trimmed excerpts from the starter kit source, shown in the feature stages.

export const billingConfigCode = `export const plans: BillingPlan[] = [
  {
    id: 'pro@1',
    name: 'Professional',
    trialDays: 14,
    features: [
      { id: 'users', price: 10, limit: 3 },
    ],
  },
]`

export const flagsCode = `import { OpenFeature } from '@openfeature/server-sdk'
import { ReflagNodeProvider } from '@reflag/openfeature-node-provider'

await OpenFeature.setProviderAndWait(
  new ReflagNodeProvider({ secretKey: env.REFLAG_SECRET_KEY }),
)

export const flags = OpenFeature.getClient()

const canExport = await flags.getBooleanValue('export-contacts', false, {
  targetingKey: user.id,
  workspaceId,
})`

export const schemaCode = `export const contacts = pgTable(
  'contacts',
  {
    ...workspaceId,
    email: varchar('email', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }),
    status: contactStatusEnum('status').default('new'),
    type: contactTypeEnum('type').notNull(),
    tags: jsonb('tags').$type<string[]>(),
    ...timestamps,
  },
  (t) => [
    primaryKey({ columns: [t.workspaceId, t.id] }),
    unique().on(t.workspaceId, t.email),
  ],
)`

export const routerCode = `export const contactsRouter = createTRPCRouter({
  byId: workspaceProcedure
    .input(z.object({ workspaceId: z.string(), id: z.string() }))
    .query(async ({ input }) => {
      const contact = await getContactById(input)
      if (!contact) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      return contact.st`

export const specCode = `import { expect, test } from '@playwright/test'

test('login page loads', async ({ page }) => {
  await page.goto('/')

  // Wait for redirect to login page
  await page.waitForURL('**/login')

  await expect(page).toHaveTitle(/Login/)
  await expect(
    page.getByRole('heading', { name: /Log in/i }),
  ).toBeVisible()
})`
