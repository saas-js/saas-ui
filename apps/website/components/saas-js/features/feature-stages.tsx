import { FaGithub } from 'react-icons/fa6'
import {
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuChevronRight,
  LuCircleCheck,
  LuEllipsis,
  LuFileCode,
  LuFingerprint,
  LuKeyRound,
  LuMonitorSmartphone,
  LuPlus,
  LuSearch,
  LuShieldCheck,
} from 'react-icons/lu'

import s from './features.module.css'

/**
 * Static, decorative recreations of real Saas.js starter kit screens.
 * Names and data are fictional. Every stage is `aria-hidden` at the call site,
 * the tile copy and feature list carry the meaning.
 */

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type Tone = 'pink' | 'yellow' | 'blue' | 'teal' | 'purple' | 'ink'

function Avatar({ initial, tone }: { initial: string; tone: Tone }) {
  return (
    <span className={s.avatar} data-tone={tone}>
      {initial}
    </span>
  )
}

function Crumbs({
  items,
  start,
}: {
  items: string[]
  start?: React.ReactNode
}) {
  return (
    <div className={s.crumbs}>
      {start && (
        <>
          {start}
          <span className={s.crumbSlash}>/</span>
        </>
      )}
      {items.map((item, index) => (
        <span key={item} className={s.crumb}>
          {index > 0 && <LuChevronRight size={14} />}
          <span className={index === items.length - 1 ? s.crumbCurrent : ''}>
            {item}
          </span>
        </span>
      ))}
      <LuEllipsis size={16} className={s.crumbMore} />
    </div>
  )
}

