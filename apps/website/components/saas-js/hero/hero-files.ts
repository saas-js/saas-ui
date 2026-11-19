import { billingConfigCode, schemaCode, specCode } from '../features/snippets'
import { exportDiffAddedLines, exportDiffCode } from './hero-snippets'

/**
 * Files shown in the hero editor. Paths match the starter kit repo; contents
 * are trimmed excerpts. `added` marks the lines the agent wrote (1-based).
 */
export interface HeroFile {
  path: string
  lang: 'ts' | 'tsx'
  code: string
  added?: number[]
}

const contactsListPageCode = `export function ContactsListPage({ type }: ContactsListPageProps) {
  const workspace = useCurrentWorkspace()
  const canExport = useBooleanFlagValue('export-contacts', false)

  const exportContacts = api.contacts.export.useMutation({
    onSuccess: (csv) => downloadFile(csv, 'contacts.csv'),
  })

  const toolbar = (
    <ButtonGroup>
      <ContactTypes />
      <Spacer />
      {canExport && (
        <Button
          variant="outline"
          loading={exportContacts.isPending}
          onClick={() => exportContacts.mutate({ workspaceId: workspace.id })}
        >
          Export CSV
        </Button>
      )}
      {primaryAction}
    </ButtonGroup>
  )
}`

const workspaceInviteCode = `export function WorkspaceInviteEmail(props: {
  confirmUrl: string
  workspace?: string
  invitedBy?: string
}) {
  return (
    <Html>
      <Preview>
        You have been invited to join a workspace on {config.appName}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>You have been invited</Heading>
          <Section style={buttonContainer}>
            <Button href={props.confirmUrl} style={button}>
              Accept invitation
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}`

export const heroFiles: HeroFile[] = [
  {
    path: 'apps/web/src/features/contacts/list/contacts-list-page.tsx',
    lang: 'tsx',
    code: contactsListPageCode,
    added: [3, 4, 5, 6, 7, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  },
  {
    path: 'packages/api/modules/contacts/contacts.router.ts',
    lang: 'ts',
    code: exportDiffCode,
    added: exportDiffAddedLines,
  },
  {
    path: 'packages/config/billing.config.ts',
    lang: 'ts',
    code: billingConfigCode,
  },
  {
    path: 'packages/db/src/contacts/contacts.sql.ts',
    lang: 'ts',
    code: schemaCode,
  },
  {
    path: 'packages/email/templates/workspace-invite.tsx',
    lang: 'tsx',
    code: workspaceInviteCode,
  },
  { path: 'tests/auth.spec.ts', lang: 'ts', code: specCode },
]

/** The two files the agent edits, open in tabs on load. */
export const heroOpenFiles = [
  'packages/api/modules/contacts/contacts.router.ts',
  'apps/web/src/features/contacts/list/contacts-list-page.tsx',
]