function CodeWindow({
  file,
  tabs,
  html,
  className,
}: {
  file: string
  tabs?: string[]
  html: string
  className?: string
}) {
  return (
    <div className={cx(s.panel, s.codeWindow, className)}>
      <div className={s.codeTabs}>
        {(tabs ?? [file]).map((tab) => (
          <span
            key={tab}
            className={cx(s.codeTab, tab === file && s.codeTabActive)}
          >
            <LuFileCode size={13} />
            {tab}
          </span>
        ))}
      </div>
      <div className={s.code} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Auth                                                                       */
/* -------------------------------------------------------------------------- */

export function AuthStage() {
  return (
    <div className={cx(s.stage, s.stageAuth)}>
      <div className={s.back}>
        <div className={cx(s.panel, s.fill, s.authPage)}>
          <div className={cx(s.panel, s.authCard)}>
            <span className={s.appMark}>A</span>
            <strong className={s.authTitle}>Log in</strong>

            <div className={s.providerRow}>
              <span className={cx(s.btn, s.btnOutline, s.btnBlock)}>
                <FaGithub size={14} /> Continue with Github
              </span>
              <span className={s.lastUsed}>Last used</span>
            </div>

            <div className={s.divider}>
              <span>Or continue with</span>
            </div>

            <div className={s.field}>
              <span className={s.label}>Email</span>
              <span className={s.input}>ava@acme.com</span>
            </div>
            <div className={s.field}>
              <span className={s.label}>Password</span>
              <span className={cx(s.input, s.inputSecret)}>••••••••••••</span>
            </div>
            <span className={s.link}>Forgot your password?</span>
            <span className={cx(s.btn, s.btnPrimary, s.btnBlock)}>Log in</span>
          </div>
        </div>
      </div>

      <div className={cx(s.float, s.front, s.securityCard)}>
        <div className={s.floatHead}>
          <strong>Security</strong>
          <span className={s.muted}>Account</span>
        </div>
        <ul className={s.settingRows}>
          <li>
            <span className={s.iconBox}>
              <LuFingerprint size={16} />
            </span>
            <span className={s.settingText}>
              <strong>Passkeys</strong>
              <span>MacBook Pro · Touch ID</span>
            </span>
            <span className={cx(s.badge, s.badgeGreen)}>Added</span>
          </li>
          <li>
            <span className={s.iconBox}>
              <LuShieldCheck size={16} />
            </span>
            <span className={s.settingText}>
              <strong>Two-factor authentication</strong>
              <span>Authenticator app</span>
            </span>
            <span className={s.switch} data-checked="" />
          </li>
          <li>
            <span className={s.iconBox}>
              <LuMonitorSmartphone size={16} />
            </span>
            <span className={s.settingText}>
              <strong>Active sessions</strong>
              <span>2 devices</span>
            </span>
            <span className={cx(s.btn, s.btnOutline, s.btnXs)}>Manage</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Workspaces                                                                 */
/* -------------------------------------------------------------------------- */

const members = [
  {
    name: 'Ava Martin',
    email: 'ava@acme.com',
    initial: 'A',
    tone: 'pink',
    role: 'Owner',
  },
  {
    name: 'Liam Chen',
    email: 'liam@acme.com',
    initial: 'L',
    tone: 'yellow',
    role: 'Admin',
  },
  {
    name: 'Noor Haddad',
    email: 'noor@acme.com',
    initial: 'N',
    tone: 'teal',
    role: 'Member',
  },
  {
    name: 'sam@globex.com',
    initial: 'S',
    tone: 'blue',
    invited: true,
  },
] as const

export function WorkspacesStage() {
  return (
    <div className={cx(s.stage, s.stageWorkspaces)}>
      <div className={s.back}>
        <div className={cx(s.panel, s.fill)}>
          <Crumbs
            items={['Settings', 'Members']}
            start={
              <span
                className={cx(s.btn, s.btnGhost, s.btnXs, s.switcherTrigger)}
              >
                <span className={s.workspaceMark} data-tone="ink">
                  A
                </span>
                Acme Inc
                <LuChevronDown size={13} className={s.muted} />
              </span>
            }
          />
          <div className={s.toolbar}>
            <span className={s.search}>
              <LuSearch size={13} />
              Filter by name or email
            </span>
            <span className={cx(s.btn, s.btnPrimary, s.btnXs)}>
              Invite people
            </span>
          </div>
          <ul className={s.memberList}>
            {members.map((member) => (
              <li key={member.name}>
                <Avatar initial={member.initial} tone={member.tone} />
                <span className={s.memberText}>
                  <strong>{member.name}</strong>
                  {'email' in member && <span>{member.email}</span>}
                </span>
                {'invited' in member ? (
                  <span className={cx(s.tag, s.tagSurface)}>invited</span>
                ) : (
                  <span className={s.tag}>{member.role}</span>
                )}
                <LuEllipsis size={15} className={s.muted} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cx(s.front, s.float, s.menu)}>
        <span className={s.menuLabel}>Workspaces</span>
        <span className={cx(s.menuItem, s.menuItemActive)}>
          <span className={s.workspaceMark} data-tone="ink">
            A
          </span>
          Acme Inc
          <LuCheck size={14} className={s.menuCheck} />
        </span>
        <span className={s.menuItem}>
          <span className={s.workspaceMark} data-tone="blue">
            N
          </span>
          Northwind
        </span>
        <span className={s.menuItem}>
          <span className={s.workspaceMark} data-tone="purple">
            G
          </span>
          Globex
        </span>
        <span className={s.menuSeparator} />
        <span className={cx(s.menuItem, s.muted)}>
          <LuPlus size={14} />
          Create workspace
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Billing                                                                    */
/* -------------------------------------------------------------------------- */

const invoices = [
  ['Nov 1, 2026', '€30.00'],
  ['Oct 1, 2026', '€30.00'],
  ['Sep 1, 2026', '€20.00'],
]

export function BillingStage({ configHtml }: { configHtml: string }) {
  return (
    <div className={cx(s.stage, s.stageBilling)}>
      <div className={s.back}>
        <div className={cx(s.panel, s.fill)}>
          <Crumbs items={['Settings', 'Billing']} />
          <div className={s.settingsBody}>
            <span className={s.sectionTitle}>Billing plan</span>
            <div className={s.card}>
              <p className={s.muted}>
                You are currently on the <strong>Professional</strong> plan.
                Renews at December 1, 2026.
              </p>
              <div className={s.btnRow}>
                <span className={cx(s.btn, s.btnOutline, s.btnXs)}>
                  Update plan
                </span>
                <span className={cx(s.btn, s.btnGhost, s.btnXs)}>
                  Manage billing
                </span>
              </div>
            </div>

            <span className={s.sectionTitle}>Invoices</span>
            <div className={cx(s.card, s.cardFlush)}>
              {invoices.map(([date, amount]) => (
                <div key={date} className={s.invoiceRow}>
                  <span>{date}</span>
                  <span className={s.tabular}>{amount}</span>
                  <span className={cx(s.badge, s.badgeGreen)}>Paid</span>
                  <LuArrowRight size={13} className={s.muted} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={cx(s.float, s.front, s.configCard)}>
        <div className={s.codeTabs}>
          <span className={cx(s.codeTab, s.codeTabActive)}>
            <LuFileCode size={13} />
            billing.config.ts
          </span>
        </div>
        <div
          className={s.code}
          dangerouslySetInnerHTML={{ __html: configHtml }}
        />
        <div className={s.syncFoot}>
          <code>pnpm billing:sync</code>
          <span>
            <LuCircleCheck size={14} />
            Synced to Stripe
          </span>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Feature flags                                                              */
/* -------------------------------------------------------------------------- */

const flags = [
  { key: 'export-contacts', meta: 'Professional plan', on: true },
  { key: 'ai-assistant', meta: '25% of workspaces', on: true, rollout: 25 },
  { key: 'new-onboarding', meta: 'Internal only', on: false },
]

export function FlagsStage({ setupHtml }: { setupHtml: string }) {
  return (
    <div className={cx(s.stage, s.stageFlags)}>
      <div className={s.back}>
        <CodeWindow className={s.fill} file="flags.ts" html={setupHtml} />
      </div>

      <div className={cx(s.float, s.front)}>
        <div className={s.floatHead}>
          <strong>Feature flags</strong>
          <span className={s.tag}>OpenFeature</span>
        </div>
        <ul className={s.flagRows}>
          {flags.map((flag) => (
            <li key={flag.key}>
              <span className={s.settingText}>
                <code className={s.flagKey}>{flag.key}</code>
                <span>{flag.meta}</span>
              </span>
              {flag.rollout && (
                <span className={s.rollout}>
                  <i style={{ width: `${flag.rollout}%` }} />
                </span>
              )}
              <span
                className={s.switch}
                data-checked={flag.on ? '' : undefined}
              />
            </li>
          ))}
        </ul>
        <div className={s.floatFoot}>
          <span className={s.muted}>Provider</span>
          <span className={cx(s.btn, s.btnOutline, s.btnXs)}>
            Reflag
            <LuChevronDown size={12} className={s.muted} />
          </span>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Database                                                                   */
/* -------------------------------------------------------------------------- */

export function DatabaseStage({ schemaHtml }: { schemaHtml: string }) {
  return (
    <div className={cx(s.stage, s.stageDatabase)}>
      <div className={s.back}>
        <CodeWindow
          className={s.fill}
          file="contacts.sql.ts"
          tabs={['contacts.sql.ts', 'relations.ts', 'seed.ts']}
          html={schemaHtml}
        />
      </div>

      <div className={cx(s.front, s.terminal)}>
        <div className={s.terminalHead}>
          <i />
          <i />
          <i />
          <span>Terminal</span>
        </div>
        <div className={s.terminalBody}>
          <p>
            <span className={s.prompt}>$</span> pnpm db:generate
          </p>
          <p className={s.dim}>0007_contacts_tags.sql created</p>
          <p>
            <span className={s.prompt}>$</span> pnpm db:migrate
          </p>
          <p>
            <span className={s.ok}>✓</span> migrations applied
          </p>
          <p>
            <span className={s.prompt}>$</span> pnpm db:seed
          </p>
          <p>
            <span className={s.ok}>✓</span> seeded 3 workspaces
            <span className={s.caret} />
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* API                                                                        */
/* -------------------------------------------------------------------------- */

const completions = [
  ['email', 'string'],
  ['name', 'string | null'],
  ['status', "'new' | 'active' | 'inactive'"],
  ['tags', 'string[] | null'],
]

export function ApiStage({ routerHtml }: { routerHtml: string }) {
  return (
    <div className={cx(s.stage, s.stageApi)}>
      <div className={s.back}>
        <CodeWindow
          className={s.fill}
          file="contacts.router.ts"
          html={routerHtml}
        />
      </div>

      {/* Anchored to `contact.st` on line 10 of the editor. */}
      <ul className={cx(s.front, s.completions)}>
        {completions.map(([name, type], index) => (
          <li key={name} data-active={index === 2 ? '' : undefined}>
            <span className={s.completionKind}>⬩</span>
            <span>{name}</span>
            <span className={s.completionType}>{type}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* UI components                                                              */
/* -------------------------------------------------------------------------- */

const swatches = [
  ['accent', 'var(--chakra-colors-accent-solid)'],
  ['gray', 'var(--chakra-colors-gray-solid)'],
  ['blue', 'var(--chakra-colors-blue-solid)'],
  ['green', 'var(--chakra-colors-green-solid)'],
  ['pink', 'var(--chakra-colors-pink-solid)'],
]

export function UiStage() {
  return (
    <div className={cx(s.stage, s.stageUi)}>
      <div className={s.back}>
        <div className={cx(s.panel, s.fill, s.kit)}>
          <div className={s.kitRow}>
            <span className={cx(s.btn, s.btnPrimary)}>Save changes</span>
            <span className={cx(s.btn, s.btnOutline)}>Cancel</span>
            <span className={cx(s.btn, s.btnGhost, s.btnIcon)}>
              <LuEllipsis size={16} />
            </span>
          </div>
          <div className={s.segmented}>
            <span data-active="">Last year</span>
            <span>Last month</span>
            <span>Last 7 days</span>
          </div>
          <div className={s.kitRow}>
            <span className={s.tag} data-tone="blue">
              Lead
            </span>
            <span className={s.tag} data-tone="green">
              Customer
            </span>
            <span className={s.tag} data-tone="pink">
              VIP
            </span>
            <span className={s.switch} data-checked="" />
            <span className={s.checkbox}>
              <LuCheck size={11} />
            </span>
          </div>
          <div className={s.statRow}>
            <div className={s.card}>
              <span className={s.muted}>Revenue</span>
              <strong className={s.statValue}>$12,500</strong>
              <span className={cx(s.badge, s.badgeGreen)}>+12.4%</span>
            </div>
            <div className={s.card}>
              <span className={s.muted}>New leads</span>
              <strong className={s.statValue}>284</strong>
              <span className={cx(s.badge, s.badgeGreen)}>+8.1%</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cx(s.float, s.front, s.themeCard)}>
        <div className={s.floatHead}>
          <strong>Theme</strong>
          <span className={s.muted}>theme.ts</span>
        </div>
        <div className={s.themeBody}>
          <span className={s.label}>Colors</span>
          <div className={s.swatches}>
            {swatches.map(([name, color]) => (
              <span key={name} className={s.swatch}>
                <i style={{ background: color }} />
                {name}
              </span>
            ))}
          </div>
          <span className={s.label}>Radius</span>
          <div className={cx(s.segmented, s.segmentedSm)}>
            <span>sm</span>
            <span data-active="">md</span>
            <span>lg</span>
            <span>xl</span>
          </div>
          <div className={s.themeFont}>
            <span className={s.label}>Font</span>
            <span>Inter</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Transactional emails                                                       */
/* -------------------------------------------------------------------------- */

export function EmailStage() {
  return (
    <div className={cx(s.stage, s.stageEmail)}>
      <div className={s.back}>
        <div className={cx(s.panel, s.fill)}>
          <div className={s.mailHead}>
            <Avatar initial="A" tone="ink" />
            <span className={s.mailMeta}>
              <strong>Acme</strong>
              <span>You have been invited to join a workspace on Acme</span>
            </span>
            <span className={s.muted}>9:41 AM</span>
          </div>
          <div className={s.mailBody}>
            <div className={s.mailSheet}>
              <span className={s.appMark}>A</span>
              <strong className={s.mailTitle}>You have been invited</strong>
              <p>Ava Martin invited you to join Acme on Acme.</p>
              <span className={cx(s.btn, s.btnPrimary)}>Accept invitation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Testing                                                                    */
/* -------------------------------------------------------------------------- */

const checks = [
  ['Lint & typecheck', '42s'],
  ['Unit tests', 'Vitest · 18s'],
  ['E2E tests', 'Playwright · 1m 12s'],
]

export function TestingStage({ specHtml }: { specHtml: string }) {
  return (
    <div className={cx(s.stage, s.stageTesting)}>
      <div className={s.back}>
        <CodeWindow className={s.fill} file="auth.spec.ts" html={specHtml} />
      </div>

      <div className={cx(s.float, s.front, s.checksCard)}>
        <div className={s.checksHead}>
          <span className={s.checksIcon}>
            <LuCheck size={14} />
          </span>
          <span className={s.settingText}>
            <strong>All checks have passed</strong>
            <span>3 successful checks</span>
          </span>
        </div>
        <ul className={s.checkList}>
          {checks.map(([name, meta]) => (
            <li key={name}>
              <LuCircleCheck size={14} className={s.checkOk} />
              <strong>{name}</strong>
              <span className={s.muted}>{meta}</span>
            </li>
          ))}
        </ul>
        <div className={s.floatFoot}>
          <span className={s.muted}>
            <LuKeyRound size={12} /> Required for merge
          </span>
          <span className={cx(s.btn, s.btnPrimary, s.btnXs)}>
            Merge pull request
          </span>
        </div>
      </div>
    </div>
  )
}
